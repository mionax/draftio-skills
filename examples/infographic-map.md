# 信息图 / 城市美食地图

信息图翻车极少是画风问题，八成是**数量和文字**：说 6 个地标出了 9 个，编号从 3 跳到 6，图例里的蓝线在图上找不到。产品库那条成都配方能出对，靠的不是形容词，而是把 `count` 和 `labels` 逐条写进 JSON。这份 skill 把它拆成可填空的骨架。

## 何时用

用户这样说时用：

- 「做张信息图」「手绘地图」「美食地图」「城市攻略图」
- 「图文长图」「一图看完 N 个地方」「攻略封面图」
- 「把成都/西安/长沙的店标在地图上」「要有一二三四编号」「右下角加图例」

不该用：

- 只要一张不带标注的风景照/宣传海报，或要真实地理位置（经纬度、比例尺、能导航）——生成的是示意地图，位置是编的。
- 标签总数超过 20 条：一张图塞不下，拆成两张同版式的图。

## 选型

| 场景 | 模型 id | 点数 | 为什么 |
|---|---|---|---|
| 默认：结构化排版的插画地图 | `gpt-image-2` | 60 / 2K 80 | 原配方的母模型，按 JSON 落版最稳，编号与图例容易对上 |
| 要印刷、要放大看细节 | `gpt-image-2` 4K 档 / `minimax-h3-image` 4K 档 | 120 / 156 | 标签字更清楚；4K 单价最高，定稿再上 |
| 中文标签为主、画风干净 | `seedream-v5-5` | 33 / 默认 2K 58 | 中文字形稳，比默认档低一截 |
| 已有一版，只改字/改点位 | `seedream-v4-edit` / `seedream-v4-5-edit` | 34 / 45 | 改图专型，省一次整张重生成 |
| 先比水彩/扁平/复古画风（不看字） | `z-image-turbo` | 9 | 最便宜，一次 4 张 36 点；文字一定不能用 |
| 想换落字或平面感 | `nano-banana-2` / `gpt-image-2.5-sunburst` / `gemini-3-pro-image-preview` | 60·80 / 71·80 / 70·85 | 备选，按落字稳和设计稿感挑 |
| 只要氛围，不控数量 | `midjourney` | 173（每次 4 张） | 不支持改图，也控不住 count |

## 提示词配方

核心是**用 JSON 写提示词**，把版式拆成 `title_section` / `border` / `layout.sections` / `centerpiece` / `bottom_right_extras` 五块。骨架照下面填，别改回散文：

```json
{
  "type": "illustrated map infographic",
  "style": "{watercolor and ink hand-drawn illustration on vintage parchment / flat vector / risograph}",
  "title_section": { "text": "{城市} {副标题，如 吃货暴走地图}", "mascot": "{吉祥物，如 cartoon red chili pepper wearing sunglasses}" },
  "border": "{边框装饰，如 vine of green leaves and red chili peppers}",
  "layout": {
    "background": "textured beige parchment paper with yellow roads, blue rivers, and green park areas",
    "sections": [
      { "title": "landmarks", "count": 6, "illustrations": ["{地标外形1}", "{… 补到 6 条}"], "labels": ["{地标1}", "{… 补到 6 条}"] },
      { "title": "food_spots", "count": 12, "illustrations": ["{菜品1}", "{… 补到 12 条}"], "labels": ["1 {店名}", "2 {店名}", "… 补齐到 12 条"] },
      { "title": "图例", "position": "bottom-right", "count": 5, "items": ["red dot", "green house", "green tree", "blue line", "yellow double line"], "labels": ["美食地点", "地标景点", "公园绿地", "河流湖泊", "主要道路"] }
    ],
    "centerpiece": "{中心视觉锚点}", "bottom_right_extras": ["vintage compass rose with N, S, E, W", "disclaimer text '温馨提示：…'"]
  }
}
```

硬规则：

- **`count` 必须等于 `labels` 长度**，也等于 `illustrations` 长度。写 12 就真列 12 条，不许出现 “several”“various”。
- **编号自己写进 label**（`"3 春熙路"`）。让模型自己排序，一定跳号或出现两个 4。
- **`illustrations` 与 `labels` 一一对应**：配方里每个地名都配了具体物象（`mapo tofu`、`covered tea bowl`），这是它比普通 prompt 稳的原因。
- **图例 4–5 项**，每项都要在 `layout` 里真实出现过；标签总数 ≤ 18（6 地标 + 12 点位已是上限）。**只写一种画风 + 一套配色**，别写 “accurate geography”“real street layout”，写了反而出乱线。

填好的缩版例子（`gpt-image-2`，2K 档 80 点，6 地标 + 8 点位）：

