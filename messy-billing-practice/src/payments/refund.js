// src/payments/refund.js
// (신) 결제 환불 로직 - PG 연동을 새로 하면서 만든 모듈.
// 금액은 "전(minor unit)" 단위 정수로 다룸 (예: 10000 = 100.00원 단위 시스템에서의 최소 단위).
// src/billing/refund.js 와 같은 일을 하지만 단위/로그 방식이 다르다.
// (아직 정리 안 됨: 두 모듈이 공존하는 이유는 문서화되어 있지 않음)
//
// 2026-08-24: 환불 수수료 5% 적용 추가. refundedAmountMinor는 이제
// "수수료 차감 후 실제 환불액"을 의미함 (기존엔 요청 금액과 동일했음 - breaking change).
// 원 요청 금액은 originalAmountMinor 필드로 별도 확인 가능.
// src/billing/refund.js(구식 모듈)에는 이 수수료 로직을 적용하지 않았음 - 배치 스크립트용으로만 유지 중.
// 로그는 logInfo/logError 대신 lib/logger.js의 logPayment()로 통일함 (CLAUDE.md 규칙).
// logPayment()는 { ts, event, order_id, amount_minor, fee_amount_minor, currency, status }
// 고정 스키마의 JSON 한 줄만 찍는다. refund.processed 이벤트의 amount_minor는 수수료
// 차감 후 실제 환불액(net), fee_amount_minor는 차감된 수수료.

const { logPayment } = require('../../lib/logger');

// 환불 수수료율 (5%). 반올림 정책: Math.floor (내림) 사용 - 소수점 전 단위가 나오면
// 사용자에게 유리하게 내림 처리. 정책이 바뀌면 여기만 바꾸면 됨.
const REFUND_FEE_RATE = 0.05;

function refund(order) {
  if (!order || typeof order.amountMinor !== 'number') {
    logPayment({
      event: 'refund.invalid_order',
      orderId: order && order.orderId ? order.orderId : null,
      status: 'rejected',
    });
    throw new Error('invalid order');
  }

  if (order.amountMinor === 0) {
    logPayment({
      event: 'refund.rejected_zero_amount',
      orderId: order.orderId,
      amountMinor: order.amountMinor,
      status: 'rejected',
    });
    throw new Error('환불 금액은 0일 수 없습니다');
  }

  if (order.amountMinor < 0) {
    logPayment({
      event: 'refund.rejected_negative_amount',
      orderId: order.orderId,
      amountMinor: order.amountMinor,
      status: 'rejected',
    });
    throw new Error('환불 금액은 음수일 수 없습니다');
  }

  const originalAmountMinor = order.amountMinor;
  const feeAmountMinor = Math.floor(originalAmountMinor * REFUND_FEE_RATE);
  const refundedAmountMinor = originalAmountMinor - feeAmountMinor;

  const result = {
    orderId: order.orderId,
    originalAmountMinor,
    feeAmountMinor,
    feeRate: REFUND_FEE_RATE,
    refundedAmountMinor,
    status: 'refunded',
  };

  logPayment({
    event: 'refund.processed',
    orderId: result.orderId,
    amountMinor: result.refundedAmountMinor,
    feeAmountMinor: result.feeAmountMinor,
    status: result.status,
  });

  return result;
}

module.exports = { refund };
