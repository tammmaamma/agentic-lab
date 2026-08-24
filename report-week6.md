# 6주차 실습 일지 — 자산 공장

## 완료한 LAB 체크리스트 (LAB 01~11)

- 🟢 LAB 01
- 🟢 LAB 02
- 🟢 LAB 03
- 🟢 LAB 04
- 🟢 LAB 05
- 🟢 LAB 06
- 🟢 LAB 07
- 🟢 LAB 08
- 🟢 LAB 09
- 🟢 LAB 10
- 🟢 LAB 11

## LAB별 기록

### LAB 01

- 산출물 경로: [refund.js](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/src/payments/refund.js), [refund.test.js](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/tests/refund.test.js)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): 커밋 `f223ddc7a0` (apply 5% refund fee)
- 관찰 한 줄: 레거시 코드(`src/billing/refund.js`)를 훼손하지 않고, 새로운 규칙을 담은 활성 패키지(`src/payments/refund.js`)에 정수 원 단위 환불 수수료 로직을 분리 구현함.

### LAB 02

- 산출물 경로: [CLAUDE.md](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/CLAUDE.md), [GOLDEN_RULES.md](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/GOLDEN_RULES.md)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): 커밋 `ab94ab192d` (constitution v1)
- 관찰 한 줄: 프로젝트 개발 규칙(헌법)인 `CLAUDE.md`를 35줄 이하로 관리해 에이전트가 가벼운 컨텍스트 내에서 신속하게 지시를 수행하도록 함.

### LAB 03

