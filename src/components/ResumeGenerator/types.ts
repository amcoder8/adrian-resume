// TypeScript interfaces for the LaTeX Resume Generator

export interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  location?: string; // Added optional location field
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

export interface Education {
  universityName: string;
  degree: string;
  minor?: string;
  expectedGraduation: string;
  location: string;
  gpa?: string;
  relevantCourses: string;
  honors: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  websiteUrl?: string;
  sourceCodeUrl?: string;
  technologies: string;
  description: string[];
}

export interface Leadership {
  id: string;
  organizationName: string;
  role: string;
  startDate: string;
  endDate: string;
  urls: string[];
  achievements: string[];
}

export interface TechnicalSkills {
  programmingLanguages: string;
  developerTools: string;
  librariesFrameworks: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education;
  workExperience: WorkExperience[];
  projects: Project[];
  leadership: Leadership[];
  technicalSkills: TechnicalSkills;
}

export interface FormErrors {
  personalInfo?: Partial<PersonalInfo>;
  education?: Partial<Education>;
  workExperience?: { [key: string]: Partial<WorkExperience> };
  projects?: { [key: string]: Partial<Project> };
  leadership?: { [key: string]: Partial<Leadership> };
  technicalSkills?: Partial<TechnicalSkills>;
}
