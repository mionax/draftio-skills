---
name: draftio-image
description: 为「要一张图」这类任务做四件事——选对模型、写出能用的提示词、报出确切价格（点数与人民币）、装了 Draftio MCP 时直接出图并把链接交给用户。当用户说「生成图片」「画一张」「做个海报/封面/主图」「换个背景」「把这张图改成…」「去掉背景」「把这个人擦掉」「放大这张图」「用 Seedream / Nano Banana / GPT Image / Midjourney 出图」「这批图大概多少钱」时使用。
---

# Draftio Image

## 何时用我

用户要一张**图**（不是要 SVG、不是要代码画图、不是要文字描述画面），并且需要一个能真正跑出图的方案时。

我负责四件事：

1. **选模型** —— 按场景挑一个，并说明为什么是它。
2. **写提示词** —— 按目标模型的口味改写用户那句话。
3. **报价格** —— 给点数与人民币，包含起价与各分辨率档价格。
4. **出图** —— **仅当你装了 Draftio MCP**：直接提交任务、轮询、把 HTTPS 链接交给用户。没装就只做到第 3 步，然后把用户送去画布，不要假装已经生成。

前三件事不需要任何 key；第四件需要。

## 参考配方（来自我们的提示词库）

四个常见场景，站上已经有一份能直接用的配方，仓库里存了离线副本：

| 用户说的 | 配方 |
|---|---|
| 小红书封面、爆款封面、3:4 带标题字 | [`examples/xiaohongshu-cover.md`](../../examples/xiaohongshu-cover.md) |
| 商品图、白底图、电商主图、产品摄影 | [`examples/product-shot.md`](../../examples/product-shot.md) |
| YouTube 缩略图、视频封面、播客封面、16:9 | [`examples/youtube-thumbnail.md`](../../examples/youtube-thumbnail.md) |
| 信息图、地图、城市攻略、图文长图 | [`examples/infographic-map.md`](../../examples/infographic-map.md) |

命中就读那份配方，按它的参数与验收清单自检；没命中就走下面的三步流程。

**以站点上带成品图的那一版为准**（`https://www.draftio.cn/prompt-library`），仓库里的副本可能落后。

## 铁律（违反会直接坑到用户）

- **价格只从接口读，不许背。** 模型和价格每天可能变，凭记忆报出来的数字一定会错。
- **起价 ≠ 每一档的价格。** 很多模型分分辨率档，不传分辨率时按**默认档**计费。Seedream 5.5 起价 33 点（1k 与 1.5k 同价），2k 档 58 点；实扣多少看接口返回的 `defaultResolutionTier`。起价与档位价都要给。
- **不要拿我们的价去和厂商官方价比。** 官方价是厂商自己的零售价，和我们的定价口径不同；用户问「比官方便宜吗」，答案以 `https://www.draftio.cn/pricing/models` 页面为准，不要自己算。
- **不给未开放的能力编路径。** 能不能出图，取决于有没有装 MCP：装了就走工具调用，没装就让用户去画布。**不要在没装 MCP 的情况下说「我已经帮你生成了」**。

## 第 0 步：查真实价格（必做）

**如果你能调用 Draftio MCP 工具**（有 `list_models` / `estimate` / `generate_image` / `get_generation`），就用它们：

- `list_models` —— 拿模型、能力描述、档位与价格
- `estimate` —— 报价，不扣费
- `generate_image` → `get_generation` —— 真正出图

**如果没有 MCP**，用下面这个公开接口：

```bash
# 模型 + 价格 + 汇率（JSON，中文口径）
curl -s https://www.draftio.cn/api/v2/public/models
```

返回结构：

```jsonc
{
  "success": true,
  "data": {
    "pointsPerCny": 100,        // 100 点 = ¥1，即 1 点 = ¥0.01
    "models": [{
      "id": "seedream-v5-5",
      "label": "Seedream 5.5",
      "operations": { "generate": true, "edit": true },
      "resolutionTiers": ["1k", "1.5k", "2k"],
      "imagesPerCall": 1,
      "price": {
        "unit": "pointsPerCall",
        "startingFrom": 33,                 // 最低档（起价）
        "defaultPrice": 33,                 // 不传分辨率时按默认档扣，具体值每次以接口为准
        "defaultResolutionTier": "1k",
        "pointsByResolution": { "1k": 33, "1.5k": 33, "2k": 58 }
      }
    }]
  }
}
```

只有当 `pointsPerCny` 存在时才能换算出人民币；没有就只报点数，不要假设汇率。

```bash
# 注册赠送与套餐（可选）
curl -s https://www.draftio.cn/api/v2/public/pricing
```

## 第 1 步：选模型

