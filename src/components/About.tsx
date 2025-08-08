import React, { useState, useRef, useEffect } from 'react';
import {
  FaGamepad,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaCoffee,
  FaLaptopCode,
  FaMicrochip,
  FaHeadphones,
  FaTrophy,
  FaExternalLinkAlt,
  FaAward,
  FaRocket
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

// Define types for better TypeScript support
type InterestKey = 'tech' | 'music' | 'gaming';

interface Interest {
  title: string;
  icon: IconType;
  description: string;
  details: string[];
  link?: {
    url: string;
    text: string;
  };
}

// About component with enhanced features and animations
const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [activeInterest, setActiveInterest] = useState<InterestKey>('tech');
  const [hoveredStrength, setHoveredStrength] = useState<string | null>(null);
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

  // Auto-cycle through interests every 5 seconds when not manually interacted
  useEffect(() => {
    const interestKeys: InterestKey[] = ['tech', 'music', 'gaming'];
    let currentIndex = interestKeys.indexOf(activeInterest);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % interestKeys.length;
      setActiveInterest(interestKeys[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Add a small haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleInterestChange = (key: InterestKey) => {
    setActiveInterest(key);
    // Reset the auto-cycle timer
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaCode },
    { id: 'interests', label: 'Interests', icon: FaHeart },
    { id: 'journey', label: 'Journey', icon: FaCoffee }
  ];

  const interests: Record<InterestKey, Interest> = {
    tech: {
      title: 'Technology',
      icon: FaMicrochip,
      description: 'PC building, learning new coding languages, and exploring new music equipment to incorporate into my existing DAW setup.',
      details: ['Custom PC Building', 'Learning New Frameworks', 'Music Equipment Integration', 'Tech Innovation']
    },
    music: {
      title: 'Music Production',
      icon: FaHeadphones,
      description: 'I create my own music and love experimenting with different sounds and genres.',
      details: ['Original Compositions', 'Genre Experimentation', 'DAW Mastery', 'Sound Design'],
      link: { url: '#', text: 'Listen on SoundCloud' }
    },
    gaming: {
      title: 'Video Games',
      icon: FaGamepad,
      description: 'Story-driven games provide nostalgia whenever I\'m feeling under the weather.',
      details: ['Assassin\'s Creed Series', 'Halo 3', 'Batman Arkham Series', 'Red Dead Series']
    }
  };

  const personalTraits = [
    'Problem Solver',
    'Creative Thinker',
    'Team Player',
    'Detail Oriented',
    'Quick Learner',
    'User Focused'
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Started Coding Journey',
      description: 'Began learning web development fundamentals and discovered my passion for creating digital experiences.',
      icon: FaGraduationCap,
      status: 'completed',
      details: ['HTML/CSS Basics', 'JavaScript Fundamentals', 'First Projects', 'Problem Solving']
    },
    {
      year: '2022',
      title: 'Frontend Specialization',
      description: 'Focused on React, TypeScript, and modern frameworks. Built my first portfolio projects.',
      icon: FaCode,
      status: 'completed',
      details: ['React Mastery', 'TypeScript Integration', 'Portfolio Development', 'Modern Tools']
    },
    {
      year: '2024',
      title: 'Professional Development',
      description: 'Building production-ready applications, contributing to open source, and expanding my skill set.',
      icon: FaBriefcase,
      status: 'completed',
      details: ['Production Apps', 'Open Source', 'Advanced Patterns', 'Team Collaboration']
    },
    {
      year: '2025',
      title: 'Continuing the Journey',
      description: 'The best part is I\'m still on the journey, learning more every day. With new tools constantly being introduced, I look forward to expanding my knowledge and overall life experience.',
      icon: FaRocket,
      status: 'current',
      details: ['Continuous Learning', 'New Technologies', 'Career Growth', 'Innovation']
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section">
      {/* Fixed Header with Horizontal Tabs */}
      <div className="about-header">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate developer crafting digital experiences with creativity and precision
          </p>

          {/* Horizontal Navigation Tabs */}
          <div className="horizontal-tabs-nav">
            <div className="tabs-container">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <tab.icon className="tab-icon" />
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area with Fixed Height */}
      <div className="about-content">
        <div className="container h-100">
          <div className="content-wrapper h-100">
            {activeTab === 'overview' && (
              <div className="overview-layout h-100 d-flex">
                {/* Left Column - Personal Info */}
                <div className="col-md-6 pe-4">
                  <div className="info-card h-100 d-flex flex-column justify-content-between">
                    {/* Profile Section */}
                    <div className="profile-section">
                      <div className="profile-placeholder mb-3">
                        <FaCode className="profile-icon" />
                        <span>Professional Photo</span>
                      </div>

                      {/* Core Strengths Pills */}
                      <div className="core-strengths">
                        <h5 className="mb-3">Core Strengths</h5>
                        <div className="strengths-grid">
                          {personalTraits.map((trait, index) => (
                            <span
                              key={trait}
                              className={`strength-pill ${hoveredStrength === trait ? 'hovered' : ''}`}
                              onMouseEnter={() => setHoveredStrength(trait)}
                              onMouseLeave={() => setHoveredStrength(null)}
                              style={{
                                animationDelay: `${index * 0.1}s`
                              }}
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Detailed Content */}
                <div className="col-md-6 ps-4">
                  <div className="content-scroll h-100">
                    <div className="heritage-block mb-4">
                      <div className="content-header">
                        <span className="content-icon">🇦🇱</span>
                        <h4>Albanian Heritage</h4>
                      </div>
                      <p className="content-text">
                        Born and raised in Chicago with proud Albanian roots, I bring a unique
                        perspective that blends the innovative spirit of the Windy City with
                        the resilience and craftsmanship traditions of Albania. My Albanian heritage has instilled in me
                        values of hard work, loyalty, and attention to detail—qualities that translate
                        directly into my approach to development.
                      </p>
                    </div>

                    <div className="passion-block mb-4">
                      <div className="content-header">
                        <FaLaptopCode className="content-icon" />
                        <h4>Tech Passion</h4>
                      </div>
                      <p className="content-text">
                        Always exploring and wanting to know more, from a young age I was
                        fascinated by technology, games, superheroes, and music. I'm a true nerd at heart,
                        passionate about tech and how it works. I took it upon myself to build my own
                        PC and learn more about how it all works—from the hardware to the software.
                        I loved it and continue to love it, growing my skills every day to just have
                        fun and learn more.
                      </p>
                    </div>

                    <div className="philosophy-block">
                      <div className="content-header">
                        <FaBriefcase className="content-icon" />
                        <h4>Development Philosophy</h4>
                      </div>
                      <blockquote className="philosophy-quote">
                        "I approach every project with clarity, precision, and purpose. 
                        Whether it’s writing clean code or creating music, I focus on what works, 
                        communicate clearly, and adapt to each client’s unique needs."
                      </blockquote>
                      <p className="content-text mt-3">
                        When I'm not coding, you'll find me exploring Chicago's neighborhoods, producing
                        music, reading, or immersed in classic games like the Assassin's Creed trilogy
                        and Halo 3.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interests' && (
              <div className="interests-layout h-100 d-flex flex-column">
                {/* Interest Navigation */}
                <div className="interest-nav mb-4">
                  <div className="d-flex justify-content-center gap-3">
                    {Object.entries(interests).map(([key, interest]) => (
                      <button
                        key={key}
                        className={`interest-btn ${activeInterest === key ? 'active' : ''}`}
                        onClick={() => handleInterestChange(key as InterestKey)}
                      >
                        <interest.icon className="interest-icon" />
                        <span>{interest.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Interest Content */}
                <div className="interest-content flex-grow-1">
                  <div className="row h-100 align-items-center">
                    {/* Left Side - Icon & Title */}
                    <div className="col-md-4 text-center">
                      <div className="interest-showcase">
                        {React.createElement(interests[activeInterest].icon, { className: "showcase-icon" })}
                        <h3 className="showcase-title">{interests[activeInterest].title}</h3>
                      </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="col-md-8">
                      <div className="interest-details">
                        <p className="interest-description">
                          {interests[activeInterest].description}
                        </p>

                        <div className="interest-highlights">
                          <h5>Highlights:</h5>
                          <div className="highlights-grid">
                            {interests[activeInterest].details.map((detail: string, index: number) => (
                              <div
                                key={detail}
                                className="highlight-item"
                                style={{
                                  animationDelay: `${index * 0.1}s`
                                }}
                              >
                                <FaTrophy className="check-icon" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {interests[activeInterest].link && (
                          <a
                            href={interests[activeInterest].link!.url}
                            className="external-link-btn mt-3"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt className="me-2" />
                            {interests[activeInterest].link!.text}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'journey' && (
              <div className="journey-layout h-100 d-flex flex-column">
                {/* Horizontal Timeline Navigation */}
                <div className="timeline-nav mb-4">
                  <div className="horizontal-timeline">
                    <div className="timeline-track">
                      {milestones.map((milestone, index) => (
                        <div
                          key={milestone.year}
                          className={`timeline-point ${selectedMilestone === index ? 'active' : ''} ${milestone.status}`}
                          onClick={() => setSelectedMilestone(index)}
                        >
                          <div className="point-marker">
                            {React.createElement(milestone.icon)}
                          </div>
                          <div className="point-label">
                            <span className="year">{milestone.year}</span>
                            <span className="title">{milestone.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Milestone Details */}
                <div className="milestone-details flex-grow-1">
                  <div className="row h-100 align-items-center">
                    <div className="col-md-5">
                      <div className="milestone-info">
                        <div className="milestone-header">
                          <span className="milestone-year">{milestones[selectedMilestone].year}</span>
                          <h3 className="milestone-title">{milestones[selectedMilestone].title}</h3>
                        </div>
                        <p className="milestone-description">
                          {milestones[selectedMilestone].description}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-7">
                      <div className="milestone-achievements">
                        <h5 className="achievements-title">Key Achievements</h5>
                        <div className="achievements-grid">
                          {milestones[selectedMilestone].details.map((detail, index) => (
                            <div
                              key={detail}
                              className="achievement-item"
                              style={{
                                animationDelay: `${index * 0.1}s`
                              }}
                            >
                              <FaAward className="achievement-icon" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
