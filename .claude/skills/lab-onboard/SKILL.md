---
name: lab-onboard
description: "저장소 온보딩. 'onboard', '지식 지도 갱신' 트리거"
---

# lab-onboard

저장소 전체를 훑어 지식 지도를 생성/갱신하는 온보딩 스킬.

## 절차

1. `.claude/ci/sources.yaml`을 읽어 봐야 할 곳 목록(code/rules/knowledge/reports/external)을 확보한다.
2. 로컬 소스(`code`/`rules`/`knowledge`/`reports`)만 실제로 훑는다. `external`은 지도에 이름·URL·note만 표기하고 **fetch하지 않는다.**
3. `_brain/_index/knowledge-map.md`를 생성/갱신한다. 이미 있으면 새로 만들지 말고 갱신한다. 구조:
   - **주제별 표**: `주제 | 관련 파일·노드 | 한 줄 요약 | 신선도` — 신선도는 파일 mtime 기준으로 최근/보통/오래됨 중 하나.
   - **"자주 묻는 질문 → 어디를 봐야 하나"**: 신규 참여자가 물을 법한 질문 5개와, 각 질문에 답이 있는 실제 파일·노드 경로.
4. `_brain/log.md`에 이번 실행을 한 줄로 기록한다(날짜, 무엇을 갱신했는지).
