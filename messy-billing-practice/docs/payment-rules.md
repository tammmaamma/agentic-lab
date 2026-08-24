# 결제 규칙 — 환불(Refund)

대상 모듈: `src/payments/refund.js` (활성 모듈. `src/billing/`, `src/old/`는 DEPRECATED — 아래 규칙 적용 대상 아님)

## 1. 금액 단위

- 모든 금액은 **전(minor unit) 정수**로 다룬다. 예: `amountMinor: 10000` = 100.00원 단위 시스템에서의 10,000전.
- 부동소수점 원 단위(`10000.00원` 같은 float)는 절대 쓰지 않는다.

## 2. 수수료 계산 원칙

- 환불 수수료율: **5%** (`REFUND_FEE_RATE = 0.05`, `src/payments/refund.js` 상단 상수)
- 계산식:
  ```
  feeAmountMinor = Math.floor(originalAmountMinor * 0.05)
  refundedAmountMinor = originalAmountMinor - feeAmountMinor
  ```
- 반올림 정책: **Math.floor (내림)**. 반올림/올림이 아님 — 소수점 전 단위가 나오는 경우(예: 999전 × 5% = 49.95) 내림해서 정수로 만든다 (사용자에게 유리한 방향).
- 수수료율을 바꿔야 하면 `REFUND_FEE_RATE` 상수만 수정한다. 계산식 자체를 건드리지 않는다.

## 3. 검증(Validation)

환불 처리 전 다음 순서로 검증한다:

1. `order` 객체가 없거나 `order.amountMinor`가 `number` 타입이 아니면 → 거부
2. `amountMinor === 0` → 거부 (0원 환불 불가)
3. `amountMinor < 0` → 거부 (음수 환불 불가)

수수료 계산은 위 3가지 검증을 모두 통과한 뒤에만 수행한다.

## 4. 에러 처리

| 상황 | 에러 메시지 | 로그 이벤트 | status |
|---|---|---|---|
| `order` 누락 / `amountMinor`가 숫자 아님 | `invalid order` | `refund.invalid_order` | `rejected` |
| `amountMinor === 0` | `환불 금액은 0일 수 없습니다` | `refund.rejected_zero_amount` | `rejected` |
| `amountMinor < 0` | `환불 금액은 음수일 수 없습니다` | `refund.rejected_negative_amount` | `rejected` |
| 정상 처리 | — | `refund.processed` | `refunded` |

- 에러는 모두 `throw new Error(...)`로 던진다. 호출부에서 catch해서 처리.
- 검증 실패든 정상 처리든 **로그는 반드시 남긴다** (`logPayment()` 사용, [[CLAUDE.md]] 참조).
- `logPayment()`는 `{ ts, event, order_id, amount_minor, fee_amount_minor, currency, status }` 고정 스키마 JSON 한 줄만 출력한다. `refund.processed`의 `amount_minor`는 **수수료 차감 후 실제 환불액**(`refundedAmountMinor`), `fee_amount_minor`는 **차감된 수수료**(`feeAmountMinor`)다. `feeRate`는 로그에는 안 남고 함수 반환값에만 남는다.

## 5. 응답 스펙 (정상 처리 시)

```js
{
  orderId,
  originalAmountMinor,   // 요청된 원래 금액
  feeAmountMinor,        // 차감된 수수료
  feeRate,                // 적용된 수수료율 (0.05)
  refundedAmountMinor,   // 수수료 차감 후 실제 환불액 = originalAmountMinor - feeAmountMinor
  status: 'refunded',
}
```

> `refundedAmountMinor`는 **수수료 차감 후 금액**이다. 요청 금액이 필요하면 `originalAmountMinor`를 본다. (과거엔 `refundedAmountMinor`가 요청 금액과 동일했으나 5% 수수료 도입 이후 의미가 바뀌었다.)
