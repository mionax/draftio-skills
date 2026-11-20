# Changelog

## 2026-11-20

### 新增
- `skills/draftio-image/SKILL.md`：选模型 / 按模型方言写提示词 / 报价三层能力，价格从 `/api/v2/public/models` 现读。
- `plugin.json`：Agent Plugins 便携清单，Codex 及兼容宿主可直接 `codex plugin add`。
- `scripts/validate.mjs` + GitHub Actions：校验清单字段、frontmatter、双 README 互链。
- README 中英双版，含「和直接调官方 API 比」对照表与 Troubleshooting。
- 场景 skill：`xiaohongshu-cover`、`product-shot`、`youtube-thumbnail`、`infographic-map`，均由 Draftio 提示词库已有模板改写成可执行配方（入口 skill 先路由到场景）。
- README 增「主推：GPT Image 2 系列」与「场景」两节：前者给逐档价格与「画质档不加价」，后者列出场景与对应 skill。

### 修复
- 场景表里的 `nano-banana-pro` 改为真实 id `gemini-3-pro-image-preview`（否则 agent 会拿一个不存在的 id 去查价）。
