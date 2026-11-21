# 商品图 / 白底图 / 电商主图

商品图的成败不在“好看”，在**可信**：材质要经得起放大看，光要只有一个方向，背景要能被平台规则接受（白底图尤其）。这张 SKILL 把产品库里的英文产品摄影配方压成可填空的三段式，你只需要换主语。

## 何时用

用户这样说时用：

- 「做张商品图」「产品图」「电商主图」
- 「白底图」「要纯白背景的」「平台要求白底」
- 「产品摄影」「把产品拍得高级一点」
- 「这个产品放到场景里拍」「详情页配图」
- 「实拍图太脏了，重做一张干净的」

不该用：

- 要人物出镜、模特穿搭（人物一致性走别处）。
- 要带中文卖点大字的海报——先按本 skill 出干净底图，再转 `seedream-v5-5` 加字。
- 只要插画/3D 图标，不要真实摄影质感。

## 选型

| 场景 | 模型 id | 点数 | 为什么 |
|---|---|---|---|
| 默认：真实感商品图 | `gpt-image-2` | 60（1k）/ 80（2k）/ 120（4k） | 英文产品摄影配方最稳，材质与光影像真实拍摄 |
| 图上有中文卖点字 | `seedream-v5-5` | 33（1k、1.5k）/ 58（2k） | 中文文字最准，改图也支持 |
| 9 点试构图、试背景色 | `z-image-turbo` | 9 | 最便宜，一次 4 张才 36 点；只定方向，不看细节 |
| 把实拍产品放进新场景 | `gpt-image-2.5-flare` | 60 / 80 / 120 | 支持改图，能锁住产品本体只换环境 |
| 极简白底、只要一张 | `qwen-image` | 35 | 便宜，支持改图，质感略平 |

建议就走 `gpt-image-2` 的 2k 档（80 点 ≈ ¥0.80）。商品图是**长期资产**，主图会挂在详情页几个月，省 20 点换来材质糊掉不值。只有“先看三种背景哪个对”才用 `z-image-turbo`。

## 提示词配方

产品库那条配方的结构值得照抄：**产品形态 → 表面质地 → 边缘瑕疵 → 背景一个颜色 → 一种投影 → 一处前景虚化 → 负空间留给文字 → 光线 → 情绪**。少写任何一段，出来的就是塑料 CG。

```
Ultra-realistic product photography of {产品与规格}, styled with a clean, modern premium aesthetic.
The {主体} is {颜色} and {材质}, {形态细节：厚薄/层次/卷曲/垂坠}, with {表面质地：颗粒/水珠/织纹/粉末}.
The {容器或配件} has {质地}, with slightly uneven edges for an artisanal feel.
Background: {背景色}, with natural sunlight casting subtle {投影形状} shadows, creating a calm, organic atmosphere.
Include softly blurred {前景元素} in the foreground for depth.
The composition is minimal and balanced, using negative space on the {上/左/右} for {文字区}.
Lighting: soft natural daylight, warm highlights on {高光位置}, shallow depth of field, high-end commercial {品类} photography.
Mood: fresh, premium, modern, and inviting.
```

硬规则：

- **质地要写三层**：本体形态 + 表面颗粒 + 边缘不完美（`slightly uneven edges`、`natural imperfections`）。只写 “high quality” 一定出假图。
- **背景最多三件东西**：一个底色、一种投影、一处虚化前景。加到四件就变杂货铺。
- **投影必须给形状**：`leaf shadows`、`window frame shadows`、`soft contact shadow`。没写方向，模型会给两三个光源。
- **文字区要指定位置和占比**：`negative space on the upper third`，否则主体居中顶满，后期没地方放卖点。
- 英文配方给 `gpt-image-2`；`seedream-v5-5` 要改写成中文句子，并把卖点字用引号括起来。

填好的例子（`gpt-image-2`，2k 档 80 点）：

```
Ultra-realistic product photography of a 30ml amber glass serum bottle with a matte black dropper cap, styled with a clean, modern premium aesthetic.
The bottle is warm amber and glossy, a straight-shouldered cylinder with a thick base, with a faint golden liquid line visible through the glass.
The dropper cap has a soft-touch matte finish, with slightly uneven edges for an artisanal feel.
Background: soft warm beige, with natural sunlight casting subtle window-frame shadows, creating a calm, organic atmosphere.
Include softly blurred eucalyptus leaves in the foreground for depth.
The composition is minimal and balanced, using negative space on the right third for headline text.
Lighting: soft natural daylight from the left, warm highlights on the bottle shoulder, shallow depth of field, high-end commercial skincare photography.
Mood: fresh, premium, modern, and inviting.
```

白底图单独加这一段（别另写一套配方）：

```
Seamless pure white background (#FFFFFF), no horizon line, no gradient, no props, only a soft contact shadow directly under the product.
```

## 参数

- **比例**：电商主图 **1:1**；竖版详情页 **3:4**；横版 banner **16:9**。别用奇怪比例，平台会二次裁切。
- **档位**：`gpt-image-2` 1k 60 点 / 2k 80 点 / 4k 120 点。**不选分辨率按接口返回的默认档计费**（以接口为准），报价必须说清档位。
- **草稿**：`z-image-turbo` 9 点/张，一次 4 张 36 点 ≈ ¥0.36，只用来比背景色和构图。
- **改图**：`gpt-image-2.5-flare` 60/80/120；把实拍图放图 1，写 `keep the product shape, label and material exactly, replace only the background with…`。
- **张数**：一次 1–2 张。要第 2 张只换一句（换背景色或换光位），不要整段重写。
- 1 点 ≈ ¥0.01，1000 点 = ¥10；注册送 500 点，30 天有效。

## 验收清单

- [ ] 缩到 400px 宽看，材质还认得出：玻璃有反光、织物有纹、食物有颗粒。
- [ ] 只有**一个**主光方向：高光和投影在同一侧，没有两个影子打架。
- [ ] 产品完整：瓶口、杯沿、包装边角都没被画幅切掉，也没有多出一只瓶/一根管。
- [ ] 白底图是 `#FFFFFF` 级纯白：没有灰渐变、没有地平线、没有残留道具。
- [ ] 标签上的字是对的：没有凭空长出的英文、错字、假 logo；品牌名必须逐字核对。
- [ ] 文字区真的空着：要放卖点的位置没有高光、纹理、投影穿过。

## 返工路径

| 典型失败 | 改哪一句 | 换哪个模型 |
|---|---|---|
| 像 CG / 塑料感 | 补 `surface texture`、`natural imperfections`、`slightly uneven edges` 三段质地 | 保持 `gpt-image-2`；仍假就用 `gpt-image-2.5-flare` 拿真图当参考 |
| 白底发灰、有地平线 | 加 `seamless pure white #FFFFFF, no gradient, no horizon line` | `gpt-image-2` 4k 档（120 点），边缘更干净 |
| 主体顶满 / 没地方放字 | 把 `minimal and balanced` 改成明写 `negative space on the {方向}` | 不用换 |
| 出现了多余道具、背景杂 | 背景三件砍到一件，删掉所有 `props` 描述 | `qwen-image`（35 点）出极简版 |
| 中文卖点字缺笔 | 先出无字底图，再用 `seedream-v5-5` 加字 | `seedream-v5-5`（2k 档 58 点） |

出图在 https://www.draftio.cn/canvas 完成：选模型 → 粘提示词 → 选分辨率 → 提交。本 skill 只负责选型、提示词和报价，不承诺直接出图。

完整可调参数的模板见 https://www.draftio.cn/prompt-library/8bf1ca74-6998-44aa-8dd9-fa0415ca6cb2
