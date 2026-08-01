'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Data: Skills ─────────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: 'Languages',
    icon: '💻',
    items: ['Python', 'SQL', 'JavaScript', 'R'],
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
    text: 'text-cyan-300',
  },
  {
    category: 'Frameworks',
    icon: '⚙️',
    items: ['Django', 'Django REST Framework', 'Django Channels', 'Celery', 'React', 'Next.js', 'Scikit-learn', 'TensorFlow'],
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/20',
    text: 'text-purple-300',
  },
  {
    category: 'AI / Agentic Tooling',
    icon: '🤖',
    items: ['Anthropic Claude SDK', 'Google Gemini API', 'Tool/Function calling over ORM data'],
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/20',
    text: 'text-blue-300',
  },
  {
    category: 'Data & BI',
    icon: '📊',
    items: ['PostgreSQL', 'MySQL', 'Jupyter Notebook', 'Power BI', 'Advanced Microsoft Excel', 'R Studio'],
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
    text: 'text-emerald-300',
  },
  {
    category: 'Other',
    icon: '🔧',
    items: ['HTML/CSS', 'Git', 'Linux/Bash', 'ReportLab', 'django-anymail', 'Firebase'],
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
    text: 'text-amber-300',
  },
];

const EDUCATION = [
  {
    degree: 'B.Sc (Ed) Mathematics / Computer Science',
    institution: 'University of Agriculture, Makurdi',
    period: 'Jan 2012 – Jun 2017',
    icon: '🎓',
  },
  {
    degree: 'Certificate in Full Stack Development',
    institution: 'CodeCampus International',
    period: '2024',
    icon: '💻',
  },
  {
    degree: 'Certificate in Data Science',
    institution: 'DataLab Nigeria',
    period: '2022',
    icon: '📊',
  },
  {
    degree: 'Data Science Coursework',
    institution: 'Coursera.org',
    period: 'Online',
    icon: '📚',
    highlights: [
      'Queried school databases using SQLite.',
      'Built Power BI dashboards.',
      'Learned Python programming and the rudiments of data science.'
    ],
  },
];

const TYPE_COLORS = {
  'Full-time':   'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'Internship':  'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'Teaching':    'bg-amber-500/15 text-amber-300 border-amber-500/25',
  'Training':    'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'Development': 'bg-blue-500/15 text-blue-300 border-blue-500/25',
};

