# 求职学术主页（career site）设计文档

日期：2026-10-17
状态：待实现
关联站点：https://leisj24.github.io（学习博客，保持独立、不做改动）

## 1. 目标与非目标

### 目标

- 面向两类受众：国内 AI/算法实习招聘方、保研/PhD 项目导师
- 30 秒内传达：我是谁 → 研究方向 → 做过什么 → 如何联系
- 中英双语，同一内容两种语言版本
- 独立仓库 `leisj24/career`，部署于 `https://leisj24.github.io/career/`

### 非目标

- 不做博客/文章系统（博客已有独立站点）
- 不做深色模式、评论、统计、联系表单
- 不做多页作品集（项目数 ≥3 后再评估拆分详情页）

## 2. 信息架构

单页结构，两个语言版本共用同一模板：

| 区块 | 内容 |
| :-- | :-- |
| Hero | 姓名（中英）、一句话定位、研究兴趣关键词、链接（Email / GitHub / 博客 / CV 下载） |
| Research | 2–3 张项目卡：问题、方法、结果、状态标签（进行中 / 已完成 / 课程项目） |
| Publications | 论文/预印本列表（含状态标记）。首版无正式发表，**留空**：保留区块并显示轻量占位文案（如 "Publications coming soon"），不虚构 in preparation 条目 |
| Education | USTC 人工智能与数据科学学院，数据科学与大数据专业；GPA 3.55/4.3、排名 20/46、核心课程、CET-4/6 |
| Honors | 竞赛与实践荣誉（华为 ICT 大赛、社会实践、志愿服务） |
| Skills | 编程语言、工具、语言能力 |
| Footer | 邮箱、GitHub、博客链接、版权 |

路由：

- `/career/zh/`、`/career/en/`
- `/career/` 重定向页：读取 localStorage 语言偏好，否则按 `navigator.language` 跳转
- 语言切换按钮链接到对应语言路径，并写入 localStorage

## 3. 内容数据模型

`src/data/profile.ts`，类型化双语字符串：

```ts
type L = { zh: string; en: string };
interface Profile {
  name: L; title: L; affiliation: L; bio: L;
  interests: L[];
  links: { email: string; github: string; blog: string; cv: { zh: string; en: string } };
  research: { title: L; period: string; status: 'ongoing'|'done'|'course'; problem: L; method: L; result: L; tags: string[] }[];
  publications: { title: L; authors: string; venue: L; status: 'prep'|'review'|'published'; year?: string; links?: {label: string; href: string}[] }[];
  education: { school: L; major: L; period: string; gpa: string; rank: string; courses: L; english: L };
  honors: { title: L; year: string }[];
  skills: { category: L; items: string[] }[];
}
```

所有页面文案取自该文件，不在模板里硬编码。

## 4. 视觉设计

- **气质**：学术简历 / 编辑部排版风；克制、无动画、无插图
- **配色**：米白纸感背景 `#faf9f6`，墨色正文 `#1f2328`，深青绿强调色 `#0f766e`（hover 加深），细线分隔 `#e5e2da`
- **字体**：英文标题与姓名用本地打包的衬线字体（Newsreader，2 个权重，避免依赖 Google Fonts 在国内不可达）；英文正文用系统 sans 栈（`-apple-system`, `Segoe UI`, ...）；中文标题/正文用系统宋体栈（`Noto Serif SC`, `Songti SC`, `SimSun`, serif），不打包中文字体以控制体积
- **版式**：桌面端最大宽度 1080px；Hero 左右布局（左姓名+定位，右联系方式列表）；正文单栏，章节标题带编号（01 Research / 02 Publications …）与细线；移动端单栏堆叠
- **链接**：正文链接带下划线偏移；hover 颜色变强调色
- **响应式断点**：≤720px 移动端

## 5. 技术架构

- Astro 6 静态输出，无 UI 框架、无客户端路由框架
- 目录结构：

```
src/
  data/profile.ts        # 双语内容
  components/            # Hero, ResearchCard, PublicationList, SectionHeading ...
  pages/
    index.astro          # 语言重定向
    zh/index.astro
    en/index.astro
  layouts/Base.astro     # head、字体、全局样式
  styles/global.css      # 设计 token
public/
  cv-zh.pdf  cv-en.pdf   # 简历下载（去手机号）
  favicon*
```

- `astro.config.mjs`：`site: 'https://leisj24.github.io'`，`base: '/career'`；内部链接统一通过 `import.meta.env.BASE_URL` 或相对路径拼接，避免子路径失效
- 语言切换与根重定向均为 `is:inline` 小脚本
- SEO：`<html lang>` 按语言设置；canonical、OG 标签；`hreflang` 互链

## 6. 部署

- GitHub Actions（pattern 复用博客的 `deploy.yml`），push `main` 即构建发布到 Pages
- 仓库 Settings 中 Pages Source 设为 GitHub Actions
- 首次推送后验证 `https://leisj24.github.io/career/zh/` 可访问

## 7. 内容清单（首版）

- **Research 1：AV-ASD 数据集受试者统计与偏差分析**（2026 暑期科研，进行中）——数据集人工核查与人口学统计，目标是为模型评估提供可信的基准描述
- **Research 2：大模型越狱与内容安全治理**（课程研究，已完成）——国内 LLM/智能体越狱案例、根因与治理对比
- **Research 3：昇腾 NPU Pdist 算子优化**（华为 ICT 大赛，已完成）——在昇腾上实现并调优 pdist 算子
- **Publications**：首版留空——保留区块与标题，渲染一行柔和占位文案（中英各一），不列 in preparation 条目，避免凑数感
- **Honors**：2025 华为 ICT 大赛、暑期三下乡优秀团队/个人、科技活动周志愿者

## 8. 隐私与合规

- 公开页面只展示邮箱（沿用邮箱混淆方案，不写明文 `mailto:`），**不展示手机号**
- 简历 PDF 上传前需删除手机号与出生年月等非必要个人信息；提供中英两版
- 其他同学的报告、成绩单截图等不发布

## 9. 验收标准

- `npm run build` 通过，`/career/zh/`、`/career/en/`、`/career/` 三个入口可用
- 语言切换在两个页面间正确跳转并记住偏好；根路径按语言偏好重定向
- 移动端（≤720px）单栏布局无横向溢出；桌面端 Hero 左右布局正常
- 所有内部链接在 `base: '/career'` 下无死链；CV、GitHub、博客、邮箱链接可用
- 无 JS 时页面内容与链接完整可用（仅语言切换降级为手动点链接）
- 构建产物体积：字体 ≤ 200KB，无框架 JS

## 10. 待办与风险

- 双语内容需人工校对，避免机器翻译腔（以现有中文简历为底稿撰写英文版）
- CV 英文版需要新建（可基于中文简历的 LaTeX 模板改造）
- 未来若要加 Publications 详情页，需升级为多页结构（本 spec 之外）
