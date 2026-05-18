export interface ResumeData {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      website: string;
      title: string;
      summary: string;
    };
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
    customSections: CustomSection[];
  }
  
  export interface Experience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }
  
  export interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    location: string;
  }
  
  export interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
  }
  
  export interface CustomSection {
    id: string;
    title: string;
    content: string;
  }
  
  export type TemplateId = 'classic' | 'modern' | 'minimal' | 'sidebar';
  
  export interface ThemeConfig {
    primaryColor: string;
    fontFamily: string;
    templateId: TemplateId;
  }
  