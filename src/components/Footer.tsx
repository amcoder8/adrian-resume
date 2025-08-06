import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      platform: 'github',
      url: 'https://github.com/adrian',
      icon: <FaGithub />
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/adrian',
      icon: <FaLinkedin />
    },
    {
      platform: 'email',
      url: 'mailto:adrian@example.com',
      icon: <FaEnvelope />
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container-fluid container-custom">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              © {currentYear} Adrian. Made with <FaHeart className="text-danger" /> using Astro & React
            </p>
          </div>
          
          <div className="col-md-6 text-center text-md-end">
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link me-3"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.2rem',
                    transition: 'var(--transition-base)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="row mt-3">
          <div className="col-12 text-center">
            <button 
              onClick={scrollToTop}
              className="btn btn-outline-light btn-sm"
              style={{ borderRadius: '20px' }}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
