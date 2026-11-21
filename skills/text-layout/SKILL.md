---
name: text-layout
description: 做英文文字排版与信息结构类图——英文排版、信息图、缩略图、海报排版、字体层级、YouTube 封面，以及 infographic、layout、typography、thumbnail、grid design 这些检索。负责结构、层级、区块与标签，以及远看可读性验收。
---

# Text Layout（英文排版与信息图）

> 装了 Draftio MCP 就直接出图（`estimate` → `generate_image` → `get_generation`）；没装就只给选型、提示词和验收清单，出图交给画布。

## 何时用我

用我当**版式本身是交付物**：主体可以换，但格子、层级、标签不能乱。

- 英文海报、活动主视觉、Banner、封面排版
- 信息图、城市地图、流程示意、对比图、数据卡
- YouTube 缩略图、播客封面、课程封面（16:9 带大字）
- 用户原话：「排版好看点」「字体层级拉开」「做成信息图」「缩略图看不清字」

别用我（转交）：

- 画面里要有中文、且字必须读对 → [`chinese-poster`](../chinese-poster/SKILL.md)
- 用户已有图，只想改局部 / 去背 / 放大 → [`image-editing`](../image-editing/SKILL.md)
- 只要一张氛围图，没有排版诉求 → [`draftio-image`](../draftio-image/SKILL.md)

中文与英文的边界不是语言洁癖：**中文字形失败率高，需要单独的字数/字号策略**，所以中文走 `chinese-poster`；英文走结构化版式，本 skill 更细。

## 选型

| 情况 | 用什么 | 为什么 |
|---|---|---|
| 默认：英文排版、缩略图、海报 | `gpt-image-2` | 指令理解最强，最守「几块、每块写什么」 |
| 信息图：区块多、标签长 | `gemini-3-pro-image-preview` | 长结构提示词不容易丢块，多参考图融合也好 |
| 已有版式只改字/换图 | `gpt-image-2.5-flare` | 局部编辑，保住网格 |
| 只要风格草稿，文字后加 | `midjourney` | 出图好看，但不吃文字指令；文字留给后期 |

判断顺序：

1. 有明确文字清单 → `gpt-image-2`，不要用 Midjourney 赌。
2. 区块 ≥ 5 个、每块都要标签 → 先 `gpt-image-2`，丢块就换 `gemini-3-pro-image-preview`。
3. 版式已定、只替换内容 → `gpt-image-2.5-flare`，别整张重画。
4. 文字后期要用设计软件叠 → 让模型只出**留白版**，比让它写字更可控。

## 提示词配方

英文结构化提示词用**带标签的行**，一行一个槽位，比散文稳：

```
16:9 infographic poster, editorial flat-design style.
Subject: {主题} — {一句话结论}, arranged as {N} numbered blocks.
Blocks (reading order: top-left → bottom-right):
1. "{label ≤3 words}" — {one short line, ≤12 words}; icon: {简单具象物}
2. ...
3. ...
Typography: headline "{主标题}" in ultra-bold sans-serif, {行数} lines, {占画幅高度}% of frame height; block labels in semibold caps; body text in regular sans, at least 3% of frame height.
Palette: {主色}, {辅色}, {底色} only — no gradients, no neon.
Composition: consistent {8}pt gutter between blocks, equal block widths, 5% safe margin on all edges.
Mood: {干净/技术/温暖}, no decorative clutter, no stock-photo watermarks.
```

四条硬规则：

- **区块数量 ≤ 8**，每块一个标签 + 一句话；超过 8 块一定丢块或串行。
- **标签 ≤ 3 个词**，正文 ≤ 12 个词。用「词数」约束，不用「小一点」。
- 字号用「**占画幅高度 %**」写，模型对百分比的理解远好于「很大 / 中等」。
- 文字一律用英文引号括住，并指定颜色与位置；不指定，模型会把字压在主图上。

缩略图（16:9）额外三条：

- **一个主角**：一张脸或一个物体，别塞两个焦点。
- **主标题 ≤ 8 个词、≤ 2 行**，占画幅高度 30% 以上。
- **对比度优先于精致**：深底亮字或亮底深字，色数 ≤ 3；缩略图不追求细节。

## 参数

- 比例跟渠道走：YouTube / 播客 16:9，信息图竖版 2:3 或 3:4，社媒方图 1:1，长图另行拼接。
- 分辨率：带字的图 **2k 档起**；1k 只验构图。缩略图平台最低 1280×720，建议 2k 上传避免拉伸。
- 报价：先 `estimate`；无 MCP 查 `https://www.draftio.cn/api/v2/public/models`，只报起价与所选定档，不背数字。
- 一次只跑 1 张验版式；要 4 个方向就改「区块顺序 / 主色 / 主体位置」再跑，不要同句重抽。
- 安全边距固定 5%：平台会在角落盖时长、播放键、水印。

## 验收清单

把图缩到 320px 宽（手机列表尺寸）再逐条过：

- [ ] 主标题还能读出 ≥ 3 个词，没有被裁、没有断行成半个词。
- [ ] 文字组数 = 我要求的数量，没有第 5 组自加小字或假 logo。
- [ ] 拼写全对，没有随机字母、重复词、中英混入。
- [ ] 层级成立：**只有一个视觉主角**，其余明显次级。
- [ ] 区块对齐：等宽、等间距、边缘在一条线上。
- [ ] 信息图每块都有标签，没有空格子或空图标。
- [ ] 色数 ≤ 3，没有渐变糊在一起导致字读不出。
- [ ] 四边 5% 安全边距内没有关键文字。

## 返工路径

| 失败 | 先改哪一句 | 还不行 |
|---|---|---|
| 字糊 / 变形 | 主标题缩到 6 词内，补 `ultra-bold condensed sans-serif, clean letterforms` | 换 `gpt-image-2` 4k 档；中文标题转 `chinese-poster` |
| 丢块 / 合并了两块 | 把块数写死并逐行编号，补 `exactly {N} blocks, no extra panels` | 换 `gemini-3-pro-image-preview` |
| 标签跑出格子 | 给每块写「标签在块内左上」，并指定 gutter | 减到 4–5 块 |
| 缩略图远看糊成一团 | 主标题提到 35% 画幅高，删背景细节，色数压到 3 | 换高对比配色重出 |
| 像模板、没有主次 | 删装饰词，只留一个主角 + 一条主标题 | 换 `midjourney` 出风格，再回来重排字 |
| 版式对但内容要换 | 不动提示词，用 `gpt-image-2.5-flare` 只替换文字/图 | — |

出图入口：https://www.draftio.cn/canvas 。本 skill 只给判断与顺序，模型清单与价格以接口返回为准。
