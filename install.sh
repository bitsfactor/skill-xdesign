#!/usr/bin/env bash
# Install the xdesign skill into the agent skill directories.
# Usage:
#   ./install.sh          # symlink (recommended while developing)
#   ./install.sh copy     # copy files (self-contained install)
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
MODE="${1:-link}"

install_into() {
  local root="$1"
  [ -d "$root" ] || return 0
  local dest="$root/xdesign"
  rm -rf "$dest"
  if [ "$MODE" = "copy" ]; then
    mkdir -p "$dest"
    cp -R "$SRC/SKILL.md" "$SRC/references" "$dest/"
    [ -f "$SRC/LICENSE" ] && cp "$SRC/LICENSE" "$dest/"
    [ -f "$SRC/README.md" ] && cp "$SRC/README.md" "$dest/"
    echo "  installed (copy) -> $dest"
  else
    ln -s "$SRC" "$dest"
    echo "  installed (link) -> $dest"
  fi
}

echo "xdesign install ($MODE)"
mkdir -p "$HOME/.config/opencode/skills"
install_into "$HOME/.config/opencode/skills"
install_into "$HOME/.claude/skills"
echo "Done. Restart your agent session to pick up the skill."
