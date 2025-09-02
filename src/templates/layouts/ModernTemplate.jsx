import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, User, Calendar, Award, Briefcase, GraduationCap, Code, Languages } from 'lucide-react';

export default function ModernTemplate({ cvData, config }) {
  // Enhanced styles with better layout and image support
  const styles = {
    container: {
      fontFamily: config.fonts.body,
      color: config.colors.text,
      backgroundColor: config.colors.background,
      maxWidth: '750px',
      margin: '0 auto',
      padding: '1.5rem',
      borderRadius: config.borderRadius,
      boxShadow: '0 4px 15px -2px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '120px',
      background: `linear-gradient(135deg, ${config.colors.primary}08 0%, ${config.colors.accent}08 100%)`,
      zIndex: 0,
    },
    header: {
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      marginBottom: config.spacing.elementGap,
      paddingBottom: '1.25rem',
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
    },
    profileImageContainer: {
      position: 'relative',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: `3px solid ${config.colors.primary}`,
      boxShadow: `0 4px 15px -4px ${config.colors.primary}30`,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, ${config.colors.primary}20, ${config.colors.accent}20)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: config.colors.primary,
      fontSize: '3rem',
    },
    headerInfo: {
      flex: 1,
      minWidth: '300px',
    },
    name: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
      fontFamily: config.fonts.heading,
      color: config.colors.primary,
      marginBottom: '0.25rem',
      lineHeight: '1.2',
    },
    profession: {
      fontSize: '1.1rem',
      color: config.colors.accent,
      marginBottom: '1rem',
      fontWeight: '500',
    },
    contact: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '0.75rem',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontSize: '0.8rem',
      color: config.colors.secondary,
      backgroundColor: `${config.colors.primary}06`,
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      border: `1px solid ${config.colors.primary}15`,
    },
    section: {
      position: 'relative',
      zIndex: 1,
      marginBottom: config.spacing.sectionGap,
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: config.borderRadius,
      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    sectionTitle: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      fontFamily: config.fonts.heading,
      color: config.colors.primary,
      marginBottom: config.spacing.elementGap,
      paddingBottom: '0.75rem',
      borderBottom: `3px solid ${config.colors.accent}`,
      display: 'inline-block',
      position: 'relative',
    },
    sectionIcon: {
      display: 'inline-block',
      marginRight: '0.5rem',
      color: config.colors.primary,
    },
    summary: {
      fontSize: '1rem',
      lineHeight: '1.7',
      marginBottom: '1rem',
      color: config.colors.text,
      textAlign: 'justify',
      backgroundColor: `${config.colors.background}50`,
      padding: '1.5rem',
      borderRadius: config.borderRadius,
      borderLeft: `4px solid ${config.colors.primary}`,
    },
    experienceItem: {
      marginBottom: '2rem',
      padding: '1.5rem',
      backgroundColor: `${config.colors.primary}02`,
      borderRadius: config.borderRadius,
      border: `1px solid ${config.colors.primary}10`,
      transition: 'all 0.3s ease',
    },
    experienceItemHover: {
      '&:hover': {
        boxShadow: `0 4px 12px -2px ${config.colors.primary}20`,
        transform: 'translateY(-2px)',
      },
    },
    jobTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: config.colors.text,
      marginBottom: '0.25rem',
    },
    company: {
      fontSize: '1.1rem',
      color: config.colors.primary,
      fontWeight: '600',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    dateLocation: {
      fontSize: '0.9rem',
      color: config.colors.secondary,
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    description: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: config.colors.text,
    },
    educationItem: {
      marginBottom: '1.5rem',
      padding: '1.25rem',
      backgroundColor: `${config.colors.accent}05`,
      borderRadius: config.borderRadius,
      border: `1px solid ${config.colors.accent}20`,
    },
    degree: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: config.colors.text,
      marginBottom: '0.25rem',
    },
    school: {
      fontSize: '0.95rem',
      color: config.colors.primary,
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    skills: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
    },
    skillCategory: {
      marginBottom: '1.5rem',
    },
    skillTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: config.colors.text,
      marginBottom: '0.75rem',
    },
    skillTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    skill: {
      backgroundColor: config.colors.primary,
      color: 'white',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      boxShadow: `0 2px 4px -1px ${config.colors.primary}30`,
    },
    languages: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
    },
    languageItem: {
      backgroundColor: `${config.colors.secondary}05`,
      padding: '1rem',
      borderRadius: config.borderRadius,
      border: `1px solid ${config.colors.secondary}20`,
    },
    languageName: {
      fontWeight: '600',
      color: config.colors.text,
      fontSize: '1rem',
      marginBottom: '0.5rem',
    },
    languageLevel: {
      color: config.colors.secondary,
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    languageBar: {
      flex: 1,
      height: '6px',
      backgroundColor: `${config.colors.secondary}20`,
      borderRadius: '3px',
      overflow: 'hidden',
      marginLeft: '0.5rem',
    },
    languageProgress: {
      height: '100%',
      backgroundColor: config.colors.primary,
      borderRadius: '3px',
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

  // Helper function to get language level percentage
  const getLanguageLevelPercentage = (level) => {
    const levels = {
      'ئاستی سەرەتایی': 25,
      'ئاستی مام ناوەندی': 50,
      'ئاستی باش': 75,
      'ئاستی زۆر باش': 90,
      'زمانی دایک': 100,
      'Beginner': 25,
      'Intermediate': 50,
      'Good': 75,
      'Excellent': 90,
      'Native': 100,
      'مبتدئ': 25,
      'متوسط': 50,
      'جيد': 75,
      'ممتاز': 90,
      'اللغة الأم': 100
    };
    return levels[level] || 50;
  };

  return (
    <div style={{ ...styles.container, direction: getTextDirection() }} className="cv-preview-content">
      {/* Background Pattern */}
      <div style={styles.backgroundPattern}></div>

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
                <User size={40} />
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
            <span style={styles.sectionIcon}><User size={20} /></span>
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
            <span style={styles.sectionIcon}><Briefcase size={20} /></span>
            {cvData.language === 'ku' ? 'ئەزموونی کار' :
             cvData.language === 'ar' ? 'الخبرة العملية' : 'Work Experience'}
          </h2>

          {cvData.experience.map((exp, index) => (
            <div key={exp.id || index} style={styles.experienceItem}>
              <h3 style={styles.jobTitle}>{exp.position || 'پۆست'}</h3>
              <p style={styles.company}>
                <span style={styles.sectionIcon}><Briefcase size={16} /></span>
                {exp.company || 'کۆمپانیا'}
              </p>
              <p style={styles.dateLocation}>
                <Calendar size={14} />
                {formatDate(exp.startDate)} - {exp.current ?
                  (cvData.language === 'ku' ? 'تا ئێستا' :
                   cvData.language === 'ar' ? 'حتى الآن' : 'Present') :
                  formatDate(exp.endDate)}
                {exp.location && (
                  <>
                    <MapPin size={14} style={{ marginLeft: '0.5rem' }} />
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
            <span style={styles.sectionIcon}><GraduationCap size={20} /></span>
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
                <Calendar size={14} />
                {formatDate(edu.startDate)} - {edu.current ?
                  (cvData.language === 'ku' ? 'تا ئێستا' :
                   cvData.language === 'ar' ? 'حتى الآن' : 'Present') :
                  formatDate(edu.endDate)}
                {edu.location && (
                  <>
                    <MapPin size={14} style={{ marginLeft: '0.5rem' }} />
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
            <span style={styles.sectionIcon}><Code size={20} /></span>
            {cvData.language === 'ku' ? 'شارەزاییەکان' :
             cvData.language === 'ar' ? 'المهارات' : 'Skills'}
          </h2>
          <div style={styles.skillTags}>
            {cvData.skills.map((skill, index) => (
              <span key={index} style={styles.skill}>
                <Code size={12} />
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
            <span style={styles.sectionIcon}><Languages size={20} /></span>
            {cvData.language === 'ku' ? 'زمانەکان' :
             cvData.language === 'ar' ? 'اللغات' : 'Languages'}
          </h2>
          <div style={styles.languages}>
            {cvData.languages.map((lang, index) => (
              <div key={index} style={styles.languageItem}>
                <div style={styles.languageName}>
                  <Languages size={16} style={{ marginRight: '0.5rem' }} />
                  {lang.name || lang}
                </div>
                <div style={styles.languageLevel}>
                  {lang.level || 'Intermediate'}
                  <div style={styles.languageBar}>
                    <div
                      style={{
                        ...styles.languageProgress,
                        width: `${getLanguageLevelPercentage(lang.level || 'Intermediate')}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
