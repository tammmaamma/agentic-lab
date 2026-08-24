# step0 — 검증 함수 TDD

## [읽을 파일]

- `docs/mini-spec.md`
- `CLAUDE.md`

## [작업]

`tests/student-id.test.js`에 spec(`docs/mini-spec.md` ⑤ Edge cases)에서 아래 8개 케이스를 테스트로 작성한다.

**엣지 6종** (모두 `{ valid: false, reason: "..." }` 기대, spec ①의 reason 2종 규칙에 따름):
1. 빈 문자열 — 형식 오류
2. 소문자 `d` (예: `d2026-1234`) — 형식 오류
3. 하이픈 누락 (예: `D20261234`) — 형식 오류
4. 앞뒤 공백 (예: `" D2026-1234 "`) — 형식 오류 (트림하지 않음)
5. 연도 1999 (예: `D1999-1234`) — 연도 범위 오류
6. 미래 연도 (예: `현재연도+1`로 동적 계산, 하드코딩 금지) — 연도 범위 오류

**정상 2종** (모두 `{ valid: true }` 기대):
1. 정상 케이스 (예: `D2026-1234`)
2. 하한 경계값 — 입학년도 2000 (예: `D2000-1234`, 양끝 포함 규칙 확인)

테스트 실행 → **RED 확인** (아직 `src/student-id.js`가 없어 실패해야 함).

그 다음 `src/student-id.js`에 `validateStudentId(id)`를 구현 (spec ①~③ 그대로: 정규식 완전일치 → 통과 시 연도 범위 검사, 대소문자·공백 정규화 없음, reason 고정 문자열 2종) → **GREEN 확인**.

## [AC]

`npm test` 전부 통과 (기존 refund/coupon 테스트 포함, 회귀 없음).

## [금지]

spec ④(Boundaries) 범위 밖 구현 금지 — 실제 재학 여부 조회, DB 접근, UI 코드는 이 step에서 만들지 않는다.
**이유**: scope 최소 원칙 (필요한 만큼만 구현 — CLAUDE.md "Simplicity First").

## [완료 시]

`phases/0-mini/index.json`에서 `step0`의 `status`를 `"completed"`로 바꾸고, `summaries.step0`에 세 줄 요약을 기록한다.
