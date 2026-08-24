// lib/logger.js
// 신규 팀에서 도입한 "구조화 로그" 유틸.
// (아직 billing 쪽 옛날 코드는 이걸 안 쓰고 console.log 문자열을 그대로 찍는다 - TODO 마이그레이션)

function logInfo(event, data) {
  console.log(JSON.stringify({
    level: 'info',
    event,
    ...data,
    timestamp: new Date().toISOString(),
  }));
}

function logError(event, data) {
  console.log(JSON.stringify({
    level: 'error',
    event,
    ...data,
    timestamp: new Date().toISOString(),
  }));
}

// 결제/환불 도메인 전용 진입점. 결제 관련 로그는 이 함수만 쓰기로 함
// (GOLDEN_RULES.md / CLAUDE.md 규칙). 항상 고정 스키마의 JSON 한 줄(JSON line)을
// 출력한다: { ts, event, order_id, amount_minor, fee_amount_minor, currency, status }
// - orderId/amountMinor/feeAmountMinor는 없으면 null로 채운다 (필드 자체는 항상 존재).
// - amount_minor는 수수료 차감 후 실제 금액(net), fee_amount_minor는 차감된 수수료를 의미.
// - currency는 지정하지 않으면 'KRW'로 기본값 처리 (이 프로젝트는 현재 단일 통화만 다룸).
function logPayment({ event, orderId = null, amountMinor = null, feeAmountMinor = null, currency = 'KRW', status = null }) {
  console.log(JSON.stringify({
    ts: new Date().toISOString(),
    event,
    order_id: orderId,
    amount_minor: amountMinor,
    fee_amount_minor: feeAmountMinor,
    currency,
    status,
  }));
}

module.exports = { logInfo, logError, logPayment };
