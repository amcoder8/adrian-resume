import React from 'react';
import { FaDownload, FaEye, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

interface ResumeGeneratorProps {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

const ResumeGenerator: React.FC<ResumeGeneratorProps> = ({ personalInfo, socialLinks }) => {
  const resumeData = {
    personal: {
      name: "Adrian Mustafa", // ← Change this from "Adrian Selmani"
      title: "Front-End Web Developer | 5+ Years of Experience | 23 Years Old",
      email: "adrian@example.com", // ← Update with your real email
      phone: "+1 (847) 343-0291", // ← Update with your real phone
      location: "Chicago, IL", // ← Update with your real location
      linkedin: "linkedin.com/in/adrian-mustafa", // ← Update with your real LinkedIn
      github: "github.com/adrian-mustafa" // ← Update with your real GitHub
    },
    summary: "Front-End Web Developer with 5+ years of experience specializing in React, TypeScript, and modern web technologies. Team player with a goal-focused mindset, known for being a quick learner, creative thinker, and detail-oriented professional. Passionate about delivering responsive, high-performance websites from concept to launch.",
    
    experience: [
      {
        title: "Junior Web Developer",
        company: "Blackline IT",
        period: "May 2024 - July 2025",
        location: "Chicago, IL / Hybrid",
        achievements: [
          "Onboarded and managed new web clients, building and maintaining websites using Astro with React and TypeScript, as well as WordPress",
          "Collaborated with clients to understand needs, provide best practice recommendations, and deliver tailored solutions",
          "Developed static websites as a primary responsibility, while contributing to larger-scale projects using the .NET framework",
          "Applied skills in C# and .NET to support backend and full-stack development tasks",
          "Successfully managed multiple client projects simultaneously while maintaining high quality standards"
        ]
      },
      {
        title: "Freelance Web Developer", 
        company: "Self-Employed",
        period: "Feb 2022 - Present",
        location: "Chicago, IL / Remote",
        achievements: [
          "Designed, developed, and maintained responsive, high-performance websites for various clients",
          "Delivered projects from concept to launch, ensuring mobile optimization, cross-browser compatibility, and SEO-friendly structures",
          "Built awechicago.com - comprehensive event management platform",
          "Developed thedaymakersalon.com - modern salon booking and management system",
          "Created visitkelcyra.com - immersive Albanian tourism platform with cultural storytelling",
          "Maintained long-term client relationships through excellent communication and project delivery"
        ]
      }
    ],

    education: [
      {
        degree: "High School Diploma",
        institution: "Maine South High School",
        period: "2020",
        location: "Illinois",
        details: "Graduated 2020 - Age 23"
      }
    ],

    skills: {
      "Front-End Technologies": ["React", "TypeScript", "JavaScript", "Next.js", "Vite", "Astro", "HTML", "CSS", "Tailwind CSS"],
      "Back-End Technologies": ["Node.js", ".NET", "C#"],
      "Tools & Workflow": ["Git/GitHub", "Figma", "UI/UX Design", "Responsive Design"],
      "CMS & Platforms": ["WordPress", "Static Site Generators"],
      "Development Focus": ["Mobile Optimization", "Cross-browser Compatibility", "SEO-friendly Structures", "Performance Optimization"]
    },

    projects: [
      {
        name: "Architectural Wood Expressions",
        technologies: ["WordPress", "Elementor", "PHP"],
        description: "Created a visually engaging website to showcase the company’s custom architectural woodwork and design services, emphasizing both the artistry and the step-by-step process of service delivery.",
        achievements: ["Increase user engagement", "Mobile responsiveness", "Overall Design Improvement"]
      },
      {
        name: "The Daymaker Salon",
        technologies: ["WordPress", "Elementor", "PHP"],
        description: "Modern salon booking and management system with client portal",
        achievements: ["Responsive design", "Booking system integration", "Client management features"]
      },
      {
        name: "Visit Kelcyra",
        technologies: ["WordPress", "Elementor", "PHP"],
        description: "Immersive Albanian tourism platform featuring cultural storytelling and adventure tours",
        achievements: ["Cultural authenticity", "Tourism promotion", "Mobile-optimized experience"]
      }
    ],

    certifications: [
      "5+ Years Web Development Experience",
      "React & TypeScript Specialist",
      "Responsive Web Design Expert",
      "Client Relations & Project Management"
    ],

    languages: [
      { name: "English", level: "Professional" },
      { name: "Albanian", level: "Native" }
    ],

    professionalAttributes: [
      "Team Player",
      "Goal-Focused", 
      "Quick Learner",
      "Creative Thinker",
      "Detail-Oriented"
    ]
  };

  const generatePDF = () => {
    // Create resume content for PDF generation
    const resumeHTML = generateResumeHTML();
    
    // Open print dialog (browser will handle PDF generation)
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(resumeHTML);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const downloadExistingPDF = () => {
    // Download the existing PDF from public folder
    const link = document.createElement('a');
    link.href = '/Adrian_Mustafa_Resume.pdf';
    link.download = 'Adrian_Mustafa_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const previewResume = () => {
    // Open resume preview in new tab
    const resumeHTML = generateResumeHTML();
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(resumeHTML);
      previewWindow.document.close();
    }
  };

  const generateResumeHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${resumeData.personal.name} - Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
          }
          
          @media print {
            body {
              padding: 15mm;
              font-size: 11pt;
            }
            .no-print {
              display: none;
            }
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #E41E20;
          }
          
          .name {
            font-size: 36px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
          }
          
          .title {
            font-size: 18px;
            color: #E41E20;
            font-weight: 600;
            margin-bottom: 15px;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 14px;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #E41E20;
          }
          
          .summary {
            font-size: 14px;
            line-height: 1.7;
            text-align: justify;
            color: #555;
          }
          
          .experience-item, .education-item, .project-item {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          
          .job-header, .edu-header, .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            flex-wrap: wrap;
          }
          
          .job-title, .degree, .project-name {
            font-weight: 700;
            font-size: 16px;
            color: #2c3e50;
          }
          
          .company, .institution {
            font-weight: 600;
            color: #E41E20;
            font-size: 14px;
          }
          
          .period {
            font-weight: 600;
            color: #666;
            font-size: 14px;
          }
          
          .location {
            color: #888;
            font-size: 13px;
            font-style: italic;
          }
          
          .achievements, .project-description {
            margin-top: 8px;
          }
          
          .achievements ul, .project-achievements ul {
            list-style-type: none;
            padding-left: 0;
          }
          
          .achievements li, .project-achievements li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 4px;
            font-size: 13px;
            line-height: 1.5;
          }
          
          .achievements li:before, .project-achievements li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #E41E20;
            font-weight: bold;
          }
          
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
          }
          
          .skill-category {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #E41E20;
          }
          
          .skill-category-title {
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
            font-size: 14px;
          }
          
          .skill-list {
            font-size: 12px;
            color: #555;
            line-height: 1.6;
          }
          
          .certifications-list, .languages-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
          }
          
          .cert-item, .lang-item {
            background: #f8f9fa;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 13px;
            text-align: center;
          }
          
          .technologies {
            margin-top: 5px;
            font-size: 12px;
            color: #666;
            font-style: italic;
          }
          
          .project-description {
            font-size: 13px;
            color: #555;
            margin-bottom: 8px;
          }
          
          @page {
            margin: 15mm;
            size: A4;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="name">${resumeData.personal.name}</h1>
          <h2 class="title">${resumeData.personal.title}</h2>
          <div class="contact-info">
            <div class="contact-item">📧 ${resumeData.personal.email}</div>
            <div class="contact-item">📱 ${resumeData.personal.phone}</div>
            <div class="contact-item">📍 ${resumeData.personal.location}</div>
            ${socialLinks.find(link => link.platform === 'linkedin') ? 
              `<div class="contact-item">💼 LinkedIn</div>` : ''}
            ${socialLinks.find(link => link.platform === 'github') ? 
              `<div class="contact-item">💻 GitHub</div>` : ''}
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">Professional Attributes</h3>
          <div style="text-align: center; font-size: 14px; color: #555; line-height: 2;">
            ${resumeData.professionalAttributes.join(' • ')}
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">Professional Summary</h3>
          <p class="summary">${resumeData.summary}</p>
        </div>

        <div class="section">
          <h3 class="section-title">Professional Experience</h3>
          ${resumeData.experience.map(exp => `
            <div class="experience-item">
              <div class="job-header">
                <div>
                  <div class="job-title">${exp.title}</div>
                  <div class="company">${exp.company}</div>
                  <div class="location">${exp.location}</div>
                </div>
                <div class="period">${exp.period}</div>
              </div>
              <div class="achievements">
                <ul>
                  ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h3 class="section-title">Featured Projects</h3>
          ${resumeData.projects.map(project => `
            <div class="project-item">
              <div class="project-header">
                <div>
                  <div class="project-name">${project.name}</div>
                  <div class="technologies">${project.technologies.join(', ')}</div>
                </div>
              </div>
              <div class="project-description">${project.description}</div>
              <div class="project-achievements">
                <ul>
                  ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h3 class="section-title">Technical Skills</h3>
          <div class="skills-grid">
            ${Object.entries(resumeData.skills).map(([category, skills]) => `
              <div class="skill-category">
                <div class="skill-category-title">${category}</div>
                <div class="skill-list">${skills.join(', ')}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">Education</h3>
          ${resumeData.education.map(edu => `
            <div class="education-item">
              <div class="edu-header">
                <div>
                  <div class="degree">${edu.degree}</div>
                  <div class="institution">${edu.institution}</div>
                  <div class="location">${edu.location}</div>
                </div>
                <div class="period">${edu.period}</div>
              </div>
              <div style="font-size: 13px; color: #666; margin-top: 5px;">${edu.details}</div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h3 class="section-title">Certifications</h3>
          <div class="certifications-list">
            ${resumeData.certifications.map(cert => `
              <div class="cert-item">${cert}</div>
            `).join('')}
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">Languages</h3>
          <div class="languages-list">
            ${resumeData.languages.map(lang => `
              <div class="lang-item">${lang.name} - ${lang.level}</div>
            `).join('')}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div className="resume-generator">
      <div className="resume-actions">
        <button 
          className="btn btn-primary resume-btn"
          onClick={downloadExistingPDF}
        >
          <FaDownload className="me-2" />
          Download Official Resume
        </button>
        
        <button 
          className="btn btn-outline-primary resume-btn"
          onClick={generatePDF}
        >
          <FaDownload className="me-2" />
          Generate Updated PDF
        </button>
        
        <button 
          className="btn btn-outline-primary resume-btn"
          onClick={previewResume}
        >
          <FaEye className="me-2" />
          Preview Resume
        </button>
      </div>
      
      <div className="resume-info">
        <p className="text-muted">
          Download my official resume or generate an updated version with the latest 
          information. Both include comprehensive details about my experience, skills, and achievements.
        </p>
      </div>
    </div>
  );
};

export default ResumeGenerator;
