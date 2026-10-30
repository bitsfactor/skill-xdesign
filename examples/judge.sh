#!/usr/bin/env bash
# Blind A/B judge for two hero screenshots (allowed model: gemini-4-argon).
# usage: ./judge.sh A.png B.png   (run each pair in both orders too)
[ -z "${2:-}" ] && { echo "usage: $0 A.png B.png"; exit 2; }
opencode run "A 与 B 是同一产品的两个网页首屏截图（A、B 顺序无关）。只输出两行：第一行 Better: A / B / tie；第二行用一句话说明理由。" \
  --model develop/gemini-4-argon --file "$1" --file "$2"
