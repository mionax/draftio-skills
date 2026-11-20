# Draftio Skills

[中文](README.md) · **English**

An image-generation skill for coding agents: **pick the right model, write the prompt in that model's dialect, and quote the exact price.**

No API key, no sign-up. Image generation itself happens in the [Draftio canvas](https://www.draftio.cn/canvas).

```bash
npx skills add mionax/draftio-skills
```

---

## What it does

| | What | Why it matters |
|---|---|---|
| **Picks a model** | Recommends one primary and one fallback for your case: Chinese posters, English typography, edits, multi-reference fusion, 4K, artistic | 16 models have different limits; picking wrong means paying to redo it |
| **Writes the prompt** | In the model's own dialect: Seedream/Qwen take Chinese directly, GPT Image/Nano Banana want structured English, Midjourney wants comma keywords plus `--ar` | The same request needs a different prompt per model; the wrong one produces disposable images |
| **Quotes the price** | Always gives the **cheapest tier** and the **default-tier charge**, with totals for batches | Starting price is not what you pay. Seedream 5.5 starts at 33 points but charges 58 points when you don't pick a resolution — a 76% gap |

Prices are never hardcoded. Every run reads them from the public endpoint:

```bash
curl -s https://www.draftio.cn/api/v2/public/models
```

So new models and price changes can't leave the skill quoting stale numbers.

## Start here: GPT Image 2 series

For text, layout, letter edits and retouching — the things that produce the most wasted generations — go straight to GPT Image 2. Best-in-class instruction following, and our pricing is low:

| Model | Best for | 1K | 2K | 4K |
|---|---|---|---|---|
| **GPT Image 2** | Strongest instruction following: complex layout, text edits, retouching | ¥0.60 (60 pts) | ¥0.80 (80 pts) | ¥1.20 (120 pts) |
| **GPT Image 2.5 Flare** | Fast tier: everyday edits and quick iteration | ¥0.60 | ¥0.80 | ¥1.20 |
| **GPT Image 2.5 Sunburst** | High tier: commercial retouching and fine detail | ¥0.71 (71 pts) | ¥0.80 | ¥1.20 |

Two things you may not hear elsewhere:

- **Quality tiers are free.** `low / medium / high` bill identically. Picking high costs the same as low.
- **Editing is complete.** 1–16 reference images on the 2.5 models — text edits, background swaps and multi-image blending in one pass.

For reference: OpenAI's high-quality 1024×1024 tier is about $0.211 per image (~¥1.5). We charge ¥0.60 at 1K.

## What it doesn't do

- **It does not generate images.** Generation happens in the canvas. API keys and the MCP server are still in development, so an agent can't submit jobs yet.
- It can't read your balance or your history.
- No video models — 16 image models only, for now.

These limits are stated plainly so the agent doesn't overpromise on our behalf.

## Scenarios

The entry skill works out what you are making, then hands off to a scenario recipe. Every recipe is **derived from a template that already runs in Draftio's prompt library** — not invented for this repo.

| Scenario | What you might say | First pick |
|---|---|---|
| [Xiaohongshu cover](skills/draftio-image/xiaohongshu-cover/SKILL.md) | "Make me an Xiaohongshu cover", "3:4 with a big title" | `gpt-image-2` · from 60 pts |
| [Product shot / white background](skills/draftio-image/product-shot/SKILL.md) | "Make this product look premium", "white-background hero image" | `gpt-image-2` · from 60 pts |
| [Video thumbnail](skills/draftio-image/youtube-thumbnail/SKILL.md) | "YouTube thumbnail", "podcast cover, 16:9" | `gpt-image-2` · from 60 pts |
| [Infographic / map](skills/draftio-image/infographic-map/SKILL.md) | "City food map", "long-form infographic" | `gpt-image-2` · from 60 pts |

Each recipe covers: when to use it, which models to pick, a fill-in-the-blanks prompt template, parameters (aspect ratio, resolution, count), an acceptance checklist, and what to change when the first attempt misses.

Want the full knobs? The underlying templates live in [prompt-library](https://www.draftio.cn/prompt-library).

## Install

### Claude Code

```bash
npx skills add mionax/draftio-skills
```

### Codex

```bash
codex plugin add github.com/mionax/draftio-skills
```

### Cursor / any host with `AGENTS.md`

Paste the body of [`skills/draftio-image/SKILL.md`](skills/draftio-image/SKILL.md) into your project's `.cursor/rules` or `AGENTS.md`. No dependencies.

### Manual

```bash
git clone https://github.com/mionax/draftio-skills.git
cp -r draftio-skills/skills/draftio-image .claude/skills/
```

## Try one prompt

After installing, ask your agent:

> Make a poster for a coffee shop opening — vertical Chinese layout, warm tones, with the words "开业大吉".

**What a correct run looks like:**

1. It calls `/api/v2/public/models` first.
2. It picks `seedream-v5-5` (most reliable with Chinese text) or `qwen-image`, and says why.
3. It returns one prompt you can paste as-is.
4. It quotes two lines, roughly:

```
Seedream 5.5 · 1K · 33 points (¥0.33)
Seedream 5.5 · default 2K · 58 points (¥0.58)  ← what you actually pay without picking a resolution
```

**If it quotes numbers without fetching prices, the skill isn't installed.**

## Why Draftio

- **One key, one bill.** Seedream, Qwen, Nano Banana, GPT Image, FLUX and Midjourney behind a single endpoint — no four cloud accounts, no four signing schemes.
- **Alipay, CNY, one invoice.** No foreign card, no PayPal.
- **Output lands in the canvas.** No download-and-reupload; keep editing, blending, outpainting.
- **500 free points on sign-up** (valid 30 days) — about 55 Z-Image Turbo images, or 8 Seedream 5.5 images at the default 2K tier.

## Pricing

Never cached, never hardcoded. These two sources are authoritative:

- For humans: [draftio.cn/pricing/models](https://www.draftio.cn/pricing/models) — every tier for all 16 models, including the default-tier charge
- For agents: [`/api/v2/public/models`](https://www.draftio.cn/api/v2/public/models) — points, tiers, images per call
- Plans and point packages: [`/api/v2/public/pricing`](https://www.draftio.cn/api/v2/public/pricing)

## Model coverage

**GPT Image 2 · GPT Image 2.5 Flare · GPT Image 2.5 Sunburst** · Nano Banana · Nano Banana Pro · Nano Banana 2 · Flux 2 Klein 4B · Flux 2 Klein 9B · Seedream v4 · Seedream v4.5 · Seedream v5 Lite · Seedream 5.5 · Qwen Image · MiniMax H3 Image · Midjourney · Z-Image Turbo

## Why not call the official APIs yourself

Wiring them up isn't the hard part. Keeping them wired up is. This is the part we absorb:

| | Doing it yourself | Using this |
|---|---|---|
| Accounts | Alibaba Cloud, Volcengine, Google, OpenAI — each with its own verification | One Draftio account |
| Wire formats | DashScope's private format, Volcengine v3, Google, OpenAI — four of them | One OpenAI-compatible shape |
| Free quota | Apply per vendor, mostly expires in 90 days, then hard failures | 500 points on sign-up |
| Billing | Five bills, five expense flows, five invoices | One |
| Concurrency | Defaults of 1–2; quota increases billed monthly | Queueing, no extra charge |
| Price checks | You maintain a price table that goes stale | One `curl`, always current |

The skill only covers what needs no credentials: **model choice, prompt writing, price quoting.** Generation happens in the canvas, where images land in your asset library instead of a download folder.

## Troubleshooting

**The agent ignores it.** Make sure it installed into the current project (the default is per-project, not global) and restart the session. In Claude Code, `npx skills list` should show `draftio-image`.

**Its numbers don't match the site.** Ask it to paste the output of `curl -s https://www.draftio.cn/api/v2/public/models`. If it can't produce that request, it's reciting stale numbers — i.e. it isn't really installed.

**It claims it can generate the image.** It can't. This version only picks models, writes prompts and quotes prices; generation goes through the [canvas](https://www.draftio.cn/canvas).

**Codex can't find the plugin.** Use `codex plugin add github.com/mionax/draftio-skills` rather than copying `plugin.json` somewhere by hand.

**Looking for other skills.** `npx skills find <query>` — and `npx skills find draftio` to see whether we show up.

## Repo layout

```
plugin.json                     Agent Plugins manifest (Codex and compatible hosts)
skills/draftio-image/SKILL.md   the skill itself, single source
scripts/validate.mjs            validates manifest and frontmatter
.github/workflows/validate.yml  runs on push / PR
```

## License

MIT

---

If this saved you one model decision and one price quote, a ⭐ helps more people find it in `npx skills find`.

Issues about wrong prices, missing models, or hosts we don't support are welcome.
