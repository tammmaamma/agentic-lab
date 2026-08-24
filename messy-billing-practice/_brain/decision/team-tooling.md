---
status: draft
sources:
  - _brain/raw/2026-08-12-week6.md
---

# 팀 표준 배포·가드레일

6주차 세미나([[meeting/2026-08-12-week6]], 자산 공장 실습)에서 나온 팀 공통 도구 결정.

**결정 (확정)**
- 팀 표준 배포는 **luna-plugin**(main 추종)으로 한다.
- **TDD 가드**와 **Bash 가드레일**을 기본 훅으로 채택한다.

**미결**
- audit log를 언제부터 상시 켤지는 다음 주 논의 예정. → 결정되면 이 노드를 갱신하고 `status: solid`로 올릴 것.

**관련**
- [[postmortem/hook-reload-timing]] — 이 가드레일들을 훅으로 넣을 때 실제로 부딪힌 함정.
- [[decision/verification-gate]] — TDD 가드는 npm test 검증 게이트와 같은 목적선상.
