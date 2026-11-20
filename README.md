# Draftio Skills

Agent skills for AI image generation by [Draftio](https://www.draftio.cn) — pick the right model, write the prompt in that model's dialect, and quote the exact price before anything is generated.

```bash
npx skills add mionax/draftio-skills
```

One command, no API key, no sign-up. Works in Claude Code, Codex, Cursor, and any agent that reads `SKILL.md`.

---

## What it does

Ask your agent for an image and it usually does three things wrong: picks a model at random, writes one prompt for every model, and quotes a price it made up. This skill fixes all three.

| Step | What the skill does |
|---|---|
| **Pick** | Reads the live catalog and maps your intent (photo, poster, Chinese text, edit, 4-up, 4K) to a model that actually does it |
| **Write** | Writes in the model's own dialect: prose for Seedream/Qwen, structured English for GPT Image, keyword stream + `--ar` for Midjourney |
| **Quote** | Fetches real prices and gives you **two** numbers: the cheapest tier and what you will actually be charged when you don't pick a resolution |

The price part is the point. Most models price by resolution, and the default tier is often not the cheapest one — Seedream 5.5 is 33 points at 1K but 58 points at its default 2K. A single "from 33 points" quote is a lie by omission.

## What it doesn't do

- It does not generate images by itself. It hands you a ready-to-paste prompt and a model, and you generate on the [canvas](https://www.draftio.cn/canvas).
- It cannot read your balance or your generation history.
- It does not cover video yet.

API key + hosted MCP are in progress. When they ship, this skill gains a second half: submit, poll, and return the image.

## Install

**Claude Code**

```bash
npx skills add mionax/draftio-skills
```

**Codex**

```bash
codex plugin add github.com/mionax/draftio-skills
```

**Cursor / any agent with an `AGENTS.md`**

Copy [`skills/draftio-image/SKILL.md`](skills/draftio-image/SKILL.md) into your project and reference it from `AGENTS.md`.

**Manual**

```bash
git clone https://github.com/mionax/draftio-skills
cp -r draftio-skills/skills/draftio-image .claude/skills/
```

## Try it

> 帮我做一张咖啡店开业海报，中文，竖版。

A correct run looks like this:

```
模型：Seedream 5.5（中文文字渲染最稳）
最低档：33 点 · ¥0.33（1K）
默认档：58 点 · ¥0.58（2K）— 不指定分辨率时按这个扣

提示词：
咖啡店开业海报，竖版 3:4。画面中央是一杯拉花拿铁，…
```

If it quotes one number, or quotes a price without fetching the API, the skill did not load.

## Why Draftio

- **One key, one bill.** Seedream, Qwen, Z-Image, MiniMax, Nano Banana, GPT Image, FLUX, Midjourney — same account, same page.
- **Alipay and CNY.** No foreign card, no company card required.
- **Output lands in the canvas.** Not a download link that expires in an hour — you can keep editing the image you just made.

New accounts get 500 free points (30 days). That is 55 Z-Image Turbo images, or about 8 Seedream 5.5 images at 1K.

## Pricing

Prices change. This repo does not cache them on purpose.

- Per-model, per-tier table: <https://www.draftio.cn/pricing/models>
- Machine-readable JSON: <https://www.draftio.cn/api/v2/public/models>
- Plans and point packages: <https://www.draftio.cn/api/v2/public/pricing>

The skill reads these endpoints at runtime, so a quote is never older than the catalog.

## Model coverage

Image: Seedream 5.5 / v5 Lite / v4.5 / v4, Nano Banana / Pro / 2, GPT Image 2 / 2.5 Flare / 2.5 Sunburst, FLUX 2 Klein 4B / 9B, Qwen Image, Z-Image Turbo, MiniMax H3 Image, Midjourney.

## Repo layout

```
plugin.json                     agent plugin manifest
skills/draftio-image/SKILL.md   the skill itself
```

## License

MIT — fork it, translate it, ship it in your own agent.
