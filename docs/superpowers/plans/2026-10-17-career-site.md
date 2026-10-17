# 求职学术主页（career site）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `D:\nicstudy\cs\career` 新建 Astro 双语单页学术主页，部署于 `https://leisj24.github.io/career/`。

**Architecture:** 纯静态 Astro 6 站点，无 UI 框架。双语内容集中在 `src/data/profile.ts`，`/zh/` 与 `/en/` 两个页面共用 `AcademicHome.astro` 模板；根路径脚本按偏好重定向；另提供打印友好的 CV 页。`base: '/career'` 以适配 GitHub Pages 项目站点。

**Tech Stack:** Astro 6、TypeScript、@fontsource-variable/newsreader、GitHub Actions Pages。

**Spec:** `docs/superpowers/specs/2026-10-17-career-site-design.md`

## Global Constraints

- `site: 'https://leisj24.github.io'`，`base: '/career'`；所有站内链接必须用 `import.meta.env.BASE_URL` 拼接，不允许裸写 `/zh/` 等绝对路径（根重定向脚本除外，见 Task 4）
- 公开页面禁止出现手机号（已脱敏，见任务要求）；邮箱只允许拆分混淆形式（`data-u`/`data-d` + JS 拼接），不得出现明文 `mailto:`
- 配色 token：纸色 `#faf9f6`、墨色 `#1f2328`、次要文字 `#5b616b`、细线 `#e5e2da`、强调色 `#0f766e`、强调色 hover `#115e59`
- 不引入 UI 框架、不做深色模式；除语言切换/邮箱/根重定向外不写自定义 JS
- 缩进使用 tab（与现有博客一致）；中文文案以现有简历为底稿，英文人工撰写，禁止机翻腔
- 所有截图验证使用本地 preview（端口 4321），不依赖线上

---

