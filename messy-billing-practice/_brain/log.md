# _brain 변경 기록

## 2026-08-24 — 첫 ingest
- `_brain/raw/2026-08-06-week5.md`, `_brain/raw/2026-08-12-week6.md`를 wiki-ingest 스킬로 정리.
- 생성: `decision/verification-gate.md`, `decision/claude-md-conventions.md`, `decision/team-tooling.md`, `postmortem/hook-reload-timing.md`, `meeting/2026-08-06-week5.md`, `meeting/2026-08-12-week6.md`, `index.md`.
- 이유: raw 세미나 노트 2건에 흩어져 있던 결정·관찰·미결 사항을 주제별 노드로 나눠 재사용 가능하게 만들기 위함.
- 모순: 발견되지 않음.

## 2026-08-24 — lab-onboard 첫 실행
- `.claude/ci/sources.yaml`을 읽고 로컬 소스(code/rules/knowledge/reports)를 훑어 `_brain/_index/knowledge-map.md` 생성. `external`은 fetch 없이 목록만 표기.
- 발견: `sources.yaml`의 `knowledge`에 `_brain/postmortem/`이 빠져 있어 지도에서 제외됨(별도 확인 필요).
