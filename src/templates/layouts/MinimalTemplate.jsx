import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, User, Calendar, Award, Briefcase, GraduationCap, Code, Languages } from 'lucide-react';

export default function MinimalTemplate({ cvData, config }) {
  // Enhanced minimal styles with subtle design elements
  const styles = {
    container: {
      fontFamily: config.fonts.body,
      color: config.colors.text,
      backgroundColor: config.colors.background,
      maxWidth: '650px',
      margin: '0 auto',
      padding: '1.5rem',
      borderRadius: config.borderRadius,
      boxShadow: '0 1px 2px -1px rgba(0, 0, 0, 0.03)',
    },
    header: {
      textAlign: 'left',
      marginBottom: config.spacing.elementGap,
      paddingBottom: '1.25rem',
    },
    profileSection: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
    },
    profileImageContainer: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: `1px solid ${config.colors.secondary}15`,
      backgroundColor: `${config.colors.secondary}03`,
      flexShrink: 0,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, ${config.colors.secondary}10, ${config.colors.primary}05)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: config.colors.secondary,
      fontSize: '2.5rem',
    },
    headerInfo: {
      flex: 1,
      minWidth: '250px',
    },
    name: {
      fontSize: '2.25rem',
      fontWeight: '300',
      fontFamily: config.fonts.heading,
      color: config.colors.text,
      marginBottom: '0.5rem',
      lineHeight: '1.2',
    },
    profession: {
      fontSize: '1.125rem',
      color: config.colors.secondary,
      marginBottom: '1.5rem',
      fontWeight: '400',
    },
    contact: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      fontSize: '0.875rem',
      color: config.colors.secondary,
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.25rem 0',
    },
    section: {
      marginBottom: config.spacing.sectionGap,
      paddingBottom: '1rem',
    },
    sectionTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      fontFamily: config.fonts.heading,
      color: config.colors.text,
      marginBottom: config.spacing.elementGap,
      paddingBottom: '0.5rem',
      borderBottom: `1px solid ${config.colors.secondary}20`,
      position: 'relative',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    sectionIcon: {
      display: 'inline-block',
      marginRight: '0.5rem',
      color: config.colors.secondary,
      opacity: 0.8,
    },
    summary: {
      fontSize: '0.95rem',
      lineHeight: '1.7',
      marginBottom: '1rem',
      color: config.colors.text,
      textAlign: 'justify',
      fontWeight: '400',
    },
    experienceItem: {
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: `1px solid ${config.colors.secondary}10`,
    },
    jobTitle: {
      fontSize: '1.1rem',
      fontWeight: '500',
      color: config.colors.text,
      marginBottom: '0.25rem',
    },
    company: {
      fontSize: '0.95rem',
      color: config.colors.secondary,
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '400',
    },
    dateLocation: {
      fontSize: '0.85rem',
      color: config.colors.secondary,
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      opacity: 0.9,
    },
    description: {
      fontSize: '0.9rem',
      lineHeight: '1.6',
      color: config.colors.text,
      fontWeight: '400',
    },
    educationItem: {
      marginBottom: '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom: `1px solid ${config.colors.secondary}10`,
    },
    degree: {
      fontSize: '1rem',
      fontWeight: '500',
      color: config.colors.text,
      marginBottom: '0.25rem',
    },
    school: {
      fontSize: '0.9rem',
      color: config.colors.secondary,
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '400',
    },
    skills: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    skill: {
      backgroundColor: 'transparent',
      color: config.colors.secondary,
      padding: '0.25rem 0',
      borderBottom: `1px solid ${config.colors.secondary}30`,
      fontSize: '0.85rem',
      fontWeight: '400',
      transition: 'all 0.2s ease',
    },
    languages: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
    },
    languageItem: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0.5rem 0',
    },
    languageName: {
      fontWeight: '500',
      color: config.colors.text,
      fontSize: '0.9rem',
      marginBottom: '0.25rem',
    },
    languageLevel: {
      color: config.colors.secondary,
      fontSize: '0.8rem',
      fontWeight: '400',
    },
  };

  const getTextDirection = () => {
    switch (cvData.language) {
      case 'ar':
        return 'rtl';
      case 'ku':
        return 'rtl';
      default:
        return 'ltr';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(cvData.language === 'en' ? 'en-US' : 'ar-KW', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div style={{ ...styles.container, direction: getTextDirection() }} className="cv-preview-content">
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.profileSection}>
          {/* Profile Image with Placeholder */}
          <div style={styles.profileImageContainer}>
            {cvData.personalInfo?.profileImage ? (
              <img
                src={cvData.personalInfo.profileImage}
                alt="Profile"
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.imagePlaceholder}>
                <User size={30} />
              </div>
            )}
          </div>

          <div style={styles.headerInfo}>
            <h1 style={styles.name}>
              {cvData.personalInfo?.fullName || 'ناوی تەواو'}
            </h1>

            <p style={styles.profession}>
              {cvData.personalInfo?.profession || 'پیشە'}
            </p>

            <div style={styles.contact}>
              {cvData.personalInfo?.email && (
                <div style={styles.contactItem}>
                  <Mail size={14} />
                  {cvData.personalInfo.email}
                </div>
              )}

              {cvData.personalInfo?.phone && (
                <div style={styles.contactItem}>
                  <Phone size={14} />
                  {cvData.personalInfo.phone}
                </div>
              )}

              {cvData.personalInfo?.address && (
                <div style={styles.contactItem}>
                  <MapPin size={14} />
                  {cvData.personalInfo.address}
                </div>
              )}

              {cvData.personalInfo?.website && (
                <div style={styles.contactItem}>
                  <Globe size={14} />
                  {cvData.personalInfo.website}
                </div>
              )}

              {cvData.personalInfo?.linkedin && (
                <div style={styles.contactItem}>
                  <Linkedin size={14} />
                  {cvData.personalInfo.linkedin}
                </div>
              )}

              {cvData.personalInfo?.github && (
                <div style={styles.contactItem}>
                  <Github size={14} />
                  {cvData.personalInfo.github}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {cvData.personalInfo?.summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}><User size={16} /></span>
            {cvData.language === 'ku' ? 'پوختەی کەسی' :
             cvData.language === 'ar' ? 'الملخص الشخصي' : 'Personal Summary'}
          </h2>
          <p style={styles.summary}>{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience Section */}
      {cvData.experience && cvData.experience.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}><Briefcase size={16} /></span>
            {cvData.language === 'ku' ? 'ئەزموونی کار' :
             cvData.language === 'ar' ? 'الخبرة العملية' : 'Work Experience'}
          </h2>

          {cvData.experience.map((exp, index) => (
            <div key={exp.id || index} style={styles.experienceItem}>
              <h3 style={styles.jobTitle}>{exp.position || 'پۆست'}</h3>
              <p style={styles.company}>
                <span style={styles.sectionIcon}><Briefcase size={14} /></span>
                {exp.company || 'کۆمپانیا'}
              </p>
              <p style={styles.dateLocation}>
                <Calendar size={12} />
                {formatDate(exp.startDate)} - {exp.current ?
                  (cvData.language === 'ku' ? 'تا ئێستا' :
                   cvData.language === 'ar' ? 'حتى الآن' : 'Present') :
                  formatDate(exp.endDate)}
                {exp.location && (
                  <>
                    <MapPin size={12} style={{ marginLeft: '0.5rem' }} />
                    {exp.location}
                  </>
                )}
              </p>
              {exp.description && (
                <p style={styles.description}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {cvData.education && cvData.education.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}><GraduationCap size={16} /></span>
            {cvData.language === 'ku' ? 'خوێندن' :
             cvData.language === 'ar' ? 'التعليم' : 'Education'}
          </h2>

          {cvData.education.map((edu, index) => (
            <div key={edu.id || index} style={styles.educationItem}>
              <h3 style={styles.degree}>
                {edu.degree} {edu.field && `في ${edu.field}`}
              </h3>
              <p style={styles.school}>
                <span style={styles.sectionIcon}><GraduationCap size={14} /></span>
                {edu.school || 'زانکۆ'}
              </p>
              <p style={styles.dateLocation}>
                <Calendar size={12} />
                {formatDate(edu.startDate)} - {edu.current ?
                  (cvData.language === 'ku' ? 'تا ئێستا' :
                   cvData.language === 'ar' ? 'حتى الآن' : 'Present') :
                  formatDate(edu.endDate)}
                {edu.location && (
                  <>
                    <MapPin size={12} style={{ marginLeft: '0.5rem' }} />
                    {edu.location}
                  </>
                )}
                {edu.gpa && (
                  <span style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}>
                    GPA: {edu.gpa}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {cvData.skills && cvData.skills.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}><Code size={16} /></span>
            {cvData.language === 'ku' ? 'شارەزاییەکان' :
             cvData.language === 'ar' ? 'المهارات' : 'Skills'}
          </h2>
          <div style={styles.skills}>
            {cvData.skills.map((skill, index) => (
              <span key={index} style={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {cvData.languages && cvData.languages.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}><Languages size={16} /></span>
            {cvData.language === 'ku' ? 'زمانەکان' :
             cvData.language === 'ar' ? 'اللغات' : 'Languages'}
          </h2>
          <div style={styles.languages}>
            {cvData.languages.map((lang, index) => (
              <div key={index} style={styles.languageItem}>
                <div style={styles.languageName}>
                  <Languages size={14} style={{ marginRight: '0.5rem' }} />
                  {lang.name || lang}
                </div>
                <div style={styles.languageLevel}>
                  {lang.level || 'Intermediate'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
