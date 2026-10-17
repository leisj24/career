# career

求职用学术主页（中英双语单页），部署于 https://leisj24.github.io/career/ 。

## 开发

```bash
npm install
npm run dev      # http://localhost:4321/career/
npm run build    # 产物在 dist/
npm run check    # astro check
```

## 内容维护

所有文字内容在 `src/data/profile.ts`，双语字段形如 `{ zh, en }`。修改后重新构建即可。

## 部署

推送 `main` 自动通过 GitHub Actions 发布到 GitHub Pages（仓库 Settings → Pages → Source: GitHub Actions）。
