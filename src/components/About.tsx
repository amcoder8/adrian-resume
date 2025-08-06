import React, { useState, useRef, useEffect } from 'react';
import { 
  FaGamepad, 
  FaMusic, 
  FaBook, 
  FaCode, 
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaCoffee,
  FaLaptopCode
} from 'react-icons/fa';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
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

  const interests = [
    {
      icon: <FaLaptopCode />,
      title: 'Frontend Development',
      description: 'Passionate about creating beautiful, responsive user interfaces with modern frameworks',
      color: '#667eea'
    },
    {
      icon: <FaMusic />,
      title: 'Music Production',
      description: 'Creating and mixing electronic music, exploring sound design and audio engineering',
      color: '#f093fb'
    },
    {
      icon: <FaBook />,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies, design patterns, and industry best practices',
      color: '#4facfe'
    },
    {
      icon: <FaGamepad />,
      title: 'Gaming & Storytelling',
      description: 'Appreciating narrative design and game mechanics in modern interactive experiences',
      color: '#43e97b'
    }
  ];

  const favoriteGames = [
    {
      title: 'Assassin\'s Creed Origins',
      genre: 'Action RPG',
      highlight: 'Historical storytelling',
      color: '#c471ed'
    },
    {
      title: 'Halo 3',
      genre: 'FPS',
      highlight: 'Multiplayer innovation',
      color: '#12c2e9'
    },
    {
      title: 'Spider-Man: Web of Shadows',
      genre: 'Action Adventure',
      highlight: 'Dynamic mechanics',
      color: '#f64f59'
    }
  ];

  const personalTraits = [
    'Problem Solver',
    'Creative Thinker',
    'Team Player',
    'Detail Oriented',
    'Quick Learner',
    'User Focused'
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Started Coding Journey',
      description: 'Began learning web development fundamentals',
      icon: <FaGraduationCap />
    },
    {
      year: '2022',
      title: 'Frontend Specialization',
      description: 'Focused on React, TypeScript, and modern frameworks',
      icon: <FaCode />
    },
    {
      year: '2024',
      title: 'Professional Development',
      description: 'Building production-ready applications and portfolios',
      icon: <FaBriefcase />
    },
    {
      year: '2025',
      title: 'Looking Forward',
      description: 'Seeking opportunities to create impactful user experiences',
      icon: <FaHeart />
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container">
        <div className={`about-content ${isVisible ? 'fade-in' : ''}`}>
          
          {/* Section Header */}
          <div className="section-header text-center mb-5">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Passionate developer crafting digital experiences with creativity and precision
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="row align-items-center mb-5">
            
            {/* Profile Image */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="profile-container" data-aos="fade-right">
                <div className="profile-frame">
                  <div className="profile-image">
                    {/* Professional photo placeholder - replace with actual photo */}
                    <div className="profile-placeholder">
                      <FaCode size={60} />
                      <div className="profile-overlay">
                        <span>Professional Photo</span>
                      </div>
                    </div>
                  </div>
                  <div className="profile-decoration"></div>
                </div>
                
                {/* Personal Traits */}
                <div className="traits-container mt-4">
                  <h6 className="traits-title">Core Strengths</h6>
                  <div className="traits-grid">
                    {personalTraits.map((trait, index) => (
                      <span 
                        key={trait} 
                        className="trait-tag"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="col-lg-8" data-aos="fade-left">
              
              {/* Tab Navigation */}
              <div className="tab-navigation mb-4">
                <button 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FaCode className="me-2" />
                  Overview
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'interests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('interests')}
                >
                  <FaHeart className="me-2" />
                  Interests
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
                  onClick={() => setActiveTab('journey')}
                >
                  <FaCoffee className="me-2" />
                  Journey
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="tab-pane fade-in">
                    <div className="about-text">
                      <p className="lead mb-4">
                        I'm a passionate Frontend Developer who transforms ideas into engaging digital experiences. 
                        With a strong foundation in modern web technologies, I specialize in creating intuitive, 
                        accessible, and performant applications.
                      </p>
                      
                      <p className="mb-4">
                        My approach combines technical expertise with creative problem-solving, ensuring that 
                        every project not only functions flawlessly but also provides an exceptional user experience. 
                        I believe in writing clean, maintainable code and staying current with industry best practices.
                      </p>

                      <div className="highlight-box">
                        <h6 className="mb-3">
                          <FaLaptopCode className="me-2 text-primary" />
                          Development Philosophy
                        </h6>
                        <p className="mb-0">
                          "Code is poetry written for both machines and humans. I strive to create solutions 
                          that are elegant, efficient, and empathetic to user needs."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interests Tab */}
                {activeTab === 'interests' && (
                  <div className="tab-pane fade-in">
                    
                    {/* Hobbies Grid */}
                    <div className="interests-grid mb-4">
                      {interests.map((interest, index) => (
                        <div 
                          key={index} 
                          className="interest-card"
                          style={{ '--accent-color': interest.color } as React.CSSProperties}
                        >
                          <div className="interest-icon" style={{ color: interest.color }}>
                            {interest.icon}
                          </div>
                          <h6 className="interest-title">{interest.title}</h6>
                          <p className="interest-description">{interest.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Gaming Section */}
                    <div className="gaming-showcase">
                      <h6 className="mb-3">
                        <FaGamepad className="me-2 text-primary" />
                        Favorite Gaming Experiences
                      </h6>
                      <p className="mb-3 text-muted">
                        Gaming has shaped my appreciation for user experience design, storytelling, and interactive systems.
                      </p>
                      <div className="games-grid">
                        {favoriteGames.map((game, index) => (
                          <div 
                            key={index} 
                            className="game-card"
                            style={{ '--game-color': game.color } as React.CSSProperties}
                          >
                            <div className="game-info">
                              <h6 className="game-title">{game.title}</h6>
                              <span className="game-genre">{game.genre}</span>
                              <p className="game-highlight">{game.highlight}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Journey Tab */}
                {activeTab === 'journey' && (
                  <div className="tab-pane fade-in">
                    <div className="timeline">
                      {timeline.map((item, index) => (
                        <div key={index} className="timeline-item">
                          <div className="timeline-marker">
                            <div className="timeline-icon">
                              {item.icon}
                            </div>
                          </div>
                          <div className="timeline-content">
                            <div className="timeline-year">{item.year}</div>
                            <h6 className="timeline-title">{item.title}</h6>
                            <p className="timeline-description">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="about-cta text-center" data-aos="fade-up">
            <div className="cta-content">
              <h5 className="mb-3">Ready to bring your ideas to life?</h5>
              <p className="mb-4 text-muted">
                Let's collaborate and create something amazing together.
              </p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Connect
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
