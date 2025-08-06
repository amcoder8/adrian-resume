import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import type { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'adrian@example.com',
      href: 'mailto:adrian@example.com'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'New York, NY',
      href: null
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-fluid container-custom">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="lead">
            Have a project in mind or want to discuss opportunities? 
            I'd love to hear from you!
          </p>
        </div>

        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 mb-5 mb-lg-0" data-aos="fade-right">
            <div className="contact-info">
              <h4 className="mb-4">Contact Information</h4>
              
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item d-flex align-items-center mb-4">
                  <div className="contact-icon me-3" style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="contact-label small text-muted">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="contact-value text-decoration-none">
                        {item.value}
                      </a>
                    ) : (
                      <div className="contact-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <h6 className="mb-3">Let's Connect</h6>
                <p className="text-muted">
                  I'm always open to discussing new opportunities, interesting projects, 
                  or just having a chat about technology and development.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8" data-aos="fade-left">
            <div className="card-custom">
              {isSubmitted ? (
                <div className="text-center py-5">
                  <div className="success-icon mb-3" style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <FaCheck size={32} />
                  </div>
                  <h4 className="mb-3">Message Sent Successfully!</h4>
                  <p className="text-muted mb-4">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button 
                    className="btn btn-custom btn-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <div className="invalid-feedback">{errors.subject}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="Tell me about your project or inquiry..."
                      rows={5}
                    />
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-custom btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
