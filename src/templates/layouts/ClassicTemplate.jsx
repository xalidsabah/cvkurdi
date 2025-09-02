import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, User, Calendar, Award, Briefcase, GraduationCap, Code, Languages } from 'lucide-react';

export default function ClassicTemplate({ cvData, config }) {
  // Enhanced styles for ClassicTemplate
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
      border: `1px solid ${config.colors.secondary}`,
    },
    header: {
      display: 'flex',
      margin: `0 -${config.spacing.elementGap}`,
      marginBottom: config.spacing.elementGap,
      padding: '1.25rem',
      borderBottom: `1px solid ${config.colors.secondary}`,
      alignItems: 'center',
      backgroundColor: `${config.colors.primary}03`,
      borderRadius: config.borderRadius,
    },
    profileImageContainer: {
      position: 'relative',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: `2px solid ${config.colors.primary}`,
      boxShadow: `0 4px 15px -4px ${config.colors.primary}30`,
      marginRight: '1.25rem',
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
      background: `linear-gradient(135deg, ${config.colors.primary}20, ${config.colors.secondary}20)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: config.colors.primary,
      fontSize: '3rem',
    },
    headerInfo: {
      flex: 1,
    },
    name: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      fontFamily: config.fonts.heading,
      color: config.colors.primary,
      marginBottom: '0.25rem',
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
    },
    profession: {
      fontSize: '1rem',
      color: config.colors.secondary,
      marginBottom: '1rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
    },
    contact: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      fontSize: '0.8rem',
      color: config.colors.secondary,
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      padding: '0.3rem 0.75rem',
      backgroundColor: `${config.colors.secondary}08`,
      borderRadius: '15px',
      border: `1px solid ${config.colors.secondary}20`,
    },
    section: {
      marginBottom: config.spacing.elementGap,
      backgroundColor: 'white',
      padding: '1.25rem',
      borderRadius: config.borderRadius,
      boxShadow: '0 1px 4px -1px rgba(0, 0, 0, 0.06)',
      border: `1px solid ${config.colors.secondary}15`,
    },
    sectionTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      fontFamily: config.fonts.heading,
      color: config.colors.primary,
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: `1px solid ${config.colors.secondary}`,
      paddingBottom: '0.25rem',
      position: 'relative',
    },
    sectionIcon: {
      display: 'inline-block',
      marginRight: '0.5rem',
      color: config.colors.primary,
    },
    summary: {
      fontSize: '0.85rem',
      lineHeight: '1.6',
      marginBottom: '0.75rem',
      color: config.colors.text,
      textAlign: 'justify',
      backgroundColor: `${config.colors.background}60`,
      padding: '1rem',
      borderRadius: config.borderRadius,
      border: `1px solid ${config.colors.secondary}15`,
      borderLeft: `3px solid ${config.colors.primary}`,
    },
    experienceItem: {
      marginBottom: '1.25rem',
      padding: '1rem',
      backgroundColor: `${config.colors.primary}02`,
      borderRadius: config.borderRadius,
      border: `1px solid ${config.colors.secondary}15`,
      borderLeft: `3px solid ${config.colors.primary}`,
      position: 'relative',
    },
    jobTitle: {
      fontSize: '0.95rem',
      fontWeight: 'bold',
      color: config.colors.text,
      marginBottom: '0.15rem',
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
    },
    company: {
      fontSize: '0.9rem',
      color: config.colors.primary,
      fontWeight: '600',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
    },
    dateLocation: {
      fontSize: '0.75rem',
      color: config.colors.secondary,
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontStyle: 'italic',
    },
    description: {
      fontSize: '0.8rem',
      lineHeight: '1.5',
      color: config.colors.text,
    },
    educationItem: {
      marginBottom: '1rem',
      padding: '0.875rem',
      backgroundColor: `${config.colors.secondary}03`,
      borderRadius: config.borderRadius,
      border: `1px solid ${config.colors.secondary}15`,
      borderLeft: `3px solid ${config.colors.primary}`,
    },
    degree: {
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: config.colors.text,
      marginBottom: '0.15rem',
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
    },
    school: {
      fontSize: '0.8rem',
      color: config.colors.primary,
      marginBottom: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontWeight: '600',
    },
    skills: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '0.5rem',
    },
    skill: {
      backgroundColor: 'transparent',
      color: config.colors.text,
      padding: '0.4rem 0.8rem',
      border: `1px solid ${config.colors.secondary}`,
      borderRadius: '20px',
      fontSize: '0.75rem',
      textAlign: 'center',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
      transition: 'all 0.2s ease',
    },
    languages: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '0.75rem',
    },
    languageItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      border: `1px solid ${config.colors.secondary}25`,
      borderRadius: config.borderRadius,
      backgroundColor: `${config.colors.secondary}03`,
    },
    languageName: {
      fontWeight: '600',
      color: config.colors.text,
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
    },
    languageLevel: {
      color: config.colors.secondary,
      fontSize: '0.75rem',
      fontStyle: 'italic',
      fontWeight: '500',
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
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.profileImageContainer}>
          {cvData.personalInfo?.profileImage ? (
            <img
              src={cvData.personalInfo.profileImage}
              alt="Profile"
              style={styles.profileImage}
            />
          ) : (
            <div style={styles.imagePlaceholder}>
              <User size={35} />
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

      {/* Summary Section */}
      {cvData.personalInfo?.summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}><User size={18} /></span>
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
            <span style={styles.sectionIcon}><Briefcase size={18} /></span>
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
            <span style={styles.sectionIcon}><GraduationCap size={18} /></span>
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
            <span style={styles.sectionIcon}><Code size={18} /></span>
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
            <span style={styles.sectionIcon}><Languages size={18} /></span>
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
