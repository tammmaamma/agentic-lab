// tests/student-id.test.js
// src/student-id.js (학번 유효성 검사기) 기준 테스트.
// phases/0-mini/step0.md에 명시된 엣지 6종 + 정상 2종.

const test = require('node:test');
const assert = require('node:assert/strict');
const { validateStudentId } = require('../src/student-id');

// -- 엣지 6종 (모두 { valid: false, reason } 기대) --

test('빈 문자열은 형식 오류로 거부한다', () => {
  const result = validateStudentId('');

  assert.equal(result.valid, false);
  assert.equal(result.reason, '학번 형식이 아닙니다 (예: D2026-1234)');
});

test('소문자 d는 형식 오류로 거부한다', () => {
  const result = validateStudentId('d2026-1234');

  assert.equal(result.valid, false);
  assert.equal(result.reason, '학번 형식이 아닙니다 (예: D2026-1234)');
});

test('하이픈이 없으면 형식 오류로 거부한다', () => {
  const result = validateStudentId('D20261234');

  assert.equal(result.valid, false);
  assert.equal(result.reason, '학번 형식이 아닙니다 (예: D2026-1234)');
});

test('앞뒤 공백이 있으면 형식 오류로 거부한다 (트림하지 않음)', () => {
  const result = validateStudentId(' D2026-1234 ');

  assert.equal(result.valid, false);
  assert.equal(result.reason, '학번 형식이 아닙니다 (예: D2026-1234)');
});

test('입학년도 1999는 연도 범위 오류로 거부한다', () => {
  const currentYear = new Date().getFullYear();
  const result = validateStudentId('D1999-1234');

  assert.equal(result.valid, false);
  assert.equal(result.reason, `입학년도가 유효 범위(2000~${currentYear})를 벗어났습니다`);
});

test('미래 연도는 연도 범위 오류로 거부한다', () => {
  const currentYear = new Date().getFullYear();
  const futureYear = currentYear + 1;
  const result = validateStudentId(`D${futureYear}-1234`);

  assert.equal(result.valid, false);
  assert.equal(result.reason, `입학년도가 유효 범위(2000~${currentYear})를 벗어났습니다`);
});

// -- 정상 2종 (모두 { valid: true } 기대) --

test('정상 형식(D2026-1234)은 유효하다', () => {
  const result = validateStudentId('D2026-1234');

  assert.equal(result.valid, true);
});

test('입학년도 하한 경계값(2000)은 유효하다 (양끝 포함)', () => {
  const result = validateStudentId('D2000-1234');

  assert.equal(result.valid, true);
});
