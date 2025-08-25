import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEye, FaEyeSlash, FaUser, FaGraduationCap, FaBriefcase, FaProjectDiagram, FaUsers, FaCogs, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import type { 
  ResumeData, 
  FormErrors, 
  WorkExperience, 
  Project, 
  Leadership 
} from './types';
import styles from './ResumeGenerator.module.scss';

interface FormSectionProps {
  data: ResumeData;
  errors: FormErrors;
  onChange: (data: ResumeData) => void;
}

// Track which sections are enabled/visible
interface SectionVisibility {
  education: boolean;
  workExperience: boolean;
  projects: boolean;
  leadership: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({ data, errors, onChange }) => {
  
  // State for section visibility with Albanian heritage styling
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    education: true,
    workExperience: true,
    projects: true,
    leadership: false, // Leadership starts as optional/hidden
  });

  const toggleSectionVisibility = (section: keyof SectionVisibility) => {
    setSectionVisibility(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateEducation = (field: keyof typeof data.education, value: string) => {
    onChange({
      ...data,
      education: { ...data.education, [field]: value }
    });
  };

  const updateTechnicalSkills = (field: keyof typeof data.technicalSkills, value: string) => {
    onChange({
      ...data,
      technicalSkills: { ...data.technicalSkills, [field]: value }
    });
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      achievements: ['']
    };
    onChange({
      ...data,
      workExperience: [...data.workExperience, newExp]
    });
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter(exp => exp.id !== id)
    });
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | string[]) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      websiteUrl: '',
      sourceCodeUrl: '',
      technologies: '',
      description: ['']
    };
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(project => project.id !== id)
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    onChange({
      ...data,
      projects: data.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const addLeadership = () => {
    const newLeadership: Leadership = {
      id: Date.now().toString(),
      organizationName: '',
      role: '',
      startDate: '',
      endDate: '',
      urls: [''],
      achievements: ['']
    };
    onChange({
      ...data,
      leadership: [...data.leadership, newLeadership]
    });
  };

  const removeLeadership = (id: string) => {
    onChange({
      ...data,
      leadership: data.leadership.filter(lead => lead.id !== id)
    });
  };

  const updateLeadership = (id: string, field: keyof Leadership, value: string | string[]) => {
    onChange({
      ...data,
      leadership: data.leadership.map(lead =>
        lead.id === id ? { ...lead, [field]: value } : lead
      )
    });
  };

  // Helper functions for array fields
  const updateArrayField = (array: string[], index: number, value: string): string[] => {
    const newArray = [...array];
    newArray[index] = value;
    return newArray;
  };

  const addArrayItem = (array: string[]): string[] => {
    return [...array, ''];
  };

  const removeArrayItem = (array: string[], index: number): string[] => {
    return array.filter((_, i) => i !== index);
  };

  return (
    <div className={styles.formSection}>
      {/* Personal Information Section with Albanian Heritage Styling */}
      <div className={`${styles.section} ${styles.personalInfoSection}`}>
        <div className={styles.sectionHeader}>
          <h3><FaUser /> Personal Information</h3>
        </div>
        
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="John Doe"
              className={errors.personalInfo?.fullName ? styles.error : ''}
            />
            {errors.personalInfo?.fullName && (
              <span className={styles.errorMessage}>{errors.personalInfo.fullName}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={errors.personalInfo?.phone ? styles.error : ''}
            />
            {errors.personalInfo?.phone && (
              <span className={styles.errorMessage}>{errors.personalInfo.phone}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="john.doe@example.com"
              className={errors.personalInfo?.email ? styles.error : ''}
            />
            {errors.personalInfo?.email && (
              <span className={styles.errorMessage}>{errors.personalInfo.email}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={data.personalInfo.location || ''}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="City, State"
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="linkedinUrl">LinkedIn URL *</label>
            <input
              type="url"
              id="linkedinUrl"
              value={data.personalInfo.linkedinUrl}
              onChange={(e) => updatePersonalInfo('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className={errors.personalInfo?.linkedinUrl ? styles.error : ''}
            />
            {errors.personalInfo?.linkedinUrl && (
              <span className={styles.errorMessage}>{errors.personalInfo.linkedinUrl}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="githubUrl">GitHub URL *</label>
            <input
              type="url"
              id="githubUrl"
              value={data.personalInfo.githubUrl}
              onChange={(e) => updatePersonalInfo('githubUrl', e.target.value)}
              placeholder="https://github.com/yourusername"
              className={errors.personalInfo?.githubUrl ? styles.error : ''}
            />
            {errors.personalInfo?.githubUrl && (
              <span className={styles.errorMessage}>{errors.personalInfo.githubUrl}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="portfolioUrl">Portfolio URL *</label>
            <input
              type="url"
              id="portfolioUrl"
              value={data.personalInfo.portfolioUrl}
              onChange={(e) => updatePersonalInfo('portfolioUrl', e.target.value)}
              placeholder="https://yourportfolio.com"
              className={errors.personalInfo?.portfolioUrl ? styles.error : ''}
            />
            {errors.personalInfo?.portfolioUrl && (
              <span className={styles.errorMessage}>{errors.personalInfo.portfolioUrl}</span>
            )}
          </div>
        </div>
      </div>

      {/* Education Section - Optional with Albanian Heritage Design */}
      <div className={`${styles.section} ${styles.educationSection} ${!sectionVisibility.education ? styles.sectionHidden : ''}`}>
        <div className={styles.sectionHeader}>
          <h3><FaGraduationCap /> Education</h3>
          <div className={styles.sectionControls}>
            <span className={styles.optionalBadge}>Optional</span>
            <button 
              type="button"
              className={`${styles.toggleVisibility} ${!sectionVisibility.education ? styles.sectionHidden : ''}`}
              onClick={() => toggleSectionVisibility('education')}
              title={sectionVisibility.education ? "Hide section" : "Show section"}
            >
              {sectionVisibility.education ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>

        {sectionVisibility.education && (
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label htmlFor="universityName">University/Institution</label>
              <input
                type="text"
                id="universityName"
                value={data.education.universityName}
                onChange={(e) => updateEducation('universityName', e.target.value)}
                placeholder="University of Example (leave blank if not applicable)"
                className={errors.education?.universityName ? styles.error : ''}
              />
              {errors.education?.universityName && (
                <span className={styles.errorMessage}>{errors.education.universityName}</span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                value={data.education.degree}
                onChange={(e) => updateEducation('degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science (optional)"
                className={errors.education?.degree ? styles.error : ''}
              />
              {errors.education?.degree && (
                <span className={styles.errorMessage}>{errors.education.degree}</span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="minor">Minor</label>
              <input
                type="text"
                id="minor"
                value={data.education.minor || ''}
                onChange={(e) => updateEducation('minor', e.target.value)}
                placeholder="Mathematics (optional)"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="expectedGraduation">Expected Graduation</label>
              <input
                type="text"
                id="expectedGraduation"
                value={data.education.expectedGraduation}
                onChange={(e) => updateEducation('expectedGraduation', e.target.value)}
                placeholder="May 2025 (optional)"
                className={errors.education?.expectedGraduation ? styles.error : ''}
              />
              {errors.education?.expectedGraduation && (
                <span className={styles.errorMessage}>{errors.education.expectedGraduation}</span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="educationLocation">Location</label>
              <input
                type="text"
                id="educationLocation"
                value={data.education.location}
                onChange={(e) => updateEducation('location', e.target.value)}
                placeholder="City, State (optional)"
                className={errors.education?.location ? styles.error : ''}
              />
              {errors.education?.location && (
                <span className={styles.errorMessage}>{errors.education.location}</span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="gpa">GPA</label>
              <input
                type="text"
                id="gpa"
                value={data.education.gpa || ''}
                onChange={(e) => updateEducation('gpa', e.target.value)}
                placeholder="3.8/4.0 (optional)"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="relevantCourses">Relevant Courses</label>
              <textarea
                id="relevantCourses"
                value={data.education.relevantCourses}
                onChange={(e) => updateEducation('relevantCourses', e.target.value)}
                placeholder="Data Structures, Algorithms, Software Engineering... (optional)"
                rows={3}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="honors">Honors & Awards</label>
              <textarea
                id="honors"
                value={data.education.honors}
                onChange={(e) => updateEducation('honors', e.target.value)}
                placeholder="Dean's List, Magna Cum Laude... (optional)"
                rows={3}
              />
            </div>
          </div>
        )}
      </div>

      {/* Technical Skills Section with Albanian Heritage Styling */}
      <div className={`${styles.section} ${styles.technicalSkillsSection}`}>
        <div className={styles.sectionHeader}>
          <h3><FaCogs /> Technical Skills</h3>
        </div>
        
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="programmingLanguages">Programming Languages *</label>
            <input
              type="text"
              id="programmingLanguages"
              value={data.technicalSkills.programmingLanguages}
              onChange={(e) => updateTechnicalSkills('programmingLanguages', e.target.value)}
              placeholder="Java, Python, JavaScript, TypeScript, C++"
              className={errors.technicalSkills?.programmingLanguages ? styles.error : ''}
            />
            {errors.technicalSkills?.programmingLanguages && (
              <span className={styles.errorMessage}>{errors.technicalSkills.programmingLanguages}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="developerTools">Developer Tools *</label>
            <input
              type="text"
              id="developerTools"
              value={data.technicalSkills.developerTools}
              onChange={(e) => updateTechnicalSkills('developerTools', e.target.value)}
              placeholder="Git, Docker, VS Code, IntelliJ, Postman"
              className={errors.technicalSkills?.developerTools ? styles.error : ''}
            />
            {errors.technicalSkills?.developerTools && (
              <span className={styles.errorMessage}>{errors.technicalSkills.developerTools}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="librariesFrameworks">Libraries & Frameworks *</label>
            <input
              type="text"
              id="librariesFrameworks"
              value={data.technicalSkills.librariesFrameworks}
              onChange={(e) => updateTechnicalSkills('librariesFrameworks', e.target.value)}
              placeholder="React, Node.js, Express, Spring Boot, MongoDB"
              className={errors.technicalSkills?.librariesFrameworks ? styles.error : ''}
            />
            {errors.technicalSkills?.librariesFrameworks && (
              <span className={styles.errorMessage}>{errors.technicalSkills.librariesFrameworks}</span>
            )}
          </div>
        </div>
      </div>

      {/* Work Experience Section - Optional with Albanian Heritage Design */}
      <div className={`${styles.section} ${styles.workExperienceSection} ${!sectionVisibility.workExperience ? styles.sectionHidden : ''}`}>
        <div className={styles.sectionHeader}>
          <h3><FaBriefcase /> Work Experience</h3>
          <div className={styles.sectionControls}>
            <span className={styles.optionalBadge}>Optional</span>
            <button 
              type="button"
              className={`${styles.toggleVisibility} ${!sectionVisibility.workExperience ? styles.sectionHidden : ''}`}
              onClick={() => toggleSectionVisibility('workExperience')}
              title={sectionVisibility.workExperience ? "Hide section" : "Show section"}
            >
              {sectionVisibility.workExperience ? <FaToggleOn /> : <FaToggleOff />}
            </button>
            {sectionVisibility.workExperience && (
              <button type="button" onClick={addWorkExperience} className="btn btn-primary">
                <FaPlus /> Add Experience
              </button>
            )}
          </div>
        </div>

        {sectionVisibility.workExperience && (
          <div className={styles.dynamicSection}>
            {data.workExperience.map((exp, index) => (
              <div key={exp.id} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h4>Experience {index + 1}</h4>
                  {data.workExperience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(exp.id)}
                      className={styles.removeButton}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label htmlFor={`companyName-${exp.id}`}>Company Name *</label>
                    <input
                      type="text"
                      id={`companyName-${exp.id}`}
                      value={exp.companyName}
                      onChange={(e) => updateWorkExperience(exp.id, 'companyName', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`position-${exp.id}`}>Position *</label>
                    <input
                      type="text"
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`startDate-${exp.id}`}>Start Date *</label>
                    <input
                      type="text"
                      id={`startDate-${exp.id}`}
                      value={exp.startDate}
                      onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="June 2023"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`endDate-${exp.id}`}>End Date *</label>
                    <input
                      type="text"
                      id={`endDate-${exp.id}`}
                      value={exp.endDate}
                      onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="Present or August 2023"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`workLocation-${exp.id}`}>Location *</label>
                    <input
                      type="text"
                      id={`workLocation-${exp.id}`}
                      value={exp.location}
                      onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                      placeholder="City, State"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label>Achievements *</label>
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className={styles.arrayInputGroup}>
                        <textarea
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = updateArrayField(exp.achievements, achievementIndex, e.target.value);
                            updateWorkExperience(exp.id, 'achievements', newAchievements);
                          }}
                          placeholder="Describe your achievement..."
                          rows={2}
                        />
                        <div className={styles.arrayControls}>
                          <button
                            type="button"
                            onClick={() => {
                              const newAchievements = addArrayItem(exp.achievements);
                              updateWorkExperience(exp.id, 'achievements', newAchievements);
                            }}
                            className={styles.addArrayButton}
                          >
                            <FaPlus />
                          </button>
                          {exp.achievements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newAchievements = removeArrayItem(exp.achievements, achievementIndex);
                                updateWorkExperience(exp.id, 'achievements', newAchievements);
                              }}
                              className={styles.removeArrayButton}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Section - Optional with Albanian Heritage Design */}
      <div className={`${styles.section} ${styles.projectsSection} ${!sectionVisibility.projects ? styles.sectionHidden : ''}`}>
        <div className={styles.sectionHeader}>
          <h3><FaProjectDiagram /> Projects</h3>
          <div className={styles.sectionControls}>
            <span className={styles.optionalBadge}>Optional</span>
            <button 
              type="button"
              className={`${styles.toggleVisibility} ${!sectionVisibility.projects ? styles.sectionHidden : ''}`}
              onClick={() => toggleSectionVisibility('projects')}
              title={sectionVisibility.projects ? "Hide section" : "Show section"}
            >
              {sectionVisibility.projects ? <FaToggleOn /> : <FaToggleOff />}
            </button>
            {sectionVisibility.projects && (
              <button type="button" onClick={addProject} className="btn btn-primary">
                <FaPlus /> Add Project
              </button>
            )}
          </div>
        </div>

        {sectionVisibility.projects && (
          <div className={styles.dynamicSection}>
            {data.projects.map((project, index) => (
              <div key={project.id} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h4>Project {index + 1}</h4>
                  {data.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className={styles.removeButton}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label htmlFor={`projectName-${project.id}`}>Project Name *</label>
                    <input
                      type="text"
                      id={`projectName-${project.id}`}
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      placeholder="My Awesome Project"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`websiteUrl-${project.id}`}>Website URL</label>
                    <input
                      type="url"
                      id={`websiteUrl-${project.id}`}
                      value={project.websiteUrl || ''}
                      onChange={(e) => updateProject(project.id, 'websiteUrl', e.target.value)}
                      placeholder="https://myproject.com (optional)"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`sourceCodeUrl-${project.id}`}>Source Code URL</label>
                    <input
                      type="url"
                      id={`sourceCodeUrl-${project.id}`}
                      value={project.sourceCodeUrl || ''}
                      onChange={(e) => updateProject(project.id, 'sourceCodeUrl', e.target.value)}
                      placeholder="https://github.com/username/project (optional)"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`technologies-${project.id}`}>Technologies *</label>
                    <input
                      type="text"
                      id={`technologies-${project.id}`}
                      value={project.technologies}
                      onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label>Description *</label>
                    {project.description.map((desc, descIndex) => (
                      <div key={descIndex} className={styles.arrayInputGroup}>
                        <textarea
                          value={desc}
                          onChange={(e) => {
                            const newDescription = updateArrayField(project.description, descIndex, e.target.value);
                            updateProject(project.id, 'description', newDescription);
                          }}
                          placeholder="Describe this aspect of your project..."
                          rows={2}
                        />
                        <div className={styles.arrayControls}>
                          <button
                            type="button"
                            onClick={() => {
                              const newDescription = addArrayItem(project.description);
                              updateProject(project.id, 'description', newDescription);
                            }}
                            className={styles.addArrayButton}
                          >
                            <FaPlus />
                          </button>
                          {project.description.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newDescription = removeArrayItem(project.description, descIndex);
                                updateProject(project.id, 'description', newDescription);
                              }}
                              className={styles.removeArrayButton}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leadership Section - Optional with Albanian Heritage Design */}
      <div className={`${styles.section} ${styles.leadershipSection} ${!sectionVisibility.leadership ? styles.sectionHidden : ''}`}>
        <div className={styles.sectionHeader}>
          <h3><FaUsers /> Leadership & Extracurriculars</h3>
          <div className={styles.sectionControls}>
            <span className={styles.optionalBadge}>Optional</span>
            <button 
              type="button"
              className={`${styles.toggleVisibility} ${!sectionVisibility.leadership ? styles.sectionHidden : ''}`}
              onClick={() => toggleSectionVisibility('leadership')}
              title={sectionVisibility.leadership ? "Hide section" : "Show section"}
            >
              {sectionVisibility.leadership ? <FaToggleOn /> : <FaToggleOff />}
            </button>
            {sectionVisibility.leadership && (
              <button type="button" onClick={addLeadership} className="btn btn-primary">
                <FaPlus /> Add Leadership
              </button>
            )}
          </div>
        </div>

        {sectionVisibility.leadership && (
          <div className={styles.dynamicSection}>
            {data.leadership.map((lead, index) => (
              <div key={lead.id} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h4>Leadership {index + 1}</h4>
                  {data.leadership.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLeadership(lead.id)}
                      className={styles.removeButton}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label htmlFor={`organizationName-${lead.id}`}>Organization Name *</label>
                    <input
                      type="text"
                      id={`organizationName-${lead.id}`}
                      value={lead.organizationName}
                      onChange={(e) => updateLeadership(lead.id, 'organizationName', e.target.value)}
                      placeholder="Student Government"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`role-${lead.id}`}>Role *</label>
                    <input
                      type="text"
                      id={`role-${lead.id}`}
                      value={lead.role}
                      onChange={(e) => updateLeadership(lead.id, 'role', e.target.value)}
                      placeholder="President"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`leadStartDate-${lead.id}`}>Start Date *</label>
                    <input
                      type="text"
                      id={`leadStartDate-${lead.id}`}
                      value={lead.startDate}
                      onChange={(e) => updateLeadership(lead.id, 'startDate', e.target.value)}
                      placeholder="September 2022"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={`leadEndDate-${lead.id}`}>End Date *</label>
                    <input
                      type="text"
                      id={`leadEndDate-${lead.id}`}
                      value={lead.endDate}
                      onChange={(e) => updateLeadership(lead.id, 'endDate', e.target.value)}
                      placeholder="Present or May 2023"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label>URLs</label>
                    {lead.urls.map((url, urlIndex) => (
                      <div key={urlIndex} className={styles.arrayInputGroup}>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => {
                            const newUrls = updateArrayField(lead.urls, urlIndex, e.target.value);
                            updateLeadership(lead.id, 'urls', newUrls);
                          }}
                          placeholder="https://organization.com (optional)"
                        />
                        <div className={styles.arrayControls}>
                          <button
                            type="button"
                            onClick={() => {
                              const newUrls = addArrayItem(lead.urls);
                              updateLeadership(lead.id, 'urls', newUrls);
                            }}
                            className={styles.addArrayButton}
                          >
                            <FaPlus />
                          </button>
                          {lead.urls.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newUrls = removeArrayItem(lead.urls, urlIndex);
                                updateLeadership(lead.id, 'urls', newUrls);
                              }}
                              className={styles.removeArrayButton}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.formField}>
                    <label>Achievements *</label>
                    {lead.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className={styles.arrayInputGroup}>
                        <textarea
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = updateArrayField(lead.achievements, achievementIndex, e.target.value);
                            updateLeadership(lead.id, 'achievements', newAchievements);
                          }}
                          placeholder="Describe your achievement..."
                          rows={2}
                        />
                        <div className={styles.arrayControls}>
                          <button
                            type="button"
                            onClick={() => {
                              const newAchievements = addArrayItem(lead.achievements);
                              updateLeadership(lead.id, 'achievements', newAchievements);
                            }}
                            className={styles.addArrayButton}
                          >
                            <FaPlus />
                          </button>
                          {lead.achievements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newAchievements = removeArrayItem(lead.achievements, achievementIndex);
                                updateLeadership(lead.id, 'achievements', newAchievements);
                              }}
                              className={styles.removeArrayButton}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSection;
