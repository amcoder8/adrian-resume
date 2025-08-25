import React, { useState, useEffect, useCallback } from 'react';
import { FaSave, FaUndo, FaDownload, FaEye, FaFileImport, FaFileExport, FaPrint } from 'react-icons/fa';
import FormSection from './FormSection';
import LatexPreview from './LatexPreview';
import type { ResumeData, FormErrors } from './types';
import { 
  generateLatexTemplate, 
  downloadLatexFile, 
  copyToClipboard 
} from '../../utils/latexGenerator';
import styles from './ResumeGenerator.module.scss';

const STORAGE_KEY = 'resume-generator-data';

const ResumeGenerator: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      phone: '',
      email: '',
      linkedinUrl: '',
      githubUrl: '',
      portfolioUrl: ''
    },
    education: {
      universityName: '',
      degree: '',
      minor: '',
      expectedGraduation: '',
      location: '',
      gpa: '',
      relevantCourses: '',
      honors: ''
    },
    workExperience: [],
    projects: [],
    leadership: [],
    technicalSkills: {
      programmingLanguages: '',
      developerTools: '',
      librariesFrameworks: ''
    }
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [latexContent, setLatexContent] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Enhanced save/load functionality
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setResumeData(parsed);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Generate LaTeX content whenever resume data changes
  useEffect(() => {
    const generateContent = () => {
      try {
        const content = generateLatexTemplate(resumeData);
        setLatexContent(content);
      } catch (error) {
        console.error('Error generating LaTeX:', error);
        setLatexContent('% Error generating LaTeX template');
      }
    };

    // Debounce the generation to avoid excessive updates
    const timeoutId = setTimeout(generateContent, 300);
    return () => clearTimeout(timeoutId);
  }, [resumeData]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [resumeData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate personal info
    if (!resumeData.personalInfo.fullName.trim()) {
      newErrors.personalInfo = { ...newErrors.personalInfo, fullName: 'Full name is required' };
    }
    if (!resumeData.personalInfo.phone.trim()) {
      newErrors.personalInfo = { ...newErrors.personalInfo, phone: 'Phone is required' };
    }
    if (!resumeData.personalInfo.email.trim()) {
      newErrors.personalInfo = { ...newErrors.personalInfo, email: 'Email is required' };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.personalInfo.email)) {
      newErrors.personalInfo = { ...newErrors.personalInfo, email: 'Invalid email format' };
    }

    // Validate education
    if (!resumeData.education.universityName.trim()) {
      newErrors.education = { ...newErrors.education, universityName: 'University name is required' };
    }
    if (!resumeData.education.degree.trim()) {
      newErrors.education = { ...newErrors.education, degree: 'Degree is required' };
    }
    if (!resumeData.education.expectedGraduation.trim()) {
      newErrors.education = { ...newErrors.education, expectedGraduation: 'Expected graduation is required' };
    }
    if (!resumeData.education.location.trim()) {
      newErrors.education = { ...newErrors.education, location: 'Location is required' };
    }

    // Validate technical skills
    if (!resumeData.technicalSkills.programmingLanguages.trim()) {
      newErrors.technicalSkills = { ...newErrors.technicalSkills, programmingLanguages: 'Programming languages are required' };
    }
    if (!resumeData.technicalSkills.developerTools.trim()) {
      newErrors.technicalSkills = { ...newErrors.technicalSkills, developerTools: 'Developer tools are required' };
    }
    if (!resumeData.technicalSkills.librariesFrameworks.trim()) {
      newErrors.technicalSkills = { ...newErrors.technicalSkills, librariesFrameworks: 'Libraries/frameworks are required' };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDataChange = useCallback((newData: ResumeData) => {
    setResumeData(newData);
  }, []);

  const handleDownload = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields before downloading.');
      return;
    }

    setIsLoading(true);
    try {
      const filename = resumeData.personalInfo.fullName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') || 'resume';
      
      downloadLatexFile(latexContent, filename);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const success = await copyToClipboard(latexContent);
      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        alert('Failed to copy to clipboard. Please try again.');
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
      const now = new Date();
      setLastSaved(now);
      setSaveMessage('Resume data saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveMessage('Failed to save data. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setResumeData(parsed);
        setSaveMessage('Resume data loaded successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        console.error('Error loading saved data:', error);
        setSaveMessage('Failed to load data. Data may be corrupted.');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } else {
      setSaveMessage('No saved data found.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleExportData = () => {
    try {
      const dataToExport = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        data: resumeData
      };
      
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSaveMessage('Data exported successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error exporting data:', error);
      setSaveMessage('Failed to export data. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const importedData = JSON.parse(content);
            
            // Validate the imported data structure
            if (importedData.data && importedData.data.personalInfo) {
              setResumeData(importedData.data);
              setSaveMessage('Data imported successfully!');
              setTimeout(() => setSaveMessage(''), 3000);
            } else {
              throw new Error('Invalid file format');
            }
          } catch (error) {
            console.error('Error importing data:', error);
            setSaveMessage('Failed to import data. Please check the file format.');
            setTimeout(() => setSaveMessage(''), 3000);
          }
        };
        reader.readAsText(file);
      }
    };
    
    input.click();
  };

  const handlePreviewPDF = () => {
    setShowPreview(true);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      setResumeData({
        personalInfo: {
          fullName: '',
          phone: '',
          email: '',
          linkedinUrl: '',
          githubUrl: '',
          portfolioUrl: ''
        },
        education: {
          universityName: '',
          degree: '',
          minor: '',
          expectedGraduation: '',
          location: '',
          gpa: '',
          relevantCourses: '',
          honors: ''
        },
        workExperience: [],
        projects: [],
        leadership: [],
        technicalSkills: {
          programmingLanguages: '',
          developerTools: '',
          librariesFrameworks: ''
        }
      });
      setErrors({});
      setSaveMessage('All data has been reset.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className={styles.resumeGenerator}>
      <div className={styles.generatorHeader}>
        <div className="container">
          <h1>🇦🇱 Albanian Heritage LaTeX Resume Generator</h1>
          <p className={styles.subtitle}>
            Create a professional, ATS-optimized resume using LaTeX with Albanian heritage design elements. 
            Fill out the form below and generate a customized LaTeX template ready for compilation.
          </p>
          
          {saveMessage && (
            <div className={`alert ${saveMessage.includes('successfully') ? 'alert-success' : 'alert-warning'} mt-3`}>
              {saveMessage}
            </div>
          )}
          
          {lastSaved && (
            <p className="text-muted small">
              Last saved: {lastSaved.toLocaleString()}
            </p>
          )}
          
          <div className={styles.headerActions}>
            <button 
              className="btn btn-secondary" 
              onClick={handleSave}
              title="Save current progress to browser"
            >
              <FaSave className="me-2" />
              Save Progress
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={handleLoad}
              title="Load previously saved data"
            >
              <FaFileImport className="me-2" />
              Load Data
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={handleExportData}
              title="Export data to JSON file"
            >
              <FaFileExport className="me-2" />
              Export Data
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={handleImportData}
              title="Import data from JSON file"
            >
              <FaFileImport className="me-2" />
              Import Data
            </button>
            
            <button 
              className="btn btn-primary" 
              onClick={handlePreviewPDF}
              title="Preview generated PDF"
            >
              <FaEye className="me-2" />
              Preview PDF
            </button>
            
            <button 
              className="btn btn-outline-secondary" 
              onClick={handleReset}
              title="Reset all data"
            >
              <FaUndo className="me-2" />
              Reset All
            </button>
          </div>
        </div>
      </div>

      <div className={styles.generatorContent}>
        <div className="container">
          <div className={styles.generatorLayout}>
            <div className={styles.formPanel}>
              <FormSection 
                data={resumeData}
                errors={errors}
                onChange={handleDataChange}
              />
            </div>
            
            <div className={styles.previewPanel}>
              <LatexPreview
                latexContent={latexContent}
                onCopy={handleCopy}
                onDownload={handleDownload}
                isCopied={isCopied}
              />
              
              {isLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner}>Generating file...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