### Task 1: 项目脚手架与设计系统

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/styles/global.css`
- Create: `src/layouts/Base.astro`

**Interfaces:**
- Produces: `Base.astro` props `{ lang: 'zh' | 'en'; title: string; description: string; path: string }`，供 Task 3/4 的页面使用；`global.css` 暴露 CSS 变量 `--paper --ink --muted --rule --accent --accent-dark --font-serif --font-sans`。

- [ ] **Step 1: 创建 `package.json`**

```json
{
	"name": "career",
	"type": "module",
	"version": "0.0.1",
	"engines": { "node": ">=22.12.0" },
	"scripts": {
		"dev": "astro dev",
		"build": "astro build",
		"preview": "astro preview",
		"check": "astro check",
		"astro": "astro"
	},
	"dependencies": {
		"@fontsource-variable/newsreader": "^5.2.5",
		"astro": "^6.4.6"
	}
}
```

- [ ] **Step 2: 创建 `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://leisj24.github.io',
	base: '/career',
});
```

- [ ] **Step 3: 创建 `tsconfig.json` 与 `.gitignore`**

`tsconfig.json`：

```json
{
	"extends": "astro/tsconfigs/strict",
	"include": [".astro/types.d.ts", "**/*"],
	"exclude": ["dist"]
}
```

`.gitignore`：

```
dist/
.astro/
node_modules/
npm-debug.log*
.DS_Store
.idea/
```

- [ ] **Step 4: 创建 `src/styles/global.css`**

```css
:root {
	--paper: #faf9f6;
	--ink: #1f2328;
	--muted: #5b616b;
	--rule: #e5e2da;
	--accent: #0f766e;
	--accent-dark: #115e59;
	--font-serif: 'Newsreader Variable', 'Noto Serif SC', 'Songti SC', SimSun, serif;
	--font-sans: -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

* {
	box-sizing: border-box;
}

html {
	background: var(--paper);
	color: var(--ink);
	scroll-behavior: smooth;
}

body {
	margin: 0;
	font-family: var(--font-sans);
	font-size: 16px;
	line-height: 1.75;
	-webkit-font-smoothing: antialiased;
}

a {
	color: inherit;
	text-decoration-color: color-mix(in srgb, var(--accent) 55%, transparent);
	text-underline-offset: 0.2em;
}

a:hover {
	color: var(--accent);
	text-decoration-color: var(--accent);
}

::selection {
	background: color-mix(in srgb, var(--accent) 18%, transparent);
}

.page {
	max-width: 1080px;
	margin: 0 auto;
	padding: 0 1.5rem 4rem;
}

.section-num {
	font-family: var(--font-serif);
	font-size: 0.85rem;
	color: var(--accent);
	letter-spacing: 0.08em;
}
```

- [ ] **Step 5: 创建 `src/layouts/Base.astro`**

```astro
---
import '@fontsource-variable/newsreader';
import '../styles/global.css';

interface Props {
	lang: 'zh' | 'en';
	title: string;
	description: string;
	path: string;
}

const { lang, title, description, path } = Astro.props;
const base = import.meta.env.BASE_URL;
const canonical = new URL(`${base}${lang}${path}`, Astro.site);
const otherLang = lang === 'zh' ? 'en' : 'zh';
const otherHref = `${base}${otherLang}${path}`;
---
<!doctype html>
<html lang={lang === 'zh' ? 'zh-CN' : 'en'}>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<meta name="description" content={description} />
		<link rel="canonical" href={canonical} />
		<link rel="alternate" hreflang="zh-CN" href={new URL(`${base}zh${path}`, Astro.site)} />
		<link rel="alternate" hreflang="en" href={new URL(`${base}en${path}`, Astro.site)} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:url" content={canonical} />
		<title>{title}</title>
	</head>
	<body>
		<slot />
		<script is:inline>
			document.querySelectorAll('.js-lang').forEach((el) => {
				el.addEventListener('click', () => {
					try {
						localStorage.setItem('career-lang', el.dataset.lang);
					} catch (e) {}
				});
			});
			document.querySelectorAll('.js-mail').forEach((el) => {
				el.addEventListener('click', (e) => {
					e.preventDefault();
					window.location.href = 'mailto:' + el.dataset.u + '@' + el.dataset.d;
				});
			});
		</script>
	</body>
</html>
```

- [ ] **Step 6: 安装依赖并验证构建**

Run: `npm install`
Run: `npm run build`
Expected: `Complete!`，`dist/index.html` 不存在（尚无页面），无报错。

- [ ] **Step 7: 提交**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src
git commit -m "chore: Astro 脚手架与设计 token"
```

---

### Task 2: 双语内容数据文件

**Files:**
- Create: `src/data/profile.ts`

**Interfaces:**
- Produces: `export const profile`（结构见下）与 `export type Lang = 'zh' | 'en'`。所有字段双语用 `type L = { zh: string; en: string }`，页面取值方式 `profile.name[lang]`。

- [ ] **Step 1: 写入完整内容（含真实中英文文案）**

```ts
export type Lang = 'zh' | 'en';
type L = { zh: string; en: string };

export const profile = {
	name: { zh: '雷双吉', en: 'Shuangji Lei' } as L,
	nameAlt: { zh: 'Shuangji Lei', en: '雷双吉' } as L,
	title: {
		zh: '中国科学技术大学 · 人工智能与数据科学学院 · 本科在读',
		en: 'Undergraduate, School of Artificial Intelligence and Data Science, USTC',
	} as L,
	bio: {
		zh: '关注大模型安全与数据集质量。目前在做 AV-ASD 数据集的受试者统计与偏差分析，也研究大语言模型的越狱风险与内容安全治理。习惯用实验和数据把问题讲清楚。',
		en: 'Interested in LLM safety and dataset quality. Currently working on demographic analysis and bias auditing of the AV-ASD dataset, and studying jailbreak risks and content-safety governance for large language models. I like making problems concrete with experiments and data.',
	} as L,
	interests: {
		zh: ['大模型安全', '数据集质量与公平性', '高效推理'],
		en: ['LLM Safety', 'Dataset Quality & Fairness', 'Efficient Inference'],
	},
	emailUser: 'sjlei24',
	emailDomain: 'mail.ustc.edu.cn',
	github: 'https://github.com/leisj24',
	blog: 'https://leisj24.github.io',
	research: [
		{
			title: {
				zh: 'AV-ASD 数据集受试者统计与偏差分析',
				en: 'Demographic Statistics and Bias Analysis of the AV-ASD Dataset',
			},
			period: { zh: '2026.07 – 至今', en: 'Jul 2026 – Present' },
			status: { zh: '在研', en: 'Ongoing' },
			problem: {
				zh: '自闭症筛查视频数据集常缺少系统的受试者人口学描述，影响模型评估的可信度。',
				en: 'Video datasets for autism screening often lack systematic demographic descriptions, undermining the credibility of model evaluation.',
			},
			method: {
				zh: '人工复核共享数据与原始标注，按年龄、性别、来源整理统计口径，交叉验证分布一致性。',
				en: 'Manually audited shared and annotated data, organized statistics by age, gender, and source, and cross-validated distribution consistency.',
			},
			result: {
				zh: '形成约 566 名儿童（区间 557–724）的统计描述，关键分布如性别比 66:34，并输出可复用的数据字典与统计报告。',
				en: 'Produced a demographic profile of approximately 566 children (range 557–724), including a 66:34 gender ratio, with a reusable data dictionary and statistics report.',
			},
			tags: ['Dataset Audit', 'Bias Analysis', 'Statistics'],
		},
		{
			title: {
				zh: '大模型越狱与内容安全治理',
				en: 'LLM Jailbreaks and Content-Safety Governance',
			},
			period: { zh: '2025.12', en: 'Dec 2025' },
			status: { zh: '课程研究', en: 'Course Project' },
			problem: {
				zh: '国内主流大模型与智能体可被特定提示绕过安全机制，生成违法违规内容。',
				en: 'Domestic LLMs and agents can be induced to bypass safety mechanisms and generate prohibited content.',
			},
			method: {
				zh: '梳理越狱的技术路径与典型案例，分析对齐机制缺陷，并比较中国、欧盟与美国的监管框架。',
				en: 'Reviewed technical pathways and representative cases, analyzed alignment failures, and compared regulatory frameworks in China, the EU, and the US.',
			},
			result: {
				zh: '形成技术防护（提示注入防御、多模态检测）与政策（内容标识、未成年人保护）两方面的治理建议。',
				en: 'Proposed governance recommendations spanning technical defenses (prompt-injection and multimodal detection) and policy (content labeling, minor protection).',
			},
			tags: ['AI Safety', 'Jailbreak', 'Policy'],
		},
		{
			title: {
				zh: '昇腾 NPU Pdist 算子优化',
				en: 'Pdist Operator Optimization on Ascend NPU',
			},
			period: { zh: '2025.11 – 2025.12', en: 'Nov – Dec 2025' },
			status: { zh: '竞赛项目', en: 'Competition' },
			problem: {
				zh: '华为 ICT 大赛挑战赛包含 HPCG、Pdist 算子、推理引擎与 Diffusion LLM 单卡推理优化等任务。',
				en: 'The Huawei ICT Competition challenged teams with HPCG, Pdist operator, inference-engine, and single-card Diffusion LLM optimization tasks.',
			},
			method: {
				zh: '负责 Pdist 算子部分，在昇腾 NPU 上完成算子功能实现与调试。',
				en: 'Owned the Pdist operator task, implementing and debugging the operator on the Ascend NPU.',
			},
			result: {
				zh: '算子功能完整实现，可在昇腾 NPU 上正常运行。',
				en: 'Delivered a fully functional Pdist operator running correctly on Ascend NPUs.',
			},
			tags: ['Ascend', 'Operator', 'HPC'],
		},
	],
	publications: [] as {
		title: L;
		authors: string;
		venue: L;
		status: 'prep' | 'review' | 'published';
		year?: string;
	}[],
	education: {
		school: { zh: '中国科学技术大学', en: 'University of Science and Technology of China' },
		major: {
			zh: '人工智能与数据科学学院 · 数据科学与大数据专业',
			en: 'School of AI and Data Science · Data Science and Big Data Technology',
		},
		period: { zh: '2024.09 – 2028.06（预计）', en: 'Sep 2024 – Jun 2028 (expected)' },
		gpa: '3.55 / 4.3',
		rank: { zh: '20 / 46', en: '20 / 46' },
		courses: {
			zh: '计算机程序设计 A（95）、计算系统概论 A（89）等',
			en: 'Computer Programming A (95), Introduction to Computing Systems A (89)',
		},
		english: {
			zh: 'CET-4 634 · CET-6 548，可熟练阅读英文文献',
			en: 'CET-4 634 · CET-6 548; comfortable reading English academic literature',
		},
	},
	honors: [
		{ zh: '2025 华为 ICT 大赛挑战赛', en: 'Huawei ICT Competition 2025, Challenger Track', year: '2025' },
		{ zh: '暑期“三下乡”社会实践 优秀团队 / 优秀个人', en: 'Outstanding Team & Individual, Summer Social Practice Program', year: '2025' },
		{ zh: '中国科学技术大学科技活动周 志愿者', en: 'Volunteer, USTC Science and Technology Week', year: '2025' },
		{ zh: '芳草社青年志愿者协会宣传部干事', en: 'Publicity Officer, Fangcao Youth Volunteers Association', year: '2024–2025' },
	],
	skills: [
		{ category: { zh: '编程语言', en: 'Languages' }, items: ['C', 'Python', 'MATLAB'] },
		{ category: { zh: '工具', en: 'Tools' }, items: ['Git', 'LaTeX', 'Markdown', 'Anaconda'] },
	],
	emptyPublications: {
		zh: '论文与预印本整理中，后续更新于此。',
		en: 'Publications and preprints are being organized and will appear here.',
	} as L,
	ui: {
		navResearch: { zh: '研究', en: 'Research' } as L,
		navPublications: { zh: '论文', en: 'Publications' } as L,
		navEducation: { zh: '教育', en: 'Education' } as L,
		navHonors: { zh: '荣誉', en: 'Honors' } as L,
		navSkills: { zh: '技能', en: 'Skills' } as L,
		email: { zh: '邮箱', en: 'Email' } as L,
		github: { zh: 'GitHub', en: 'GitHub' } as L,
		blog: { zh: '博客', en: 'Blog' } as L,
		cv: { zh: 'CV（简历）', en: 'CV' } as L,
		switchTo: { zh: 'English', en: '中文' } as L,
		research: { zh: '研究项目', en: 'Research' } as L,
		publications: { zh: '论文与预印本', en: 'Publications & Preprints' } as L,
		educationTitle: { zh: '教育背景', en: 'Education' } as L,
		honorsTitle: { zh: '荣誉与实践', en: 'Honors & Service' } as L,
		skillsTitle: { zh: '技能', en: 'Skills' } as L,
		problem: { zh: '问题', en: 'Problem' } as L,
		method: { zh: '方法', en: 'Method' } as L,
		result: { zh: '结果', en: 'Result' } as L,
		period: { zh: '时间', en: 'Period' } as L,
		gpa: { zh: 'GPA', en: 'GPA' } as L,
		rank: { zh: '专业排名', en: 'Rank' } as L,
		courses: { zh: '核心课程', en: 'Selected Courses' } as L,
		english: { zh: '英语', en: 'English' } as L,
		footer: { zh: '© 2026 雷双吉 · 用 Astro 构建', en: '© 2026 Shuangji Lei · Built with Astro' } as L,
	},
};

export type Profile = typeof profile;
```

- [ ] **Step 2: 验证类型检查**

Run: `npm run check`
Expected: `0 errors`（此时 `src/data/profile.ts` 尚无引用，也应通过）。

- [ ] **Step 3: 提交**

```bash
git add src/data/profile.ts
git commit -m "feat: 双语档案内容数据"
```

---

### Task 3: 首页模板与双语页面

**Files:**
- Create: `src/components/SectionHeading.astro`
- Create: `src/components/ResearchCard.astro`
- Create: `src/components/AcademicHome.astro`
- Create: `src/pages/zh/index.astro`
- Create: `src/pages/en/index.astro`
- Modify: `src/layouts/Base.astro`（无，保持 Task 1 版本）

**Interfaces:**
- Consumes: `Base.astro` props、`profile` 与 `Lang`
- Produces: 两个可访问页面（构建后 `/career/zh/index.html`、`/career/en/index.html`）；语言切换链接同时带 `.js-lang` 与 `data-lang`

- [ ] **Step 1: `src/components/SectionHeading.astro`**

```astro
---
interface Props {
	num: string;
	title: string;
}
const { num, title } = Astro.props;
---
<header class="section-head">
	<span class="section-num">{num}</span>
	<h2>{title}</h2>
</header>

<style>
	.section-head {
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 0.55rem;
		margin-bottom: 1.6rem;
	}
	.section-num {
		font-family: var(--font-serif);
		font-size: 0.9rem;
		color: var(--accent);
	}
	h2 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: 0.01em;
	}
</style>
```

- [ ] **Step 2: `src/components/ResearchCard.astro`**

```astro
---
import type { Lang, Profile } from '../data/profile';

interface Props {
	item: Profile['research'][number];
	lang: Lang;
	labels: { period: string; problem: string; method: string; result: string };
}
const { item, lang, labels } = Astro.props;
---
<article class="research-card">
	<div class="card-top">
		<h3>{item.title[lang]}</h3>
		<span class="status">{item.status[lang]}</span>
	</div>
	<p class="period">{labels.period}：{item.period[lang]}</p>
	<dl>
		<div>
			<dt>{labels.problem}</dt>
			<dd>{item.problem[lang]}</dd>
		</div>
		<div>
			<dt>{labels.method}</dt>
			<dd>{item.method[lang]}</dd>
		</div>
		<div>
			<dt>{labels.result}</dt>
			<dd>{item.result[lang]}</dd>
		</div>
	</dl>
	<ul class="tags">
		{item.tags.map((tag) => <li>{tag}</li>)}
	</ul>
</article>

<style>
	.research-card {
		padding: 1.4rem 0 1.6rem;
		border-bottom: 1px solid var(--rule);
	}
	.research-card:last-child {
		border-bottom: 0;
	}
	.card-top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}
	h3 {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 600;
		line-height: 1.5;
	}
	.status {
		flex-shrink: 0;
		font-size: 0.75rem;
		color: var(--accent);
		border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
		border-radius: 999px;
		padding: 0.08rem 0.6rem;
	}
	.period {
		margin: 0.35rem 0 0.9rem;
		color: var(--muted);
		font-size: 0.85rem;
	}
	dl {
		display: grid;
		gap: 0.55rem;
		margin: 0 0 1rem;
	}
	dl > div {
		display: grid;
		grid-template-columns: 3.2rem 1fr;
		gap: 0.8rem;
	}
	dt {
		color: var(--muted);
		font-size: 0.85rem;
	}
	dd {
		margin: 0;
		font-size: 0.95rem;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.tags li {
		font-size: 0.75rem;
		color: var(--muted);
		background: color-mix(in srgb, var(--rule) 45%, transparent);
		border-radius: 999px;
		padding: 0.1rem 0.65rem;
	}
	@media (max-width: 560px) {
		dl > div {
			grid-template-columns: 1fr;
			gap: 0.1rem;
		}
	}
</style>
```

- [ ] **Step 3: `src/components/AcademicHome.astro`**

```astro
---
import type { Lang } from '../data/profile';
import { profile } from '../data/profile';
import ResearchCard from './ResearchCard.astro';
import SectionHeading from './SectionHeading.astro';

interface Props {
	lang: Lang;
}
const { lang } = Astro.props;
const base = import.meta.env.BASE_URL;
const other = lang === 'zh' ? 'en' : 'zh';
const p = profile;
const ui = p.ui;
---
<main class="page">
	<nav class="topnav">
		<a class="brand" href={base}>{p.nameAlt[lang]}</a>
		<div class="nav-links">
			<a href="#research">{ui.navResearch[lang]}</a>
			<a href="#publications">{ui.navPublications[lang]}</a>
			<a href="#education">{ui.navEducation[lang]}</a>
			<a href="#honors">{ui.navHonors[lang]}</a>
			<a href="#skills">{ui.navSkills[lang]}</a>
			<a class="js-lang" data-lang={other} href={`${base}${other}/`}>{ui.switchTo[lang]}</a>
		</div>
	</nav>

	<header class="hero">
		<div class="hero-main">
			<h1>{p.name[lang]}</h1>
			<p class="name-alt">{p.nameAlt[lang]}</p>
			<p class="title">{p.title[lang]}</p>
			<p class="bio">{p.bio[lang]}</p>
			<ul class="interests">
				{p.interests[lang].map((i) => <li>{i}</li>)}
			</ul>
		</div>
		<ul class="contact">
			<li><span>{ui.email[lang]}</span><a href="#" class="js-mail" data-u={p.emailUser} data-d={p.emailDomain}>{p.emailUser}@…</a></li>
			<li><span>{ui.github[lang]}</span><a href={p.github} target="_blank" rel="noopener">github.com/leisj24</a></li>
			<li><span>{ui.blog[lang]}</span><a href={p.blog} target="_blank" rel="noopener">leisj24.github.io</a></li>
			<li><span>{ui.cv[lang]}</span><a href={`${base}${lang}/cv/`}>{ui.cv[lang]}</a></li>
		</ul>
	</header>

	<section id="research">
		<SectionHeading num="01" title={ui.research[lang]} />
		{p.research.map((item) => (
			<ResearchCard item={item} lang={lang} labels={{ period: ui.period[lang], problem: ui.problem[lang], method: ui.method[lang], result: ui.result[lang] }} />
		))}
	</section>

	<section id="publications">
		<SectionHeading num="02" title={ui.publications[lang]} />
		{p.publications.length === 0 ? (
			<p class="empty">{p.emptyPublications[lang]}</p>
		) : (
			<ul class="pub-list">
				{p.publications.map((pub) => (
					<li>
						<p class="pub-title">{pub.title[lang]}</p>
						<p class="pub-meta">{pub.authors} · {pub.venue[lang]} · {pub.status}</p>
					</li>
				))}
			</ul>
		)}
	</section>

	<section id="education">
		<SectionHeading num="03" title={ui.educationTitle[lang]} />
		<div class="edu">
			<div class="edu-head">
				<h3>{p.education.school[lang]}</h3>
				<span>{p.education.period[lang]}</span>
			</div>
			<p class="edu-major">{p.education.major[lang]}</p>
			<ul class="edu-facts">
				<li><span>{ui.gpa[lang]}</span>{p.education.gpa}</li>
				<li><span>{ui.rank[lang]}</span>{p.education.rank[lang]}</li>
				<li><span>{ui.courses[lang]}</span>{p.education.courses[lang]}</li>
				<li><span>{ui.english[lang]}</span>{p.education.english[lang]}</li>
			</ul>
		</div>
	</section>

	<section id="honors">
		<SectionHeading num="04" title={ui.honorsTitle[lang]} />
		<ul class="honors">
			{p.honors.map((h) => (
				<li><span>{h.year}</span>{h[lang]}</li>
			))}
		</ul>
	</section>

	<section id="skills">
		<SectionHeading num="05" title={ui.skillsTitle[lang]} />
		<ul class="skills">
			{p.skills.map((s) => (
				<li><span>{s.category[lang]}</span>{s.items.join(' · ')}</li>
			))}
		</ul>
	</section>

	<footer>
		<p>{ui.footer[lang]}</p>
	</footer>
</main>

<style>
	.topnav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.1rem 0;
		border-bottom: 1px solid var(--rule);
		margin-bottom: 3rem;
	}
	.brand {
		font-family: var(--font-serif);
		font-size: 1.05rem;
		font-weight: 600;
		text-decoration: none;
	}
	.nav-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1.1rem;
		font-size: 0.86rem;
	}
	.nav-links a {
		text-decoration: none;
		color: var(--muted);
	}
	.nav-links a:hover {
		color: var(--accent);
	}
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		gap: 3rem;
		align-items: start;
		margin-bottom: 3.5rem;
	}
	h1 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: clamp(2.4rem, 5vw, 3.2rem);
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.15;
	}
	.name-alt {
		margin: 0.15rem 0 0.9rem;
		color: var(--muted);
		font-family: var(--font-serif);
		font-size: 1.05rem;
		letter-spacing: 0.06em;
	}
	.title {
		margin: 0 0 1rem;
		font-size: 0.98rem;
	}
	.bio {
		margin: 0 0 1.1rem;
		max-width: 38em;
	}
	.interests {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.interests li {
		font-size: 0.8rem;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 8%, transparent);
		border-radius: 999px;
		padding: 0.12rem 0.7rem;
	}
	.contact {
		list-style: none;
		margin: 0.3rem 0 0;
		padding: 1.1rem 1.2rem;
		border: 1px solid var(--rule);
		border-radius: 6px;
		background: #fff;
	}
	.contact li {
		display: grid;
		grid-template-columns: 5.5rem 1fr;
		gap: 0.6rem;
		padding: 0.3rem 0;
		font-size: 0.9rem;
	}
	.contact span {
		color: var(--muted);
		font-size: 0.82rem;
	}
	section {
		margin-bottom: 3rem;
	}
	.empty {
		color: var(--muted);
		font-size: 0.95rem;
	}
	.edu-head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: baseline;
	}
	.edu-head h3 {
		margin: 0;
		font-size: 1.1rem;
	}
	.edu-head span {
		color: var(--muted);
		font-size: 0.85rem;
	}
	.edu-major {
		margin: 0.2rem 0 0.9rem;
		color: var(--muted);
		font-size: 0.95rem;
	}
	.edu-facts,
	.honors,
	.skills {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.edu-facts li,
	.skills li {
		display: grid;
		grid-template-columns: 5.5rem 1fr;
		gap: 0.8rem;
		padding: 0.32rem 0;
		font-size: 0.95rem;
	}
	.edu-facts span,
	.skills span {
		color: var(--muted);
		font-size: 0.85rem;
	}
	.honors li {
		padding: 0.32rem 0;
		font-size: 0.95rem;
	}
	.honors li span {
		color: var(--muted);
		font-size: 0.82rem;
		margin-right: 0.8rem;
	}
	footer {
		border-top: 1px solid var(--rule);
		padding-top: 1.4rem;
		color: var(--muted);
		font-size: 0.82rem;
	}
	@media (max-width: 720px) {
		.topnav {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.6rem;
			margin-bottom: 2rem;
		}
		.hero {
			grid-template-columns: 1fr;
			gap: 1.6rem;
			margin-bottom: 2.5rem;
		}
		.contact li {
			grid-template-columns: 4.5rem 1fr;
		}
		.edu-facts li,
		.skills li {
			grid-template-columns: 4.5rem 1fr;
		}
	}
</style>
```

- [ ] **Step 4: 创建两个语言页面**

`src/pages/zh/index.astro`：

```astro
---
import AcademicHome from '../../components/AcademicHome.astro';
import Base from '../../layouts/Base.astro';
---
<Base
	lang="zh"
	title="雷双吉 · 中国科学技术大学"
	description="雷双吉（Shuangji Lei），中国科学技术大学人工智能与数据科学学院本科生，研究兴趣为 AI 安全、数据集质量与高效推理。"
	path="/"
>
	<AcademicHome lang="zh" />
</Base>
```

`src/pages/en/index.astro`：

```astro
---
import AcademicHome from '../../components/AcademicHome.astro';
import Base from '../../layouts/Base.astro';
---
<Base
	lang="en"
	title="Shuangji Lei · USTC"
	description="Shuangji Lei, undergraduate at the School of AI and Data Science, USTC. Research interests: LLM safety, dataset quality, and efficient inference."
	path="/"
>
	<AcademicHome lang="en" />
</Base>
```

- [ ] **Step 5: 构建并本地验证**

Run: `npm run build`
Expected: 构建成功，生成 `dist/zh/index.html` 与 `dist/en/index.html`。
Run: `npm run preview`
然后浏览器打开 `http://localhost:4321/career/zh/` 与 `/career/en/`
Expected: 两页内容完整、语言切换按钮互跳、邮箱点击触发 mailto、控制台无 404（favicon 缺失 404 可忽略，Task 5 补齐）。

- [ ] **Step 6: 提交**

```bash
git add src/components src/pages src/layouts
git commit -m "feat: 双语单页学术主页"
```

---

### Task 4: 根路径语言重定向

**Files:**
- Create: `src/pages/index.astro`

**Interfaces:**
- Consumes: 无（纯静态脚本）
- Produces: `/career/` 自动跳转至 `/career/zh/` 或 `/career/en/`

- [ ] **Step 1: 写入重定向页**

```astro
---
---
<!doctype html>
<html lang="zh-CN">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<title>Shuangji Lei · 雷双吉</title>
		<script is:inline>
			(() => {
				let lang = null;
				try {
					lang = localStorage.getItem('career-lang');
				} catch (e) {}
				if (lang !== 'zh' && lang !== 'en') {
					lang = navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en';
				}
				location.replace('/career/' + lang + '/');
			})();
		</script>
	</head>
	<body>
		<p>
			<a href="/career/zh/">中文</a> · <a href="/career/en/">English</a>
		</p>
	</body>
</html>
```

- [ ] **Step 2: 构建并验证**

Run: `npm run build && npm run preview`
浏览器打开 `http://localhost:4321/career/`
Expected: 自动跳转到 `/career/zh/`（浏览器语言为中文时）；手动执行 `localStorage.setItem('career-lang','en')` 后再访问则跳到 `/career/en/`。
浏览器打开 `http://localhost:4321/career/en/` 点击语言切换回中文，再访问根路径 → 跳到 `/career/zh/`。

- [ ] **Step 3: 提交**

```bash
git add src/pages/index.astro
git commit -m "feat: 根路径按语言偏好重定向"
```

---

### Task 5: CV 打印页与站点资源

**Files:**
- Create: `src/pages/zh/cv.astro`
- Create: `src/pages/en/cv.astro`
- Create: `public/favicon.svg`
- Modify: `src/layouts/Base.astro`（在 head 中加入 favicon 链接）

**Interfaces:**
- Consumes: `profile`、`Base`、`AcademicHome` 的样式 token
- Produces: `/career/zh/cv/`、`/career/en/cv/` 可直接打印为 A4 PDF 的页面；favicon 可用

- [ ] **Step 1: 创建 `src/pages/zh/cv.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import { profile } from '../../data/profile';
const p = profile;
const lang = 'zh' as const;
---
<Base lang="zh" title="CV · 雷双吉" description="雷双吉的简历（中英双语主页的打印版）。" path="/cv/">
	<main class="page cv">
		<p class="back"><a href={`${import.meta.env.BASE_URL}zh/`}>← 返回主页</a></p>
		<header>
			<h1>{p.name.zh} <span>{p.nameAlt.zh}</span></h1>
			<p class="meta">{p.title.zh} · {p.emailUser}@{p.emailDomain} · github.com/leisj24</p>
		</header>
		<section>
			<h2>教育背景</h2>
			<p><strong>{p.education.school.zh}</strong> · {p.education.major.zh}<br />{p.education.period.zh} · GPA {p.education.gpa} · 排名 {p.education.rank.zh}</p>
			<p>核心课程：{p.education.courses.zh}；{p.education.english.zh}</p>
		</section>
		<section>
			<h2>研究项目</h2>
			{p.research.map((r) => (
				<article>
					<h3>{r.title.zh}<small>{r.period.zh} · {r.status.zh}</small></h3>
					<p><b>问题：</b>{r.problem.zh}</p>
					<p><b>方法：</b>{r.method.zh}</p>
					<p><b>结果：</b>{r.result.zh}</p>
				</article>
			))}
		</section>
		<section>
			<h2>荣誉与实践</h2>
			<ul>{p.honors.map((h) => <li>{h.zh}（{h.year}）</li>)}</ul>
		</section>
		<section>
			<h2>技能</h2>
			<ul>{p.skills.map((s) => <li>{s.category.zh}：{s.items.join('、')}</li>)}</ul>
		</section>
	</main>
</Base>

<style is:global>
	.cv {
		max-width: 800px;
		padding-top: 2rem;
	}
	.cv .back {
		font-size: 0.85rem;
	}
	.cv header {
		border-bottom: 2px solid var(--ink);
		padding-bottom: 1rem;
		margin-bottom: 1.6rem;
	}
	.cv h1 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 2rem;
	}
	.cv h1 span {
		font-size: 1rem;
		color: var(--muted);
		font-weight: 400;
		margin-left: 0.6rem;
	}
	.cv .meta {
		margin: 0.4rem 0 0;
		color: var(--muted);
		font-size: 0.9rem;
	}
	.cv section {
		margin-bottom: 1.4rem;
	}
	.cv h2 {
		font-family: var(--font-serif);
		font-size: 1.15rem;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 0.3rem;
	}
	.cv h3 {
		font-size: 1rem;
		margin: 0.9rem 0 0.2rem;
	}
	.cv h3 small {
		color: var(--muted);
		font-weight: 400;
		margin-left: 0.6rem;
		font-size: 0.8rem;
	}
	.cv p {
		margin: 0.25rem 0;
		font-size: 0.92rem;
	}
	.cv ul {
		margin: 0.3rem 0;
		padding-left: 1.2rem;
		font-size: 0.92rem;
	}
	@media print {
		.cv .back {
			display: none;
		}
		body {
			font-size: 12px;
		}
		.cv {
			max-width: none;
			padding: 0;
		}
	}
</style>
```

- [ ] **Step 2: 创建 `src/pages/en/cv.astro`**

同结构，取 `[lang]` 为 `en` 字段：

```astro
---
import Base from '../../layouts/Base.astro';
import { profile } from '../../data/profile';
const p = profile;
---
<Base lang="en" title="CV · Shuangji Lei" description="CV of Shuangji Lei (print-friendly version of the bilingual homepage)." path="/cv/">
	<main class="page cv">
		<p class="back"><a href={`${import.meta.env.BASE_URL}en/`}>← Back to homepage</a></p>
		<header>
			<h1>{p.name.en} <span>{p.nameAlt.en}</span></h1>
			<p class="meta">{p.title.en} · {p.emailUser}@{p.emailDomain} · github.com/leisj24</p>
		</header>
		<section>
			<h2>Education</h2>
			<p><strong>{p.education.school.en}</strong> · {p.education.major.en}<br />{p.education.period.en} · GPA {p.education.gpa} · Rank {p.education.rank.en}</p>
			<p>Selected courses: {p.education.courses.en}; {p.education.english.en}</p>
		</section>
		<section>
			<h2>Research</h2>
			{p.research.map((r) => (
				<article>
					<h3>{r.title.en}<small>{r.period.en} · {r.status.en}</small></h3>
					<p><b>Problem:</b> {r.problem.en}</p>
					<p><b>Method:</b> {r.method.en}</p>
					<p><b>Result:</b> {r.result.en}</p>
				</article>
			))}
		</section>
		<section>
			<h2>Honors &amp; Service</h2>
			<ul>{p.honors.map((h) => <li>{h.en} ({h.year})</li>)}</ul>
		</section>
		<section>
			<h2>Skills</h2>
			<ul>{p.skills.map((s) => <li>{s.category.en}: {s.items.join(', ')}</li>)}</ul>
		</section>
	</main>
</Base>
```

- [ ] **Step 3: 创建 `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0f766e"/>
  <text x="32" y="43" font-family="Georgia, serif" font-size="30" fill="#faf9f6" text-anchor="middle">雷</text>
</svg>
```

- [ ] **Step 4: Base.astro head 加入 favicon**

在 `<meta name="description" ...>` 之后插入：

```html
<link rel="icon" type="image/svg+xml" href={`${base}favicon.svg`} />
```

- [ ] **Step 5: 验证 CV 页**

Run: `npm run build && npm run preview`
浏览器打开 `http://localhost:4321/career/zh/cv/` 与 `/career/en/cv/`
Expected: 版式正常；页面中无手机号（`grep -r PHONE_REDACTED dist/` 无结果，`PHONE_REDACTED` 为脱敏占位）；浏览器打印预览为 A4 单栏、无导航。
Run: `grep -rn "PHONE_REDACTED" dist/ || echo "no phone number"`
Expected: `no phone number`

- [ ] **Step 6: 提交**

```bash
git add src/pages/zh src/pages/en src/layouts/Base.astro public/favicon.svg
git commit -m "feat: 打印友好 CV 页与 favicon"
```

---

### Task 6: 部署配置、文档与端到端验证

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Create: `CLAUDE.md`
- Modify: 无

**Interfaces:**
- Consumes: Task 1–5 的全部内容
- Produces: push 到 `main` 自动部署到 GitHub Pages；项目文档

- [ ] **Step 1: 创建 `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 创建 `README.md`**

```markdown
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
```

- [ ] **Step 3: 创建 `CLAUDE.md`**

```markdown
# CLAUDE.md

## Overview

Bilingual (zh/en) single-page academic homepage for job applications, deployed at https://leisj24.github.io/career/ via GitHub Pages. Astro 6, no UI framework, no client router.

## Commands

| Command | Action |
| :-- | :-- |
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run check` | Type-check |
| `npm run preview` | Preview build |

## Conventions

- All copy lives in `src/data/profile.ts` as `{ zh, en }` pairs; never hardcode copy in components.
- Internal links must use `import.meta.env.BASE_URL` (site is served under `/career/`).
- Never publish the phone number; email is split into `data-u`/`data-d` and assembled by JS.
- Colors come from CSS variables in `src/styles/global.css` (paper/ink/teal).
- Tabs for indentation; no dark mode, no client-side framework.
```

- [ ] **Step 4: 最终端到端验证**

Run: `npm run check && npm run build && npm run preview`
浏览器验证：
1. `/career/` 跳转正确；`/career/zh/`、`/career/en/`、两个 `/cv/` 页面渲染正常
2. 语言切换记住偏好；移动端宽度（≤720px）无横向滚动
3. 邮箱点击调起 mailto；GitHub/博客链接可点
4. 控制台无错误、无 404（favicon 已补）
Run: `grep -rn "PHONE_REDACTED" dist/ || echo "no phone number"`
Expected: `no phone number`
Run: `du -sh dist/`
Expected: 字体与静态资源总量 < 1MB（Newsreader 可变字体约 300–500KB 内可接受；若超出可在 `Base.astro` 仅导入所需字重）

- [ ] **Step 5: 提交**

```bash
git add .github README.md CLAUDE.md
git commit -m "chore: Pages 部署与项目文档"
```

- [ ] **Step 6: 创建远程仓库并推送（需用户确认后执行）**

```bash
gh repo create leisj24/career --public --source=. --remote=origin
git push -u origin main
```

若直连失败，用代理：`git -c http.proxy=http://127.0.0.1:7897 push -u origin main`。
推送后在 GitHub 仓库 Settings → Pages → Source 选择 **GitHub Actions**，等待 workflow 完成，验证 `https://leisj24.github.io/career/zh/`。

---

## Self-Review

- **Spec coverage:** 信息架构（Task 3）、双语与语言切换（Task 1/3/4）、Research 含 ICT（Task 2/3）、Publications 留空占位（Task 3）、CV 下载（Task 5，改为打印页，避免 PDF 脱敏问题）、隐私（Task 1/5/6 的 grep 校验）、部署（Task 6）、验收标准全部覆盖。
- **Placeholder scan:** 所有代码与文案均为最终内容；无 TBD/TODO。
- **Type consistency:** `profile` 类型、`Lang`、`Base` props 在各任务间一致；页面路径 `/career/zh/cv/` 与 Hero 链接一致。
