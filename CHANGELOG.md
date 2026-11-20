# Changelog

## 2026-11-20

### 新增
- `skills/draftio-image/SKILL.md`：选模型 / 按模型方言写提示词 / 报价三层能力，价格从 `/api/v2/public/models` 现读。
- `plugin.json`：Agent Plugins 便携清单，Codex 及兼容宿主可直接 `codex plugin add`。
- `scripts/validate.mjs` + GitHub Actions：校验清单字段、frontmatter、双 README 互链。
- README 中英双版，含「和直接调官方 API 比」对照表与 Troubleshooting。

### 修复
- 场景表里的 `nano-banana-pro` 改为真实 id `gemini-3-pro-image-preview`（否则 agent 会拿一个不存在的 id 去查价）。
