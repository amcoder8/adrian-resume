import React, { useState, useRef, useEffect } from 'react';
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
  FaLinkedin,
  FaGoogle,
  FaAward
} from 'react-icons/fa';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  content: string;
  project?: string;
  platform: 'linkedin' | 'google' | 'direct';
  date: string;
  verified: boolean;
}

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Michael Chen',
      role: 'Business Owner',
      company: 'Local Design Studio',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: "Adrian delivered exactly what we needed for our business website. The design is clean, professional, and perfectly captures our brand. The site loads fast and looks great on all devices. Our online inquiries have increased significantly since launch.",
      project: "Business Website Redesign",
      platform: 'direct',
      date: '2024',
      verified: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Tourism Director',
      company: 'Adventure Tours',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b522?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: "Working with Adrian on our tourism platform was fantastic. He understood our vision for showcasing Albanian culture and adventure tours. The booking system works flawlessly, and our international bookings have grown by 40%. Highly recommended!",
      project: "Tourism Platform Development",
      platform: 'linkedin',
      date: '2024',
      verified: true
    },
    {
      id: '3',
      name: 'David Rodriguez',
      role: 'Salon Owner',
      company: 'Premium Hair Salon',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: "Adrian created a beautiful, modern website for our salon that perfectly represents our brand. The appointment booking system has streamlined our operations, and the Instagram integration keeps our social presence fresh. Our clients love it!",
      project: "Salon Website & Booking System",
      platform: 'google',
      date: '2023',
      verified: true
    },
    {
      id: '4',
      name: 'Lisa Thompson',
      role: 'Marketing Manager',
      company: 'E-commerce Startup',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      content: "Adrian's attention to detail and technical expertise is impressive. He took our complex requirements and turned them into a user-friendly, high-performing website. The project was delivered on time and exceeded our expectations.",
      project: "E-commerce Platform",
      platform: 'linkedin',
      date: '2024',
      verified: true
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
      />
    ));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <FaLinkedin />;
      case 'google':
        return <FaGoogle />;
      default:
        return <FaAward />;
    }
  };

  const current = testimonials[currentTestimonial];

  return (
    <section id="testimonials" ref={sectionRef} className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            What clients say about working with me
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="testimonial-display">
          <div className="testimonial-content">
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            
            <div className="testimonial-text">
              <p>"{current.content}"</p>
            </div>

            <div className="testimonial-author">
              <div className="author-image">
                <img src={current.image} alt={current.name} />
                {current.verified && (
                  <div className="verified-badge">
                    <FaAward />
                  </div>
                )}
              </div>
              
              <div className="author-info">
                <h4 className="author-name">{current.name}</h4>
                <p className="author-role">{current.role}</p>
                <p className="author-company">{current.company}</p>
                
                <div className="testimonial-meta">
                  <div className="rating">
                    {renderStars(current.rating)}
                  </div>
                  
                  <div className="platform">
                    {getPlatformIcon(current.platform)}
                    <span>{current.date}</span>
                  </div>
                </div>
                
                {current.project && (
                  <div className="project-tag">
                    <span>Project: {current.project}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="testimonial-controls">
            <button
              className="control-btn prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            
            <button
              className="control-btn next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-value">20+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">4.9</div>
            <div className="stat-label">Average Rating</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">On-Time Delivery</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="testimonials-cta">
          <h3>Ready to join my satisfied clients?</h3>
          <p>Let's discuss your project and bring your vision to life</p>
          <a href="#contact" className="cta-btn">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
