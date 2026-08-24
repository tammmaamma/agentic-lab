// tests/cli.test.js
// src/cli.js 기준 테스트. phases/0-mini/step1.md의 AC를 그대로 검증한다.
// (child process로 실제 CLI를 실행해 stdout을 확인 — src/student-id.js는 건드리지 않음)

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const CLI_PATH = path.join(__dirname, '..', 'src', 'cli.js');

function runCli(arg) {
  return execFileSync(process.execPath, [CLI_PATH, arg], { encoding: 'utf8' }).trim();
}

test('node src/cli.js D2026-1234 -> valid 출력', () => {
  const output = runCli('D2026-1234');

  assert.equal(output, 'valid');
});

test('잘못된 입력이면 invalid와 이유가 함께 출력된다', () => {
  const output = runCli('d2026-1234');

  assert.match(output, /^invalid:/);
  assert.match(output, /학번 형식이 아닙니다/);
});
