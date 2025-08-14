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
    <div id="latex-template" className="latex-template">
      <div className="template-header text-center mb-4">
        <h2 className="h3 mb-3">
          <FaCode className="me-2 text-primary" />
          Professional LaTeX Resume Template
        </h2>
        <p className="text-muted">
          Based on the highly-rated template by {templateInfo.author} with {templateInfo.stats.stars} stars on GitHub
        </p>
      </div>

      <div className="template-card">
        <div className="row g-4">
          {/* Template Info */}
          <div className="col-lg-8">
            <div className="template-info">
              <h4 className="h5 mb-3">Template Features</h4>
              <ul className="feature-list">
                {templateInfo.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <FaFileAlt className="feature-icon me-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="template-description mt-3">
                <p>{templateInfo.description}</p>
              </div>

              <div className="template-stats mt-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="stat-item">
                    <FaStar className="text-warning me-1" />
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
              <div className="action-buttons d-grid gap-3">
                <button 
                  className="btn btn-primary btn-lg"
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
                  Preview Template
                </button>
                
                <button 
                  className="btn btn-outline-secondary"
                  onClick={openGitHub}
                >
                  <FaGithub className="me-2" />
                  View on GitHub
                </button>
              </div>

              <div className="template-note mt-3">
                <small className="text-muted">
                  <strong>Note:</strong> This template requires LaTeX knowledge or tools like Overleaf to use.
                  The template is free and open-source under the original author's license.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      {isPreviewOpen && (
        <div className="template-preview-modal" onClick={closePreview}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Template Preview</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={closePreview}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="preview-content">
                <h4>Template Structure</h4>
                <pre className="template-code">
{`% Main Resume Template Structure
\\documentclass[11pt,letterpaper,sans]{moderncv}

% Personal Information
\\name{Your Name}
\\title{Software Engineer}
\\phone{+1 (555) 123-4567}
\\email{your.email@example.com}
\\social[github]{your-github}
\\social[linkedin]{your-linkedin}

% Document Content
\\begin{document}
\\makecvtitle

% Summary Section
\\section{Professional Summary}
Your professional summary here...

% Experience Section
\\section{Professional Experience}
\\cventry{2020--Present}
{Software Engineer}
{Company Name}
{Location}
{}{Description of role and achievements}

% Skills Section
\\section{Technical Skills}
\\cvitem{Languages}{JavaScript, Python, Java, C++}
\\cvitem{Frameworks}{React, Node.js, Django, Spring}

% Education Section
\\section{Education}
\\cventry{2016--2020}
{Bachelor of Science in Computer Science}
{University Name}
{Location}
{GPA: 3.8/4.0}{Relevant coursework and achievements}

\\end{document}`}
                </pre>
                
                <div className="preview-info mt-3">
                  <h5>How to Use:</h5>
                  <ol>
                    <li>Download the template files</li>
                    <li>Install a LaTeX distribution (TeX Live, MiKTeX) or use Overleaf</li>
                    <li>Customize the content with your information</li>
                    <li>Compile to generate your PDF resume</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleDownload}
              >
                <FaDownload className="me-2" />
                Download Template
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={closePreview}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaTeXTemplate;
