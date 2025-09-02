"use client";

import React, { useState, useEffect } from "react";
import { User, Briefcase, GraduationCap, Star, ArrowRight, Sparkles, Globe, Palette, Moon, Sun } from "lucide-react";
import { useCVBuilder } from "../../hooks/useCVBuilder";
import { BuilderHeader } from "../../components/builder/BuilderHeader";
import { StepsSidebar } from "../../components/builder/StepsSidebar";
import { PersonalInfoForm } from "../../components/builder/PersonalInfoForm";
import { ExperienceForm } from "../../components/builder/ExperienceForm";
import { EducationForm } from "../../components/builder/EducationForm";
import { SkillsForm } from "../../components/builder/SkillsForm";
import { NavigationButtons } from "../../components/builder/NavigationButtons";
import { CVPreview } from "../../components/builder/CVPreview";

const steps = [
  {
    title: "زانیاری کەسی",
    titleAr: "المعلومات الشخصية",
    titleEn: "Personal Info",
    icon: <User size={22} className="text-white" />,
    color: "from-violet-500 via-purple-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-violet-500 via-purple-500 to-purple-600"
  },
  {
    title: "ئەزموونی کار",
    titleAr: "خبرة العمل",
    titleEn: "Work Experience",
    icon: <Briefcase size={22} className="text-white" />,
    color: "from-blue-500 via-cyan-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
  },
  {
    title: "خوێندن",
    titleAr: "التعليم",
    titleEn: "Education",
    icon: <GraduationCap size={22} className="text-white" />,
    color: "from-emerald-500 via-green-500 to-green-600",
    bgColor: "bg-gradient-to-br from-emerald-500 via-green-500 to-green-600"
  },
  {
    title: "شارەزایی و زمانەکان",
    titleAr: "المهارات واللغات",
    titleEn: "Skills & Languages",
    icon: <Star size={22} className="text-white" />,
    color: "from-amber-500 via-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"
  },
];