- 산출물 경로: [payment-rules.md](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/docs/payment-rules.md)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): [repo_grade_zero.png](file:///C:/Users/heeye/agentic-lab/repo_grade_zero.png) (초기 0점 채점 및 ROI 개선 제안), [repo_grade_improved.png](file:///C:/Users/heeye/agentic-lab/repo_grade_improved.png) (개선 후 90점 획득 채점 결과)
- 관찰 한 줄: `repo-grade` 루브릭에 맞춰 모호할 수 있는 비즈니스 규칙(세율 연도 범위 등)을 명문화함으로써 AI의 작동 오인성을 선제 격리함.

### LAB 04

- 산출물 경로: [_brain/index.md](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/_brain/index.md) 및 [_brain/decision/](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/_brain/decision/)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): [wiki_ingest_query.png](file:///C:/Users/heeye/agentic-lab/wiki_ingest_query.png) (위키 쿼리를 통한 인시던트 진단 및 정리 화면)
- 관찰 한 줄: 단순 세미나 대화록(`_brain/raw/`)에서 결정사항/관찰을 분리하여 위키(`_brain/`) 구조로 정규화하고 상호 링크를 통해 재사용성을 높임.

### LAB 05

- 산출물 경로: [wiki-lint/SKILL.md](file:///C:/Users/heeye/agentic-lab/.claude/skills/wiki-lint/SKILL.md)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): [wiki_lint_run.png](file:///C:/Users/heeye/agentic-lab/wiki_lint_run.png) (wiki-lint 실행 대기 화면)
- 관찰 한 줄: 깨진 위키 링크, 고아 노드, 근거 없는 draft 등을 자동 검사·보고하는 린터 스킬을 설계하여 위키 지식의 무결성을 유지함.

### LAB 06

- 산출물 경로: [lab-onboard/SKILL.md](file:///C:/Users/heeye/agentic-lab/.claude/skills/lab-onboard/SKILL.md), [knowledge-map.md](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/_brain/_index/knowledge-map.md)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): 커밋 `ca6ac7d0ac` (lab-onboard skill)
- 관찰 한 줄: `sources.yaml`에 등재된 로컬 정보 범위 내에서 지식 지도를 자동 빌드·갱신함으로써 신규 에이전트 세션의 온보딩 시간을 극대화함.

### LAB 07

- 산출물 경로: [student-id.js](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/src/student-id.js), [student-id.test.js](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/tests/student-id.test.js), [cli.js](file:///C:/Users/heeye/agentic-lab/messy-billing-practice/src/cli.js)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): [spec_audit_questions.png](file:///C:/Users/heeye/agentic-lab/spec_audit_questions.png) (spec 모호성 감리 질문 목록), [tdd_guard_block.png](file:///C:/Users/heeye/agentic-lab/tdd_guard_block.png) (TDD 가드가 테스트 없는 구현 파일 생성을 차단하는 동작), [step_principles_reflect.png](file:///C:/Users/heeye/agentic-lab/step_principles_reflect.png) (Step 원칙 회고 표)
- 관찰 한 줄: Step 원칙(AC, 엣지, 제약, 경계, 시그니처)에 의거해 기획 모호성을 제거한 뒤, RED-GREEN TDD로 학번 검증 CLI 기능을 결함 없이 완성함.

### LAB 08

- 산출물 경로: N/A (절감 행동 실행)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): N/A
- 관찰 한 줄: 절감 행동(이번 주 실행) — 하나의 feat/fix/docs 커밋이 끝나는 시점(작업 단위 경계)마다 `/clear`로 컨텍스트를 끊는다. 독립적인 다음 작업이 이전 작업의 누적 컨텍스트를 매 턴 cache_read로 계속 실어나르지 않게 해서 캐시 읽기 누적량을 줄인다.

### LAB 09

- 산출물 경로: [token-report.js](file:///C:/Users/heeye/agentic-lab/scripts/token-report.js), [settings.json](file:///C:/Users/heeye/agentic-lab/.claude/settings.json) (Stop 훅)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): 커밋 `d4dedc35a8` 및 `f91e3f4bef` (token report script & Stop hook)
- 관찰 한 줄: 에이전트 세션이 종료되는 시점에 사용한 토큰 사용량과 예상 요금을 정량 보고하는 Stop 훅을 구현하여 비용 모니터링을 상시화함.

### LAB 10

- 산출물 경로: [review.md](file:///C:/Users/heeye/agentic-lab/.claude/commands/review.md), [risk-score.md](file:///C:/Users/heeye/agentic-lab/.claude/commands/risk-score.md)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): [code_review_run.png](file:///C:/Users/heeye/agentic-lab/code_review_run.png) (code-review 실행 화면), [risk_score_result.png](file:///C:/Users/heeye/agentic-lab/risk_score_result.png) (risk-score 5축 위험도 평가 결과 표)
- 관찰 한 줄: 코드 수정 시 헌법 준수 여부 및 위험도 검증(5축 평가)을 자동 감사하는 커스텀 슬래시 커맨드를 연동하여 코드 품질 안정성을 향상함.

### LAB 11

- 산출물 경로: [settings.json](file:///C:/Users/heeye/agentic-lab/.claude/settings.json) (PostToolUse 훅), [audit.log](file:///C:/Users/heeye/agentic-lab/.claude/audit.log)
- 핵심 증거(전/후 · 차단 등, 캡처 파일명): [bash_tool_audit.png](file:///C:/Users/heeye/agentic-lab/bash_tool_audit.png) (임시 폴더 생성 및 삭제 쉘 명령 실행 화면)
- 관찰 한 줄: 실행형 도구(Bash) 사용 내역을 시각과 함께 `.claude/audit.log`에 자동 수집하는 훅을 설정하여 에이전트의 작동 이력을 투명하게 로깅함.

## 종합 관찰 3줄

1. 개발 규칙 문서(`CLAUDE.md`, `GOLDEN_RULES.md`)와 지속성 있는 검증 도구(`wiki-lint`, `/review`)를 수립하여 에이전트 지시 준수성과 일관성을 크게 제고함.
2. Step 원칙과 `tdd-guard` 등의 안전 가이드라인을 도입해 요구사항의 기획 모호성을 사전에 분쇄하고, TDD를 통해 안전하고 신속하게 코드를 병합함.
3. 세션 비용 보고(`token-report`) 및 동작 이력 감사(`audit log`) 등 에이전트 특화 자동화 훅을 탑재하여 비용 효율과 감리 투명성을 모두 충족함.
