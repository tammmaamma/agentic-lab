// src/student-id.js
// 학번 유효성 검사기. spec: docs/mini-spec.md
//
// 형식: D(대문자 고정) + 입학년도 4자리 + '-' + 일련번호 4자리, 전체 완전일치.
// 대소문자·공백은 정규화하지 않는다(트림/변환 없이 있는 그대로 판정) — spec ③.
// 판정 순서: 정규식 형식 → (통과 시) 연도 범위(2000~올해, 양끝 포함) — spec ①.
// reason은 자유문장이 아닌 고정 문자열 2종.

const FORMAT_RE = /^D(\d{4})-\d{4}$/;
const MIN_YEAR = 2000;

function validateStudentId(id) {
  if (typeof id !== 'string') {
    return { valid: false, reason: '학번 형식이 아닙니다 (예: D2026-1234)' };
  }

  const match = FORMAT_RE.exec(id);
  if (!match) {
    return { valid: false, reason: '학번 형식이 아닙니다 (예: D2026-1234)' };
  }

  const year = Number(match[1]);
  const currentYear = new Date().getFullYear();

  if (year < MIN_YEAR || year > currentYear) {
    return {
      valid: false,
      reason: `입학년도가 유효 범위(2000~${currentYear})를 벗어났습니다`,
    };
  }

  return { valid: true };
}

module.exports = { validateStudentId };