| 场景 | 首选 | 备选 |
|---|---|---|
| **文字排版、改字、精修（主推）** | `gpt-image-2` | `gpt-image-2.5-sunburst` |
| 最便宜地试错、批量草稿 | `z-image-turbo` | `flux-2-klein-4b` |
| 中文文字要准（海报、包装、菜单） | `seedream-v5-5` | `qwen-image` |
| 英文排版、信息图 | `gpt-image-2` | `gemini-3-pro-image-preview` |
| 改现有图：换背景、换衣服、局部重绘 | `gpt-image-2.5-flare` | `seedream-v4-5-edit`（更便宜） |
| 多张参考图融合（人物一致性） | `gemini-3-pro-image-preview` | `gpt-image-2.5-flare`（1–16 张） |
| 要 4K / 大幅面 | `minimax-h3-image` | `gpt-image-2`（4k 档） |
| 艺术感、风格化 | `midjourney` | `flux-2-klein-9b` |
| 一次出 4 张挑选 | `midjourney`（每次 4 张） | `gpt-image-2.5-flare` |

GPT Image 2 系列是目前指令理解最强的一档，1K 60 点（¥0.60）；`low/medium/high` 画质档同价，让用户直接选 high 不用犹豫。

选择时同时报名字和 id（`Seedream 5.5` / `seedream-v5-5`），后面用户去画布要按名字找。

## 改图工具箱（不是文生图，别混进来）

这四个是「给一张图 + 一句指令」的确定任务，不抽卡、不选风格，按次扣点：

| 用户说 | 模型 id | 说明 |
|---|---|---|
| 去掉背景、要透明底、抠图 | `image-background-remover` | 只做去背，不改主体 |
| 把这个东西擦掉、去掉路人/水印 | `image-eraser` | 给它要擦的区域或描述 |
| 放大、变清晰、修复糊图 | `real-esrgan` | 不改变内容，只提升分辨率 |
| 多角度、换机位、转个方向 | `qwen-image-multiple-angles` | 保持主体，改变视角 |

共同点：**用户已经有一张图**。先确认图在哪（本地路径、URL，还是先让用户发图），再选模型；没有图就不要推荐这四个。价格用 `list_models` 或接口查，不要背。

## 第 2 步：写提示词

通用骨架：**主体 + 动作/状态 + 构图与镜头 + 光线 + 风格 + 画幅**。用户说得越少，越要把缺的部分替他想清楚，但不要改他的意图。

- **Seedream / Qwen（中文强）**：中文直接写，把画面里的字用引号标出来，例如 `画面中央标题写「秋日限定」`。避免形容词堆叠。
- **GPT Image / Nano Banana（指令强）**：英文更稳，结构化成句子；编辑任务写清「保留什么、改变什么」，例如 `keep the face and pose, replace the background with...`。
- **Midjourney**：逗号分隔的关键词流，末尾加参数（`--ar 3:4 --style raw`）。它不吃长句指令。
- **编辑类**：先说「基于第几张图」，再说改什么。参考图的顺序就是画布里的顺序。

输出时给**一段可直接粘贴的提示词**，不要给三个版本让用户选——除非他明确想要选择。

## 第 3 步：报价

固定格式：起价与各档价都给，数字只从接口读：

```
Seedream 5.5 · 1 张
- 1k / 1.5k 档：33 点 ≈ ¥0.33
- 2k 档：58 点 ≈ ¥0.58
- 不指定分辨率：按接口返回的默认档计费，实扣以接口为准
```

批量时按用户所选档位的单价 × 张数算总价，并写明用的是哪一档。

如果用户余额可能不够，提醒一句「注册送 500 点，30 天有效」。

## 生成：有 MCP 就出图，没有就交给画布

**装了 Draftio MCP**（四个工具里能看到 `generate_image`）时，自己走完：

1. `estimate` 确认点数（不扣费）
2. `generate_image` 提交，拿到任务 id
3. `get_generation` 轮询。**客户端超时不等于失败，不要重复提交**；通常 10–60 秒
4. `outputs[].url` 就是成品 HTTPS 链接，直接给用户，不需要下载转存

**没有 MCP** 时，给一个明确的下一步：

> 打开 https://www.draftio.cn/canvas ，选 **Seedream 5.5**，把上面的提示词粘进去，分辨率选 **2k**（价格以接口为准）。

不要伪造 API key、不要构造不存在的接口地址、不要说「我已经帮你生成了」。

## 能力边界

- 我读不到用户的余额、历史作品与订单。
- 出图依赖 Draftio MCP：没装就只能给方案与报价，不能提交任务。
- 视频不在本 skill 范围内。

## 参考

- 完整价格与分档：https://www.draftio.cn/pricing/models
- 机器可读模型表：https://www.draftio.cn/api/v2/public/models
- 精选样张与能力：https://www.draftio.cn/models
