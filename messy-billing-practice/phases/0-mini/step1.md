# step1 — CLI 통합

## [읽을 파일]

- `phases/0-mini/index.json`의 `summaries.step0`
- `src/student-id.js`

## [작업]

`src/cli.js`를 작성한다 — `process.argv`로 받은 학번 인자를 `validateStudentId()`로 검사해 결과를 출력한다.

## [AC]

- `node src/cli.js D2026-1234` → `valid` 출력
- 잘못된 입력(예: `node src/cli.js d2026-1234`) → `invalid`와 그 이유(reason)가 함께 출력됨

## [금지]

`src/student-id.js` 수정 금지.
**이유**: Surgical Changes (CLAUDE.md — 요청 범위 밖의 코드는 건드리지 않는다). CLI는 검증 함수를 그대로 소비만 한다.

## [완료 시]

`phases/0-mini/index.json`에서 `step1`의 `status`를 `"completed"`로 바꾸고, `summaries.step1`에 세 줄 요약을 기록한다.
