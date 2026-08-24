---
status: solid
sources:
  - .claude/ci/sources.yaml
---

# 지식 지도 (knowledge-map)

`lab-onboard` 스킬이 `.claude/ci/sources.yaml`에 등재된 로컬 소스만 훑어 생성. `external` 항목은 fetch하지 않고 목록에만 표기.

신선도 기준(파일 mtime, 오늘=2026-08-24): **최근**=오늘, **보통**=1~6일 전, **오래됨**=7일 이상 전.

## 주제별 지도

| 주제 | 관련 파일·노드 | 한 줄 요약 | 신선도 |
|---|---|---|---|
| 결제/환불 로직 (활성) | `messy-billing-practice/src/payments/refund.js`, `tests/refund.test.js`, `package.json` | minor unit 정수 + 5% 수수료(floor) 환불 로직, `npm test`로 검증 | 최근 |
| DEPRECATED 결제 코드 | `messy-billing-practice/src/billing/`, `src/old/` | 구식/데드 코드 — GOLDEN_RULES가 수정·참조 절대 금지 | 최근 |
| 프로젝트 규칙(헌법) | `messy-billing-practice/CLAUDE.md`, `GOLDEN_RULES.md` | 행동 원칙 4개 + 명령어·구조·금지사항 + _brain 규칙, 35줄 제한 | 최근 |
| 저장소 라우팅 규칙(루트) | `CLAUDE.md`, `GOLDEN_RULES.md` (루트) | 하위 프로젝트로 규칙을 위임하는 상위 라우터 | 최근 |
| 팀 결정 기록 | `messy-billing-practice/_brain/decision/*.md` | 검증 게이트(npm test), CLAUDE.md 35줄, 배포(luna-plugin)·가드레일 결정 | 최근 |
| 세미나 원기록 | `messy-billing-practice/_brain/meeting/*.md` | 5·6주차 세미나 요약, 각 결정 노드로 링크 | 최근 |
| 실습 일지 | `report-week6.md` | 6주차 LAB 01~11 체크리스트 — 현재 뼈대만 있고 미작성 | 최근 |
| 외부 참고 (fetch 안 함) | 예시-플러그인 — `github.com/jha0313/agentic-eng-plugin` | 팀 플러그인 구조 참고용 외부 저장소, URL만 표기 | 해당 없음(외부) |

> 참고: `.claude/ci/sources.yaml`의 `knowledge`엔 `_brain/index.md`·`decision/`·`meeting/`만 등재돼 있어 이 지도도 거기까지만 훑었습니다. `_brain/postmortem/`(예: 훅 재시작 함정)은 sources.yaml에 없어 이번 지도에서 빠졌습니다 — 필요하면 `sources.yaml`에 추가해 주세요.

## 자주 묻는 질문 → 어디를 봐야 하나

1. **결제 코드는 어디 있고, 어떤 게 활성 코드인가?** → `messy-billing-practice/CLAUDE.md`(구조 섹션), `messy-billing-practice/src/payments/refund.js`
2. **검증 게이트(테스트)는 어떻게 돌리나?** → `messy-billing-practice/package.json`(scripts.test), `tests/refund.test.js`, `_brain/decision/verification-gate.md`
3. **`src/billing/`, `src/old/`는 왜 건드리면 안 되나?** → `messy-billing-practice/GOLDEN_RULES.md`, 루트 `GOLDEN_RULES.md`
4. **팀이 최근에 뭘 결정했나(배포 표준·가드레일 등)?** → `_brain/decision/team-tooling.md`, `_brain/meeting/2026-08-12-week6.md`
5. **6주차 실습에서 뭘 기록해야 하나?** → `report-week6.md`