```json
{
  "type": "illustrated map infographic",
  "style": "watercolor and ink hand-drawn illustration on vintage parchment",
  "title_section": { "text": "成都 吃货暴走地图", "mascot": "cartoon red chili pepper wearing sunglasses and giving a thumbs up" },
  "border": "vine of green leaves and red chili peppers",
  "layout": {
    "background": "textured beige parchment paper with yellow roads, blue rivers, and green park areas",
    "sections": [
      { "title": "landmarks", "count": 6, "illustrations": ["traditional pavilion", "traditional monastery", "modern skyscraper with climbing panda", "tall TV tower", "traditional gate", "industrial buildings"], "labels": ["人民公园", "文殊院", "IFS", "339电视塔", "宽窄巷子", "东郊记忆"] },
      { "title": "food_spots", "count": 8, "illustrations": ["mapo tofu", "dumplings in chili oil", "sticky rice balls", "egg baking cake", "nine-grid hotpot", "sweet potato noodles", "cold skewers", "covered tea bowl"], "labels": ["1 陈麻婆豆腐", "2 钟水饺", "3 宽窄巷子·三大炮", "4 建设路·叶婆婆蛋烘糕", "5 玉林路·小龙坎火锅", "6 香香巷·肥肠粉", "7 武侯祠大街·钵钵鸡", "8 人民公园·鹤鸣茶社"] },
      { "title": "图例", "position": "bottom-right", "count": 4, "items": ["red dot", "green house", "blue line", "yellow double line"], "labels": ["美食地点", "地标景点", "河流湖泊", "主要道路"] }
    ],
    "centerpiece": "giant panda sitting and eating bamboo", "bottom_right_extras": ["vintage compass rose with N, S, E, W", "disclaimer text '温馨提示：吃辣需谨慎，肠胃要保护~'"]
  }
}
```

## 参数

- **比例**：城市攻略长图 **3:4 或 9:16**；单页信息图 **4:3 / 1:1**。别长过 9:16，再长字号被压到不可读。
- **档位**：首选 `gpt-image-2` 60 点（基础）/ 80 点（2K，默认档，不选就是它）。标签 ≥10 条直接报 80 点。
- **备选价**：`seedream-v5-5` 33 / 58（2K）；`nano-banana-2` 60 / 80；`gpt-image-2.5-flare` 60 / 80；`gpt-image-2.5-sunburst` 71 / 80；`gemini-3-pro-image-preview` 70 / 85；`minimax-h3-image` 52；`seedream-v5-lite` 61；`qwen-image` 35；`gemini-2.5-flash-image` 30；`flux-2-klein-9b` 18；`flux-2-klein-4b` 14。
- **改图与草稿**：`seedream-v4-edit` 34 / `seedream-v4-5-edit` 45 拿原图只改那几个 label；`z-image-turbo` 9 点/张（不支持改图）先定画风，结构过了再出同版式其他城市。
- 1000 点 = ¥10（1 点 ≈ ¥0.01）。报价要说清是 60 点基础档还是 80 点 2K 档。

## 验收清单

- [ ] 点位与编号：红点/编号数量 = `count`，1→2→3 不跳号、不重复、没有两个 4。
- [ ] 图例对得上：图例每个符号图上都能找到，图上也没有图例外的符号。
- [ ] 标签可读：每个地名都没糊、没断笔、没乱码；缩到 50% 仍认得出。
- [ ] 版面干净：标题没压在地标上，道路河流没横切标签文字。

## 返工路径

| 典型失败 | 改哪一句 | 换哪个模型 |
|---|---|---|
| 点位数量不对 | 补 `"count": N`，把 `labels` 和 `illustrations` 逐条列全 | 保持 `gpt-image-2` |
| 编号跳号/重复 | 把编号写进 label 字符串，别让模型排序 | 仍错就改 `nano-banana-2`（80 点） |
| 中文标签糊成乱码 | 标签砍到 8 条内，style 里加 `legible hand-lettered labels` | `seedream-v5-5`（58 点） |
| 图例和画面对不上 | 图例缩到 4 项，只留画面上真实存在的符号 | 不用换 |
| 只差几个字/一个点位 | 别整张重生成，拿原图改 | `seedream-v4-edit` 34 / `seedream-v4-5-edit` 45 |

出图在 https://www.draftio.cn/canvas 完成：选模型 → 粘 JSON → 选比例与档位 → 提交。本 skill 只负责选型、提示词和报价，不承诺直接出图。

配方来源：产品库「城市美食地图信息图」条目 https://www.draftio.cn/prompt-library/6c905604 （原文为成都版，6 地标 + 12 点位 + 5 项图例），本 skill 在其结构上改写，补了选型与返工路径。
