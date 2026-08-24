#!/usr/bin/env bash
# scripts/hooks/tdd-guard.sh
# TDD 가드 (PreToolUse, matcher: Edit|Write)
#
# src/ 아래 .js 파일을 수정/작성하기 전에 대응하는 테스트 파일이 있는지 확인한다.
# - 경로가 없거나, 파일명에 test가 들어가거나, 확장자가 .md/.json/.yml이면 통과.
# - src/ 아래 .js 파일이면 tests/{이름}.test.js (프로젝트 루트 기준) 또는
#   같은 폴더의 {이름}.test.js 중 하나라도 있으면 통과.
# - 둘 다 없으면 PreToolUse deny JSON을 출력해 막는다.
# - 그 외(대상이 아닌 파일)엔 조용히 exit 0.

set -u

input="$(cat)"

# 1) tool_input.file_path 추출 — jq가 있으면 jq, 없으면 grep/sed 폴백.
if command -v jq >/dev/null 2>&1; then
  file_path="$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')"
else
  file_path="$(printf '%s' "$input" \
    | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' \
    | head -n 1 \
    | sed -E 's/.*"file_path"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/' \
    | sed 's/\\\\/\\/g')"
fi

# (a) 경로가 없으면 통과
if [ -z "$file_path" ]; then
  exit 0
fi

# 윈도우 백슬래시 경로를 슬래시로 통일해서 매칭
norm_path="$(printf '%s' "$file_path" | sed 's#\\#/#g')"
base_name="$(basename "$norm_path")"

# (a) 파일명에 test가 들어가면 통과 (대소문자 무시)
case "$base_name" in
  *[Tt][Ee][Ss][Tt]*) exit 0 ;;
esac

# (a) 확장자가 .md/.json/.yml이면 통과
case "$base_name" in
  *.md|*.json|*.yml) exit 0 ;;
esac

# (b) src/ 아래 .js 파일이 아니면 그 외 케이스로 조용히 통과
case "$norm_path" in
  */src/*.js|src/*.js) : ;;
  *) exit 0 ;;
esac

name="${base_name%.js}"
same_dir="$(dirname "$norm_path")"

case "$norm_path" in
  */src/*) root_dir="${norm_path%%/src/*}" ;;
  *) root_dir="." ;;
esac
[ -z "$root_dir" ] && root_dir="."

test_a="$root_dir/tests/$name.test.js"
test_b="$same_dir/$name.test.js"

if [ -f "$test_a" ] || [ -f "$test_b" ]; then
  exit 0
fi

# (c) 테스트 없음 -> deny
reason="TDD GUARD: ${name} 테스트가 없습니다. 테스트를 먼저 작성하세요 (예: tests/${name}.test.js)"
printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"%s"}}\n' "$reason"
exit 0
