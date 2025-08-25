import React, { useState } from 'react';
import { FaCopy, FaDownload, FaEye, FaTimes, FaPrint, FaFilePdf } from 'react-icons/fa';
import { highlightLatexSyntax } from '../../utils/latexGenerator';

interface LatexPreviewProps {
  latexContent: string;
  onCopy: () => void;
  onDownload: () => void;
  isCopied: boolean;
}

const LatexPreview: React.FC<LatexPreviewProps> = ({ 
  latexContent, 
  onCopy, 
  onDownload, 
  isCopied 
}) => {
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const handlePDFPreview = () => {
    // Generate a simple HTML preview that approximates the LaTeX output
    const htmlPreview = generateHTMLPreview(latexContent);
    const previewWindow = window.open('', '_blank', 'width=800,height=1000,scrollbars=yes');
    
    if (previewWindow) {
      previewWindow.document.write(htmlPreview);
      previewWindow.document.close();
    }
  };

  const generateHTMLPreview = (latex: string): string => {
    // Basic LaTeX to HTML conversion for preview purposes
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Resume Preview</title>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.4;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 1in;
            background: white;
            color: #000;
          }
          
          .header {
            text-align: center;
            margin-bottom: 0.5in;
            border-bottom: 2px solid #E41E20;
            padding-bottom: 20px;
          }
          
          .name {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 8px;
            color: #E41E20;
          }
          
          .contact {
            font-size: 11pt;
            margin-bottom: 4px;
          }
          
          .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: #E41E20;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #E41E20;
            padding-bottom: 2px;
          }
          
          .section-content {
            font-size: 11pt;
            margin-bottom: 15px;
          }
          
          .item-title {
            font-weight: bold;
            font-size: 12pt;
          }
          
          .item-subtitle {
            font-style: italic;
            color: #333;
          }
          
          .item-date {
            float: right;
            font-weight: bold;
          }
          
          .item-description {
            margin-top: 5px;
            margin-left: 15px;
          }
          
          .skills-list {
            margin: 5px 0;
          }
          
          @media print {
            body { margin: 0; padding: 0.5in; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">Resume Preview</div>
          <div class="contact">📧 Email • 📱 Phone • 📍 Location</div>
          <div class="contact">💼 LinkedIn • 💻 GitHub • 🌐 Portfolio</div>
        </div>
        
        <div class="section-title">EDUCATION</div>
        <div class="section-content">
          <div class="item-title">University Name</div>
          <div class="item-subtitle">Degree Program</div>
          <div class="item-date">Expected Graduation</div>
          <div class="item-description">GPA, Relevant Coursework, Honors</div>
        </div>
        
        <div class="section-title">TECHNICAL SKILLS</div>
        <div class="section-content">
          <div class="skills-list"><strong>Programming Languages:</strong> Your skills here</div>
          <div class="skills-list"><strong>Developer Tools:</strong> Your tools here</div>
          <div class="skills-list"><strong>Libraries & Frameworks:</strong> Your frameworks here</div>
        </div>
        
        <div class="section-title">WORK EXPERIENCE</div>
        <div class="section-content">
          <div class="item-title">Position Title</div>
          <div class="item-subtitle">Company Name</div>
          <div class="item-date">Start Date - End Date</div>
          <div class="item-description">
            • Achievement or responsibility<br>
            • Another achievement or responsibility<br>
            • Third achievement or responsibility
          </div>
        </div>
        
        <div class="section-title">PROJECTS</div>
        <div class="section-content">
          <div class="item-title">Project Name</div>
          <div class="item-subtitle">Technologies Used</div>
          <div class="item-description">
            Project description and achievements
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; color: #666; font-size: 10pt;">
          This is a simplified preview. Compile the LaTeX file for the final, professional formatting.
        </div>
      </body>
      </html>
    `;
  };
  return (
    <div className="latex-preview">
      <div className="preview-header">
        <h3>🇦🇱 LaTeX Preview & Export</h3>
        <div className="preview-actions">
          <button
            className="btn btn-secondary"
            onClick={handlePDFPreview}
            title="Preview how the PDF will look"
          >
            <FaEye className="me-2" />
            PDF Preview
          </button>
          
          <button
            className={`btn btn-secondary ${isCopied ? 'copied' : ''}`}
            onClick={onCopy}
            title="Copy LaTeX code to clipboard"
          >
            <FaCopy className="me-2" />
            {isCopied ? 'Copied!' : 'Copy LaTeX'}
          </button>
          
          <button
            className="btn btn-primary"
            onClick={onDownload}
            title="Download .tex file"
          >
            <FaDownload className="me-2" />
            Download .tex
          </button>
        </div>
      </div>
      
      <div className="preview-content">
        <div className="code-header">
          <span className="code-title">📄 Generated LaTeX Code</span>
          <span className="albanian-badge">Albanian Heritage Theme</span>
        </div>
        <pre>
          <code 
            dangerouslySetInnerHTML={{ 
              __html: highlightLatexSyntax(latexContent) 
            }}
          />
        </pre>
      </div>
      
      <div className="usage-instructions">
        <h4>🚀 How to Use This Template</h4>
        <div className="instructions-grid">
          <div className="instruction-card">
            <div className="card-header">
              <FaFilePdf className="card-icon" />
              <h5>1. Quick Start (Recommended)</h5>
            </div>
            <p>
              Use <a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer">
                <strong>Overleaf</strong>
              </a> - just upload your .tex file and it compiles automatically to a beautiful PDF!
            </p>
          </div>
          
          <div className="instruction-card">
            <div className="card-header">
              <FaDownload className="card-icon" />
              <h5>2. Local Installation</h5>
            </div>
            <ul>
              <li><strong>Windows:</strong> Install <a href="https://miktex.org/" target="_blank" rel="noopener noreferrer">MiKTeX</a></li>
              <li><strong>Mac:</strong> Install <a href="https://www.tug.org/mactex/" target="_blank" rel="noopener noreferrer">MacTeX</a></li>
              <li><strong>Linux:</strong> Install TeX Live via package manager</li>
            </ul>
          </div>
          
          <div className="instruction-card">
            <div className="card-header">
              <FaPrint className="card-icon" />
              <h5>3. Compile & Customize</h5>
            </div>
            <p>
              Compile with <code>pdflatex</code> command or your LaTeX editor. 
              Edit the .tex file directly for further customizations.
            </p>
          </div>
        </div>
        
        <div className="pro-tip">
          <div className="tip-header">
            <span className="tip-emoji">🇦🇱</span>
            <strong>Albanian Heritage Design</strong>
          </div>
          <p>
            This template features the Albanian flag colors (#E41E20) and professional formatting 
            that honors our heritage while meeting modern ATS requirements. Perfect for representing 
            your professional identity with cultural pride!
          </p>
        </div>
        
        <div className="quick-links">
          <h5>� Quick Links</h5>
          <div className="links-grid">
            <a href="https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes" target="_blank" rel="noopener noreferrer">
              LaTeX Tutorial
            </a>
            <a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer">
              Overleaf Editor
            </a>
            <a href="https://ctan.org/pkg/moderncv" target="_blank" rel="noopener noreferrer">
              ModernCV Package
            </a>
            <a href="https://www.latex-project.org/" target="_blank" rel="noopener noreferrer">
              LaTeX Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatexPreview;
