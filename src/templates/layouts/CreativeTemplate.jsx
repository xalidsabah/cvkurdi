import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, User, Calendar, Award, Briefcase, GraduationCap, Code, Languages, Palette, Sparkles } from 'lucide-react';

export default function CreativeTemplate({ cvData, config }) {
  const styles = {
    container: {
      fontFamily: config.fonts.body,
      color: config.colors.text,
      backgroundColor: config.colors.background,
      maxWidth: '700px',
      margin: '0 auto',
      padding: '1.25rem',
      borderRadius: config.borderRadius,
      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundDecoration: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '150px',
      height: '150px',
      background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary})`,
      borderRadius: '50%',
      opacity: '0.1',
    },
    header: {
      textAlign: 'center',
      marginBottom: config.spacing.sectionGap,
      paddingBottom: '2rem',
      position: 'relative',
      zIndex: 1,
    },
    name: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      fontFamily: config.fonts.heading,
      background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.25rem',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
    profession: {
      fontSize: '1.2rem',
      color: config.colors.accent,
      marginBottom: '1rem',
      fontWeight: '600',
    },
    contact: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '1.5rem',
      marginBottom: '1rem',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: config.colors.secondary,
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    section: {
      marginBottom: config.spacing.sectionGap,
      position: 'relative',
      zIndex: 1,
    },
    sectionTitle: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      fontFamily: config.fonts.heading,
      background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.accent})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: config.spacing.elementGap,
      paddingBottom: '0.5rem',
      position: 'relative',
    },
    sectionTitleDecoration: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '50px',
      height: '3px',
      background: `linear-gradient(90deg, ${config.colors.primary}, ${config.colors.accent})`,
      borderRadius: '2px',
    },
    summary: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      marginBottom: '1rem',
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: `1px solid ${config.colors.primary}20`,
    },
    experienceItem: {
      marginBottom: '2rem',
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: `2px solid ${config.colors.primary}30`,
      position: 'relative',
    },
    experienceDecoration: {
      position: 'absolute',
      top: '-10px',
      left: '20px',
      width: '20px',
      height: '20px',
      backgroundColor: config.colors.primary,
      borderRadius: '50%',
      border: '3px solid white',
    },
    jobTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: config.colors.primary,
      marginBottom: '0.25rem',
    },
    company: {
      fontSize: '1.1rem',
      color: config.colors.secondary,
      fontWeight: '600',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    dateLocation: {
      fontSize: '0.875rem',
      color: config.colors.accent,
      marginBottom: '1rem',
      fontWeight: '500',
    },
    description: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: config.colors.text,
    },
    educationItem: {
      marginBottom: '1.5rem',
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: '1.25rem',
      borderRadius: '12px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    },
    degree: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: config.colors.primary,
      marginBottom: '0.25rem',
    },
    school: {
      fontSize: '1rem',
      color: config.colors.secondary,
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    skills: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'center',
    },
    skill: {
      background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary})`,
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '30px',
      fontSize: '0.9rem',
      fontWeight: '600',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease',
      cursor: 'default',
    },
    languages: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
    },
    languageItem: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: `1px solid ${config.colors.accent}30`,
    },
    languageName: {
      fontWeight: '700',
      color: config.colors.primary,
      fontSize: '1rem',
    },
    languageLevel: {
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '600',
      backgroundColor: config.colors.accent,
      padding: '0.25rem 0.75rem',
      borderRadius: '15px',
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
      {/* Background Decorations */}
      <div style={styles.backgroundDecoration}></div>
      <div style={{ ...styles.backgroundDecoration, top: '200px', left: '-30px', width: '100px', height: '100px' }}></div>

      {/* Header Section */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {/* Profile Image with Placeholder */}
          <div style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `5px solid ${config.colors.primary}`,
            boxShadow: `0 12px 40px -8px ${config.colors.primary}40`,
            background: `linear-gradient(45deg, ${config.colors.primary}, ${config.colors.secondary})`,
          }}>
            {cvData.personalInfo?.profileImage ? (
              <img
                src={cvData.personalInfo.profileImage}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${config.colors.primary}30, ${config.colors.accent}30)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: config.colors.primary,
                fontSize: '4rem',
              }}>
                <User size={50} />
              </div>
            )}
            <Sparkles size={20} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: config.colors.accent,
              opacity: 0.8,
            }} />
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={styles.name}>
              {cvData.personalInfo?.fullName || 'ناوی تەواو'}
            </h1>

            <p style={styles.profession}>
              {cvData.personalInfo?.profession || 'پیشە'}
            </p>

            <div style={styles.contact}>
              {cvData.personalInfo?.email && (
                <div style={styles.contactItem}>
                  <Mail size={16} />
                  {cvData.personalInfo.email}
                </div>
              )}

              {cvData.personalInfo?.phone && (
                <div style={styles.contactItem}>
                  <Phone size={16} />
                  {cvData.personalInfo.phone}
                </div>
              )}

              {cvData.personalInfo?.address && (
                <div style={styles.contactItem}>
                  <MapPin size={16} />
                  {cvData.personalInfo.address}
                </div>
              )}

              {cvData.personalInfo?.website && (
                <div style={styles.contactItem}>
                  <Globe size={16} />
                  {cvData.personalInfo.website}
                </div>
              )}

              {cvData.personalInfo?.linkedin && (
                <div style={styles.contactItem}>
                  <Linkedin size={16} />
                  {cvData.personalInfo.linkedin}
                </div>
              )}

              {cvData.personalInfo?.github && (
                <div style={styles.contactItem}>
                  <Github size={16} />
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
            <span style={{ display: 'inline-block', marginRight: '0.75rem', color: config.colors.primary }}>
              <User size={20} />
            </span>
            <div style={styles.sectionTitleDecoration}></div>
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
            <span style={{ display: 'inline-block', marginRight: '0.75rem', color: config.colors.primary }}>
              <Briefcase size={20} />
            </span>
            <div style={styles.sectionTitleDecoration}></div>
            {cvData.language === 'ku' ? 'ئەزموونی کار' :
             cvData.language === 'ar' ? 'الخبرة العملية' : 'Work Experience'}
          </h2>

          {cvData.experience.map((exp, index) => (
            <div key={exp.id || index} style={styles.experienceItem}>
              <div style={styles.experienceDecoration}></div>
              <h3 style={styles.jobTitle}>{exp.position || 'پۆست'}</h3>
              <p style={styles.company}>
                <span style={{ display: 'inline-block', marginRight: '0.5rem', color: config.colors.primary }}>
                  <Briefcase size={14} />
                </span>
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
            <span style={{ display: 'inline-block', marginRight: '0.75rem', color: config.colors.primary }}>
              <GraduationCap size={20} />
            </span>
            <div style={styles.sectionTitleDecoration}></div>
            {cvData.language === 'ku' ? 'خوێندن' :
             cvData.language === 'ar' ? 'التعليم' : 'Education'}
          </h2>

          {cvData.education.map((edu, index) => (
            <div key={edu.id || index} style={styles.educationItem}>
              <h3 style={styles.degree}>{edu.degree} {edu.field && `في ${edu.field}`}</h3>
              <p style={styles.school}>
                <span style={{ display: 'inline-block', marginRight: '0.5rem', color: config.colors.primary }}>
                  <GraduationCap size={14} />
                </span>
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
            <span style={{ display: 'inline-block', marginRight: '0.75rem', color: config.colors.primary }}>
              <Code size={20} />
            </span>
            <div style={styles.sectionTitleDecoration}></div>
            {cvData.language === 'ku' ? 'شارەزاییەکان' :
             cvData.language === 'ar' ? 'المهارات' : 'Skills'}
          </h2>
          <div style={styles.skills}>
            {cvData.skills.map((skill, index) => (
              <span key={index} style={styles.skill}>
                <Code size={12} style={{ marginRight: '0.25rem' }} />
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
            <span style={{ display: 'inline-block', marginRight: '0.75rem', color: config.colors.primary }}>
              <Languages size={20} />
            </span>
            <div style={styles.sectionTitleDecoration}></div>
            {cvData.language === 'ku' ? 'زمانەکان' :
             cvData.language === 'ar' ? 'اللغات' : 'Languages'}
          </h2>
          <div style={styles.languages}>
            {cvData.languages.map((lang, index) => (
              <div key={index} style={styles.languageItem}>
                <div style={styles.languageName}>
                  <Languages size={16} style={{ marginRight: '0.75rem' }} />
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
