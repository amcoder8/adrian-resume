import React from 'react';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import type { PersonalInfo, SocialLink } from '../types';

interface HeroSimpleProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}

const HeroSimple: React.FC<HeroSimpleProps> = ({ personalInfo, socialLinks }) => {
  const handleDownloadResume = () => {
    // In a real application, this would download an actual PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This file should be in the public folder
    link.download = 'Adrian-Resume.pdf';
    link.click();
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-simple">
      {/* Background Pattern */}
      <div className="hero-pattern"></div>

      {/* Content Overlay */}
      <div className="hero-overlay"></div>

      {/* Chicago Skyline Silhouette */}
      <div className="chicago-skyline"></div>

      <div className="container-fluid container-custom">
        <div className="row align-items-center min-vh-100">
          <div className="col-12">
            <div className="hero-content text-center">
              {/* Main Title */}
              <h1 className="hero-title">
                Hi, I'm <span className="text-accent">{personalInfo.name}</span>
              </h1>
              
              {/* Subtitle */}
              <h2 className="hero-subtitle">{personalInfo.title}</h2>
              
              {/* Tagline */}
              <p className="lead hero-tagline mb-4">
                {personalInfo.tagline}
              </p>

              {/* Action Buttons */}
              <div className="hero-buttons">
                <button
                  className="btn btn-custom btn-primary"
                  onClick={handleDownloadResume}
                  aria-label="Download resume PDF"
                >
                  <FaDownload aria-hidden="true" />
                  Download Resume
                </button>
                <button
                  className="btn btn-custom btn-outline"
                  onClick={scrollToContact}
                  aria-label="Scroll to contact section"
                >
                  <FaEnvelope aria-hidden="true" />
                  Contact Me
                </button>
              </div>

              {/* Social Links */}
              <div className="social-links mt-4">
                <div className="d-flex justify-content-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={`Visit ${link.platform} profile`}
                    >
                      {link.platform === 'github' && <FaGithub size={24} aria-hidden="true" />}
                      {link.platform === 'linkedin' && <FaLinkedin size={24} aria-hidden="true" />}
                      {link.platform === 'email' && <FaEnvelope size={24} aria-hidden="true" />}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="availability-status mt-4">
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span className="status-text">Available for new opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{
        transform: `scaleX(${typeof window !== 'undefined' ?
          Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1) : 0})`
      }}></div>
    </section>
  );
};

export default HeroSimple;
