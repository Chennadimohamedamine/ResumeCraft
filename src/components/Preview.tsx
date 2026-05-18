import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import type { ResumeData } from '../types';

interface PreviewProps {
  data: ResumeData;
  themeColor: string;
  fontFamily: string;
  templateId: 'classic' | 'modern';
}

export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>(({ data, themeColor, fontFamily, templateId }, ref) => {
  if (templateId === 'modern') {
    return (
      <div
        ref={ref}
        className="resume-container w-[210mm] min-h-[297mm] bg-white flex shadow-2xl mx-auto rounded-lg overflow-hidden text-slate-800"
        style={{ fontFamily }}
      >
        {/* Left Sidebar */}
        <aside className="w-1/3 bg-slate-900 p-10 text-white flex flex-col gap-8">
          <div className="space-y-4">
            <div className="w-24 h-1 px-1" style={{ backgroundColor: themeColor }} />
            <h1 className="text-3xl font-bold tracking-tight leading-none uppercase">
              {data.personalInfo.fullName.split(' ')[0]}<br/>
              <span style={{ color: themeColor }}>{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              {data.personalInfo.title}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2">Contact</h2>
            <div className="space-y-3 text-xs text-slate-300">
              {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.location}</div>}
              {data.personalInfo.website && <div className="flex items-center gap-2"><Globe size={12} /> {data.personalInfo.website}</div>}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="text-[10px] px-2 py-1 bg-slate-800 rounded">{skill}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12 bg-white flex flex-col gap-10">
          <section>
            <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 pl-4" style={{ borderColor: themeColor }}>
              {data.personalInfo.summary}
            </p>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
              <span className="flex-shrink-0">Experience</span>
              <div className="h-px bg-slate-200 flex-1" />
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l border-slate-100">
                  <div className="absolute w-2 h-2 rounded-full -left-[4.5px] top-1.5" style={{ backgroundColor: themeColor }} />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold">{exp.position}</h3>
                    <span className="text-[10px] font-bold text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mb-2">{exp.company}</p>
                  <div className="text-xs text-slate-600 leading-relaxed prose-slate max-w-none">
                    <ReactMarkdown>{exp.description}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
              <span className="flex-shrink-0">Education</span>
              <div className="h-px bg-slate-200 flex-1" />
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">{edu.school}</h3>
                    <span className="text-[10px] text-slate-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-500">{edu.degree} in {edu.field}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Classic Template
  return (
    <div
      ref={ref}
      className="resume-container w-[210mm] min-h-[297mm] bg-white p-[20mm] mx-auto text-slate-800"
      style={{ fontFamily }}
    >
      {/* Header */}
      <header className="mb-8 border-b-2 pb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-bold mb-2 tracking-tight" style={{ color: themeColor }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl font-medium text-slate-600 mb-4">{data.personalInfo.title || 'Professional Title'}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail size={14} style={{ color: themeColor }} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} style={{ color: themeColor }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} style={{ color: themeColor }} />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe size={14} style={{ color: themeColor }} />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>
          Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-800">{exp.position}</h3>
                <span className="text-xs font-medium text-slate-500">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-semibold text-slate-600">{exp.company}</span>
                <span className="text-xs text-slate-400 italic">{exp.location}</span>
              </div>
              <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                <ReactMarkdown>{exp.description}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-800">{edu.school}</h3>
                <span className="text-xs font-medium text-slate-500">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
              <p className="text-sm text-slate-600">
                {edu.degree} in {edu.field}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
          Skills & Expertises
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded"
              style={{ borderLeft: `2px solid ${themeColor}` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Custom Sections */}
      {data.customSections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
            {section.title}
          </h2>
          <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </div>
        </section>
      ))}
    </div>
  );
});

Preview.displayName = 'Preview';
