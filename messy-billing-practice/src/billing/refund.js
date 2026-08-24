// src/billing/refund.js
// (구) 결제 환불 로직 - 2019년경 레거시 결제 모듈에서 그대로 가져옴.
// 금액은 "원" 단위 정수로 다룸 (예: 10000 = 10,000원).
// 새 코드에서는 src/payments/refund.js 를 대신 쓰고 있지만
// 아직 이쪽을 참조하는 배치 스크립트가 남아있어서 지우지 못했다고 함.
//
// 2026-08-24: src/payments/refund.js에는 환불 수수료 5%가 추가됐지만
// 이 구식 모듈에는 의도적으로 적용하지 않았음 (배치 스크립트 전용으로만 유지,
// 정리 대상이라 신규 기능은 얹지 않기로 함). 따라서 이 모듈이 반환하는
// refundedAmount는 수수료 차감 없이 요청 금액 그대로임 - 신규 모듈과
// 계산 결과가 다르니 혼동 주의.

function refund(order) {
  if (!order || typeof order.amount !== 'number') {
    console.log('[REFUND] invalid order object, amount missing');
    throw new Error('invalid order');
  }

  if (order.amount === 0) {
    console.log('[REFUND] rejected order=' + order.orderId + ' reason=zero-amount');
    throw new Error('환불 금액은 0원일 수 없습니다');
  }

  if (order.amount < 0) {
    console.log('[REFUND] rejected order=' + order.orderId + ' reason=negative-amount');
    throw new Error('환불 금액은 음수일 수 없습니다');
  }

  // 실제로는 여기서 옛날 PG사 API를 호출했었는데
  // 지금은 죽은 엔드포인트라서 그냥 성공 처리만 함
  console.log('[REFUND] order=' + order.orderId + ' amount=' + order.amount + '원 status=processed');

  return {
    orderId: order.orderId,
    refundedAmount: order.amount,
    status: 'refunded',
  };
}

module.exports = { refund };
