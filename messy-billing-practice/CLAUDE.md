# CLAUDE.md — 프로젝트 헌법

이 프로젝트에서 작업할 때 반드시 지킬 규칙.

> 절대 위반 금지 규칙은 @GOLDEN_RULES.md 참조.

- 이 저장소에서는 항상 존댓말로 답한다. (글로벌 규칙과 다름 — 의도된 오버라이드)

## 행동 원칙

1. **Think Before Coding** — 불확실하면 추측하지 말고, 질문하거나 가정을 명시한다.
2. **Simplicity First** — 필요한 최소한만 구현한다. 과설계 금지.
3. **Surgical Changes** — 요청 범위 밖의 코드·주석은 건드리지 않는다.
4. **Goal-Driven** — 작업마다 검증 방법을 먼저 정하고, `npm test`로 확인한다.

## 프로젝트 규칙

- 글로벌 규칙과 충돌하는 항목을 추가할 때는 그 줄에 "의도된 오버라이드"임을 명시한다.

**명령어**
- 테스트: `npm test` (`node --test`)

**구조**
- 활성 결제 코드는 `src/payments/`뿐이다.
- 상세 결제 규칙(수수료 계산·검증·에러 처리): @docs/payment-rules.md

**금지사항**
- `src/billing/`, `src/old/`는 **DEPRECATED** — 절대 수정·참조 금지.
- 금액에 원 단위 float 사용 금지. 항상 전(minor unit) 정수로 다룰 것.
- 결제 로그는 `lib/logger.js`의 `logPayment()`만 사용. `logInfo`/`logError` 직접 호출 금지.
