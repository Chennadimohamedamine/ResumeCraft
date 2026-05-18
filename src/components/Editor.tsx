import { useState } from 'react';
import { Plus, Trash2, Wand2 } from 'lucide-react';
import type { Education, Experience, ResumeData } from '../types';
import { cn } from '../lib/utils';

interface EditorProps {
  data: ResumeData;
  setData: (data: ResumeData) => void;
}

export function Editor({ data, setData }: EditorProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'custom'>('personal');
  const [aiLoading, setAiLoading] = useState(false);

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    };
    setData({ ...data, experience: [newExp, ...data.experience] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
    setData({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    setData({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      location: ''
    };
    setData({ ...data, education: [newEdu, ...data.education] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
    setData({ ...data, education: updated });
  };

  const handleAiTips = async (section: string, content: string) => {
    if (!content) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content })
      });
      const result = await res.json();
      alert(`AI Suggestions for ${section}:\n\n${result.tips}`);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[calc(100vh-120px)] flex flex-col">
      <div className="flex border-b border-slate-200">
        {[
          { id: 'personal', label: 'Personal' },
          { id: 'experience', label: 'Experience' },
          { id: 'education', label: 'Education' },
          { id: 'skills', label: 'Skills' },
          { id: 'custom', label: 'More' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 py-4 text-sm font-medium transition-colors border-b-2",
              activeTab === tab.id ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                <input
                  type="text"
                  value={data.personalInfo.title}
                  onChange={(e) => updatePersonalInfo('title', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Summary</label>
              <div className="relative">
                <textarea
                  value={data.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <button
                  onClick={() => handleAiTips('Summary', data.personalInfo.summary)}
                  disabled={aiLoading}
                  className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 disabled:opacity-50"
                  title="Get AI Tips"
                >
                  <Wand2 size={16} className={aiLoading ? "animate-spin" : ""} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Experience</h3>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>
            {data.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-slate-200 rounded-xl space-y-4 bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                    />
                    <input
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>
                  <button onClick={() => removeExperience(exp.id)} className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="px-3 py-2 border rounded-lg bg-white"
                  />
                  {!exp.current && (
                    <input
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    />
                    <span className="text-sm text-slate-600 font-medium">Currently Work Here</span>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Description (Markdown supported)"
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg bg-white text-sm"
                  />
                  <button
                    onClick={() => handleAiTips(`${exp.position} at ${exp.company}`, exp.description)}
                    disabled={aiLoading}
                    className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Wand2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Education</h3>
              <button
                onClick={addEducation}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus size={16} /> Add Education
              </button>
            </div>
            {data.education.map((edu) => (
              <div key={edu.id} className="p-4 border border-slate-200 rounded-xl space-y-4 bg-slate-50/50">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="px-3 py-2 border rounded-lg bg-white"
                  />
                  <input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="px-3 py-2 border rounded-lg bg-white"
                  />
                  <input
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="px-3 py-2 border rounded-lg bg-white"
                  />
                   <div className="grid grid-cols-2 gap-2">
                    <input
                      placeholder="Start"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                    />
                    <input
                      placeholder="End"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Skills</h3>
            <p className="text-sm text-slate-500">Add skills separated by commas</p>
            <textarea
              value={data.skills.join(', ')}
              onChange={(e) => setData({ ...data, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
              rows={6}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              placeholder="React, TypeScript, Node.js..."
            />
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Custom Sections</h3>
              <button
                onClick={() => setData({ ...data, customSections: [...data.customSections, { id: Math.random().toString(), title: 'New Section', content: '' }] })}
                className="flex items-center gap-1 text-sm text-blue-600 font-medium"
              >
                <Plus size={16} /> Add Section
              </button>
            </div>
            {data.customSections.map((section, idx) => (
              <div key={section.id} className="p-4 border border-slate-200 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <input
                    value={section.title}
                    onChange={(e) => {
                      const updated = [...data.customSections];
                      updated[idx].title = e.target.value;
                      setData({ ...data, customSections: updated });
                    }}
                    className="font-bold bg-transparent border-b border-slate-200 outline-none"
                  />
                  <button onClick={() => setData({ ...data, customSections: data.customSections.filter(s => s.id !== section.id) })} className="text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  value={section.content}
                  onChange={(e) => {
                    const updated = [...data.customSections];
                    updated[idx].content = e.target.value;
                    setData({ ...data, customSections: updated });
                  }}
                  rows={4}
                  className="w-full text-sm border-slate-200 rounded-lg"
                  placeholder="Content (Markdown supported)"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
