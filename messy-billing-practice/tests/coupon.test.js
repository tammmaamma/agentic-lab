// tests/coupon.test.js
// src/payments/coupon.js (쿠폰 할인) 기준 테스트.

const test = require('node:test');
const assert = require('node:assert/strict');
const { applyCoupon } = require('../src/payments/coupon');

test('정상 할인 요청은 rate만큼 할인된 금액을 반환한다 (10000원 · 10% -> 9000원)', () => {
  const result = applyCoupon(10000, 0.1);

  assert.equal(result, 9000);
});

test('rate가 0 이하이면 에러를 던진다', () => {
  assert.throws(() => applyCoupon(10000, 0));
  assert.throws(() => applyCoupon(10000, -0.1));
});

test('rate가 1을 초과(100% 초과)하면 에러를 던진다', () => {
  assert.throws(() => applyCoupon(10000, 1.1));
});
