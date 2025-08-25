import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes, FaHome, FaUser, FaCog, FaEnvelope, FaProjectDiagram, FaQuoteLeft, FaServicestack } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', icon: <FaHome /> },
    { label: 'About', href: '#about', icon: <FaUser /> },
    { label: 'Services', href: '#services', icon: <FaServicestack /> },
    { label: 'Projects', href: '#projects', icon: <FaProjectDiagram /> },
    { label: 'Testimonials', href: '#testimonials', icon: <FaQuoteLeft /> },
    { label: 'Skills', href: '#skills', icon: <FaCog /> },
    { label: 'Contact', href: '#contact', icon: <FaEnvelope /> },
  ];

  const scrollToSection = (href: string) => {
    // Handle external links
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Static Header - Shows initially */}
      <nav className={`static-header ${isScrolled ? 'hidden' : 'visible'}`}>
        <div className="container">
          <div className="static-header-content">
            <a
              className="brand-logo"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
            >
              <span className="brand-text">Adrian</span>
              <span className="brand-dot">.</span>
            </a>

            <div className="header-actions">
              <div className="nav-links-desktop">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className={`nav-link-static ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                className="theme-toggle-static"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </button>

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Header - Shows when scrolled */}
      <nav className={`floating-header ${isScrolled ? 'visible' : 'hidden'}`}>
        <div className="floating-nav-container">
          {/* Brand */}
          <button
            className="floating-brand"
            onClick={() => scrollToSection('#home')}
            aria-label="Go to home"
          >
            <span className="brand-initial">A</span>
          </button>

          {/* Navigation Pills */}
          <div className="nav-pills">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                className={`nav-pill ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                onClick={() => scrollToSection(item.href)}
                title={item.label}
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <span className="pill-icon">{item.icon}</span>
                <span className="pill-label">{item.label}</span>
                <div className="pill-indicator"></div>
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            className="floating-theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="toggle-icon">
              {isDark ? <FaSun /> : <FaMoon />}
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="floating-mobile-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`floating-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                className={`mobile-nav-item ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                onClick={() => scrollToSection(item.href)}
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <span className="mobile-item-icon">{item.icon}</span>
                <span className="mobile-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default Header;
