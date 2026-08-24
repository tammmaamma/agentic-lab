# GOLDEN RULES — 절대 위반 금지

1. 활성 결제 코드는 **`src/payments/`뿐**이다. `src/billing/`, `src/old/`는 DEPRECATED — 절대 수정/참조 금지.
2. 금액은 항상 **전(minor unit) 정수**로 다룬다. 부동소수점 원 단위 금지.
3. 결제 관련 로그는 **`lib/logger.js`의 `logPayment()`만** 사용한다. `console.log`/`logInfo`/`logError` 직접 호출 금지.
4. 코드 변경 후 **`npm test` 통과 없이** 작업을 완료 처리하지 않는다.
5. 환불 수수료율 변경은 **`REFUND_FEE_RATE` 상수만** 수정한다. 계산식(반올림 정책 등)을 임의로 바꾸지 않는다.
