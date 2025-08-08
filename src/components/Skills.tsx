import React, { useState, useRef, useEffect } from 'react';
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaFigma,
  FaNodeJs,
  FaBootstrap,
  FaCodeBranch,
  FaPaintBrush,
  FaLaptopCode,
  FaTools,
  FaTrophy,
  FaStar,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import {
  SiTypescript,
  SiVite,
  SiTailwindcss,
  SiSass,
  SiWebpack,
  SiEslint,
  SiJest,
  SiStorybook,
  SiVercel,
  SiNetlify,
  SiAstro,
  SiNextdotjs,
  SiVuedotjs,
  SiFramer
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: 'frontend' | 'tools' | 'design';
  description: string;
  color: string;
  experience: string;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'tools' | 'design'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills: Skill[] = [
    // Frontend Technologies
    {
      name: 'React',
      icon: <FaReact />,
      level: 90,
      category: 'frontend',
      description: 'Building dynamic UIs with hooks, context, and modern patterns',
      color: '#61DAFB',
      experience: '2+ years'
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript />,
      level: 85,
      category: 'frontend',
      description: 'Type-safe development with advanced TypeScript features',
      color: '#3178C6',
      experience: '1.5+ years'
    },
    {
      name: 'JavaScript',
      icon: <FaJs />,
      level: 95,
      category: 'frontend',
      description: 'ES6+, async/await, modern JavaScript best practices',
      color: '#F7DF1E',
      experience: '3+ years'
    },
    {
      name: 'Next.js',
      icon: <SiNextdotjs />,
      level: 80,
      category: 'frontend',
      description: 'Full-stack React framework with SSR and API routes',
      color: '#000000',
      experience: '1+ year'
    },
    {
      name: 'Astro',
      icon: <SiAstro />,
      level: 75,
      category: 'frontend',
      description: 'Modern static site generator with island architecture',
      color: '#FF5D01',
      experience: '6+ months'
    },
    {
      name: 'Vue.js',
      icon: <SiVuedotjs />,
      level: 70,
      category: 'frontend',
      description: 'Progressive framework for building user interfaces',
      color: '#4FC08D',
      experience: '1+ year'
    },
    {
      name: 'HTML5',
      icon: <FaHtml5 />,
      level: 95,
      category: 'frontend',
      description: 'Semantic markup, accessibility, and modern HTML standards',
      color: '#E34F26',
      experience: '3+ years'
    },
    {
      name: 'CSS3',
      icon: <FaCss3Alt />,
      level: 90,
      category: 'frontend',
      description: 'Advanced layouts, animations, and responsive design',
      color: '#1572B6',
      experience: '3+ years'
    },
    {
      name: 'Tailwind CSS',
      icon: <SiTailwindcss />,
      level: 85,
      category: 'frontend',
      description: 'Utility-first CSS framework for rapid UI development',
      color: '#06B6D4',
      experience: '1+ year'
    },
    {
      name: 'Bootstrap',
      icon: <FaBootstrap />,
      level: 88,
      category: 'frontend',
      description: 'Responsive design framework with custom component styling',
      color: '#7952B3',
      experience: '2+ years'
    },
    {
      name: 'Sass/SCSS',
      icon: <SiSass />,
      level: 85,
      category: 'frontend',
      description: 'CSS preprocessing with variables, mixins, and functions',
      color: '#CC6699',
      experience: '2+ years'
    },
    {
      name: 'Framer Motion',
      icon: <SiFramer />,
      level: 75,
      category: 'frontend',
      description: 'Production-ready motion library for React applications',
      color: '#0055FF',
      experience: '6+ months'
    },

    // Development Tools
    {
      name: 'Git & GitHub',
      icon: <FaGitAlt />,
      level: 90,
      category: 'tools',
      description: 'Version control, branching strategies, and collaboration',
      color: '#F05032',
      experience: '2+ years'
    },
    {
      name: 'Vite',
      icon: <SiVite />,
      level: 85,
      category: 'tools',
      description: 'Fast build tool with hot module replacement',
      color: '#646CFF',
      experience: '1+ year'
    },
    {
      name: 'Webpack',
      icon: <SiWebpack />,
      level: 70,
      category: 'tools',
      description: 'Module bundling and build optimization',
      color: '#8DD6F9',
      experience: '1+ year'
    },
    {
      name: 'ESLint',
      icon: <SiEslint />,
      level: 80,
      category: 'tools',
      description: 'Code linting and maintaining code quality standards',
      color: '#4B32C3',
      experience: '1.5+ years'
    },
    {
      name: 'Jest',
      icon: <SiJest />,
      level: 65,
      category: 'tools',
      description: 'JavaScript testing framework with snapshot testing',
      color: '#C21325',
      experience: '6+ months'
    },
    {
      name: 'Storybook',
      icon: <SiStorybook />,
      level: 70,
      category: 'tools',
      description: 'Component development and documentation tool',
      color: '#FF4785',
      experience: '6+ months'
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs />,
      level: 75,
      category: 'tools',
      description: 'Server-side JavaScript and package management',
      color: '#339933',
      experience: '1+ year'
    },
    {
      name: 'Vercel',
      icon: <SiVercel />,
      level: 85,
      category: 'tools',
      description: 'Frontend deployment and serverless functions',
      color: '#000000',
      experience: '1+ year'
    },
    {
      name: 'Netlify',
      icon: <SiNetlify />,
      level: 80,
      category: 'tools',
      description: 'Static site deployment and continuous integration',
      color: '#00C7B7',
      experience: '1+ year'
    },

    // Design & UX
    {
      name: 'Figma',
      icon: <FaFigma />,
      level: 80,
      category: 'design',
      description: 'UI/UX design, prototyping, and design systems',
      color: '#F24E1E',
      experience: '1.5+ years'
    },
    {
      name: 'UI/UX Design',
      icon: <FaPaintBrush />,
      level: 75,
      category: 'design',
      description: 'User-centered design principles and accessibility',
      color: '#FF6B6B',
      experience: '2+ years'
    },
    {
      name: 'Responsive Design',
      icon: <FaLaptopCode />,
      level: 90,
      category: 'design',
      description: 'Mobile-first approach and cross-device compatibility',
      color: '#4ECDC4',
      experience: '3+ years'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: <FaStar />, count: skills.length },
    { id: 'frontend', label: 'Frontend', icon: <FaCodeBranch />, count: skills.filter(s => s.category === 'frontend').length },
    { id: 'tools', label: 'Tools', icon: <FaTools />, count: skills.filter(s => s.category === 'tools').length },
    { id: 'design', label: 'Design', icon: <FaPaintBrush />, count: skills.filter(s => s.category === 'design').length }
  ];

  const handleCategoryChange = (categoryId: 'all' | 'frontend' | 'tools' | 'design') => {
    setActiveCategory(categoryId);
    setIsExpanded(false); // Reset expanded state when category changes
  };

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  // Show only first 6 skills if not expanded
  const displayedSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, 6);
  const hasHiddenSkills = filteredSkills.length > 6;

  const getSkillLevelText = (level: number): string => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  const getSkillLevelColor = (level: number): string => {
    if (level >= 90) return '#10B981'; // Green
    if (level >= 80) return '#3B82F6'; // Blue
    if (level >= 70) return '#8B5CF6'; // Purple
    if (level >= 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      <div className="container">
        <div className={`skills-content ${isVisible ? 'fade-in' : ''}`}>

          {/* Section Header */}
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Technical Skills</h2>
            <p className="section-subtitle">
              Expertise in modern web technologies and development tools
            </p>
          </div>

          {/* Category Filter */}
          <div className="category-filter mb-5" data-aos="fade-up" data-aos-delay="200">
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id as any)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-label">{category.label}</span>
                  <span className="filter-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid" data-aos="fade-up" data-aos-delay="400">
            {displayedSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-card"
                style={{
                  '--skill-color': skill.color,
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="skill-header">
                  <div className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <div className="skill-info">
                    <h6 className="skill-name">{skill.name}</h6>
                    <span className="skill-experience">{skill.experience}</span>
                  </div>
                  <div className="skill-level-badge">
                    <span
                      className="level-text"
                      style={{ color: getSkillLevelColor(skill.level) }}
                    >
                      {getSkillLevelText(skill.level)}
                    </span>
                  </div>
                </div>

                <div className="skill-description">
                  <p>{skill.description}</p>
                </div>

                <div className="skill-progress">
                  <div className="progress-header">
                    <span className="progress-label">Proficiency</span>
                    <span className="progress-value">{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                        backgroundColor: skill.color
                      }}
                    />
                  </div>
                </div>

                {/* Skill Level Indicator */}
                <div className="skill-level-indicator">
                  <div className="level-dots">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`level-dot ${skill.level >= dot * 20 ? 'active' : ''}`}
                        style={{
                          backgroundColor: skill.level >= dot * 20 ? skill.color : 'transparent'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          {hasHiddenSkills && (
            <div className="skills-expand-section" data-aos="fade-up" data-aos-delay="500">
              <button
                className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="expand-icon">
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </span>
                <span className="expand-text">
                  {isExpanded
                    ? 'Show Less Skills'
                    : `Show All ${filteredSkills.length - 6} More Skills`
                  }
                </span>
                <span className="expand-badge">
                  {isExpanded ? filteredSkills.length : `+${filteredSkills.length - 6}`}
                </span>
              </button>
            </div>
          )}

          {/* Skills Summary */}
          <div className="skills-summary mt-5" data-aos="fade-up" data-aos-delay="600">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="summary-content">
                  <h4 className="summary-title">Continuous Learning</h4>
                  <p className="summary-text">
                    I believe in staying current with the latest web technologies and best practices.
                    My skill set continues to evolve as I take on new challenges and explore emerging
                    technologies in the frontend development ecosystem.
                  </p>
                  <div className="summary-highlights">
                    <div className="highlight-item">
                      <FaStar className="highlight-icon" />
                      <span>Always learning new technologies</span>
                    </div>
                    <div className="highlight-item">
                      <FaTrophy className="highlight-icon" />
                      <span>Focus on code quality and best practices</span>
                    </div>
                    <div className="highlight-item">
                      <FaCodeBranch className="highlight-icon" />
                      <span>Strong foundation in modern development workflows</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="skill-chart">
                  <div className="chart-container">
                    <div className="chart-item">
                      <span className="chart-label">Frontend Development</span>
                      <div className="chart-bar">
                        <div className="chart-fill" style={{ width: '92%' }}></div>
                      </div>
                      <span className="chart-value">92%</span>
                    </div>
                    <div className="chart-item">
                      <span className="chart-label">Development Tools</span>
                      <div className="chart-bar">
                        <div className="chart-fill" style={{ width: '85%' }}></div>
                      </div>
                      <span className="chart-value">85%</span>
                    </div>
                    <div className="chart-item">
                      <span className="chart-label">UI/UX Design</span>
                      <div className="chart-bar">
                        <div className="chart-fill" style={{ width: '78%' }}></div>
                      </div>
                      <span className="chart-value">78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
