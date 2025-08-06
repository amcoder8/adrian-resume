import React, { Suspense, useRef, useState } from 'react';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Spline from '@splinetool/react-spline';
import type { PersonalInfo, SocialLink } from '../types';

interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}

const Hero: React.FC<HeroProps> = ({ personalInfo, socialLinks }) => {
  const splineRef = useRef<any>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isModelActivated, setIsModelActivated] = useState(false);

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

  const handleSplineError = (error: any) => {
    console.warn('Spline model failed to load:', error);
  };

  const handleSplineLoad = (spline: any) => {
    splineRef.current = spline;
    setIsSplineLoaded(true);
    console.log('Spline model loaded successfully');
  };

  const handleModelActivation = () => {
    setIsModelActivated(true);
  };

  return (
    <section id="home" className="hero">
      {/* Background 3D Model */}
      <div className="spline-background">
        <Suspense fallback={
          <div className="spline-fallback">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center">
                <div className="spinner-border text-light mb-3" role="status">
                  <span className="visually-hidden">Loading 3D model...</span>
                </div>
                <p className="text-light">Loading 3D Experience...</p>
              </div>
            </div>
          </div>
        }>
          <Spline 
            scene="https://prod.spline.design/OYX9VP8mn9SSpEP6/scene.splinecode"
            onError={handleSplineError}
            onLoad={handleSplineLoad}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: isModelActivated ? 'auto' : 'none'
            }}
          />
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="hero-overlay"></div>
      
      <div className="container-fluid container-custom">
        <div className="row align-items-center min-vh-100">
          <div className="col-12">
            <div className="hero-content text-center">
              <h1 className="hero-title">
                Hi, I'm <span className="text-accent">{personalInfo.name}</span>
              </h1>
              <h2 className="hero-subtitle">{personalInfo.title}</h2>
              <p className="lead hero-tagline mb-4">
                {personalInfo.tagline}
              </p>
              
              <div className="hero-buttons">
                <button 
                  className="btn btn-custom btn-primary"
                  onClick={handleDownloadResume}
                >
                  <FaDownload />
                  Download Resume
                </button>
                <button 
                  className="btn btn-custom btn-outline"
                  onClick={scrollToContact}
                >
                  <FaEnvelope />
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
                      {link.platform === 'github' && <FaGithub size={24} />}
                      {link.platform === 'linkedin' && <FaLinkedin size={24} />}
                      {link.platform === 'email' && <FaEnvelope size={24} />}
                    </a>
                  ))}
                </div>
              </div>

              {/* 3D Model Activation Button */}
              {isSplineLoaded && !isModelActivated && (
                <div className="model-activation-button mt-4">
                  <button 
                    className="btn btn-custom btn-outline"
                    onClick={handleModelActivation}
                  >
                    🖱️ Interact with 3D model
                  </button>
                </div>
              )}

              {/* Interactive hint */}
              {isSplineLoaded && isModelActivated && (
                <div className="model-interaction-status mt-4">
                  <small className="text-light opacity-75">
                    🖱️ Click & drag the 3D model to explore
                  </small>
                </div>
              )}
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

export default Hero;
