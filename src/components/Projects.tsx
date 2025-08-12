import React, { useState, useRef, useEffect } from 'react';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCode,
  FaMobile,
  FaSearch,
  FaPalette,
  FaRocket,
  FaAward,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import {
  SiWordpress,
  SiReact,
  SiTypescript,
  SiCss3,
  SiJavascript,
  SiSass,
  SiBootstrap
} from 'react-icons/si';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string;
  achievements: string[];
  metrics?: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  category: 'business' | 'tourism' | 'ecommerce' | 'personal';
  featured: boolean;
  year: string;
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'business' | 'tourism' | 'ecommerce' | 'personal'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  const projects: Project[] = [
    {
      id: 'awe-chicago',
      title: 'Architectural Wood Expressions',
      description: 'Custom furniture & architectural design company website showcasing craftsmanship and portfolio.',
      longDescription: 'A sophisticated website for a custom furniture and architectural design company established in 2002. The site features an elegant portfolio gallery, showcases featured work in Florida Design Magazine, and provides comprehensive information about their custom production services.',
      technologies: ['WordPress', 'Custom CSS', 'Responsive Design', 'PHP', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop',
      liveUrl: 'https://awechicago.com',
      achievements: [
        'Professional portfolio gallery with magazine features',
        'Mobile-responsive design across all devices',
        'SEO optimization for local business discovery',
        'Custom contact and consultation booking system'
      ],
      metrics: [
        { label: 'Page Load Speed', value: '2.1s', icon: <FaRocket /> },
        { label: 'Mobile Score', value: '95%', icon: <FaMobile /> },
        { label: 'SEO Rating', value: 'A+', icon: <FaSearch /> }
      ],
      category: 'business',
      featured: true,
      year: '2024'
    },
    {
      id: 'kelcyra-tourism',
      title: 'Visit Kelcyra',
      description: 'Tourism & adventure booking platform for rafting and cultural tours in Albania.',
      longDescription: 'A comprehensive tourism website for Kelcyra, Albania, featuring adventure tours, rafting experiences, and cultural exploration. The site includes booking systems, customer testimonials, and detailed tour information to promote Albanian tourism.',
      technologies: ['WordPress', 'Booking Integration', 'Google Maps API', 'PayPal Integration', 'Custom CSS'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      liveUrl: 'https://visitkelcyra.com',
      achievements: [
        'Integrated tour booking and payment system',
        'Multi-language support for international tourists',
        'Interactive maps with tour locations',
        'Customer review and rating system',
        'Cultural heritage content management'
      ],
      metrics: [
        { label: 'Bookings Increase', value: '40%', icon: <FaChartLine /> },
        { label: 'User Engagement', value: '85%', icon: <FaUsers /> },
        { label: 'Customer Rating', value: '4.9★', icon: <FaAward /> }
      ],
      category: 'tourism',
      featured: true,
      year: '2024'
    },
    {
      id: 'daymaker-salon',
      title: 'The Daymaker Salon',
      description: 'Hair salon business website with appointment booking and service showcase.',
      longDescription: 'A modern, elegant website for The Daymaker Salon in Glenview, IL. Features online appointment booking, service descriptions, pricing information, and social media integration to help clients connect with the salon.',
      technologies: ['WordPress', 'Appointment System', 'Social Integration', 'Responsive Design', 'CSS3'],
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop',
      liveUrl: 'https://thedaymakersalon.com',
      achievements: [
        'Online appointment booking system',
        'Service portfolio with pricing',
        'Instagram integration for social proof',
        'Mobile-first responsive design',
        'Local SEO optimization'
      ],
      metrics: [
        { label: 'Appointments', value: '+60%', icon: <FaChartLine /> },
        { label: 'Mobile Users', value: '78%', icon: <FaMobile /> },
        { label: 'Social Engagement', value: '+120%', icon: <FaUsers /> }
      ],
      category: 'business',
      featured: true,
      year: '2023'
    }
  ];

  const techIcons: Record<string, React.ReactNode> = {
    'WordPress': <SiWordpress />,
    'React': <SiReact />,
    'TypeScript': <SiTypescript />,
    'JavaScript': <SiJavascript />,
    'Custom CSS': <SiCss3 />,
    'CSS3': <SiCss3 />,
    'SCSS': <SiSass />,
    'Bootstrap': <SiBootstrap />,
    'Responsive Design': <FaMobile />,
    'PHP': <FaCode />,
    'Booking Integration': <FaRocket />,
    'Google Maps API': <FaSearch />,
    'PayPal Integration': <FaRocket />,
    'Appointment System': <FaUsers />,
    'Social Integration': <FaUsers />
  };

  const filterCategories = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'business', label: 'Business', count: projects.filter(p => p.category === 'business').length },
    { key: 'tourism', label: 'Tourism', count: projects.filter(p => p.category === 'tourism').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of my latest web development projects, from business websites to tourism platforms
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="projects-filter">
          {filterCategories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.key as any)}
            >
              {category.label}
              <span className="count">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-actions">
                    <button
                      className="action-btn"
                      onClick={() => openProjectModal(project)}
                      title="View Details"
                    >
                      <FaSearch />
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn"
                      title="View Live Site"
                    >
                      <FaExternalLinkAlt />
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn"
                        title="View Code"
                      >
                        <FaGithub />
                      </a>
                    )}
                  </div>
                  {project.featured && (
                    <div className="featured-badge">
                      <FaAward />
                      Featured
                    </div>
                  )}
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {techIcons[tech]}
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-more">+{project.technologies.length - 4} more</span>
                  )}
                </div>

                {project.metrics && (
                  <div className="project-metrics">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="metric">
                        <div className="metric-icon">{metric.icon}</div>
                        <div className="metric-info">
                          <span className="metric-value">{metric.value}</span>
                          <span className="metric-label">{metric.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className="view-details-btn"
                  onClick={() => openProjectModal(project)}
                >
                  View Case Study
                  <FaExternalLinkAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="projects-cta">
          <h3>Interested in working together?</h3>
          <p>I'd love to help bring your next project to life</p>
          <a href="#contact" className="cta-btn">
            Start a Project
            <FaRocket />
          </a>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-header">
                <img src={selectedProject.image} alt={selectedProject.title} />
                <div className="modal-header-info">
                  <h2>{selectedProject.title}</h2>
                  <p>{selectedProject.description}</p>
                  <div className="modal-links">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      <FaExternalLinkAlt />
                      View Live Site
                    </a>
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link"
                      >
                        <FaGithub />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h3>Project Overview</h3>
                  <p>{selectedProject.longDescription}</p>
                </div>

                <div className="modal-section">
                  <h3>Technologies Used</h3>
                  <div className="modal-technologies">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="modal-tech-tag">
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h3>Key Achievements</h3>
                  <ul className="achievements-list">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                {selectedProject.metrics && (
                  <div className="modal-section">
                    <h3>Results & Metrics</h3>
                    <div className="modal-metrics">
                      {selectedProject.metrics.map((metric, idx) => (
                        <div key={idx} className="modal-metric">
                          <div className="modal-metric-icon">{metric.icon}</div>
                          <div className="modal-metric-info">
                            <span className="modal-metric-value">{metric.value}</span>
                            <span className="modal-metric-label">{metric.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
