'use client';

import React from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { SiPython, SiMysql } from 'react-icons/si';
import {
  FiDatabase,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiPieChart,
} from 'react-icons/fi';

const sectionTitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const skillPill =
  'inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-sm text-slate-200/90 backdrop-blur transition-colors hover:border-cyan-400/70';

const sectionOrder = [
  'hero',
  'about',
  'skills',
  'experience',
  'projects',
  'case-studies',
  'analytics',
  'github',
  'education',
  'contact',
] as const;

type SectionId = (typeof sectionOrder)[number];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const metrics = [
  { label: 'Projects Completed', value: 12 },
  { label: 'Datasets Analyzed', value: 35 },
  { label: 'Dashboards Built', value: 18 },
  { label: 'ML Models', value: 6 },
];

const githubRepos = [
  { name: 'AI Pothole Detection', link: 'https://github.com/' },
  { name: 'HR Analytics', link: 'https://github.com/' },
  { name: 'Sales Dashboard', link: 'https://github.com/' },
];

const projects = [
  {
    title: 'Sales Performance Dashboard',
    tools: ['Power BI', 'SQL'],
    description:
      'End-to-end KPI dashboard transforming raw transactional data into executive-ready insights.',
    github: 'https://github.com/',
    caseStudy: {
      problem:
        'Leadership lacked a unified view of regional sales performance, discounting, and profitability trends.',
      dataset:
        'Historical sales transactions with order date, customer, region, segment, revenue, discounts, and targets.',
      process: [
        'Validated and cleaned raw transactional data, handling missing values and inconsistent region codes.',
        'Performed EDA to understand seasonality, outliers, and product performance.',
        'Modeled star schema and published interactive Power BI dashboards with drill-through capabilities.',
      ],
      insights: [
        'Identified underperforming regions with high discounting but low margin.',
        'Surfaced products driving 60% of revenue but only 30% of margin.',
      ],
      impact:
        'Enabled data-driven decisions on pricing and territory focus, improving visibility for sales leadership.',
    },
  },
  {
    title: 'HR Analytics Project',
    tools: ['Python', 'Excel'],
    description:
      'Workforce analytics to understand attrition, performance, and hiring pipeline effectiveness.',
    github: 'https://github.com/',
    caseStudy: {
      problem:
        'HR team needed visibility into attrition drivers and headcount trends to support workforce planning.',
      dataset:
        'Employee records including demographics, tenure, performance rating, compensation, and exit data.',
      process: [
        'Cleaned and standardized HR data from multiple spreadsheets.',
        'Performed EDA with cohort and tenure-based analysis using Pandas.',
        'Built Excel dashboards summarizing attrition, performance, and hiring funnel KPIs.',
      ],
      insights: [
        'Highlighted higher attrition in specific tenure bands and job roles.',
        'Revealed compensation gaps across grades impacting retention.',
      ],
      impact:
        'Helped HR prioritize retention initiatives and adjust hiring plans for high-risk roles.',
    },
  },
  {
    title: 'AI-Based Pothole Detection',
    tools: ['YOLOv5', 'Streamlit'],
    description:
      'Real-time computer vision solution to detect road potholes with an interactive UI.',
    github: 'https://github.com/',
    caseStudy: {
      problem:
        'Manual road inspection was slow and inconsistent, delaying maintenance scheduling.',
      dataset:
        'Image and video data of roads labeled for pothole vs. non-pothole areas.',
      process: [
        'Prepared and augmented image dataset for robust detection.',
        'Trained YOLOv5 model and evaluated detection precision/recall.',
        'Deployed an interactive Streamlit UI for real-time video inference.',
      ],
      insights: [
        'Achieved high-precision pothole detection on varied road conditions.',
        'Visual overlays simplified communication of risk zones to stakeholders.',
      ],
      impact:
        'Demonstrated a scalable approach for proactive road maintenance planning.',
    },
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = React.useState<SectionId>('hero');
  const mainRef = React.useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start start', 'end end'],
  });

  const progressWidth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  React.useEffect(() => {
    const sections = sectionOrder
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );

        if (visible[0]) {
          const id = visible[0].target.id as SectionId;
          setActiveSection(id);
        }
      },
      {
        root: null,
        threshold: 0.35,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 text-slate-100">
      <motion.div
        className="fixed left-0 top-0 z-40 h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"
        style={{ scaleX: progressWidth }}
      />

      <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/40" />
            <span className="text-sm font-medium tracking-tight text-slate-200 sm:text-base">
              ManasRam M
            </span>
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {[
              'about',
              'skills',
              'experience',
              'projects',
              'analytics',
              'github',
              'education',
              'contact',
            ].map((id) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`group relative overflow-hidden text-xs uppercase tracking-[0.16em] transition ${
                    isActive
                      ? 'text-cyan-300'
                      : 'text-slate-300/90 hover:text-cyan-200'
                  }`}
                >
                  <span className="relative z-10">
                    {id === 'github' ? 'GitHub' : id}
                  </span>
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px translate-y-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-indigo-500/0 transition-opacity duration-300 ${
                      isActive
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:from-cyan-300 hover:to-indigo-400 md:text-sm"
          >
            Let&apos;s Talk
          </motion.button>
        </nav>
      </header>

      <main
        ref={mainRef}
        className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-16"
      >
        <section
          id="hero"
          className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950 px-6 py-10 shadow-2xl shadow-cyan-950/70 sm:px-10 lg:flex lg:items-center lg:gap-10 lg:py-14"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ y: heroParallaxY }}
          >
            <motion.div
              className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl"
              animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl"
              animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
              transition={{
                duration: 22,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, 25, 0], scale: [1, 1.12, 1] }}
              transition={{
                duration: 24,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.16)_0,_transparent_60%)]" />

          <div className="relative flex-1 space-y-6">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-100/90 backdrop-blur"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Data Analyst · Data Science Graduate
              <span className="h-1 w-1 rounded-full bg-cyan-300" />
            </motion.p>
            <motion.h1
              className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              ManasRam M
            </motion.h1>
            <motion.p
              className="text-lg font-medium text-cyan-200/90 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Data Analyst | Turning Data into Business Insights
            </motion.p>
            <motion.p
              className="max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              Data Analyst skilled in Python, SQL, and Power BI with experience
              building dashboards, performing exploratory data analysis, and
              developing machine learning solutions to solve real-world business
              problems.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
              >
                View Projects
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <a
                href="/ManasRam_Data_Analyst_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/70 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-md shadow-slate-900/70 backdrop-blur transition hover:border-cyan-400 hover:text-cyan-200"
              >
                Download Resume
              </a>
            </motion.div>

            <motion.div
              className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300/80"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Core stack
              </span>
              <motion.span
                className={skillPill}
                whileHover={{ scale: 1.03, y: -1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <SiPython className="h-4 w-4 text-cyan-300" />
                Python · Pandas
              </motion.span>
              <motion.span
                className={skillPill}
                whileHover={{ scale: 1.03, y: -1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <FiDatabase className="h-4 w-4 text-sky-300" />
                SQL · Queries
              </motion.span>
              <motion.span
                className={skillPill}
                whileHover={{ scale: 1.03, y: -1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <FiPieChart className="h-4 w-4 text-yellow-300" />
                Power BI Dashboards
              </motion.span>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        <motion.section
          id="about"
          className="mt-16 grid gap-8 rounded-3xl border border-slate-800/60 bg-slate-950/70 px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.8)] backdrop-blur-xl sm:px-10 lg:grid-cols-[3fr,2fr]"
          variants={sectionTitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              About
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-base">
              I focus on using data analytics to generate clear, actionable
              business insights. From cleaning raw datasets to building
              production-ready dashboards and machine learning models, I connect
              analytical workflows to real business questions and decisions.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-base">
              My work emphasizes high-quality data foundations, transparent
              analysis, and storytelling with visuals so that stakeholders can
              move from intuition-driven decisions to evidence-based strategies.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-200/90">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Strengths
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              {[
                'Data Cleaning',
                'Exploratory Data Analysis',
                'Dashboard Creation',
                'KPI Reporting',
                'Machine Learning Solutions',
                'Business Insights',
              ].map((item, idx) => (
                <motion.div
                  key={item}
                  custom={idx}
                  variants={cardVariants}
                  className="rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 text-slate-200/90 shadow-lg shadow-slate-950/40 backdrop-blur-md"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="skills"
          className="mt-16 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionTitleVariants}>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Skills
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              A focused toolkit across programming, analytics, visualization,
              and core analytical thinking.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            <motion.div
              className="group rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-cyan-900/40 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-cyan-500/40"
              variants={cardVariants}
              custom={0}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                  Programming &amp; Analytics
                </h3>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] text-cyan-300">
                  Core
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <SiPython className="h-4 w-4 text-cyan-300" />
                  <span>Python (Pandas, EDA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <SiMysql className="h-4 w-4 text-sky-300" />
                  <span>SQL</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-indigo-900/40 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-indigo-500/40"
              variants={cardVariants}
              custom={1}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                  Data Visualization
                </h3>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] text-indigo-300">
                  Storytelling
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <FiPieChart className="h-4 w-4 text-yellow-300" />
                  <span>Power BI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-md bg-gradient-to-tr from-emerald-400 to-cyan-400" />
                  <span>Excel Dashboards</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/60 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-cyan-500/30"
              variants={cardVariants}
              custom={2}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                  Tools
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300 sm:text-sm">
                {['Excel', 'MySQL', 'RDBMS'].map((tool) => (
                  <span key={tool} className={skillPill}>
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="group rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/60 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-cyan-500/30"
              variants={cardVariants}
              custom={3}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                  Core Skills
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300 sm:text-sm">
                {[
                  'Data Cleaning',
                  'Exploratory Data Analysis',
                  'KPI Reporting',
                  'Business Insights',
                ].map((skill) => (
                  <span key={skill} className={skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="experience"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionTitleVariants}>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Experience
            </h2>
          </motion.div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <motion.article
              className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-cyan-900/40 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-cyan-500/40"
              variants={cardVariants}
              custom={0}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-slate-950/80" />
              <div className="relative space-y-2">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                  Data Analytics Intern
                </h3>
                <p className="text-xs font-medium text-cyan-200 sm:text-sm">
                  Luminar Technolab · Feb 2026 – Present
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                  <li>Analyzing datasets to uncover performance and process trends.</li>
                  <li>Creating Power BI dashboards for business and operations teams.</li>
                  <li>Executing data analysis using SQL and Python for ad-hoc requests.</li>
                </ul>
              </div>
            </motion.article>

            <motion.article
              className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-emerald-900/40 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-emerald-500/40"
              variants={cardVariants}
              custom={1}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-slate-950/80" />
              <div className="relative space-y-2">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                  AI &amp; Sustainability Intern
                </h3>
                <p className="text-xs font-medium text-emerald-200 sm:text-sm">
                  Edunet Foundation · Feb 2025 – Mar 2025
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                  <li>Built a machine learning waste segregation system.</li>
                  <li>Applied AI techniques to practical sustainability challenges.</li>
                  <li>Implemented and evaluated classification models for waste categories.</li>
                </ul>
              </div>
            </motion.article>
          </div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="projects"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionTitleVariants}>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Projects
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Selected work across dashboards, analytics, and applied AI.
            </p>
          </motion.div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/70 p-[1px] shadow-xl shadow-slate-950/80 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2"
                custom={index}
                variants={cardVariants}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2)_0,transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.16)_0,transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col rounded-[1.3rem] bg-slate-950/90 p-4">
                  <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-slate-900/80 px-2 py-1 text-[11px] text-slate-200/90"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <button
                      onClick={() => scrollToSection('case-studies')}
                      className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-200/90 hover:text-cyan-100"
                    >
                      View case study
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-slate-700/70 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-100 shadow-md shadow-cyan-900/40 transition hover:border-cyan-400 hover:text-cyan-200 hover:shadow-cyan-500/50"
                    >
                      <FiGithub className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="case-studies"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionTitleVariants}>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Case Studies
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Deep dives into how data was transformed into business impact.
            </p>
          </motion.div>

          <div className="mt-6 space-y-4">
            {projects.map((project, index) => (
              <ExpandableCaseStudy key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="analytics"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionTitleVariants}>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Analytics Snapshot
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              A mini dashboard showcasing portfolio activity.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 grid gap-6 lg:grid-cols-[2fr,2fr,1.5fr]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
              variants={cardVariants}
              custom={0}
            >
              <h3 className="text-sm font-semibold text-slate-50">Projects Bar Chart</h3>
              <p className="mt-1 text-xs text-slate-400">
                Distribution across completed projects and dashboards.
              </p>
              <div className="mt-4 h-40 rounded-2xl bg-slate-900/70 p-3">
                <div className="flex h-full items-end gap-2">
                  {metrics.map((metric, idx) => (
                    <motion.div
                      key={metric.label}
                      className="flex-1"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + idx * 0.1,
                        ease: 'easeOut',
                      }}
                      style={{ transformOrigin: 'bottom' }}
                    >
                      <div className="mx-auto h-full max-h-28 rounded-full bg-gradient-to-t from-cyan-500/40 to-cyan-300" />
                      <p className="mt-1 text-center text-[10px] text-slate-400">
                        {metric.label.split(' ')[0]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
              variants={cardVariants}
              custom={1}
            >
              <h3 className="text-sm font-semibold text-slate-50">Activity Line Chart</h3>
              <p className="mt-1 text-xs text-slate-400">
                Example monthly analytics work volume.
              </p>
              <div className="mt-4 h-40 rounded-2xl bg-slate-900/70 p-3">
                <motion.svg
                  viewBox="0 0 200 80"
                  className="h-full w-full"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease: 'easeOut' }}
                >
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 60 C 20 50, 40 30, 60 40 S 100 20, 120 35 S 160 25, 200 30 L 200 80 L 0 80 Z"
                    fill="url(#areaGradient)"
                    stroke="none"
                  />
                  <motion.path
                    d="M0 60 C 20 50, 40 30, 60 40 S 100 20, 120 35 S 160 25, 200 30"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2.2"
                  />
                </motion.svg>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
              variants={cardVariants}
              custom={2}
            >
              <h3 className="text-sm font-semibold text-slate-50">Skills Pie Chart</h3>
              <p className="mt-1 text-xs text-slate-400">
                Illustration of focus across skill categories.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <motion.div
                  className="relative h-24 w-24"
                  initial={{ rotate: -90, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                  <svg viewBox="0 0 36 36" className="h-full w-full">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="3"
                      strokeDasharray="60,100"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeDasharray="25,100"
                      strokeDashoffset="-60"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeDasharray="15,100"
                      strokeDashoffset="-85"
                    />
                  </svg>
                  <div className="absolute inset-3 rounded-full bg-slate-950/90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-slate-100">
                      Analytics
                    </span>
                  </div>
                </motion.div>
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                    <span>Dashboards &amp; Reporting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    <span>Exploratory Data Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    <span>Machine Learning</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="github"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionTitleVariants}>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              GitHub Activity
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              A snapshot of recent repositories and an example contribution
              graph.
            </p>
          </motion.div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[3fr,2fr]">
            <motion.div
              className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
              variants={cardVariants}
              custom={0}
            >
              <p className="text-xs font-medium text-slate-400">
                Mock Contribution Graph
              </p>
              <div className="mt-3 grid grid-cols-14 gap-1 text-[9px] text-slate-500">
                {Array.from({ length: 14 * 6 }).map((_, idx) => {
                  const intensity = (idx * 13) % 4;
                  const colors = [
                    'bg-slate-800',
                    'bg-emerald-900/70',
                    'bg-emerald-700/80',
                    'bg-emerald-500/90',
                  ];
                  return (
                    <motion.div
                      key={idx}
                      className={`h-2.5 w-2.5 rounded-[4px] ${colors[intensity]}`}
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.02 * (idx % 14),
                      }}
                    />
                  );
                })}
              </div>
              <p className="mt-3 text-[10px] text-slate-500">
                Visual representation only. Connect your real GitHub data when
                deploying.
              </p>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
              variants={cardVariants}
              custom={1}
            >
              <p className="text-xs font-medium text-slate-400">
                Latest Repositories
              </p>
              <div className="mt-3 space-y-3 text-sm text-slate-200/90">
                {githubRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 transition hover:border-cyan-400 hover:text-cyan-200"
                  >
                    <span>{repo.name}</span>
                    <FiGithub className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="education"
          className="mt-16 grid gap-6 lg:grid-cols-[1.6fr,1.4fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
            variants={cardVariants}
            custom={0}
          >
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Education
            </h2>
            <div className="mt-4 space-y-1 text-sm text-slate-200/90">
              <p className="font-medium">
                Bachelor of Computer Applications (BCA) – Data Science
              </p>
              <p className="text-slate-300">
                Acharya Institute of Graduate Studies
              </p>
              <p className="text-slate-400">Bangalore City University</p>
              <p className="text-xs text-slate-400">2022 – 2025</p>
            </div>
          </motion.div>

          <motion.div
            id="certifications"
            className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
            variants={cardVariants}
            custom={1}
          >
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Certifications
            </h2>
            <div className="mt-4 space-y-4 text-sm text-slate-200/90">
              <div>
                <p className="font-medium">IBM Data Science Certification</p>
                <p className="mt-1 text-xs text-slate-400">Topics:</p>
                <ul className="mt-1 space-y-1 text-xs text-slate-300">
                  <li>RDBMS</li>
                  <li>Data Visualization</li>
                  <li>Big Data (Spark &amp; Scala)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Advanced Python Certification</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <SectionDivider />

        <motion.section
          id="contact"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionTitleVariants}>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Contact
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Prefer a quick call, email, or LinkedIn message? Reach out using
              any channel below.
            </p>
          </motion.div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr,1.8fr]">
            <motion.div
              className="space-y-3 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
              variants={cardVariants}
              custom={0}
            >
              <div className="flex items-center gap-2 text-sm text-slate-200/90">
                <FiMail className="h-4 w-4 text-cyan-300" />
                <a
                  href="mailto:your.email@example.com"
                  className="hover:text-cyan-200"
                >
                  manasram9933@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200/90">
                <FiPhone className="h-4 w-4 text-cyan-300" />
                <span>+91-9446269845</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200/90">
                <FiLinkedin className="h-4 w-4 text-cyan-300" />
                <a
                  href="https://www.linkedin.com/in/manasram-m-data-business-analyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-200"
                >
                  LinkedIn Profile
                </a>
              </div>
            </motion.div>

            <motion.form
              className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
              variants={cardVariants}
              custom={1}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />
              <div className="relative space-y-3 text-sm">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Contact Form
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">Name</label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/60"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300">Subject</label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300">Message</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/60"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:from-cyan-300 hover:to-indigo-400"
                >
                  Send Message
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

type Project = (typeof projects)[number];

function ExpandableCaseStudy({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      className="overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/70 shadow-xl shadow-slate-950/80 backdrop-blur-xl"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            Case Study
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-50 sm:text-base">
            {project.title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/70 text-lg text-slate-300"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="px-5 pb-5 text-sm text-slate-200/90"
      >
        {open && (
          <div className="space-y-3 pt-1 text-xs sm:text-sm">
            <CaseStudyRow label="Problem" text={project.caseStudy.problem} />
            <CaseStudyRow label="Dataset" text={project.caseStudy.dataset} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Process
              </p>
              <ul className="mt-1.5 space-y-1.5 text-slate-300">
                {project.caseStudy.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Insights
              </p>
              <ul className="mt-1.5 space-y-1.5 text-slate-300">
                {project.caseStudy.insights.map((insight) => (
                  <li key={insight}>{insight}</li>
                ))}
              </ul>
            </div>
            <CaseStudyRow label="Impact" text={project.caseStudy.impact} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CaseStudyRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-slate-300">{text}</p>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-[0.5px]" />
    </div>
  );
}
