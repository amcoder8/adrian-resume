import React, { useEffect } from 'react';
import AOS from 'aos';
import { ThemeProvider } from './ThemeProvider';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Skills from './Skills';
import Blog from './Blog';
import Contact from './Contact';
import LaTeXTemplate from './LaTeXTemplate';
import Footer from './Footer';

// Import styles
import '../styles/main.scss';

const Layout: React.FC = () => {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      delay: 100,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Refresh AOS on route changes
    AOS.refresh();
  }, []);

  // Personal information data
  const personalInfo = {
    name: 'Adrian Mustafa',
    title: 'Frontend Developer',
    tagline: 'Passionate developer creating beautiful, functional web experiences with modern technologies.',
    email: 'adrian@example.com',
    phone: '+1 (847) 343-0291',
    location: 'Chicago, IL'
  };

  // Social links data
  const socialLinks = [
    {
      platform: 'github',
      url: 'https://github.com/adrian-mustafa',
      icon: 'FaGithub'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/adrian-mustafa',
      icon: 'FaLinkedin'
    },
    {
      platform: 'email',
      url: 'mailto:adrian@example.com',
      icon: 'FaEnvelope'
    }
  ];

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main>
          <Hero personalInfo={personalInfo} socialLinks={socialLinks} />
          <About />
          <Services />
          <Projects />
          <Testimonials />
          <Skills />
          <Blog />
          <Contact />
          <LaTeXTemplate />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
