# Draftio Skills

**中文** · [English](README.en.md)

给 coding agent 用的图像生成 skill：**帮你选对模型、按模型方言写提示词、给出确切价格**。

不用 API key，不用注册，装完就能用。生成这一步交给 [Draftio 画布](https://www.draftio.cn/canvas)。

```bash
npx skills add mionax/draftio-skills
```

---

## 它做什么

| | 做什么 | 为什么值得装 |
|---|---|---|
| **选模型** | 根据场景（中文海报、英文排版、改图、多图融合、4K、艺术感）推荐 1 个主选 + 1 个备选 | 16 个模型的能力边界不一样，选错就是白花钱重来 |
| **写提示词** | 按模型方言写：Seedream/Qwen 中文直写、GPT Image/Nano Banana 英文结构化、Midjourney 逗号流 + `--ar` | 同一个需求，换个模型写法完全不同，写错就出废图 |
| **报价格** | 同时给出**最低档**与**默认档实扣**，批量算总价 | 起价≠实付。Seedream 5.5 起价 33 点，不指定分辨率时按 2K 扣 58 点，差 76% |

价格不是写死在 skill 里的，每次都从公开接口现读：

```bash
curl -s https://www.draftio.cn/api/v2/public/models
```

所以模型上新、调价，skill 不会给出过期的数字。

## 主推：GPT Image 2 系列

要处理文字、排版、改字、精修这几件最容易出废图的事，直接用 GPT Image 2 系列。这是目前口碑最硬的图像模型，我们的价格也压得低：

| 模型 | 适合 | 1K | 2K | 4K |
|---|---|---|---|---|
| **GPT Image 2** | 指令理解最强，复杂排版、改字、精修 | ¥0.60（60 点） | ¥0.80（80 点） | ¥1.20（120 点） |
| **GPT Image 2.5 Flare** | 快速档，日常改图与快速迭代 | ¥0.60 | ¥0.80 | ¥1.20 |
| **GPT Image 2.5 Sunburst** | 高档，商业级精修与细节打磨 | ¥0.71（71 点） | ¥0.80 | ¥1.20 |

两个别人不一定告诉你的点：

- **画质档不加价**：`low / medium / high` 三档在计费上是同一个价。选 high 不会比 low 贵。
- **改图能力完整**：1–16 张参考图（2.5 系列），改字、换背景、多图融合都能一次做完，不用来回导。

对照官方：OpenAI 1024×1024 的高画质档约 $0.211/张（≈¥1.5）。我们 1K 收 ¥0.60。

## 它不做什么

- **不自己生成图片**：生成在画布上完成。API key 与 MCP 服务端还在开发中，装好之后暂不支持让 agent 直接提交任务。
- 读不到你的余额和历史作品。
- 不含视频模型（当前只覆盖 16 个图像模型）。

这三条写得很直白，是为了让 agent 别替我们吹牛。

## 安装

### Claude Code

```bash
npx skills add mionax/draftio-skills
```

### Codex

```bash
codex plugin add github.com/mionax/draftio-skills
```

### Cursor / 其它支持 `AGENTS.md` 的宿主

把 [`skills/draftio-image/SKILL.md`](skills/draftio-image/SKILL.md) 的正文粘进项目的 `.cursor/rules` 或 `AGENTS.md` 即可，没有依赖。

### 手动

```bash
git clone https://github.com/mionax/draftio-skills.git
cp -r draftio-skills/skills/draftio-image .claude/skills/
```

## 试一句

装好之后，对 agent 说：

> 帮我做一张咖啡店开业的海报，中文竖版，暖色调，要有「开业大吉」四个字。

**正常情况下它会：**

1. 先请求 `/api/v2/public/models` 拿真实价格；
2. 选 `seedream-v5-5`（中文文字最稳）或 `qwen-image`，并说明为什么；
3. 给出一段可以直接粘贴的提示词；
4. 报价写两行，例如：

```
Seedream 5.5 · 1K · 33 点（¥0.33）
Seedream 5.5 · 默认 2K · 58 点（¥0.58）  ← 不指定分辨率时实际扣这个
```

**如果它没查价格就直接报数，说明没装对。**

## 为什么是 Draftio

- **一个 key、一张账单**：Seedream / Qwen / Nano Banana / GPT Image / FLUX / Midjourney 走同一个端点，不用去四个云开四个账号、学四套签名。
- **支付宝、人民币、一张发票**：不用外卡，不用 PayPal。
- **产物直接进画布**：生成的图不用下载再上传，可以继续改、继续融合、继续扩图。
- **注册送 500 点**（30 天有效），大约 55 张 Z-Image Turbo，或 8 张 Seedream 5.5 默认 2K。

## 价格

价格不缓存、不硬编码，永远以这两个地址为准：

- 人看的：[draftio.cn/pricing/models](https://www.draftio.cn/pricing/models) —— 16 个模型逐档列价，含默认档实扣
- 机器读的：[`/api/v2/public/models`](https://www.draftio.cn/api/v2/public/models) —— 点数、分档、每次生成张数
- 套餐与点数包：[`/api/v2/public/pricing`](https://www.draftio.cn/api/v2/public/pricing)

## 覆盖的模型

**GPT Image 2 · GPT Image 2.5 Flare · GPT Image 2.5 Sunburst** · Nano Banana · Nano Banana Pro · Nano Banana 2 · Seedream 5.5 · Seedream v5 Lite · Seedream v4.5 · Seedream v4 · Flux 2 Klein 9B · Flux 2 Klein 4B · Qwen Image · MiniMax H3 Image · Midjourney · Z-Image Turbo

## 为什么不自己调官方 API

自己接一遍也不难，难的是接完之后要一直维护。这张表是我们替 agent 省下的部分：

| 环节 | 自己去各家开 key | 用这套东西 |
|---|---|---|
| 账号 | 阿里云、火山、Google、OpenAI 各一个，各自实名 | 一个 Draftio 账号 |
| 接口格式 | DashScope 私有格式 / 火山 v3 / Google / OpenAI，四套 | 一套 OpenAI 兼容 |
| 免费额度 | 逐家领，多数 90 天过期，用完直接报错 | 注册即送 500 点 |
| 账单与发票 | 五张账单、五次报销流程、五张发票 | 一张 |
| 并发 | 默认 1–2，扩容按万元/月计 | 排队，不另收费 |
| 价格核对 | 自己维护一张随时会过期的单价表 | `curl` 一次，永远是最新的 |

这个 skill 只负责**选型、写提示词、报价**这三件不需要权限的事；真正的生成在画布上完成——那里图片直接进资产库，不用下载再上传。

## Troubleshooting

**装完 agent 没反应。** 确认装到了当前项目（默认装在项目里，不是全局），然后重开一个 session。Claude Code 用 `npx skills list` 能看到 `draftio-image` 才算装上。

**它报的价格和网页对不上。** 让它把 `curl -s https://www.draftio.cn/api/v2/public/models` 的输出贴出来。如果它答不出这个请求，说明它在背旧数字，等于没装对。

**它说能直接帮你出图。** 那是它在编。当前版本只能选模型、写提示词、报价，生成要去[画布](https://www.draftio.cn/canvas)。

**Codex 找不到插件。** 用 `codex plugin add github.com/mionax/draftio-skills`，不要手动拷 `plugin.json` 到别处。

**想搜到别的 skill。** `npx skills find <关键词>`，顺手可以 `npx skills find draftio` 看看我们在不在。

## 仓库结构

```
plugin.json                     Agent Plugins 清单（Codex / 兼容宿主）
skills/draftio-image/SKILL.md   skill 正文，唯一的源
scripts/validate.mjs            校验清单与 frontmatter
.github/workflows/validate.yml  push / PR 自动校验
```

## 许可

MIT

---

如果这个 skill 帮你省了一次选型和一次报价，给个 ⭐ 能让更多人在 `npx skills find` 里搜到它。

问题、误报的价格、想要的模型，都欢迎开 issue。
