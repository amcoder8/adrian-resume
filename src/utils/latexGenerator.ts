import type { ResumeData } from '../components/ResumeGenerator/types';

/**
 * Escapes special LaTeX characters in a string
 */
export const escapeLatex = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\$/g, '\\$')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/_/g, '\\_')
    .replace(/~/g, '\\textasciitilde{}');
};

/**
 * Generates the complete LaTeX resume template
 */
export const generateLatexTemplate = (data: ResumeData): string => {
  const { personalInfo, education, workExperience, projects, leadership, technicalSkills } = data;

  // Header section
  const header = `%-------------------------
% Resume in Latex
% Author : Adrian Mustafa
% Based on template by: Jake Gutierrez
% Inspired by: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\input{glyphtounicode}

%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\pdfgentounicode=1

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}`;

  // Personal info section
  const personalSection = `
%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personalInfo.fullName)}} \\\\[8pt]
    \\small \\faPhone\\ ${escapeLatex(personalInfo.phone)} $|$ \\href{mailto:${escapeLatex(personalInfo.email)}}{\\faEnvelope\\ ${escapeLatex(personalInfo.email)}} $|$ 
    \\href{${escapeLatex(personalInfo.linkedinUrl)}}{\\faLinkedin\\ LinkedIn} $|$
    \\href{${escapeLatex(personalInfo.githubUrl)}}{\\faGithub\\ GitHub}${personalInfo.portfolioUrl ? ` $|$ \\href{${escapeLatex(personalInfo.portfolioUrl)}}{\\faBriefcase\\ Portfolio}` : ''}
\\end{center}`;

  // Education section
  const educationSection = `
%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {${escapeLatex(education.universityName)}}{${escapeLatex(education.location)}}
      {${escapeLatex(education.degree)}${education.minor ? `, Minor in ${escapeLatex(education.minor)}` : ''}${education.gpa ? ` (GPA: ${escapeLatex(education.gpa)})` : ''}}{${escapeLatex(education.expectedGraduation)}}
      ${education.relevantCourses ? `\\resumeItemListStart
        \\resumeItem{\\textbf{Relevant Courses:} ${escapeLatex(education.relevantCourses)}}
      \\resumeItemListEnd` : ''}
      ${education.honors ? `\\resumeItemListStart
        \\resumeItem{\\textbf{Honors/Achievements:} ${escapeLatex(education.honors)}}
      \\resumeItemListEnd` : ''}
  \\resumeSubHeadingListEnd`;

  // Work experience section
  const experienceSection = workExperience.length > 0 ? `
%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${workExperience.map(exp => `    \\resumeSubheading
      {${escapeLatex(exp.companyName)}}{${escapeLatex(exp.location)}}
      {${escapeLatex(exp.position)}}{${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate)}}
      \\resumeItemListStart
${exp.achievements.filter(a => a.trim()).map(achievement => `        \\resumeItem{${escapeLatex(achievement)}}`).join('\n')}
      \\resumeItemListEnd`).join('\n')}
  \\resumeSubHeadingListEnd` : '';

  // Projects section
  const projectsSection = projects.length > 0 ? `
%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
${projects.map(project => {
    let projectHeader = `\\textbf{${escapeLatex(project.name)}}`;
    const links = [];
    if (project.websiteUrl) links.push(`\\href{${escapeLatex(project.websiteUrl)}}{Website}`);
    if (project.sourceCodeUrl) links.push(`\\href{${escapeLatex(project.sourceCodeUrl)}}{Source}`);
    if (links.length > 0) {
      projectHeader += ` $|$ ${links.join(' $|$ ')}`;
    }
    
    return `      \\resumeProjectHeading
          {${projectHeader}}{${escapeLatex(project.technologies)}}
          \\resumeItemListStart
${project.description.filter(d => d.trim()).map(desc => `            \\resumeItem{${escapeLatex(desc)}}`).join('\n')}
          \\resumeItemListEnd`;
  }).join('\n')}
    \\resumeSubHeadingListEnd` : '';

  // Leadership section
  const leadershipSection = leadership.length > 0 ? `
%-----------LEADERSHIP-----------
\\section{Leadership \\& Extracurricular Activities}
    \\resumeSubHeadingListStart
${leadership.map(lead => {
    let orgHeader = escapeLatex(lead.organizationName);
    if (lead.urls.length > 0) {
      const urlLinks = lead.urls.filter(url => url.trim()).map(url => `\\href{${escapeLatex(url)}}{Link}`);
      if (urlLinks.length > 0) {
        orgHeader += ` $|$ ${urlLinks.join(' $|$ ')}`;
      }
    }
    
    return `      \\resumeSubheading
        {${orgHeader}}{${escapeLatex(lead.startDate)} -- ${escapeLatex(lead.endDate)}}
        {${escapeLatex(lead.role)}}{}
        \\resumeItemListStart
${lead.achievements.filter(a => a.trim()).map(achievement => `          \\resumeItem{${escapeLatex(achievement)}}`).join('\n')}
        \\resumeItemListEnd`;
  }).join('\n')}
    \\resumeSubHeadingListEnd` : '';

  // Technical skills section
  const skillsSection = `
%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Programming Languages}{: ${escapeLatex(technicalSkills.programmingLanguages)}} \\\\
     \\textbf{Developer Tools}{: ${escapeLatex(technicalSkills.developerTools)}} \\\\
     \\textbf{Libraries/Frameworks}{: ${escapeLatex(technicalSkills.librariesFrameworks)}}
    }}
 \\end{itemize}`;

  const footer = `

\\end{document}`;

  return header + personalSection + educationSection + experienceSection + projectsSection + leadershipSection + skillsSection + footer;
};

/**
 * Downloads the generated LaTeX content as a .tex file
 */
export const downloadLatexFile = (latexContent: string, filename: string = 'resume'): void => {
  const blob = new Blob([latexContent], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.href = url;
  link.download = `${filename}.tex`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copies the LaTeX content to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  }
};

/**
 * Basic syntax highlighting for LaTeX preview
 */
export const highlightLatexSyntax = (latex: string): string => {
  return latex
    // Comments
    .replace(/(%.+$)/gm, '<span class="latex-comment">$1</span>')
    // Commands
    .replace(/(\\[a-zA-Z]+\*?)/g, '<span class="latex-command">$1</span>')
    // Braces
    .replace(/(\{|\})/g, '<span class="latex-brace">$1</span>')
    // Math mode
    .replace(/(\$[^$]*\$)/g, '<span class="latex-math">$1</span>')
    // Optional parameters
    .replace(/(\[[^\]]*\])/g, '<span class="latex-optional">$1</span>');
};
