# AniBT Wiki

AniBT 的 Fumadocs 文档站点。公开 API 页由 `openapi/anibt.yaml` 生成。

```bash
pnpm gen:openapi
```

## 开发

```bash
pnpm install
pnpm dev
```

默认中文路径会隐藏语言前缀：

- 首页：`/`
- 文档：`/docs`
- 英文：首页 `/en`，文档 `/en/docs`

## 内容

文档内容位于 `content/docs`。默认语言是中文，英文文档使用 `.en.mdx` / `.en.json` 后缀。

## 项目规范

- 默认语言必须是简体中文，中文页面隐藏语言前缀。
- 英文只通过语言切换或 `/en` 前缀访问。
- 文档图片必须放在 `public/images` 下，并使用压缩后的 `.webp` 文件。
- 文档正文不要引用原始图片格式，例如 `.png`、`.jpg` 或外部图床地址。
