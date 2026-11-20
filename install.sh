#!/usr/bin/env bash
# 一条命令把 draftio-image 装进你手上的 agent。
#   ./install.sh            自动探测已安装的宿主，全部装
#   ./install.sh claude     只装 Claude Code
#   ./install.sh codex      只装 Codex
#   ./install.sh opencode   只装 OpenCode
#   ./install.sh list       只看会装到哪，不写文件
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$ROOT/skills/draftio-image"

if [ ! -f "$SKILL_DIR/SKILL.md" ]; then
  echo "找不到 $SKILL_DIR/SKILL.md，请在仓库根目录运行" >&2
  exit 1
fi

targets=()
case "${1:-auto}" in
  claude) targets=("$HOME/.claude/skills") ;;
  codex) targets=("$HOME/.codex/skills") ;;
  opencode) targets=("$HOME/.config/opencode/skills") ;;
  list)
    printf '%s\n' "$HOME/.claude/skills" "$HOME/.codex/skills" "$HOME/.config/opencode/skills"
    exit 0
    ;;
  auto)
    for dir in "$HOME/.claude" "$HOME/.codex" "$HOME/.config/opencode"; do
      [ -d "$dir" ] && targets+=("$dir/skills")
    done
    ;;
  *)
    echo "未知参数：$1（可用：auto / claude / codex / opencode / list）" >&2
    exit 1
    ;;
esac

if [ ${#targets[@]} -eq 0 ]; then
  echo "没探测到已安装的 agent。手动选一个：" >&2
  echo "  ./install.sh claude    # ~/.claude/skills" >&2
  echo "  ./install.sh codex     # ~/.codex/skills" >&2
  exit 1
fi

for dest in "${targets[@]}"; do
  mkdir -p "$dest"
  rm -rf "$dest/draftio-image"
  cp -R "$SKILL_DIR" "$dest/draftio-image"
  echo "已装到 $dest/draftio-image"
done

cat <<'EOF'

装好了。验证一下，对 agent 说：

  做一张咖啡店开业海报，竖版，带中文标题

期望它先读 https://www.draftio.cn/api/v2/public/models 再报价。
没读就报数字，说明没装对。
EOF
