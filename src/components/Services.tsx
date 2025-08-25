import React, { useState, useRef, useEffect } from 'react';
import {
  FaCode,
  FaPalette,
  FaMobile,
  FaRocket,
  FaSearch,
  FaTools,
  FaShoppingCart,
  FaWordpress,
  FaReact,
  FaArrowRight,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaUsers
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiAstro,
  SiTailwindcss
} from 'react-icons/si';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
  pricing: {
    from: number;
    type: string;
  };
  timeline: string;
  popular?: boolean;
}

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
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

  const services: Service[] = [
    {
      id: 'frontend-development',
      title: 'Frontend Development',
      description: 'Modern, responsive websites built with the latest technologies and best practices.',
      icon: <FaCode />,
      features: [
        'Responsive Design',
        'Modern JavaScript/TypeScript',
        'React & Next.js Development',
        'Performance Optimization',
        'Cross-browser Compatibility',
        'SEO Best Practices'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Astro', 'Tailwind CSS'],
      pricing: { from: 2500, type: 'project' },
      timeline: '2-4 weeks',
      popular: true
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-centered design that combines beautiful aesthetics with intuitive functionality.',
      icon: <FaPalette />,
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Design Systems',
        'Usability Testing',
        'Mobile-First Approach'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
      pricing: { from: 1500, type: 'project' },
      timeline: '1-3 weeks'
    },
    {
      id: 'ecommerce-solutions',
      title: 'E-commerce Solutions',
      description: 'Complete online store solutions with secure payment processing and inventory management.',
      icon: <FaShoppingCart />,
      features: [
        'Shopping Cart Integration',
        'Payment Gateway Setup',
        'Inventory Management',
        'Order Management System',
        'Mobile Commerce',
        'Analytics Integration'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal'],
      pricing: { from: 3500, type: 'project' },
      timeline: '3-6 weeks'
    },
    {
      id: 'wordpress-development',
      title: 'WordPress Development',
      description: 'Custom WordPress themes and plugins tailored to your business needs.',
      icon: <FaWordpress />,
      features: [
        'Custom Theme Development',
        'Plugin Development',
        'Content Management',
        'Performance Optimization',
        'Security Implementation',
        'Maintenance & Updates'
      ],
      technologies: ['WordPress', 'PHP', 'MySQL', 'ACF'],
      pricing: { from: 2000, type: 'project' },
      timeline: '2-4 weeks'
    },
    {
      id: 'website-optimization',
      title: 'Website Optimization',
      description: 'Improve your existing website\'s performance, SEO, and user experience.',
      icon: <FaRocket />,
      features: [
        'Performance Auditing',
        'SEO Optimization',
        'Speed Optimization',
        'Mobile Optimization',
        'Accessibility Improvements',
        'Analytics Setup'
      ],
      technologies: ['Google Analytics', 'Search Console', 'PageSpeed Insights'],
      pricing: { from: 800, type: 'project' },
      timeline: '1-2 weeks'
    },
    {
      id: 'maintenance-support',
      title: 'Maintenance & Support',
      description: 'Ongoing website maintenance, updates, and technical support to keep your site running smoothly.',
      icon: <FaTools />,
      features: [
        'Regular Updates',
        'Security Monitoring',
        'Backup Management',
        'Performance Monitoring',
        'Content Updates',
        '24/7 Support'
      ],
      technologies: ['Various', 'Monitoring Tools', 'Backup Solutions'],
      pricing: { from: 200, type: 'monthly' },
      timeline: 'Ongoing'
    }
  ];

  const toggleService = (serviceId: string) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Services I Offer</h2>
          <p className="section-subtitle">
            Comprehensive web development solutions to bring your digital vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {(showAllServices ? services : services.slice(0, 3)).map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${isVisible ? 'animate' : ''} ${
                activeService === service.id ? 'expanded' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-header" onClick={() => toggleService(service.id)}>
                <div className="service-icon">
                  {service.icon}
                  {service.popular && (
                    <div className="popular-badge">Popular</div>
                  )}
                </div>
                
                <div className="service-info">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-meta">
                    <div className="meta-item">
                      <FaDollarSign />
                      <span>From ${service.pricing.from.toLocaleString()}/{service.pricing.type}</span>
                    </div>
                    <div className="meta-item">
                      <FaClock />
                      <span>{service.timeline}</span>
                    </div>
                  </div>
                </div>

                <button className="expand-btn">
                  <FaArrowRight className={activeService === service.id ? 'rotated' : ''} />
                </button>
              </div>

              {activeService === service.id && (
                <div className="service-details">
                  <div className="details-grid">
                    <div className="features-section">
                      <h4>What's Included</h4>
                      <ul className="features-list">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>
                            <FaCheck />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="technologies-section">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {service.technologies.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button className="contact-btn">
                        <span>Get Quote</span>
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {services.length > 3 && (
          <div className="services-toggle">
            <button 
              className="toggle-services-btn"
              onClick={() => setShowAllServices(!showAllServices)}
            >
              <span>
                {showAllServices ? 'Show Less Services' : `Show All ${services.length} Services`}
              </span>
              <FaArrowRight className={showAllServices ? 'rotated-up' : ''} />
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="services-cta">
          <div className="cta-content">
            <h3>Every Project is Unique</h3>
            <p>
              I believe every project deserves a custom approach. Whether you need a simple website 
              or a complex web application, let's discuss your specific requirements and create 
              a tailored solution that fits your needs and budget.
            </p>
            
            <div className="cta-buttons">
              <a href="#contact" className="primary-btn">
                Get Custom Quote
                <FaArrowRight />
              </a>
              <a href="#projects" className="secondary-btn">
                View My Work
              </a>
            </div>
          </div>

          <div className="cta-stats">
            <div className="stat">
              <FaUsers />
              <div className="stat-info">
                <span className="stat-number">20+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
            <div className="stat">
              <FaRocket />
              <div className="stat-info">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
            <div className="stat">
              <FaClock />
              <div className="stat-info">
                <span className="stat-number">98%</span>
                <span className="stat-label">On-Time Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
