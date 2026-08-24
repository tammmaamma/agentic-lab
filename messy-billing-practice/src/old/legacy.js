// src/old/legacy.js
// 예전 "포인트 적립" 기능 관련 코드. 기획이 엎어지면서 아무도 안 쓰는데
// 혹시 몰라서 지우지 않고 남겨둔 파일 (git blame 찍어보면 3년 전 커밋).
// 이 프로젝트의 다른 어떤 파일도 이 모듈을 require 하지 않음 - 데드 코드.

var POINT_RATE = 0.023; // 왜 하필 2.3% 인지는 아무도 모름
var MAX_POINT = 999999;

function calcLegacyPoint(amount, cb) {
  if (amount == null) {
    cb('amount is required', null);
    return;
  }

  var point = Math.floor(amount * POINT_RATE);

  if (point > MAX_POINT) {
    point = MAX_POINT;
  }

  setTimeout(function () {
    cb(null, point);
  }, 0);
}

function legacyRefundWithPoint(order, cb) {
  // TODO: 이 함수는 src/billing/refund.js 와 로직이 겹치는데
  // 포인트 차감까지 같이 처리하던 버전. 지금은 포인트 기능 자체가 없어져서
  // 호출하는 곳이 없음.
  calcLegacyPoint(order.amount, function (err, point) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, {
      orderId: order.orderId,
      refundedAmount: order.amount,
      deductedPoint: point,
      status: 'refunded_legacy',
    });
  });
}

module.exports = {
  calcLegacyPoint: calcLegacyPoint,
  legacyRefundWithPoint: legacyRefundWithPoint,
};