export default function CVBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const {
    cvData,
    skillInput,
    setSkillInput,
    languageInput,
    setLanguageInput,
    saving,
    saveMessage,
    templates,
    currentTemplate,
    saveCV,
    downloadPDF,
    handleInputChange,
    addArrayItem,
    removeArrayItem,
    addSkill,
    removeSkill,
    addLanguage,
    addLanguageWithLevel,
    removeLanguage,
    setLanguage,
    setTemplate,
    uploadImage,
    getLocalizedText,
    getLanguageLevelText,
  } = useCVBuilder();

  // Check URL params for template selection
  useEffect(() => {
    try {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get("template");
    const langParam = urlParams.get("lang");

    if (langParam) {
      setLanguage(langParam);
      setShowLanguageModal(false);
    }

    if (templateId && templates.length > 0) {
        const id = parseInt(templateId);
        if (!isNaN(id) && id > 0) {
          setTemplate(id);
      setShowTemplateModal(false);
        }
      }
    } catch (err) {
      console.error('Error parsing URL parameters:', err);
      setError('خەتایەک ڕوویدا لە بارکردنی پەڕە');
    } finally {
      setIsInitializing(false);
    }
  }, [templates, setLanguage, setTemplate]);

  // Set initializing to false after initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStepTitle = (step) => {
    switch (cvData.language) {
      case "ar":
        return step.titleAr;
      case "en":
        return step.titleEn;
      default:
        return step.title;
    }
  };

  const getLocalizedStepText = (key) => {
    const texts = {
      ku: {
        step: "هەنگاوی",
        of: "لە",
        progress: "پێشکەوتن",
        selectLanguage: "زمانی سی ڤی یەکەت هەڵبژێرە",
        selectTemplate: "تێمپلەیتێک هەڵبژێرە",
        continue: "بەردەوامبون",
        kurdish: "کوردی",
        arabic: "عەرەبی",
        english: "ئینگلیزی",
        welcomeMessage: "بەخێربێیت! با پێکەوە سی ڤی یەکی نایاب دروست بکەین",
        chooseLanguage: "زمانێک هەڵبژێرە",
        chooseTemplate: "تێمپلەیتێک هەڵبژێرە"
      },
      ar: {
        step: "الخطوة",
        of: "من",
        progress: "التقدم",
        selectLanguage: "اختر لغة سيرتك الذاتية",
        selectTemplate: "اختر قالبًا",
        continue: "متابعة",
        kurdish: "كردي",
        arabic: "عربي",
        english: "إنجليزي",
        welcomeMessage: "مرحباً! دعنا ننشئ سيرة ذاتية استثنائية معاً",
        chooseLanguage: "اختر لغة",
        chooseTemplate: "اختر قالب"
      },
      en: {
        step: "Step",
        of: "of",
        progress: "Progress",
        selectLanguage: "Select your CV language",
        selectTemplate: "Choose a template",
        continue: "Continue",
        kurdish: "Kurdish",
        arabic: "Arabic",
        english: "English",
        welcomeMessage: "Welcome! Let's create an exceptional CV together",
        chooseLanguage: "Choose Language",
        chooseTemplate: "Choose Template"
      },
    };
    return texts[cvData.language]?.[key] || texts.ku[key];
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            cvData={cvData}
            handleInputChange={handleInputChange}
            uploadImage={uploadImage}
            getLocalizedText={getLocalizedText}
            darkMode={darkMode}
          />
        );
      case 1:
        return (
          <ExperienceForm
            cvData={cvData}
            handleInputChange={handleInputChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            getLocalizedText={getLocalizedText}
            darkMode={darkMode}
          />
        );
      case 2:
        return (
          <EducationForm
            cvData={cvData}
            handleInputChange={handleInputChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            getLocalizedText={getLocalizedText}
            darkMode={darkMode}
          />
        );
      case 3:
        return (
          <SkillsForm
            cvData={cvData}
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            addSkill={addSkill}
            removeSkill={removeSkill}
            languageInput={languageInput}
            setLanguageInput={setLanguageInput}
            addLanguage={addLanguage}
            removeLanguage={removeLanguage}
            addLanguageWithLevel={addLanguageWithLevel}
            getLanguageLevelText={getLanguageLevelText}
            getLocalizedText={getLocalizedText}
            darkMode={darkMode}
          />
        );
      default:
        return (
          <PersonalInfoForm
            cvData={cvData}
            handleInputChange={handleInputChange}
            uploadImage={uploadImage}
            getLocalizedText={getLocalizedText}
            darkMode={darkMode}
          />
        );
    }
  };

  // Show loading spinner while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "NRT, sans-serif" }}>
            سی ڤی کوردی
          </h2>
          <p className="text-gray-600" style={{ fontFamily: "NRT, sans-serif" }}>
            چاوەڕوان بە لە بارکردن...
          </p>
        </div>
      </div>
    );
  }

  if (previewMode) {
    return (
      <CVPreview
        cvData={cvData}
        currentTemplate={currentTemplate}
        setPreviewMode={setPreviewMode}
        saveCV={saveCV}
        saving={saving}
        downloadPDF={downloadPDF}
        saveMessage={saveMessage}
        getLocalizedText={getLocalizedText}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setTemplate={setTemplate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full elegant-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full elegant-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full elegant-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full elegant-float" style={{ animationDelay: '1s' }}></div>
      </div>



      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-lg p-4 max-w-72 w-full animate-scale-bounce">
            <div className="text-center mb-6">
              <div className="relative mx-auto mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 via-purple-500 to-purple-600 rounded-full mx-auto flex items-center justify-center animate-pulse-glow">
                  <Globe size={16} className="text-white" />
                </div>
              </div>
              <h2 className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {getLocalizedStepText('chooseLanguage')}
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xs`}>
                {getLocalizedStepText('welcomeMessage')}
              </p>
            </div>

            <div className="space-y-1.5">
              {[
                { code: "ku", name: getLocalizedStepText("kurdish"), symbol: "🔥", gradient: "from-red-500 via-orange-500 to-yellow-500" },
                { code: "ar", name: getLocalizedStepText("arabic"), symbol: "🌙", gradient: "from-green-500 via-emerald-500 to-teal-500" },
                { code: "en", name: getLocalizedStepText("english"), symbol: "🌍", gradient: "from-blue-500 via-indigo-500 to-purple-500" }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageModal(false);
                    setShowTemplateModal(true);
                  }}
                  className={`w-full group relative overflow-hidden rounded-md p-2.5 transition-all duration-300 hover:scale-102 transform ${
                    cvData.language === lang.code
                      ? `bg-gradient-to-r ${lang.gradient} text-white shadow-lg`
                      : `language-card ${darkMode ? 'text-white hover:text-gray-900' : 'text-gray-700 hover:text-gray-900'} hover:bg-white/20`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-lg">{lang.symbol}</div>
                    <div className="flex-1 text-left">
                      <span className="font-semibold text-sm block">{lang.name}</span>
                      <span className={`text-xs ${cvData.language === lang.code ? 'text-white/80' : 'text-gray-500'}`}>
                        {lang.code === 'ku' ? 'زمانی کوردی' : lang.code === 'ar' ? 'اللغة العربية' : 'English Language'}
                      </span>
                    </div>
                    {cvData.language === lang.code && (
                      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto p-4">
          <div className="glass-effect rounded-lg p-4 max-w-2xl w-full my-4 animate-slide-in-up">
            <div className="text-center mb-4">
              <div className="relative mx-auto mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center animate-pulse-glow">
                  <Palette size={16} className="text-white" />
                </div>
              </div>
              <h2 className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {getLocalizedStepText('chooseTemplate')}
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xs`}>
                {cvData.language === 'ku' ? 'تێمپلەیتێک هەڵبژێرە کە گونجاوە لەگەڵ کەسایەتیت' :
                 cvData.language === 'ar' ? 'اختر قالباً يناسب شخصيتك المهنية' :
                 'Choose a template that matches your professional personality'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-h-64 overflow-auto">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setTemplate(template.id);
                    setShowTemplateModal(false);
                  }}
                  className={`group relative overflow-hidden rounded-xl transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    cvData.selectedTemplate === template.id
                      ? 'ring-2 ring-purple-500 shadow-lg'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="transition-transform duration-200 transform-gpu scale-[0.98] group-hover:scale-100">
                    <div className="aspect-[5/6] overflow-hidden rounded-lg">
                      <img 
                        src={template.preview_url || `https://picsum.photos/300/400?random=${template.id}`}
                        alt={template.name_ku}
                        className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-[1.03]"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                      <h3 className="font-bold text-sm truncate">
                        {cvData.language === 'en' ? template.name_en : template.name_ku}
                      </h3>
                      <p className="text-xs text-gray-200 truncate">{template.category}</p>
                    </div>
                    {cvData.selectedTemplate === template.id && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {getLocalizedStepText('continue')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-40 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
          darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
        } shadow-lg hover:shadow-xl`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <BuilderHeader
        saveCV={saveCV}
        saving={saving}
        setPreviewMode={setPreviewMode}
        saveMessage={saveMessage}
        setShowTemplateModal={setShowTemplateModal}
        cvData={cvData}
        getLocalizedText={getLocalizedText}
        darkMode={darkMode}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-3">
          <StepsSidebar
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            cvData={cvData}
            getStepTitle={getStepTitle}
            getLocalizedStepText={getLocalizedStepText}
            darkMode={darkMode}
          />

          <div className="lg:col-span-4">
            <div className="gradient-border animate-slide-in-up hover-lift">
              <div className="gradient-border-content p-3 sm:p-4">
                {/* Compact Step Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 animate-fade-in">
                  <div className={`p-2.5 ${steps[currentStep].bgColor} rounded-lg text-white animate-scale-bounce shadow-lg`}>
                    {React.cloneElement(steps[currentStep].icon, { size: 18 })}
                  </div>
                  <div>
                    <h2
                      className={`text-xl sm:text-xl font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                      style={{ fontFamily: "NRT, sans-serif", direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}
                    >
                      {getStepTitle(steps[currentStep])}
                    </h2>
                    <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {getLocalizedStepText('step')} {currentStep + 1} {getLocalizedStepText('of')} {steps.length}
                    </p>
                  </div>
                </div>

                {/* Compact Progress Bar */}
                <div className="mb-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className={`flex justify-between text-xs mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }} className="font-semibold">
                      {getLocalizedStepText('progress')}
                    </span>
                    <span className="font-bold text-purple-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`bg-gradient-to-r ${steps[currentStep].color} h-2.5 rounded-full transition-all duration-1000 ease-out animate-pulse-glow relative`}
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-gradient"></div>
                    </div>
                  </div>
                </div>

                {/* Compact Form Content */}
                <div className="animate-slide-in-up" style={{ animationDelay: "0.4s", marginTop: "0.5rem" }}>
                  {renderCurrentStep()}
                </div>

                <NavigationButtons
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  steps={steps}
                  setPreviewMode={setPreviewMode}
                  cvData={cvData}
                  getLocalizedText={getLocalizedText}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setError(null)}
                className="inline-flex rounded-md bg-red-100 p-1.5 text-red-400 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}