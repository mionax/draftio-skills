# README 成品图

本目录的 4 张图**全部由 Draftio 自己的生产接口**（`POST /api/v2/generations`，API key 通道）真实生成，
不是占位图，也没有后期修图或改字。

统一参数：

| 项 | 值 |
|---|---|
| 模型 | `gpt-image-2`（GPT Image 2） |
| 分辨率档 | `1k` |
| 点数 | 60 点/张（`/api/v2/public/models` 的 `pointsByResolution["1k"]`） |
| 生成日期 | 2026-11-21 |
| 合计 | 4 张 · 240 点 |

| 文件 | 宽高比 / 像素 | 大小 | 模型 · 档位 · 点数 | 画面 |
|---|---|---|---|---|
| `xiaohongshu-cover.png` | 3:4 · 1086×1448 | 2.2 MB | gpt-image-2 · 1k · 60 点 | 小红书封面：晨光窗边手冲咖啡的女生，主标题「3分钟在家做手冲」、副标题「新手也能一次成功」、右下角「收藏这篇就够了」，中文全部正常 |
| `product-shot.png` | 1:1 · 1254×1254 | 1.5 MB | gpt-image-2 · 1k · 60 点 | 电商白底商品图：磨砂玻璃瓶冷萃咖啡液，极简黑色标签，柔和产品光与淡阴影，商业级质感 |
| `youtube-thumbnail.png` | 16:9 · 1672×941 | 1.8 MB | gpt-image-2 · 1k · 60 点 | YouTube 缩略图：左侧惊讶表情男生，右侧黄黑撞色粗体「我用 AI 做了 100 张图」，描边＋阴影，远看清晰 |
| `infographic.png` | 3:4 · 1086×1448 | 3.0 MB | gpt-image-2 · 1k · 60 点 | 城市美食信息图：标题「成都吃什么」，四格手绘插画（担担面／钟水饺／龙抄手／冰粉）配中文短说明，米色纸质背景＋细线分隔 |

## Prompt 摘要

1. **小红书封面** — 女生窗边冲手冲咖啡，晨光侧逆光暖色调；上方大标题「3分钟在家做手冲」＋副标题「新手也能一次成功」，粗黑体白字带轻微投影；右下角「收藏这篇就够了」；干净留白、有生活感、无水印。
2. **商品图** — 磨砂玻璃瓶冷萃咖啡液，极简黑色标签，居中，纯白背景，柔和产品摄影光，底部极淡自然阴影，商业级质感，不要文字与水印。
3. **YouTube 缩略图** — 左侧惊讶表情年轻男性半身像，右侧大号粗体「我用 AI 做了 100 张图」，黄黑撞色背景，文字描边＋阴影，高对比度、远看清晰、无水印。
4. **信息图** — 「成都吃什么」3:4 竖版，四个区块各一个手绘小吃插画（担担面、钟水饺、龙抄手、冰粉）配中文短标签，米色纸质背景，编辑排版风格，区块间细线分隔，文字清晰可读。

## 复现方式

```bash
# 1. 在设置页建一把 dk_live_ key（按量付费通道，不查套餐）
# 2. 提交（featureId 必须与 model 对应；参数放在 intent 里）
curl -X POST https://www.draftio.cn/api/v2/generations \
  -H "Authorization: Bearer dk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "featureId": "ai.image.gpt-image-2",
      "model": "gpt-image-2",
      "generationType": "image",
      "intent": {
        "kind": "image",
        "model": "gpt-image-2",
        "prompt": "…",
        "aspectRatio": "3:4",
        "resolutionTier": "1k"
      }
    }
  }'
# 3. 轮询 GET /api/v2/generations/<event_id>
#    等 status=success 且 deliveryStatus=ready（归档 worker 落 storage 后 url 才有值）
```
