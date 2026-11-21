# Changelog

## 2026-11-21

### 新增
- `skills/chinese-poster/SKILL.md`：中文海报专项，覆盖「中文海报 / 带中文字 / 中文标题 / 菜单 / 包装 / 活动海报 / 小红书封面」与 `Chinese poster`、`text in Chinese` 等检索词。首选 `seedream-v5-5`，复杂版式换 `gpt-image-2`；正文固化「引号标出画面文字」「文字组数 ≤ 3」「留白写死位置」，并给出「菜单价格/法律文案不要交给模型写字」的兜底判断。
- `skills/text-layout/SKILL.md`：英文排版与信息结构专项，覆盖「英文排版 / 信息图 / 缩略图 / 字体层级 / YouTube 封面」与 `infographic`、`layout`、`thumbnail`。首选 `gpt-image-2`，区块多时换 `gemini-3-pro-image-preview`；给出信息图「区块 + 标签」结构与缩略图远看可读性验收。
- `skills/image-editing/SKILL.md`：改图工具专项，覆盖「去背景 / 抠图 / 擦除 / 放大 / 多角度 / 换背景」与 `remove background`、`object removal`、`upscale`。写清四个工具的现实边界（去背不换背景、擦除要蒙版或位置、放大不加细节、多角度要有主体且写清角度），并把「用户必须已有图」作为硬规则。

### 变更
- **skill 拆分落地：1 个入口 + 3 个专项**（依据 2026-11-21 获客调研 §7：检索与排名按 skill 粒度，但拆到 11 个维护失控）。`draftio-image` 仍是入口。
- `skills/draftio-image/SKILL.md`：`description` 补 `AI image generation`、`text-to-image` 等英文检索词；开头新增「按任务转交」，任一诉求命中即转 `chinese-poster` / `text-layout` / `image-editing`，其余留在本 skill。

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
