결제 기능을 추가할 때 따라야 하는 워크플로우다. 아래 순서를 반드시 지켜서 진행하라.

기능 설명: $ARGUMENTS

1. 먼저 `CLAUDE.md`, `@GOLDEN_RULES.md`, `@docs/payment-rules.md`를 읽는다.
2. `src/payments/`에서만 작업한다. `src/billing/`, `src/old/`는 DEPRECATED이므로 수정하거나 참조하지 않는다.
3. 금액은 항상 minor unit(전) 정수로 다룬다. 부동소수점 원 단위를 쓰지 않는다.
4. 로그는 `lib/logger.js`의 `logPayment()`로만 남긴다. `console.log`/`logInfo`/`logError`를 직접 호출하지 않는다.
5. `tests/`에 이번 기능을 검증하는 새 테스트를 추가한다.
6. `npm test`를 실행한다.
7. 실패하면 traceback을 읽고 원인을 고친 뒤 다시 `npm test`를 실행한다 — 통과할 때까지 이 과정을 반복한다.
8. 통과하면 변경 사항을 요약해 보고한다 (수정/추가한 파일, 핵심 로직 변경점, 테스트 결과).
