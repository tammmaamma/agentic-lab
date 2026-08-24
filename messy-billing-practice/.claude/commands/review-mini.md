최근 커밋 2개의 변경 사항을 CLAUDE.md와 docs/mini-spec.md 기준으로 감사(audit)한다.

1. 먼저 `CLAUDE.md`, `@GOLDEN_RULES.md`, `@docs/mini-spec.md`를 읽는다.
2. `git log --oneline -2`로 대상 커밋을 확인하고, `git show --stat`와 `git diff`로 각 커밋의 변경 파일·내용을 실제로 읽는다.
3. 아래 5항목을 각각 ✅/❌로 대조한다. 근거는 구체적 파일·줄로 남긴다.

   ① **헌법 4원칙 준수** — CLAUDE.md "행동 원칙" 4가지(Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven)를 지켰는가.
   ② **spec 경계(④) 침범 없음** — `docs/mini-spec.md` ④ Boundaries에 명시된 범위 밖(재학 여부 조회·DB 접근·UI)을 구현하지 않았는가.
   ③ **엣지 테스트 존재** — 변경된 로직에 대응하는 엣지 케이스 테스트가 있는가.
   ④ **AC 통과** — 관련 AC(수용 기준)가 실제로 통과하는가 (`npm test` 등으로 직접 확인).
   ⑤ **금지사항 준수** — CLAUDE.md/GOLDEN_RULES.md의 금지사항(DEPRECATED 경로 접근 금지, float 원 단위 금지, `logPayment()` 외 직접 로그 금지 등)을 위반하지 않았는가.

4. 아래 형식으로 출력한다:

   | 항목 | 판정 | 근거 |
   |---|---|---|
   | ① 헌법 4원칙 | | |
   | ② spec 경계 | | |
   | ③ 엣지 테스트 | | |
   | ④ AC 통과 | | |
   | ⑤ 금지사항 | | |

5. ❌가 하나라도 있으면 "위반 시 수정안" 섹션에 무엇을 어떻게 고쳐야 하는지 구체적으로 제안한다. 전부 ✅면 "위반 없음"이라고 명시한다.
