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
		{ zh: '华为 ICT 大赛挑战赛', en: 'Huawei ICT Competition, Challenger Track', year: '2025' },
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
		cvLink: { zh: '打印版', en: 'Print view' } as L,
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
		periodSep: { zh: '：', en: ': ' } as L,
		gpa: { zh: 'GPA', en: 'GPA' } as L,
		rank: { zh: '专业排名', en: 'Rank' } as L,
		courses: { zh: '核心课程', en: 'Selected Courses' } as L,
		english: { zh: '英语', en: 'English' } as L,
		footer: { zh: '© 2026 雷双吉 · 用 Astro 构建', en: '© 2026 Shuangji Lei · Built with Astro' } as L,
	},
};

export type Profile = typeof profile;
