// src/payments/coupon.js
// 쿠폰 할인 적용 로직.
// rate는 0 초과 1 이하만 허용 (0%는 쿠폰 의미가 없고, 100% 초과는 무효한 할인율).

function applyCoupon(price, rate) {
  if (typeof rate !== 'number' || rate <= 0 || rate > 1) {
    throw new Error('유효하지 않은 할인율입니다');
  }

  return Math.floor(price * (1 - rate));
}

module.exports = { applyCoupon };
