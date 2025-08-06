export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}
