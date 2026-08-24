// tests/refund.test.js
// src/payments/refund.js (신규 결제 모듈) 기준 테스트.

const test = require('node:test');
const assert = require('node:assert/strict');
const { refund } = require('../src/payments/refund');

test('정상 환불 요청은 5% 수수료를 뗀 금액을 refundedAmountMinor로 반환한다', () => {
  const result = refund({ orderId: 'ORDER-1', amountMinor: 10000 });

  assert.equal(result.status, 'refunded');
  assert.equal(result.orderId, 'ORDER-1');
  assert.equal(result.originalAmountMinor, 10000);
  assert.equal(result.feeAmountMinor, 500);
  assert.equal(result.feeRate, 0.05);
  assert.equal(result.refundedAmountMinor, 9500);
});

test('수수료는 반올림 없이 내림(floor)으로 계산된다', () => {
  const result = refund({ orderId: 'ORDER-4', amountMinor: 999 });

  // 999 * 0.05 = 49.95 -> Math.floor -> 49 (반올림이었다면 50)
  assert.equal(result.feeAmountMinor, 49);
  assert.equal(result.refundedAmountMinor, 950);
});

test('정상 환불 처리 시 logPayment 로그에 실환불액과 수수료가 남는다', () => {
  const originalConsoleLog = console.log;
  const logLines = [];
  console.log = (line) => logLines.push(line);

  try {
    refund({ orderId: 'ORDER-5', amountMinor: 999 });
  } finally {
    console.log = originalConsoleLog;
  }

  const processedLine = logLines
    .map((line) => JSON.parse(line))
    .find((entry) => entry.event === 'refund.processed');

  assert.ok(processedLine, 'refund.processed 로그가 남아야 한다');
  assert.equal(processedLine.order_id, 'ORDER-5');
  assert.equal(processedLine.amount_minor, 950); // 수수료 차감 후 실환불액
  assert.equal(processedLine.fee_amount_minor, 49); // 차감된 수수료
  assert.equal(processedLine.status, 'refunded');
});

test('환불 금액이 0이면 에러를 던진다', () => {
  assert.throws(
    () => refund({ orderId: 'ORDER-2', amountMinor: 0 }),
    /0일 수 없습니다/
  );
});

test('환불 금액이 음수이면 에러를 던진다', () => {
  assert.throws(
    () => refund({ orderId: 'ORDER-3', amountMinor: -500 }),
    /음수일 수 없습니다/
  );
});
