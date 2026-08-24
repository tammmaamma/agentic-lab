#!/usr/bin/env node
// scripts/token-report.js
// Claude Code 세션 로그(.jsonl)에서 usage를 추출해 토큰 사용량 리포트를 표로 출력한다.
// 사용: node scripts/token-report.js <file1.jsonl> [file2.jsonl ...]
// node 표준 모듈만 사용 (fs).

'use strict';

const fs = require('fs');

// obj에서 usage 객체를 찾는다 (assistant 메시지: message.usage, 그 외 최상위 usage 폴백).
function findUsage(obj) {
  if (obj && obj.message && obj.message.usage && typeof obj.message.usage === 'object') {
    return obj.message.usage;
  }
  if (obj && obj.usage && typeof obj.usage === 'object') {
    return obj.usage;
  }
  return null;
}

// usage 객체에서 4개 숫자 필드를 뽑는다. 필드가 없거나 숫자가 아니면 null(형식 불일치).
function extractCounts(usage) {
  const input = Number(usage.input_tokens);
  const output = Number(usage.output_tokens);
  const cacheWrite = Number(usage.cache_creation_input_tokens);
  const cacheRead = Number(usage.cache_read_input_tokens);

  if (![input, output, cacheWrite, cacheRead].every(Number.isFinite)) {
    return null;
  }

  return { input, output, cacheWrite, cacheRead };
}

// 파일 하나를 읽어 라인별로 usage를 집계한다.
// - JSON 파싱 자체가 깨지거나 usage 필드값이 숫자가 아니면 "형식 불일치"로 스킵 카운트.
// - usage 필드가 아예 없는 줄(user 메시지 등)은 집계 대상이 아닐 뿐, 형식 불일치가 아니므로 스킵 카운트에 넣지 않는다.
function reportFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n').filter((l) => l.trim().length > 0);

  const totals = { turns: 0, input: 0, output: 0, cacheWrite: 0, cacheRead: 0 };
  let malformed = 0;

  for (const line of lines) {
    let obj;
    try {
      obj = JSON.parse(line);
    } catch (e) {
      malformed += 1;
      continue;
    }

    const usage = findUsage(obj);
    if (!usage) continue; // usage 대상 줄이 아님 (정상 케이스, 스킵 카운트 아님)

    const counts = extractCounts(usage);
    if (!counts) {
      malformed += 1;
      continue;
    }

    totals.turns += 1;
    totals.input += counts.input;
    totals.output += counts.output;
    totals.cacheWrite += counts.cacheWrite;
    totals.cacheRead += counts.cacheRead;
  }

  return { filePath, totals, malformed };
}

function cacheHitRate(cacheRead, input) {
  const denom = input + cacheRead;
  if (denom === 0) return null;
  return cacheRead / denom;
}

function fmtInt(n) {
  return n.toLocaleString('en-US');
}

function fmtPct(ratio) {
  return ratio === null ? 'N/A' : `${(ratio * 100).toFixed(1)}%`;
}

function padRight(s, width) {
  s = String(s);
  return s.length >= width ? s : s + ' '.repeat(width - s.length);
}

function padLeft(s, width) {
  s = String(s);
  return s.length >= width ? s : ' '.repeat(width - s.length) + s;
}

function printTable(rows) {
  const headers = ['파일', 'turns', 'input', 'output', 'cache_write', 'cache_read', '캐시 히트율'];
  const aligns = ['left', 'right', 'right', 'right', 'right', 'right', 'right'];

  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => String(r[i]).length))
  );

  const line = (cells) =>
    '| ' +
    cells
      .map((c, i) => (aligns[i] === 'left' ? padRight(c, widths[i]) : padLeft(c, widths[i])))
      .join(' | ') +
    ' |';

  const sep = '| ' + widths.map((w) => '-'.repeat(w)).join(' | ') + ' |';

  console.log(line(headers));
  console.log(sep);
  for (const r of rows) console.log(line(r));
}

function main() {
  const files = process.argv.slice(2);

  if (files.length === 0) {
    console.error('사용법: node scripts/token-report.js <file1.jsonl> [file2.jsonl ...]');
    process.exit(1);
  }

  const results = files.map(reportFile);

  const rows = results.map((r) => [
    r.filePath,
    fmtInt(r.totals.turns),
    fmtInt(r.totals.input),
    fmtInt(r.totals.output),
    fmtInt(r.totals.cacheWrite),
    fmtInt(r.totals.cacheRead),
    fmtPct(cacheHitRate(r.totals.cacheRead, r.totals.input)),
  ]);

  const grand = results.reduce(
    (acc, r) => ({
      turns: acc.turns + r.totals.turns,
      input: acc.input + r.totals.input,
      output: acc.output + r.totals.output,
      cacheWrite: acc.cacheWrite + r.totals.cacheWrite,
      cacheRead: acc.cacheRead + r.totals.cacheRead,
    }),
    { turns: 0, input: 0, output: 0, cacheWrite: 0, cacheRead: 0 }
  );

  if (results.length > 1) {
    rows.push([
      'TOTAL',
      fmtInt(grand.turns),
      fmtInt(grand.input),
      fmtInt(grand.output),
      fmtInt(grand.cacheWrite),
      fmtInt(grand.cacheRead),
      fmtPct(cacheHitRate(grand.cacheRead, grand.input)),
    ]);
  }

  printTable(rows);

  const outInRatio = grand.input === 0 ? null : grand.output / grand.input;
  console.log('');
  console.log(
    `총합 — turns: ${fmtInt(grand.turns)}, input: ${fmtInt(grand.input)}, output: ${fmtInt(
      grand.output
    )}, cache_write: ${fmtInt(grand.cacheWrite)}, cache_read: ${fmtInt(grand.cacheRead)}`
  );
  console.log(
    `출력:입력 비율 (output / input) = ${outInRatio === null ? 'N/A' : outInRatio.toFixed(2)}`
  );

  const malformedTotal = results.reduce((sum, r) => sum + r.malformed, 0);
  if (malformedTotal > 0) {
    console.log('');
    console.log('형식 불일치로 스킵한 줄:');
    for (const r of results) {
      if (r.malformed > 0) console.log(`  - ${r.filePath}: ${r.malformed}줄`);
    }
  }
}

main();
