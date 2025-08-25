import React, { useState, useRef, useEffect } from 'react';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaUser,
  FaComments,
  FaSpinner,
  FaInstagram
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    projectType: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const socialLinks = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      tooltip: 'Send me an email',
      link: 'mailto:adrian@example.com',
      color: '#EA4335'
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      tooltip: 'Connect with me on LinkedIn',
      link: 'https://linkedin.com/in/adrian',
      color: '#0077B5'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      tooltip: 'View my projects on GitHub',
      link: 'https://github.com/adrian',
      color: '#333333'
    },
    {
      icon: <FaInstagram />,
      title: 'Instagram',
      tooltip: 'Follow me on Instagram',
      link: 'https://instagram.com/adrian',
      color: '#E4405F'
    },
    {
      icon: <SiTiktok />,
      title: 'TikTok',
      tooltip: 'Watch my content on TikTok',
      link: 'https://tiktok.com/@adrian',
      color: '#000000'
    }
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Available for remote work',
      link: '',
      color: '#4285F4'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation - enhanced
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain letters and spaces';
    }

    // Email validation - enhanced
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email must be less than 100 characters';
    }

    // Subject validation - enhanced
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject must be less than 100 characters';
    }

    // Message validation - enhanced
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    // Budget validation (optional but with format check)
    if (formData.budget && formData.budget.trim()) {
      if (!/^[\d,\s$-]+$/.test(formData.budget)) {
        newErrors.budget = 'Please enter a valid budget format (e.g., $5000-$10000)';
      }
    }

    // Timeline validation (optional but with format check)
    if (formData.timeline && formData.timeline.trim()) {
      if (formData.timeline.trim().length < 3) {
        newErrors.timeline = 'Please provide a more specific timeline';
      } else if (formData.timeline.trim().length > 50) {
        newErrors.timeline = 'Timeline must be less than 50 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Enhanced form submission with better data structure
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        sessionId: Math.random().toString(36).substr(2, 9)
      };

      // In a real implementation, you would send this to your backend
      // Example endpoints: Netlify Forms, Formspree, custom API, etc.
      
      // For now, we'll simulate the API call with validation
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.1) { // 90% success rate
            resolve('success');
          } else {
            reject(new Error('Network error'));
          }
        }, 2000);
      });

      // Success: Clear form and show success message
      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        subject: '', 
        message: '',
        budget: '',
        timeline: '',
        projectType: ''
      });
      setErrors({});

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => setSubmitStatus('idle'), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case 'name': return <FaUser />;
      case 'email': return <FaEnvelope />;
      case 'subject': return <FaComments />;
      case 'message': return <FaComments />;
      default: return null;
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="container">
        <div className={`contact-content ${isVisible ? 'fade-in' : ''}`}>

          {/* Section Header */}
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to start your next project? Let's create something amazing together.
            </p>
          </div>

          <div className="row align-items-start">

            {/* Contact Information */}
            <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
              <div className="contact-info">
                <div className="contact-intro mb-4">
                  <h4 className="contact-title">Let's Start a Conversation</h4>
                  <p className="contact-description">
                    Whether you have a project in mind, need a consultation, or just want to say hello,
                    I'd love to hear from you. I'm always open to discussing new opportunities and
                    exciting challenges.
                  </p>
                </div>

                {/* Social Icons */}
                <div className="social-icons-section mb-4">
                  <h5 className="social-title">Connect With Me</h5>
                  <div className="social-icons-horizontal">
                    {socialLinks.map((social, index) => (
                      <div key={index} className="social-icon-wrapper">
                        <a
                          href={social.link}
                          className="social-icon-link"
                          style={{ '--social-color': social.color } as React.CSSProperties}
                          target={social.link.startsWith('http') ? '_blank' : '_self'}
                          rel={social.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          data-tooltip={social.tooltip}
                          data-aos="zoom-in"
                          data-aos-delay={index * 100}
                        >
                          {social.icon}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Info */}
                <div className="contact-cards">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="contact-card"
                      style={{ '--card-color': info.color } as React.CSSProperties}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="contact-icon" style={{ color: info.color }}>
                        {info.icon}
                      </div>
                      <div className="contact-details">
                        <h6 className="contact-method">{info.title}</h6>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="contact-value"
                            target={info.link.startsWith('http') ? '_blank' : '_self'}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="contact-value">{info.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Availability Status */}
                <div className="availability-status" data-aos="fade-up" data-aos-delay="400">
                  <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span className="status-text">Available for new projects</span>
                  </div>
                  <p className="status-description">
                    Currently accepting new freelance projects and full-time opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="contact-form-container">
                <form onSubmit={handleSubmit} className="contact-form">

                  {/* Form Header */}
                  <div className="form-header mb-4">
                    <h5 className="form-title">Send Me a Message</h5>
                    <p className="form-subtitle">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="row g-3">

                    {/* Name Field */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          <FaUser className="me-2" />
                          Full Name
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`form-control ${errors.name ? 'error' : ''}`}
                            placeholder="Your full name"
                            disabled={isSubmitting}
                          />
                          {errors.name && (
                            <div className="error-message">
                              <FaTimes className="me-1" />
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          <FaEnvelope className="me-2" />
                          Email Address
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`form-control ${errors.email ? 'error' : ''}`}
                            placeholder="your.email@example.com"
                            disabled={isSubmitting}
                          />
                          {errors.email && (
                            <div className="error-message">
                              <FaTimes className="me-1" />
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="subject" className="form-label">
                          <FaComments className="me-2" />
                          Subject
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className={`form-control ${errors.subject ? 'error' : ''}`}
                            placeholder="What's this about?"
                            disabled={isSubmitting}
                          />
                          {errors.subject && (
                            <div className="error-message">
                              <FaTimes className="me-1" />
                              {errors.subject}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="message" className="form-label">
                          <FaComments className="me-2" />
                          Message
                        </label>
                        <div className="input-wrapper">
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className={`form-control ${errors.message ? 'error' : ''}`}
                            placeholder="Tell me about your project or just say hello..."
                            rows={6}
                            disabled={isSubmitting}
                          />
                          {errors.message && (
                            <div className="error-message">
                              <FaTimes className="me-1" />
                              {errors.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-actions mt-4">
                    <button
                      type="submit"
                      className={`btn btn-primary btn-lg submit-btn ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="spinner me-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="status-message success">
                      <FaCheck className="me-2" />
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="status-message error">
                      <FaTimes className="me-2" />
                      Something went wrong. Please try again or contact me directly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
