import { useState, useRef, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { useReactToPrint } from 'react-to-print';
import { Download, Share2, Layout, Laptop, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import { DEFAULT_RESUME_DATA, FONTS, THEMES } from './constants';
import type { ResumeData, TemplateId } from './types';

export default function App() {
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [theme, setTheme] = useState({
    color: THEMES.blue,
    font: FONTS[0].value,
    template: 'classic' as TemplateId
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('resume_data');
    const savedTheme = localStorage.getItem('resume_theme');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {}
    }
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('resume_data', JSON.stringify(data));
    localStorage.setItem('resume_theme', JSON.stringify(theme));
  }, [data, theme]);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `${data.personalInfo.fullName}_Resume`,
  });

  const handleShare = () => {
    const state = btoa(JSON.stringify({ data, theme }));
    const url = `${window.location.origin}/#share=${state}`;
    navigator.clipboard.writeText(url);
    alert('Shareable URL copied to clipboard!');
  };

  // Handle sharing from URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#share=')) {
      try {
        const stateStr = hash.replace('#share=', '');
        const state = JSON.parse(atob(stateStr));
        setData(state.data);
        setTheme(state.theme);
      } catch (e) {
        console.error("Failed to load shared state");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-2 sticky top-0 z-30 transition-shadow hover:shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Layout className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">ResumeCraft</h1>
          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 font-bold rounded-full uppercase">Beta</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-4 border-r border-slate-200 pr-4">
             <button
              onClick={() => setTheme(prev => ({ ...prev, template: 'classic' }))}
              className={cn("p-2 rounded-lg text-xs font-bold transition-all", theme.template === 'classic' ? "bg-slate-800 text-white shadow-md" : "text-slate-500 hover:bg-slate-100")}
            >Classic</button>
            <button
              onClick={() => setTheme(prev => ({ ...prev, template: 'modern' }))}
              className={cn("p-2 rounded-lg text-xs font-bold transition-all", theme.template === 'modern' ? "bg-slate-800 text-white shadow-md" : "text-slate-500 hover:bg-slate-100")}
            >Modern</button>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {Object.entries(THEMES).map(([name, color]) => (
              <button
                key={name}
                onClick={() => setTheme(prev => ({ ...prev, color }))}
                className={cn(
                  "w-6 h-6 rounded-md transition-transform hover:scale-110",
                  theme.color === color ? "ring-2 ring-offset-2 ring-slate-300" : ""
                )}
                style={{ backgroundColor: color }}
                title={name}
              />
            ))}
            <input 
              type="color" 
              value={theme.color} 
              onChange={(e) => setTheme(prev => ({ ...prev, color: e.target.value }))}
              className="w-6 h-6 p-0 border-0 bg-transparent cursor-pointer rounded-md overflow-hidden"
            />
          </div>

          <select
            value={theme.font}
            onChange={(e) => setTheme(prev => ({ ...prev, font: e.target.value }))}
            className="text-sm border-slate-200 rounded-lg bg-slate-50 px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {FONTS.map(font => (
              <option key={font.name} value={font.value}>{font.name}</option>
            ))}
          </select>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors text-sm font-medium"
          >
            <Share2 size={16} /> Share
          </button>
          
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-medium text-sm shadow-md hover:shadow-lg"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 450, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-slate-200 bg-white z-20 flex-shrink-0"
            >
              <div className="p-6 h-full flex flex-col">
                <Editor data={data} setData={setData} />
                
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3 text-emerald-800">
                  <Laptop size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold">ATS Optimized</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      This template uses clean structure and standard headers to ensure parsing by Applicant Tracking Systems.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-l-0 border-slate-200 p-1.5 rounded-r-lg z-30 shadow-sm hover:bg-slate-50 transition-colors"
        >
          {isSidebarOpen ? <ChevronDown className="rotate-90" size={16} /> : <ChevronDown className="-rotate-90" size={16} />}
        </button>

        {/* Preview Area */}
        <section className="flex-1 overflow-y-auto bg-slate-100/50 p-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit"
          >
            <Preview 
              ref={previewRef} 
              data={data} 
              themeColor={theme.color} 
              fontFamily={theme.font} 
              templateId={theme.template as any}
            />
          </motion.div>
          
          <div className="mt-12 text-slate-400 text-xs font-medium uppercase tracking-widest pb-12">
            Standard ISO A4 Dimensions (210mm x 297mm)
          </div>
        </section>
      </main>
    </div>
  );
}
