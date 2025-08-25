import React, { useState } from 'react';
import { FaDownload, FaEye, FaCode, FaFileAlt, FaStar, FaGithub } from 'react-icons/fa';

const LaTeXTemplate: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const templateInfo = {
    name: "Professional Software Engineer Resume Template",
    author: "Erik Cupsa",
    description: "A clean, modern LaTeX template designed to highlight technical skills, project experience, and achievements. This template has helped numerous developers secure interviews and is highly regarded in the developer community.",
    features: [
      "Clean and modern design",
      "Easy to customize and tailor",
      "Professional formatting",
      "Optimized for ATS systems",
      "LaTeX-based for crisp typography"
    ],
    stats: {
      stars: 185,
      forks: 66,
      language: "TeX"
    },
    downloadUrl: "https://github.com/Erik-Cupsa/ResumeTemplate/archive/refs/heads/main.zip",
    githubUrl: "https://github.com/Erik-Cupsa/ResumeTemplate"
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = templateInfo.downloadUrl;
    link.download = 'resume-template-latex.zip';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openGitHub = () => {
    window.open(templateInfo.githubUrl, '_blank');
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <section id="latex-template" className="latex-template">
      <div className="container">
        <div className="template-header">
          <h2>
            <FaCode className="me-2" />
            Professional <span className="text-primary">LaTeX</span> Resume Template
          </h2>
          <p className="section-subtitle">
            Based on the highly-rated template by {templateInfo.author} with {templateInfo.stats.stars} stars on GitHub. 
            Download this professional LaTeX template to create crisp, ATS-optimized resumes.
          </p>
        </div>

        <div className="template-card">
          <div className="row g-4">
            {/* Template Info */}
            <div className="col-lg-8">
              <div className="template-info">
                <h4>Template Features</h4>
                <ul className="feature-list">
                  {templateInfo.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <FaFileAlt className="feature-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="template-description">
                  <p>{templateInfo.description}</p>
                </div>

                <div className="template-stats">
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <span className="stat-item">
                      <FaStar className="me-1" />
                      {templateInfo.stats.stars} stars
                    </span>
                    <span className="stat-item">
                      <FaGithub className="me-1" />
                      {templateInfo.stats.forks} forks
                    </span>
                    <span className="stat-item">
                      <FaCode className="me-1" />
                      {templateInfo.stats.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Actions */}
            <div className="col-lg-4">
              <div className="template-actions">
                <div className="action-buttons">
                  <button 
                    className="btn btn-primary"
                    onClick={handleDownload}
                  >
                    <FaDownload className="me-2" />
                    Download Template
                  </button>
                  
                  <button 
                    className="btn btn-outline-primary"
                    onClick={openPreview}
                  >
                    <FaEye className="me-2" />
                    Preview Code
                  </button>
                  
                  <button 
                    className="btn btn-secondary"
                    onClick={openGitHub}
                  >
                    <FaGithub className="me-2" />
                    View on GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guide */}
          <div className="usage-guide">
            <h4>How to Use This Template</h4>
            <ul className="guide-steps">
              <li className="guide-step">
                <div className="step-content">
                  <div className="step-title">Install LaTeX Distribution</div>
                  <div className="step-description">
                    Download and install a LaTeX distribution like TeX Live, MiKTeX, or MacTeX for your operating system.
                  </div>
                </div>
              </li>
              <li className="guide-step">
                <div className="step-content">
                  <div className="step-title">Download & Extract</div>
                  <div className="step-description">
                    Download the template files and extract them to a folder on your computer.
                  </div>
                </div>
              </li>
              <li className="guide-step">
                <div className="step-content">
                  <div className="step-title">Customize Content</div>
                  <div className="step-description">
                    Edit the .tex file with your personal information, experience, and skills using any text editor.
                  </div>
                </div>
              </li>
              <li className="guide-step">
                <div className="step-content">
                  <div className="step-title">Compile to PDF</div>
                  <div className="step-description">
                    Use pdflatex or your LaTeX editor to compile the .tex file into a professional PDF resume.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="template-preview-modal" onClick={closePreview}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">LaTeX Template Preview</h3>
              <button className="btn-close" onClick={closePreview}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="preview-content">
                <h4>Sample LaTeX Code Structure</h4>
                <div className="template-code">
{`\\documentclass[11pt,a4paper,sans]{moderncv}
\\moderncvstyle{banking}
\\moderncvcolor{red}

\\usepackage[scale=0.75]{geometry}
\\usepackage{import}

% Personal Information
\\name{Your}{Name}
\\title{Software Engineer}
\\address{Your Address}{City, State}{Country}
\\phone[mobile]{+1~(555)~123~4567}
\\email{your.email@example.com}
\\homepage{www.yourwebsite.com}
\\social[linkedin]{yourlinkedin}
\\social[github]{yourgithub}

\\begin{document}
\\makecvtitle

% Experience Section
\\section{Experience}
\\cventry{2020--Present}{Senior Software Engineer}{Company Name}{City}{}{%
  \\begin{itemize}%
    \\item Developed and maintained web applications using React and Node.js
    \\item Led a team of 5 developers in agile development practices
    \\item Improved application performance by 40\\% through optimization
  \\end{itemize}}

% Education Section
\\section{Education}
\\cventry{2016--2020}{Bachelor of Science in Computer Science}{University Name}{City}{GPA: 3.8/4.0}{}

% Skills Section
\\section{Technical Skills}
\\cvitemwithcomment{Languages}{JavaScript, Python, Java, C++}{}
\\cvitemwithcomment{Frameworks}{React, Node.js, Express, Django}{}
\\cvitemwithcomment{Tools}{Git, Docker, AWS, Jenkins}{}

\\end{document}`}
                </div>
                
                <div className="preview-note">
                  <strong>Note:</strong> This is a simplified example. The actual template includes more sections, 
                  better formatting, and additional customization options. Download the full template to see all features.
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleDownload}>
                <FaDownload className="me-2" />
                Download Full Template
              </button>
              <button className="btn btn-secondary" onClick={closePreview}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LaTeXTemplate;
