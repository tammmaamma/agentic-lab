# CLAUDE.md

이 프로젝트에서 작업할 때 반드시 지킬 규칙.

> 절대 위반 금지 규칙은 @GOLDEN_RULES.md 참조.

1. **활성 결제 코드는 `src/payments/`뿐이다.** `src/billing/`과 `src/old/`는 **DEPRECATED**다. 절대 수정하거나 참조하지 말 것.
2. 금액은 항상 **전(minor unit) 정수**로 다룰 것. 원 단위 float 금지.
3. 모든 결제 관련 로그는 **`lib/logger.js`의 `logPayment()`만** 사용할 것. `logInfo`/`logError` 직접 호출 금지.
4. 코드 변경 후에는 반드시 **`npm test`**를 실행해 통과를 확인할 것.
5. 자세한 결제 규칙(수수료 계산 원칙 · 검증 · 에러 처리)은 @docs/payment-rules.md 참조.