// ─── Reveal Hook ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ hasCV, cvFilename }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-sm font-bold gradient-text" style={{ fontFamily: 'var(--font-space)' }}>
          AM
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CV + Admin */}
        <div className="hidden md:flex items-center gap-3">
          {hasCV && (
            <a
              href={`/uploads/${cvFilename}`}
              download
              id="nav-download-cv"
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
            >
              ⬇ Download CV
            </a>
          )}
          <a
            href="/admin"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            Admin
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-card border-t border-white/5 px-4 pb-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          {hasCV && (
            <a
              href={`/uploads/${cvFilename}`}
              download
              className="block text-sm text-cyan-400 py-1"
            >
              ⬇ Download CV
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ hasCV, cvFilename }) {
  const roles = [
    'Data Scientist',
    'Software Engineer',
    'AI Enthusiast',
    'Python Developer',
    'Full-Stack Developer',
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen hero-bg flex items-center justify-center overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Introduction ── */}
          <div className="text-left mt-12 md:mt-16">
            {/* Name + role */}
            <h1
              className="text-4xl sm:text-5xl font-bold mb-3 leading-tight"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              <span className="block text-lg sm:text-xl text-cyan-400 font-medium mb-2 tracking-wide uppercase">Who is</span>
              <span className="text-white">Asemakaha </span>
              <span className="gradient-text">Mande?</span>
            </h1>

            {/* Typewriter */}
            <div className="h-9 flex items-center mb-5">
              <p className="text-lg sm:text-xl text-slate-400 font-medium">
                <span className="text-cyan-400">{displayed}</span>
                <span className="animate-pulse text-cyan-400">|</span>
              </p>
            </div>

            {/* Full introduction */}
            <p className="text-slate-300 text-base leading-relaxed mb-4">
              Having successfully transitioned from a classroom teacher to a self-driven programmer, I am now a <span className="text-purple-400 font-semibold">Software Engineer</span> specializing in{' '}
              <span className="text-cyan-400 font-semibold">Django and Python</span>, with hands-on experience building multi-tenant SaaS products, integrating <span className="text-blue-400 font-semibold">AI/agentic tool-calling</span> into production applications, and delivering data-driven solutions.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              I am passionate about using technology and mentorship to grow software engineering, data science, and AI talent, and about combining a self-driven appetite for new skills with practical delivery.
            </p>

            {/* Quick highlights */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                '🐍 Python & Django',
                '🤖 AI & Tool-calling',
                '☁️ SaaS Architecture',
                '📊 Data & PostgreSQL',
                '⚛️ React & Next.js',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium glass-card border border-white/8 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#experience"
                id="view-work-btn"
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/20"
              >
                View Experience
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/15 text-white hover:border-purple-400/40 hover:bg-white/5 hover:scale-105 transition-all duration-200"
              >
                See Projects
              </a>
              {hasCV && (
                <a
                  href={`/uploads/${cvFilename}`}
                  download
                  id="download-cv-hero"
                  className="px-6 py-3 rounded-xl font-semibold text-sm border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-200"
                >
                  ⬇ CV
                </a>
              )}
            </div>

            {/* Social */}
            <div className="flex items-center gap-5 mt-7">
              <a
                href="https://github.com/asemakahamande"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <span className="text-slate-700">·</span>
              <a
                href="https://linkedin.com/in/asemakahamande"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <span className="text-slate-700">·</span>
              <a href="mailto:asemakahamande01@gmail.com" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">
                Email
              </a>
              <span className="text-slate-700">·</span>
              <a href="tel:+2348113320219" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">
                Phone
              </a>
            </div>
          </div>

          {/* ── RIGHT: Highlights ── */}
          <div className="hidden lg:grid grid-cols-1 gap-4">
            {[
              {
                icon: '📊',
                title: 'Data Science & Analytics',
                desc: 'SQL, Power BI dashboards, machine learning models (Scikit-learn), statistical analysis and data visualisation.',
                color: 'border-cyan-500/20',
                glow: 'hover:border-cyan-400/40',
              },
              {
                icon: '🌐',
                title: 'Full-Stack Development',
                desc: 'Python/Django backends, React & Next.js frontends, REST APIs, MySQL, and HTML/CSS.',
                color: 'border-purple-500/20',
                glow: 'hover:border-purple-400/40',
              },
              {
                icon: '🤖',
                title: 'AI & Machine Learning',
                desc: 'TensorFlow, Scikit-learn, Jupyter Notebook — price prediction, revenue forecasting, and model evaluation.',
                color: 'border-blue-500/20',
                glow: 'hover:border-blue-400/40',
              },
              {
                icon: '🎓',
                title: 'Teaching & Mentorship',
                desc: 'Teaching Python, Excel, HTML/CSS to students at ICT Hub, Satellite Academy, and CodeCampusInternational.',
                color: 'border-amber-500/20',
                glow: 'hover:border-amber-400/40',
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`glass-card rounded-xl p-4 border ${card.color} ${card.glow} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{card.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'var(--font-space)' }}>
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-xs">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent animate-bounce" />
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-10 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="reveal space-y-5">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Building{' '}
              <span className="gradient-text">data-driven solutions</span>{' '}
              for tomorrow
            </h2>
            <p className="text-slate-400 leading-relaxed">
              My mission is to build myself and a generation of people who are hungry to change the world
              through Data Science/Analytics, Software Engineering, and Artificial Intelligence.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I develop myself and youths who will take consultancy positions in Software Engineering,
              Data Science, AI and Digital Marketing — proficient in delivering projects with well-informed
              advancements in technology.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I build a group of future leaders who combine tireless hunger for new skills with a desire
              to exploit cutting-edge technology.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {['Data Science', 'AI & ML', 'Full-Stack Dev', 'Mentorship'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium glass-card border border-white/8 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats cards */}
          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { value: '4+', label: 'Years Teaching', icon: '🎓' },
              { value: '3+', label: 'Years in Data', icon: '📊' },
              { value: '5+', label: 'Tech Stacks', icon: '🔧' },
              { value: '∞', label: 'Curiosity', icon: '🚀' },
            ].map(({ value, label, icon }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-200"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-2xl font-bold gradient-text mb-1" style={{ fontFamily: 'var(--font-space)' }}>
                  {value}
                </div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 bg-[#060d1f]/50">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Skills</span>
            <span className="w-10 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
            Technical Expertise
          </h2>
        </div>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className={`glass-card rounded-2xl p-5 border bg-gradient-to-b ${group.color} ${group.border}
                          hover:scale-[1.02] hover:shadow-lg transition-all duration-300`}
            >
              <div className="text-2xl mb-3">{group.icon}</div>
              <h3 className={`text-sm font-bold mb-3 ${group.text}`} style={{ fontFamily: 'var(--font-space)' }}>
                {group.category}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((skill) => (
                  <li key={skill} className="text-slate-400 text-xs flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${group.text} opacity-70`} style={{ background: 'currentColor' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience({ experience }) {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
            Professional Journey
          </h2>
        </div>

        <div className="relative timeline-line pl-8 space-y-8">
          {experience.map((item, i) => (
            <div key={item.id} className="reveal relative">
              {/* Dot */}
              <div className="absolute -left-[25px] top-4 w-3 h-3 rounded-full border-2 border-cyan-400 bg-[#03060f]" />

              <div
                className={`glass-card rounded-2xl p-6 border hover:scale-[1.01] transition-all duration-300 ${
                  i % 2 === 0 ? 'glow-cyan' : 'glow-purple'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-white text-base mb-0.5" style={{ fontFamily: 'var(--font-space)' }}>
                      {item.title}
                    </h3>
                    <p className="text-cyan-400 text-sm font-medium">{item.company}</p>
                    <p className="text-slate-500 text-xs">{item.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[item.type] || 'bg-slate-500/20 text-slate-400 border-slate-500/20'}`}>
                      {item.type}
                    </span>
                    <span className="text-slate-500 text-xs">{item.period}</span>
                  </div>
                </div>

                {Array.isArray(item.responsibilities) && item.responsibilities.length > 0 && (
                  <ul className="space-y-1.5 mt-3">
                    {item.responsibilities.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                        <span className="text-cyan-400 mt-0.5 flex-shrink-0">›</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects({ projects }) {
  const categoryColors = {
    'Portfolio': 'text-cyan-300 border-cyan-500/25',
    'Machine Learning': 'text-purple-300 border-purple-500/25',
    'Data Analytics': 'text-amber-300 border-amber-500/25',
    'Data Engineering': 'text-emerald-300 border-emerald-500/25',
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-[#060d1f]/50">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Projects</span>
            <span className="w-10 h-px bg-gradient-to-r from-purple-400 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
            Featured Work
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Explore more on{' '}
            <a
              href="https://github.com/asemakahamande"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              GitHub →
            </a>
          </p>
        </div>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 flex flex-col hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">{['🧠', '📈', '📊', '🗄️'][i % 4]}</span>
                    {project.category && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[project.category] || 'text-slate-400 border-slate-500/25'}`}>
                        {project.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:gradient-text transition-all" style={{ fontFamily: 'var(--font-space)' }}>
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-slate-400 border border-white/8"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              {project.link && project.link !== '#' && (
                <div className="mt-auto pt-4 border-t border-white/5">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
            Academic Background
          </h2>
        </div>

        <div className="reveal space-y-5">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{edu.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-0.5" style={{ fontFamily: 'var(--font-space)' }}>
                    {edu.degree}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium mb-1">{edu.institution}</p>
                  <p className="text-slate-500 text-xs mb-3">{edu.period}</p>
                  {edu.highlights && (
                    <ul className="space-y-1">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="text-cyan-400 mt-0.5 flex-shrink-0">›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ hasCV, cvFilename }) {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-[#060d1f]/50">
      <div className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Contact</span>
            <span className="w-10 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-space)' }}>
            Let's Connect
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Open to collaborations, consultancy, and exciting opportunities in data science and software engineering.
          </p>
        </div>

        <div className="reveal grid sm:grid-cols-2 gap-5 mb-8">
          {[
            { icon: '📧', label: 'Email', value: 'asemakahamande01@gmail.com', href: 'mailto:asemakahamande01@gmail.com' },
            { icon: '📱', label: 'Phone', value: '+234 705 735 9429', href: 'tel:+2347057359429' },
            { icon: '📱', label: 'Alt. Phone', value: '+234 903 998 2165', href: 'tel:+2349039982165' },
            { icon: '📍', label: 'Location', value: 'House 076 Dunamis St, Karshi, Abuja', href: null },
          ].map(({ icon, label, value, href }) => (
            <div key={label} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-lg flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                {href ? (
                  <a href={href} className="text-slate-200 text-sm font-medium hover:text-cyan-400 transition-colors">
                    {value}
                  </a>
                ) : (
                  <p className="text-slate-200 text-sm font-medium">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub + CV */}
        <div className="reveal flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/asemakahamande"
            target="_blank"
            rel="noopener noreferrer"
            id="github-contact-link"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold glass-card border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub Profile
          </a>
          <a
            href="https://linkedin.com/in/asemakahamande"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold glass-card border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn Profile
          </a>
          {hasCV && (
            <a
              href={`/uploads/${cvFilename}`}
              download
              id="contact-download-cv"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              ⬇ Download CV
            </a>
          )}
        </div>


      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-white/5 text-center text-slate-600 text-xs">
      <p>
        © {new Date().getFullYear()} Asemakaha Mande · Built with Next.js ·{' '}
        <a href="/admin" className="hover:text-cyan-400 transition-colors">Admin</a>
      </p>
    </footer>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function PortfolioClient({ experience, projects, cv }) {
  useReveal();

  const hasCV = Boolean(cv?.filename);
  const cvFilename = cv?.filename;

  return (
    <>
      <Nav hasCV={hasCV} cvFilename={cvFilename} />
      <Hero hasCV={hasCV} cvFilename={cvFilename} />
      <About />
      <Skills />
      <Experience experience={experience} />
      <Projects projects={projects} />
      <Education />
      <Contact hasCV={hasCV} cvFilename={cvFilename} />
      <Footer />
    </>
  );
}
