# Changelog

## 2026-11-20

### 新增
- `skills/draftio-image/SKILL.md`：选模型 / 按模型方言写提示词 / 报价三层能力，价格从 `/api/v2/public/models` 现读。
- `plugin.json`：Agent Plugins 便携清单，Codex 及兼容宿主可直接 `codex plugin add`。
- `scripts/validate.mjs` + GitHub Actions：校验清单字段、frontmatter、双 README 互链。
- README 中英双版，含「和直接调官方 API 比」对照表与 Troubleshooting。
- 场景 skill：`xiaohongshu-cover`、`product-shot`、`youtube-thumbnail`、`infographic-map`，均由 Draftio 提示词库已有模板改写成可执行配方（入口 skill 先路由到场景）。
- README 增「主推：GPT Image 2 系列」与「场景」两节：前者给逐档价格与「画质档不加价」，后者列出场景与对应 skill。

### 变更
- **仓库定位收敛为工具仓**：`skills/` 下只留 `draftio-image` 一个入口，四个场景配方移到 `examples/`（站点 prompt-library 的离线副本），README 首屏从「场景配方库」改为「Draftio 的 agent 入口」。
- 新增 `.claude-plugin/plugin.json`、`.codex-plugin/plugin.json` 与 `install.sh`（一条命令探测 Claude Code / Codex / OpenCode），`skills/draftio-image/SKILL.md` 的场景路由改为指向 `examples/` 与站点。

### 修复
- 场景表里的 `nano-banana-pro` 改为真实 id `gemini-3-pro-image-preview`（否则 agent 会拿一个不存在的 id 去查价）。
