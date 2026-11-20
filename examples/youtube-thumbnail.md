# 视频封面 / YouTube 缩略图

横版封面的唯一 KPI 是**在 320px 宽的视频列表里被点开**。所以判断标准很粗暴：把图缩到手机大小，标题还认得出吗？认不出，再精致也是废图。撕裂纸拼贴那套配方之所以有效，是因为它把画面压成三块高对比色域 + 一条超粗字，天生抗压缩。

## 何时用

用户这样说时用：

- 「做个 YouTube 缩略图」「视频封面」「播客封面」
- 「16:9 的封面图」「横版封面」
- 「要有大字标题」「字要大到手机上能看清」
- 「访谈/对谈节目的封面」「这期播客要个封面」
- 「封面太素了，要更有冲击力」

不该用：

- 小红书 / 抖音竖版封面（3:4 或 9:16），走 `xiaohongshu-cover`。
- 只要一张氛围底图、字后期自己排——直接 `draftio-image` 出图。
- 需要 8 个以上文字元素（价格表、嘉宾列表），横版封面放不下，改做信息图。

## 选型

| 场景 | 模型 id | 点数 | 为什么 |
|---|---|---|---|
| 默认：大字排版 + 撕裂纸拼贴 | `gpt-image-2` | 60（1k）/ 80（默认 2k）/ 120（4k） | 英文超粗压缩字体最准，能控字位和大小 |
| 中文标题字为主 | `seedream-v5-5` | 33（1k）/ 58（默认 2k） | 中文字形最稳，支持改图 |
| 一次出 4 张挑 | `midjourney` | 173（一次 4 张） | 风格化最猛，但**不能改图、文字基本靠运气** |
| 主标题要更“编辑感” | `gpt-image-2.5-sunburst` | 71 / 80 / 120 | 同族模型，版式更硬朗 |

默认 `gpt-image-2` 2k 档（80 点 ≈ ¥0.80）。封面是**一次性的流量入口**，为省 20 点点数去赌文字，通常要多花三四轮才是真亏。`midjourney` 只在“先看看哪种拼贴风格对味”时用，且要接受它的字不可用——出图后必须转到 `gpt-image-2.5-flare`（60/80/120，支持改图）重排文字。

## 提示词配方

库里那条配方的有效部分是四件事：**人物处理成黑白剪影 → 撕裂纸拼贴底 → 三色限制（绯红/黑/白）→ 超粗压缩无衬线字**。其余的宣传话术全删掉。

```
A striking 16:9 video thumbnail for {节目类型}, editorial and high-impact.
Main subject: the person in image 1, converted into a high-contrast black-and-white cutout, {姿态：半侧身/正面}, positioned {左/右} of frame, occupying {占比} of the width.
Background: bold torn-paper collage, limited palette of crimson red, black and off-white, with visible paper grain, deckled torn edges and halftone dots.
Typography: ultra-bold condensed sans-serif, headline "{主标题}" in {字色} on the {位置}, {行数} lines, {占画幅高度}% of the frame height.
Secondary text: "{副标题}" small caps under the headline; "{节目名 / 期号}" bottom-left; "{账号 handle}" bottom-right.
Composition: sharp diagonal split between the red and black zones, subject's face unobstructed, generous margin on all edges.
Mood: premium business podcast, serious and intelligent, not corporate minimalism, no decorative clutter.
```

硬规则：

- **文字最多 4 组**：主标题、副标题、节目名、handle。第 5 组一定糊。
- **主标题 ≤ 8 个英文词 / ≤ 10 个汉字**，最多两行。字号用“占画幅高度 %”描述，比“很大”有效。
- 文字用引号括起来，并指定**颜色与位置**；不指定，模型会把字压在人脸上。
- 人物走 i2i（图 1 = 人像照），写 `keep the facial features, hairstyle and expression, convert only to high-contrast black-and-white cutout`。不锁这句，人脸会换人。
- 三色之外不加色。多一个颜色就从“高级访谈”掉到“营销海报”。
- 安全边距留 5%：平台角落会盖时长角标和播放按钮。

