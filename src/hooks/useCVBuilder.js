"use client";

import { useState, useEffect } from "react";

const initialState = {
  language: "ku", // ku, ar, en
  selectedTemplate: 1,
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    profession: "",
    summary: "",
    profileImage: null,
    website: "",
    linkedin: "",
    github: "",
  },
  experience: [
    {
      id: 1,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    },
  ],
  education: [
    {
      id: 1,
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      location: "",
    },
  ],
  skills: [],
  languages: [],
  projects: [],
  certifications: [],
  achievements: [],
};

export function useCVBuilder() {
  const [cvData, setCVData] = useState(initialState);
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [cvId, setCvId] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(null);

  // Fetch templates on load
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Update current template when selectedTemplate changes
  useEffect(() => {
    if (templates.length > 0 && cvData.selectedTemplate) {
      const template = templates.find((t) => t.id === cvData.selectedTemplate);
      setCurrentTemplate(template);
    }
  }, [cvData.selectedTemplate, templates]);

  const fetchTemplates = async () => {
    try {
      // Try to fetch from API first using React Router's loader
      const response = await fetch("/api/templates");
      if (response.ok) {
        const data = await response.json();
        if (data.templates && data.templates.length > 0) {
          setTemplates(data.templates);
          if (data.templates.length > 0) {
            setCurrentTemplate(data.templates[0]);
          }
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching templates from API:", error);
    }

    // Fallback: Import templates directly
    try {
      const { templates: fallbackTemplates } = await import('../templates');
      setTemplates(fallbackTemplates);
      if (fallbackTemplates.length > 0) {
        setCurrentTemplate(fallbackTemplates[0]);
      }
      console.log("Using fallback templates:", fallbackTemplates.length);
    } catch (fallbackError) {
      console.error("Error loading fallback templates:", fallbackError);
    }
  };

  const saveCV = async (silent = false) => {
    if (!cvData.personalInfo.fullName || !cvData.personalInfo.email) {
      if (!silent) {
        const message = getLocalizedText("saveErrorMessage");
        setSaveMessage(message);
        setTimeout(() => setSaveMessage(""), 3000);
      }
      return;
    }

    setSaving(true);

    try {
      const payload = {
        personal_info: cvData.personalInfo,
        experience: cvData.experience,
        education: cvData.education,
        skills: cvData.skills,
        languages: cvData.languages,
        template_id: cvData.selectedTemplate || 1,
        language: cvData.language,
        projects: cvData.projects || [],
        certifications: cvData.certifications || [],
        achievements: cvData.achievements || [],
      };

      let response;
      if (cvId) {
        // Use React Router's submit for form data, or fetch for JSON
        response = await fetch(`/api/cvs/${cvId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("/api/cvs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!cvId && result.cv) {
        setCvId(result.cv.id);
      }

      if (!silent) {
        const message = getLocalizedText("saveSuccessMessage");
        setSaveMessage(message);
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error saving CV:", error);
      if (!silent) {
        const message = getLocalizedText("saveErrorGeneral");
        setSaveMessage(message);
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (cvData.personalInfo.fullName || cvData.personalInfo.email) {
        saveCV(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [cvData, cvId]);

  const downloadPDF = async () => {
    try {
      // Show loading message
      setSaveMessage("Generating PDF...");

      // Get the CV template element
      const cvElement = document.querySelector('.cv-preview-content');
      if (!cvElement) {
        console.error("CV element not found");
        setSaveMessage("CV element not found. Please ensure you're on the preview page.");
        setTimeout(() => setSaveMessage(""), 3000);
        return;
      }

      // Ensure the element is visible and has content
      if (cvElement.offsetHeight === 0) {
        console.error("CV element is not visible");
        setSaveMessage("CV content is not visible. Please refresh the page and try again.");
        setTimeout(() => setSaveMessage(""), 3000);
        return;
      }

      // Try html2pdf.js first
      try {
        const html2pdf = (await import('html2pdf.js')).default;
        
        // Configure html2pdf options
        const options = {
          margin: [10, 10, 10, 10],
          filename: `${cvData.personalInfo.fullName || "CV"}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
          }
        };

        // Generate and download PDF
        await html2pdf().from(cvElement).set(options).save();
        
        const message = getLocalizedText("downloadSuccessMessage");
        setSaveMessage(message);
        setTimeout(() => setSaveMessage(""), 3000);
        return;
        
      } catch (html2pdfError) {
        console.warn("html2pdf.js failed, trying fallback method:", html2pdfError);

        try {
          // Fallback: Use browser print to PDF
          const printWindow = window.open('', '_blank');
          if (!printWindow) {
            throw new Error("Popup blocked. Please allow popups for PDF download.");
          }

          // Add loading indicator to print window
          printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${cvData.personalInfo.fullName || "CV"} - PDF Export</title>
              <style>
                body {
                  margin: 0;
                  padding: 20px;
                  font-family: Arial, sans-serif;
                  background: #f5f5f5;
                }
                .loading {
                  text-align: center;
                  padding: 50px;
                  color: #666;
                }
                @media print {
                  body { margin: 0; background: white; }
                  .loading { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="loading">
                <h2>Generating PDF...</h2>
                <p>Please wait while we prepare your CV for download.</p>
              </div>
              ${cvElement.outerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();

        // Wait for content to load then print
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
            const message = getLocalizedText("downloadSuccessMessage") || "PDF generated successfully!";
            setSaveMessage(message);
            setTimeout(() => setSaveMessage(""), 3000);
          }, 1000); // Give it a moment to fully load
        };

      } catch (fallbackError) {
        console.error("Fallback PDF method also failed:", fallbackError);
        const message = getLocalizedText("downloadErrorMessage") || "PDF download failed. Please try again.";
        setSaveMessage(message);
        setTimeout(() => setSaveMessage(""), 3000);
      }
    }
  } catch (error) {
      console.error("Error downloading PDF:", error);
      const message = getLocalizedText("downloadErrorMessage");
      setSaveMessage(message);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleInputChange = (section, field, value, index = null) => {
    setCVData((prev) => {
      if (index !== null) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value },
      };
    });
  };

  const addArrayItem = (section, newItem) => {
    setCVData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }],
    }));
  };

  const removeArrayItem = (section, id) => {
    setCVData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setCVData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addLanguage = () => {
    if (languageInput.trim()) {
      setCVData((prev) => ({
        ...prev,
        languages: [...prev.languages, languageInput.trim()],
      }));
      setLanguageInput("");
    }
  };

  const addLanguageWithLevel = (languageName, level) => {
    if (languageName.trim()) {
      setCVData((prev) => ({
        ...prev,
        languages: [...prev.languages, { name: languageName.trim(), level }],
      }));
      setLanguageInput("");
    }
  };

  const removeLanguage = (index) => {
    setCVData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const setLanguage = (lang) => {
    setCVData((prev) => ({
      ...prev,
      language: lang,
    }));
  };

  const setTemplate = (templateId) => {
    setCVData((prev) => ({
      ...prev,
      selectedTemplate: templateId,
    }));
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    return null;
  };

  // Localization helper
  const getLocalizedText = (key) => {
    const texts = {
      ku: {
        saveErrorMessage: "لەبەری پاشەکەوتکردن ناو و ئیمەیڵ داخڵبکە",
        saveSuccessMessage: "سی ڤی یەکەت بە سەرکەوتوویی پاشەکەوت کرا",
        saveErrorGeneral: "هەڵەیەک ڕوویدا لە پاشەکەوتکردندا",
        saveFirstMessage: "سەرەتا سی ڤی یەکەت پاشەکەوت بکە",
        pdfErrorMessage: "هەڵەیەک ڕوویدا لە دروستکردنی PDF",
        downloadErrorMessage: "هەڵەیەک ڕوویدا لە دابەزاندنی PDF",
        downloadSuccessMessage: "PDF پەیوەندی پاشەکەوت کرا",
      },
      ar: {
        saveErrorMessage: "أدخل الاسم والبريد الإلكتروني قبل الحفظ",
        saveSuccessMessage: "تم حفظ سيرتك الذاتية بنجاح",
        saveErrorGeneral: "حدث خطأ أثناء الحفظ",
        saveFirstMessage: "احفظ سيرتك الذاتية أولاً",
        pdfErrorMessage: "حدث خطأ في إنشاء PDF",
        downloadErrorMessage: "حدث خطأ في تحميل PDF",
        downloadSuccessMessage: "تم تحميل PDF بنجاح",
      },
      en: {
        saveErrorMessage: "Please enter name and email before saving",
        saveSuccessMessage: "Your CV has been saved successfully",
        saveErrorGeneral: "An error occurred while saving",
        saveFirstMessage: "Please save your CV first",
        pdfErrorMessage: "An error occurred while creating PDF",
        downloadErrorMessage: "An error occurred while downloading PDF",
        downloadSuccessMessage: "PDF downloaded successfully",
      },
    };

    return texts[cvData.language]?.[key] || texts.ku[key];
  };

  // Language level helper
  const getLanguageLevelText = (level) => {
    const levels = {
      ku: {
        beginner: "سەرەتایی",
        elementary: "سەرەتایی پێشکەوتوو",
        intermediate: "ناوەند",
        upper_intermediate: "ناوەندی پێشکەوتوو",
        advanced: "پێشکەوتوو",
        fluent: "فێربوو",
        native: "ڕەسەن",
      },
      ar: {
        beginner: "مبتدئ",
        elementary: "مبتدئ متقدم",
        intermediate: "متوسط",
        upper_intermediate: "متوسط متقدم",
        advanced: "متقدم",
        fluent: "طلاقة",
        native: "أصلي",
      },
      en: {
        beginner: "Beginner",
        elementary: "Elementary",
        intermediate: "Intermediate",
        upper_intermediate: "Upper Intermediate",
        advanced: "Advanced",
        fluent: "Fluent",
        native: "Native",
      },
    };

    return levels[cvData.language]?.[level] || levels.en[level] || level;
  };

  return {
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
  };
}
