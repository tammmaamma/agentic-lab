---
name: wiki-query
description: "_brain 위키에서 답을 찾아 인용과 함께 답변. '위키에서 찾아줘', 'wiki-query' 트리거"
---

# wiki-query

`_brain/` 위키에서 답을 찾아 답변하는 스킬.

## 절차

1. `_brain/index.md`를 먼저 읽어 관련 있어 보이는 노드를 찾는다.
2. 관련 노드(`decision/`, `meeting/`, `postmortem/` 등)를 실제로 열어 근거를 확인한다. 필요하면 그 노드의 `sources`에 적힌 raw 파일도 열어 원문을 대조한다.
3. 답변할 때는 반드시 근거가 된 `[[노드]]`와 원본 `_brain/raw/...` 출처를 함께 인용한다. 노드의 `status`(stub/draft/solid)도 같이 밝힌다.
4. 위키에서 답을 찾지 못하면 **지어내지 않는다.** "아직 위키에 없음"이라고 답하고, 관련 raw 문서가 있다면 `wiki-ingest`로 정리할 것을 제안한다.