填好的例子（`gpt-image-2`，2k 档 80 点，i2i）：

```
A striking 16:9 video thumbnail for a business interview podcast, editorial and high-impact.
Main subject: the person in image 1, converted into a high-contrast black-and-white cutout, three-quarter pose looking at camera, positioned right of frame, occupying 45% of the width.
Background: bold torn-paper collage, limited palette of crimson red, black and off-white, with visible paper grain, deckled torn edges and halftone dots.
Typography: ultra-bold condensed sans-serif, headline "THE COST OF SPEED" in off-white on the left, two lines, 34% of the frame height.
Secondary text: "EP. 47 — scaling without breaking" small caps under the headline; "THE LONG GAME" bottom-left; "@longgame" bottom-right.
Composition: sharp diagonal split between the red and black zones, subject's face unobstructed, generous margin on all edges.
Mood: premium business podcast, serious and intelligent, not corporate minimalism, no decorative clutter.
```

## 参数

- **比例必须 16:9**。YouTube 缩略图建议出 2k 档以上，1280×720 是平台最低要求，2k 上传后不会被拉伸。
- **档位**：`gpt-image-2` 1k 60 点 / 默认 2k 80 点 / 4k 120 点。
- **i2i 顺序**：人像放图 1，若有品牌元素/旧封面放图 2；顺序就是提示词里说的“第几张”。
- **`midjourney`**：173 点一次 4 张，只出图不能改图，末尾加 `--ar 16:9`；挑中的那张再用 `gpt-image-2.5-flare` 重排文字。
- **张数**：同一条提示词一次出 1–2 张；要 4 张不同版式，改“左/右主体 + 红黑比例”再跑。
- 1 点 ≈ ¥0.01，1000 点 = ¥10；注册送 500 点，30 天有效。

## 验收清单

- [ ] 缩到 320px 宽（手机列表大小）看：主标题至少 3 个词 / 4 个字还认得出。
- [ ] 人脸完整且没被字压：眼睛、鼻子、嘴都在，没有被标题或色块切断。
- [ ] 文字组数 ≤ 4，没有第 5 组自作多情的小字、假 logo、假期号。
- [ ] 颜色 ≤ 3 种：绯红、黑、米白；出现蓝紫渐变就是走偏了。
- [ ] 撕裂边缘有纸质感：能看出毛边和纸纹，不是矢量锯齿。
- [ ] 上下左右各留 5% 安全边距，角落没放关键文字。

## 返工路径

| 典型失败 | 改哪一句 | 换哪个模型 |
|---|---|---|
| 标题糊 / 缺笔 / 变乱码 | 标题缩到 6 词以内，补 `ultra-bold condensed sans-serif, clean letterforms` | 中文标题换 `seedream-v5-5`（58 点）；英文仍错就 `gpt-image-2` 4k 档（120 点） |
| 换了个人 / 脸不像 | 补 `keep the facial features, hairstyle and expression from image 1` | 改图走 `gpt-image-2.5-flare`（80 点） |
| 画面太花、像营销海报 | 把调色板锁成 `crimson red, black and off-white only`，删所有装饰词 | 保持 `gpt-image-2` |
| 字全堆在人脸上 | 明写 `headline on the left, subject on the right, face unobstructed` | 不用换 |
| 想要 4 个方向一次看完 | 用 `midjourney` 出拼贴风格，选定后转 `gpt-image-2.5-flare` 重排字 | `midjourney` 173（4 张）→ `gpt-image-2.5-flare` |

出图在 https://www.draftio.cn/canvas 完成：选模型 → 粘提示词 → 上传人像 → 选 16:9 → 提交。本 skill 只负责选型、提示词和报价，不承诺直接出图。

完整可调参数的模板见 https://www.draftio.cn/prompt-library/c7cee65b-f413-4705-885e-2915b465e986
