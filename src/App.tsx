import React, { useState, useEffect } from 'react';
import { Mail, Phone, Printer, Edit3, Eye, EyeOff, Plus, Trash2, Award, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

interface Item {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  bullets: string[];
  tech: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface SectionVisibility {
  summary: boolean;
  education: boolean;
  experience: boolean;
  projects: boolean;
  certifications: boolean;
  skills: boolean;
  languages: boolean;
}

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  education: {
    institution: string;
    degree: string;
    date: string;
    details: string;
  }[];
  experience: Item[];
  projects: Item[];
  certifications: Certification[];
  skills: { category: string; items: string }[];
  languages: { name: string; proficiency: string }[];
}

const initialData: ResumeData = {
  personalInfo: {
    name: "Mohamed amine chennadi",
    title: "Software Engineering",
    phone: "+212 77 725 43 53",
    email: "chennadimohamedamine1@gmail.com",
    portfolio: "chennadi-mohamedamine.netlify.app",
    github: "github.com/Chennadimohamedamine",
    linkedin: "linkedin.com/in/mohamedaminechennadi/",
  },
  summary: "Driven and detail-focused software development student at 1337 Coding School, seeking a software engineering internship to apply skills and gain practical, real-world experience",
  education: [
    {
      institution: "1337 Coding School (42 Network)",
      degree: "Software Engineering Program",
      date: "11/2023 – Present",
      details: "Comprehensive software engineering curriculum with a focus on full-stack development, algorithms, and system design. Completed projects in C, C++, Python, and JavaScript, demonstrating strong problem-solving skills and adaptability to new technologies.",
    }
  ],
  experience: [],
  projects: [
    {
      id: 'exp-limited-drop',
      title: "Full-Stack Engineer – Limited Stock Product Drop System",
      subtitle: "Race-condition-safe concurrent reservation system",
      date: "2 days, 05/2026",
      bullets: [
        "Built production-ready system handling 100 concurrent users competing for limited inventory without overselling, using PostgreSQL row locking and Serializable transactions.",
        "Developed Node.js/TypeScript backend with Express and React frontend featuring real-time stock polling, 5-minute reservation countdown, and JWT authentication.",
        "Implemented automatic reservation expiry system (node-cron) and 5-model database schema with append-only audit trail for stock movement history.",
        "Created concurrency test suite validating exactly 10 out of 100 simultaneous requests succeed on limited stock.",
        "Deployed full middleware stack: JWT auth, Zod validation, rate limiting, structured logging (Winston), and centralized error handling."
      ],
      tech: "Node.js, TypeScript, Express, PostgreSQL, Prisma, React, Vite, JWT, Zod, Jest, Docker, node-cron, Winston"
    },
    {
      id: 'exp-1',
      title: "Full-Stack Developer – ActivityHub (1337 Coding School)",
      subtitle: "Collaborative web platform with real-time messaging",
      date: "01/2026 - 03/2026",
      bullets: [
        "Worked as part of a team to design and develop ActivityHub, a web platform for managing and sharing user activities.",
        "Developed responsive and modern user interfaces using React and Tailwind CSS to ensure a smooth user experience.",
        "Designed and implemented a real-time chat system, enabling users to communicate within the platform.",
        "Developed frontend components using React and TypeScript, ensuring a responsive and user-friendly interface.",
      ],
      tech: "React, TypeScript, NestJS, PostgreSQL, WebSockets, Docker, Git, Tailwind CSS",
    },
    {
      id: 'proj-5',
      title: "Personal Portfolio Website",
      subtitle: "Showcasing projects and skills with a modern React design",
      date: "01/2026 - 02/2026",
      bullets: [
        "Designed and developed a personal portfolio website using React and Tailwind CSS to showcase projects, skills, and experience.",
        "Implemented responsive design principles to ensure optimal viewing across devices, and integrated contact forms for easy communication."
      ],
      tech: "React, Tailwind CSS, JavaScript, HTML/CSS, Netlify, responsive design"
    },
    {
      id: 'proj-2',
      title: "Inception",
      subtitle: "WordPress Infrastructure Deployment",
      date: "09/2025 - 11/2025",
      bullets: [
        "Designed and deployed a containerized WordPress environment using Docker and Docker Compose for seamless service orchestration.",
        "Built custom Dockerfiles for NGINX (TLS), WordPress (PHP-FPM), and MariaDB, ensuring secure and modular configuration."
      ],
      tech: "Docker, Docker Compose, NGINX, WordPress, PHP-FPM, MariaDB, TLS",
    },
    {
      id: 'proj-1',
      title: "IRC Server",
      subtitle: "Internet Relay Chat Protocol Implementation",
      date: "04/2025 - 06/2025",
      bullets: [
        "Developed an IRC-compatible server in C++, implementing the core features of the Internet Relay Chat protocol to enable real-time text communication.",
        "Managed multiple client connections simultaneously using non-blocking I/O and multiplexing techniques."
      ],
      tech: "C++, IRC Protocol, Network Programming"
    },
    {
      id: 'proj-6',
      title: "cub3d",
      subtitle: "3D Raycasting Game Engine",
      date: "01/2025 - 03/2025",
      bullets: [
        "Implemented a 3D raycasting engine in C, rendering a dynamic environment based on a 2D map layout.",
        "Handled player movement, collision detection, and texture mapping to create an immersive gaming experience."
      ],
      tech: "C, Raycasting, 2D/3D Graphics, Game Development"
    },
    {
      id: 'proj-3',
      title: "Minishell",
      subtitle: "Custom Shell Interpreter",
      date: "07/2024 - 10/2024",
      bullets: [
        "Developed a custom shell supporting advanced command parsing, I/O redirection, and piping, with dynamic environment variable management.",
        "Implemented robust signal handling and ensured consistent, efficient behavior across diverse execution contexts."
      ],
      tech: "C, UNIX System Calls, Signals, I/O Redirection, Process Management"
    },
  ],
  certifications: [],
  skills: [
    {
      category: "Programming Languages",
      items: "C, C++, Python, JavaScript, TypeScript, Bash Script"
    },
    {
      category: "Backend & Web Development",
      items: "Node.js, NestJS, Express.js, RESTful APIs, WebSockets, React.js, Tailwind CSS, HTML5, CSS3"
    },
    {
      category: "Databases",
      items: "PostgreSQL, MongoDB, Prisma ORM, TypeORM, SQL Optimization, Database Design"
    },
    {
      category: "Systems & Low-Level Programming",
      items: "Linux Systems Programming, Unix Internals, Process Management, Signals, Memory Management, Socket Programming (TCP/IP), IRC protocol implementation"
    },
    {
      category: "DevOps & Infrastructure",
      items: "Docker, Docker Compose, Git, Linux Administration, Networking Fundamentals, CI/CD basics"
    },
    // {
    //   category: "Cybersecurity & Offensive Security",
    //   items: "Web Application Security, Reconnaissance Techniques, Bug Bounty Methodology, XSS Detection, Vulnerability Research, CTF Problem Solving"
    // },
    {
      category: "Operating Systems",
      items: "Linux, macOS, Windows"
    },
    {
      category: "Languages",
      items: "English (Intermediate), Arabic (Native/Fluent)"
    }
  ]
};

const initialVisibility: SectionVisibility = {
  summary: true,
  education: true,
  experience: true,
  projects: true,
  certifications: true,
  skills: true,
  languages: true,
};

// ATS-FRIENDLY: Clear text titles without stylized symbols (like dashes or dividers)
const SectionHeader = ({ title }: { title: string }) => (
  <div className="my-3 border-b border-gray-800 pb-0.5">
    <h2 className="text-sm font-bold uppercase tracking-wider text-black">{title}</h2>
  </div>
);

function ExperienceItem({ item, isCompact }: { item: Item; isCompact?: boolean }): React.JSX.Element {
  return (
    <article className={`mb-3 break-inside-avoid text-black ${isCompact ? 'text-[11px]' : 'text-[12px]'}`}>
      <div className="flex justify-between items-baseline font-bold">
        <h3 className="text-[12px]">{item.title}</h3>
        <span className="text-[11px] whitespace-nowrap ml-4">{item.date}</span>
      </div>
      <p className="italic text-gray-700 text-[11px] mb-1">{item.subtitle}</p>
      <ul className="list-disc list-outside ml-4 space-y-0.5 mb-1 text-gray-800">
        {item.bullets.map((bullet, i) => (
          <li key={i} className="leading-normal">{bullet}</li>
        ))}
      </ul>
      <p className="text-[11px] leading-normal text-gray-900">
        <span className="font-semibold">Core Technologies:</span> {item.tech}
      </p>
    </article>
  );
}

function SectionToggleRow({ label, visible, onToggle }: { label: string; visible: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-200">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${visible ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
          }`}
      >
        {visible ? <Eye size={12} /> : <EyeOff size={12} />}
        {visible ? 'Shown' : 'Hidden'}
      </button>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [visibility, setVisibility] = useState<SectionVisibility>(initialVisibility);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'projects' | 'certifications' | 'skills' | 'sections'>('personal');

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const toggleSection = (section: keyof SectionVisibility) => {
    setVisibility(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateItem = (type: 'experience' | 'projects', id: string, field: keyof Item, value: any) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = (type: 'experience' | 'projects') => {
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Entry", subtitle: "Subtitle", date: "Date Range",
      bullets: ["New bullet point"], tech: "Tech Stack"
    };
    setData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
  };

  const removeItem = (type: 'experience' | 'projects', id: string) => {
    setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id) }));
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const addCert = () => {
    const newCert: Certification = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Certification Name",
      issuer: "Issuing Organization",
      date: "2024",
      url: "",
    };
    setData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const removeCert = (id: string) => {
    setData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  useEffect(() => {
    const saved = localStorage.getItem('resume-data');
    if (saved) { try { setData(JSON.parse(saved)); } catch (e) { } }
    const savedVis = localStorage.getItem('resume-visibility');
    if (savedVis) { try { setVisibility(JSON.parse(savedVis)); } catch (e) { } }
  }, []);

  useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('resume-visibility', JSON.stringify(visibility));
  }, [visibility]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans print:bg-white print:p-0 print:m-0">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center no-print shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-xl hidden sm:block">ATS Resume Builder</h1>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsEditMode(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md transition-all ${isEditMode ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Edit3 size={16} /><span className="text-sm font-medium">Edit</span>
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md transition-all ${!isEditMode ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Eye size={16} /><span className="text-sm font-medium">Preview</span>
            </button>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-all shadow-md active:scale-95"
        >
          <Printer size={18} /><span className="font-medium">Print to PDF</span>
        </button>
      </div>

      <div className={`max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 p-4 sm:p-8 ${isEditMode ? '' : 'justify-center'}`}>

        {/* Editor Panel */}
        <AnimatePresence mode="wait">
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full lg:w-[450px] space-y-6 no-print"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-100 overflow-x-auto">
                  {(['personal', 'experience', 'projects', 'certifications', 'skills', 'sections'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`flex-shrink-0 px-3 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
                    >{tab}</button>
                  ))}
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {activeTab === 'personal' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Full Name</label>
                          <input value={data.personalInfo.name} onChange={e => updatePersonalInfo('name', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Title</label>
                          <input value={data.personalInfo.title} onChange={e => updatePersonalInfo('title', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Summary</label>
                        <textarea value={data.summary} onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))} rows={4} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Email</label>
                          <input value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Phone</label>
                          <input value={data.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">LinkedIn</label>
                          <input value={data.personalInfo.linkedin} onChange={e => updatePersonalInfo('linkedin', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">GitHub</label>
                          <input value={data.personalInfo.github} onChange={e => updatePersonalInfo('github', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Portfolio URL</label>
                        <input value={data.personalInfo.portfolio} onChange={e => updatePersonalInfo('portfolio', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" placeholder="yourportfolio.com" />
                      </div>
                    </div>
                  )}
                  {(activeTab === 'experience' || activeTab === 'projects') && (
                    <div className="space-y-6">
                      {data[activeTab].map((item) => (
                        <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 relative group">
                          <button onClick={() => removeItem(activeTab, item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            <Trash2 size={14} />
                          </button>
                          <div className="grid grid-cols-2 gap-3">
                            <input placeholder="Title" value={item.title} onChange={e => updateItem(activeTab, item.id, 'title', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold" />
                            <input placeholder="Date" value={item.date} onChange={e => updateItem(activeTab, item.id, 'date', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
                          </div>
                          <input placeholder="Subtitle" value={item.subtitle} onChange={e => updateItem(activeTab, item.id, 'subtitle', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm italic" />
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Bullets (one per line)</label>
                            <textarea value={item.bullets.join('\n')} onChange={e => updateItem(activeTab, item.id, 'bullets', e.target.value.split('\n'))} rows={3} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm resize-none" />
                          </div>
                          <input placeholder="Technologies used" value={item.tech} onChange={e => updateItem(activeTab, item.id, 'tech', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
                        </div>
                      ))}
                      <button onClick={() => addItem(activeTab)} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-black hover:border-black transition-all flex items-center justify-center gap-2">
                        <Plus size={18} /><span className="text-sm font-bold uppercase tracking-wider">Add {activeTab === 'experience' ? 'Experience' : 'Project'}</span>
                      </button>
                    </div>
                  )}
                  {activeTab === 'certifications' && (
                    <div className="space-y-4">
                      {data.certifications.map((cert) => (
                        <div key={cert.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 relative group">
                          <button onClick={() => removeCert(cert.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            <Trash2 size={14} />
                          </button>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Certification Name</label>
                            <input value={cert.name} onChange={e => updateCert(cert.id, 'name', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase">Issuer</label>
                              <input value={cert.issuer} onChange={e => updateCert(cert.id, 'issuer', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-400 uppercase">Date</label>
                              <input value={cert.date} onChange={e => updateCert(cert.id, 'date', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">URL (optional)</label>
                            <input value={cert.url || ''} onChange={e => updateCert(cert.id, 'url', e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
                          </div>
                        </div>
                      ))}
                      <button onClick={addCert} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-black hover:border-black transition-all flex items-center justify-center gap-2">
                        <Plus size={18} /><span className="text-sm font-bold uppercase tracking-wider">Add Certification</span>
                      </button>
                    </div>
                  )}
                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Categories</h3>
                        {data.skills.map((skill, i) => (
                          <div key={i} className="space-y-1">
                            <input value={skill.category} onChange={e => { const s = [...data.skills]; s[i].category = e.target.value; setData(p => ({ ...p, skills: s })); }} className="w-full px-3 py-1 bg-transparent border-b border-gray-100 text-xs font-bold uppercase" />
                            <textarea value={skill.items} onChange={e => { const s = [...data.skills]; s[i].items = e.target.value; setData(p => ({ ...p, skills: s })); }} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm resize-none" />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Languages</h3>
                        {data.languages.map((lang, i) => (
                          <div key={i} className="grid grid-cols-2 gap-3">
                            <input value={lang.name} onChange={e => { const l = [...data.languages]; l[i].name = e.target.value; setData(p => ({ ...p, languages: l })); }} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                            <input value={lang.proficiency} onChange={e => { const l = [...data.languages]; l[i].proficiency = e.target.value; setData(p => ({ ...p, languages: l })); }} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === 'sections' && (
                    <div className="space-y-3">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-4">Toggle sections on/off</p>
                      <SectionToggleRow label="Summary" visible={visibility.summary} onToggle={() => toggleSection('summary')} />
                      <SectionToggleRow label="Education" visible={visibility.education} onToggle={() => toggleSection('education')} />
                      <SectionToggleRow label="Experience" visible={visibility.experience} onToggle={() => toggleSection('experience')} />
                      <SectionToggleRow label="Technical Projects" visible={visibility.projects} onToggle={() => toggleSection('projects')} />
                      <SectionToggleRow label="Certifications" visible={visibility.certifications} onToggle={() => toggleSection('certifications')} />
                      <SectionToggleRow label="Technical Skills" visible={visibility.skills} onToggle={() => toggleSection('skills')} />
                      <SectionToggleRow label="Languages" visible={visibility.languages} onToggle={() => toggleSection('languages')} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resume Preview */}
        <div className={`flex-grow flex justify-center ${isEditMode ? 'lg:sticky lg:top-24 h-fit' : ''}`}>
          <div className="resume-container bg-white shadow-2xl w-full max-w-[210mm] p-[10mm] print:shadow-none text-black">

            {/* Header */}
            <header className="mb-4 text-center print:text-center border-b-2 border-black pb-3 text-framss">
              <h1 className="text-2xl font-bold tracking-tight uppercase mb-1">{data.personalInfo.name}</h1>
              <h2 className="text-sm font-medium text-gray-700 mb-2 spans">{data.personalInfo.title}</h2>

              <div className="flex flex-wrap justify-center print:justify-start print:text-[1rem] gap-x-4 gap-y-1 text-[11px] text-gray-800 font-medium text-framsss">
                <a href={`tel:${data.personalInfo.phone}`} className="flex items-center gap-1 text-black no-underline">
                  <Phone size={10} /> {data.personalInfo.phone}
                </a>

                <a href={`mailto:${data.personalInfo.email}`} className="flex items-center gap-1 text-black no-underline">
                  <Mail size={10} /> {data.personalInfo.email}
                </a>
                {data.personalInfo.portfolio && (
                  <a
                    href={`https://${data.personalInfo.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-black no-underline"
                  >
                    <Globe size={10} />
                    {data.personalInfo.portfolio}
                  </a>
                )}
                <a
                  href={`https://${data.personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-black no-underline"
                >
                  <FaGithub size={10} />
                  {data.personalInfo.github}
                </a>
                <a
                  href={`https://${data.personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-black no-underline"
                >
                  <FaLinkedinIn size={10} />
                  {data.personalInfo.linkedin}
                </a>
              </div>
            </header>

            {/* Summary */}
            {visibility.summary && (
              <section className="mb-4">
                <p className="text-[11px] leading-relaxed text-gray-900">{data.summary}</p>
              </section>
            )}
            {visibility.skills && (
              <section className="mb-4">
                <SectionHeader title="Technical Skills" />
                <div className="space-y-1 text-[11px] text-gray-900">
                  {data.skills.map((skill, i) => (
                    <p key={i} className="leading-relaxed">
                      <span className="font-bold uppercase text-[9px] tracking-wider text-gray-700 mr-2">{skill.category}:</span>
                      {skill.items}
                    </p>
                  ))}
                </div>
              </section>
            )}
            {/* Education */}
            {visibility.education && (
              <section className="mb-4">
                <SectionHeader title="Education" />
                {data.education.map((edu, i) => (
                  <article key={i} className="mb-2 text-[11px]">
                    <div className="flex justify-between items-baseline font-bold">
                      <h3 className="text-[12px] text-black">{edu.institution}</h3>
                      <span className="whitespace-nowrap ml-4">{edu.date}</span>
                    </div>
                    <p className="italic text-gray-800">{edu.degree}</p>
                    <p className="text-gray-700 mt-0.5 leading-normal">{edu.details}</p>
                  </article>
                ))}
              </section>
            )}

            {/* Experience */}
            {visibility.experience && data.experience.length > 0 && (
              <section className="mb-4">
                <SectionHeader title="Professional Experience" />
                {data.experience.map(item => (
                  <ExperienceItem key={item.id} item={item} isCompact={data.experience.length > 3} />
                ))}
              </section>
            )}

            {/* Projects */}
            {visibility.projects && (
              <section className="mb-4">
                <SectionHeader title="Technical Projects" />
                {data.projects.map(item => (
                  <ExperienceItem key={item.id} item={item} isCompact={data.projects.length > 5} />
                ))}
              </section>
            )}

            {/* Certifications */}
            {visibility.certifications && data.certifications.length > 0 && (
              <section className="mb-4">
                <SectionHeader title="Certifications" />
                <div className="space-y-1">
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-baseline break-inside-avoid text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Award size={10} className="text-gray-600 flex-shrink-0" />
                        <span className="font-bold">{cert.name}</span>
                        <span className="text-gray-700 italic">— {cert.issuer}</span>
                      </div>
                      <span className="whitespace-nowrap ml-4 font-medium">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }

        @page {
          size: 21cm 33cm;
          margin: 0;
        }
        @media print {

          a,
          a:visited {
            color: black !important;
            text-decoration: none !important;
            position: relative !important; z-index: 9999 !important; 
        }
          .header-block {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: 220mm !important;
            height: 300mm !important;
          }
          .no-print {
            display: none !important;
          }
          .resume-container {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 4px  !important;
            width: 210mm !important;
            max-width: 210mm !important;
            min-height: 0 !important;
            overflow: visible !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .text-framsss{
            font-size: 15px !important;
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 6px 10px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .resume-container p,
          .resume-container li,
          .resume-container span,
          .resume-container a {
            font-size: 10px !important;
            line-height: 1.3 !important;
            font-family: inherit !important;
            font-color: black !important;
          }
          .resume-container spans{
            font-size: 12px !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}} />
    </div>
  );
}