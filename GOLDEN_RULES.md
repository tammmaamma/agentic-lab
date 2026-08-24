# GOLDEN RULES — 절대 위반 금지

1. 하위 프로젝트 폴더(예: `messy-billing-practice/`) 안에서 작업할 때는 **그 폴더의 `CLAUDE.md`/`GOLDEN_RULES.md`가 이 루트 규칙보다 우선**한다.
2. 하위 프로젝트가 DEPRECATED로 표시한 폴더(예: `messy-billing-practice/src/billing/`, `src/old/`)는 **어떤 프로젝트에서도 수정·참조 금지**.
3. 새 하위 프로젝트를 추가할 때는 반드시 그 폴더 안에 자체 `CLAUDE.md`를 만들고, 루트 `CLAUDE.md`에 링크를 추가한다.
4. 코드 변경 후에는 해당 하위 프로젝트의 테스트(`npm test` 등)를 통과시키지 않고 작업을 완료 처리하지 않는다.
