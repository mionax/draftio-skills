# Contributing

这个仓库只有一条硬规则：**skill 里不许出现写死的价格或模型清单之外的能力**。价格永远从接口读，能力永远以 spec 为准。

## 改什么最有价值

1. **报价错了** —— 这是最严重的 bug。请附上 `curl -s https://www.draftio.cn/api/v2/public/models` 的输出和 agent 实际说的话。
2. **选型建议不准** —— 说明场景、模型、以及产出的问题（文字糊了、构图崩了、风格不对）。
3. **提示词写法有更好的** —— 贴一版前后对比，说明哪个模型、什么参数。
4. **新宿主接入** —— Claude Code / Codex / Cursor 之外的宿主，把安装步骤验证一遍再提。

## 不要提的

- 让我们把这套 skill 做成"自动出图"：那需要 API key 和 MCP 服务端，属于另一个阶段。
- 厂商官方价对比：公开页的对比在 `draftio.cn/pricing/models`，这里只放用法。

## 提交前

```bash
node scripts/validate.mjs
```

它会检查 `plugin.json` 必填字段、每个 `SKILL.md` 的 frontmatter（`name` 必须等于目录名、`description` 不少于 40 字）、以及中英两个 README 是否存在且互相链接。

CI 会跑同一个脚本，不通过不会合并。

## 提交信息

中文 Conventional Commits：`新增:` / `修复:` / `优化:` / `清理:`。

例：`修复: Seedream 5.5 默认档报价漏了 2K`
