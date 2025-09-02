import React, { useState, useEffect, useRef } from "react";

export function SkillsForm({
  cvData,
  skillInput,
  setSkillInput,
  addSkill,
  removeSkill,
  languageInput,
  setLanguageInput,
  addLanguage,
  removeLanguage,
  addLanguageWithLevel,
  getLanguageLevelText,
}) {
  // Add safety checks for required functions
  if (!addLanguageWithLevel || !getLanguageLevelText) {
    console.error('SkillsForm: Required functions are missing:', { addLanguageWithLevel, getLanguageLevelText });
    return (
      <div className="p-4 text-center text-red-600">
        Error: Required functions are missing. Please refresh the page.
      </div>
    );
  }
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [autocompletePosition, setAutocompletePosition] = useState({ top: 0, left: 0 });
  const skillInputRef = useRef(null);

  // Enhanced autocomplete data for skills with content awareness
  const skillAutocompleteData = {
    ku: {
      technical: [
        "زانیاریی کۆمپیوتەر", "پڕۆگرامسازی", "شبکەسازی", "سێکیورەتی", "داتابەیس", "کۆدی نوسین", "ڕوباتسازی",
        "زانیاریی دیجیتاڵ", "ویبسایت", "ئەپلیکەیشن", "سیستم", "سێرڤەر", "API", "Cloud Computing", "Machine Learning"
      ],
      design: [
        "فۆتۆشۆپ", "ئیلەستریتۆر", "دیزاین", "گرافیک", "ئەنیمەیشن", "موشن گرافیک", "یوبای", "سکەچ",
        "کورڤا", "ئەدۆب", "کانڤا", "ئەفێکتەکان", "پرینت دیزاین", "یوبای پرێس"
      ],
      business: [
        "کارگێڕی", "مارکیتینگ", "بازرگانی", "زانیاریی بازرگانی", "ئێکسڵ", "وردپرس", "ئۆفیس",
        "پرۆژە", "بودجە", "کۆمپانیا", "CRM", "ERP", "Salesforce", "SAP"
      ],
      languages: [
        "زمانە بیانییەکان", "ئینگلیزی", "عەرەبی", "کوردی", "فارسی", "ئەڵمانی", "فەڕەنسی",
        "ئیتالی", "ئیسپانی", "تورکی", "چینی", "ژاپۆنی", "ڕوسی"
      ],
      soft: [
        "کاری تیمی", "بەڕێوەبردن", "گەشەپێدان", "خۆفێربوون", "کاردانەوەی خێرا", "چارەسەرکردن",
        "پلاندانان", "رێکخستن", "کۆمونیکەیشن", "لیدەرشیپ", "کریتاڵیتی", "دروستکردنی بڕیار"
      ],
      specialized: [
        "بیناسازی", "مامۆستایی", "پزیشکی", "یاسایی", "مالی", "ژینگە", "گەشتیاری",
        "خواردن", "ورزش", "هونەر", "موزیک", "فیلمسازی", "ژوورنالیزم"
      ]
    },
    ar: {
      technical: [
        "الحاسوب", "البرمجة", "الشبكات", "الأمان السيبراني", "قواعد البيانات", "كتابة الكود", "الروبوتات",
        "المعلومات الرقمية", "الموقع", "التطبيق", "النظام", "الخادم", "API", "الحوسبة السحابية", "تعلم الآلة"
      ],
      design: [
        "الفوتوشوب", "الإليستريتور", "التصميم", "الجرافيك", "الأنيميشن", "الموشن جرافيك", "اليوباي", "السكتش",
        "الكورفا", "الأدوب", "الكانفا", "التأثيرات", "تصميم الطباعة", "اليوباي بريس"
      ],
      business: [
        "إدارة المكاتب", "التسويق", "التجارة", "المعلومات التجارية", "إكسل", "وورد", "المكتب",
        "المشروع", "الميزانية", "الشركة", "CRM", "ERP", "Salesforce", "SAP"
      ],
      languages: [
        "اللغات الأجنبية", "الإنجليزية", "العربية", "الكردية", "الفارسية", "الألمانية", "الفرنسية",
        "الإيطالية", "الإسبانية", "التركية", "الصينية", "اليابانية", "الروسية"
      ],
      soft: [
        "العمل الجماعي", "الإدارة", "التطوير", "التعلم الذاتي", "الاستجابة السريعة", "حل المشكلات",
        "التخطيط", "التنظيم", "الاتصال", "القيادة", "التفكير النقدي", "اتخاذ القرارات"
      ],
      specialized: [
        "الهندسة", "التدريس", "الطب", "القانون", "المالية", "البيئة", "السياحة",
        "الطعام", "الرياضة", "الفن", "الموسيقى", "صناعة الأفلام", "الصحافة"
      ]
    }
  };

  // Enhanced autocomplete suggestions with intelligent content awareness
  const getSkillSuggestions = (inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];

    const currentLang = cvData?.language || 'ku';
    const langData = skillAutocompleteData[currentLang] || skillAutocompleteData.ku;
    const lowerInput = inputValue.toLowerCase();

    // Intelligent category detection based on input
    let relevantCategories = [];

    // Technical skills detection
    if (lowerInput.includes('comp') || lowerInput.includes('tech') || lowerInput.includes('program') ||
        lowerInput.includes('code') || lowerInput.includes('web') || lowerInput.includes('app') ||
        lowerInput.includes('کۆمپ') || lowerInput.includes('تەکن') || lowerInput.includes('بەرنامە') ||
        lowerInput.includes('کۆد') || lowerInput.includes('ویب') || lowerInput.includes('ئەپ')) {
      relevantCategories.push('technical');
    }

    // Design skills detection
    if (lowerInput.includes('design') || lowerInput.includes('photo') || lowerInput.includes('graphic') ||
        lowerInput.includes('animation') || lowerInput.includes('motion') ||
        lowerInput.includes('دیز') || lowerInput.includes('گرافیک') || lowerInput.includes('فۆتۆ') ||
        lowerInput.includes('ئەنیم') || lowerInput.includes('موشن')) {
      relevantCategories.push('design');
    }

    // Business skills detection
    if (lowerInput.includes('business') || lowerInput.includes('market') || lowerInput.includes('office') ||
        lowerInput.includes('excel') || lowerInput.includes('word') || lowerInput.includes('project') ||
        lowerInput.includes('بازر') || lowerInput.includes('مارک') || lowerInput.includes('کارگ') ||
        lowerInput.includes('ئێکس') || lowerInput.includes('ورد') || lowerInput.includes('پرۆژ')) {
      relevantCategories.push('business');
    }

    // Language skills detection
    if (lowerInput.includes('lang') || lowerInput.includes('speak') || lowerInput.includes('english') ||
        lowerInput.includes('arabic') || lowerInput.includes('german') || lowerInput.includes('french') ||
        lowerInput.includes('زمان') || lowerInput.includes('ئینگ') || lowerInput.includes('عەرە') ||
        lowerInput.includes('ئەڵم') || lowerInput.includes('فەڕە')) {
      relevantCategories.push('languages');
    }

    // Soft skills detection
    if (lowerInput.includes('team') || lowerInput.includes('manage') || lowerInput.includes('lead') ||
        lowerInput.includes('communicat') || lowerInput.includes('problem') || lowerInput.includes('plan') ||
        lowerInput.includes('تیم') || lowerInput.includes('بەڕێوە') || lowerInput.includes('لیدەر') ||
        lowerInput.includes('کۆمونی') || lowerInput.includes('چارەسەر') || lowerInput.includes('پلاندا')) {
      relevantCategories.push('soft');
    }

    // Specialized skills detection
    if (lowerInput.includes('engineer') || lowerInput.includes('doctor') || lowerInput.includes('teacher') ||
        lowerInput.includes('lawyer') || lowerInput.includes('finance') || lowerInput.includes('music') ||
        lowerInput.includes('بیناس') || lowerInput.includes('پزیشک') || lowerInput.includes('مامۆستا') ||
        lowerInput.includes('وەکیل') || lowerInput.includes('مالی') || lowerInput.includes('موزیک')) {
      relevantCategories.push('specialized');
    }

    // If no specific category detected, use all categories
    if (relevantCategories.length === 0) {
      relevantCategories = ['technical', 'design', 'business', 'languages', 'soft', 'specialized'];
    }

    // Collect skills from relevant categories
    let allSkills = [];
    relevantCategories.forEach(category => {
      if (langData[category]) {
        allSkills.push(...langData[category]);
      }
    });

    // Advanced scoring algorithm for better suggestions
    const scoredSuggestions = allSkills.map(skill => {
      const skillLower = skill.toLowerCase();
      let score = 0;

      // Exact match gets highest score
      if (skillLower === lowerInput) score += 100;

      // Starts with input gets high score
      if (skillLower.startsWith(lowerInput)) score += 50;

      // Contains input gets medium score
      if (skillLower.includes(lowerInput)) score += 25;

      // Word boundary match gets bonus
      if (skillLower.match(new RegExp(`\\b${lowerInput}`, 'i'))) score += 15;

      // Length similarity bonus (prefer similar length words)
      const lengthDiff = Math.abs(skill.length - inputValue.length);
      score += Math.max(0, 10 - lengthDiff);

      // Category relevance bonus (if category was specifically detected)
      if (relevantCategories.length < 6) score += 5; // Bonus for targeted categories

      return { skill, score };
    });

    // Remove duplicates and sort by score
    const uniqueSuggestions = scoredSuggestions
      .filter((item, index, self) =>
        index === self.findIndex(s => s.skill === item.skill)
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Return top 6 suggestions

    return uniqueSuggestions.map(item => item.skill);
  };

  const handleSkillInputChange = (value) => {
    setSkillInput(value);

    if (value && value.length >= 2) {
      const suggestions = getSkillSuggestions(value);
      if (suggestions.length > 0) {
        setAutocompleteSuggestions(suggestions);
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleSkillAutocompleteSelect = (suggestion) => {
    setSkillInput(suggestion);
    setShowAutocomplete(false);
    // Auto-add the skill
    setTimeout(() => {
      addSkill();
    }, 100);
  };

  const handleSkillInputFocus = (event) => {
    const rect = event.target.getBoundingClientRect();
    setAutocompletePosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    });

    const currentValue = event.target.value;
    if (currentValue && currentValue.length >= 2) {
      const suggestions = getSkillSuggestions(currentValue);
      if (suggestions.length > 0) {
        setAutocompleteSuggestions(suggestions);
        setShowAutocomplete(true);
      }
    }
  };

  const handleSkillInputBlur = () => {
    setTimeout(() => setShowAutocomplete(false), 150);
  };
  return (
    <div className="space-y-4">
      <h2
        className="text-2xl md:text-xl font-black md:font-bold"
        style={{
          fontFamily: "NRT, sans-serif",
          direction: "rtl",
          color: "#1e293b !important"
        }}
      >
        شارەزایی و زمانەکان
      </h2>

      {/* Skills Section */}
      <div className="space-y-3">
        <h3
          className="text-xl md:text-lg font-bold md:font-semibold"
          style={{
            direction: "rtl",
            fontFamily: "NRT, sans-serif",
            color: "#1e293b !important"
          }}
        >
          شارەزایی
        </h3>

        <div className="flex gap-2">
          <input
            ref={skillInputRef}
            type="text"
            value={skillInput}
            onChange={(e) => handleSkillInputChange(e.target.value)}
            onFocus={handleSkillInputFocus}
            onBlur={handleSkillInputBlur}
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all placeholder-slate-500 text-slate-800"
            placeholder="شارەزایی زیادبکە..."
            style={{ direction: "rtl" }}
          />
          <button
            onClick={addSkill}
            className="bg-[#F5CDB3] text-black px-4 py-2.5 rounded-lg hover:bg-[#E7B18E] transition-colors"
            style={{ fontFamily: "NRT, sans-serif" }}
          >
            زیادکردن
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-[#F5CDB3] text-black px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="text-black hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3
            className="text-xl md:text-lg font-bold md:font-semibold"
            style={{
              direction: "rtl",
              fontFamily: "NRT, sans-serif",
              color: "#1e293b !important"
            }}
          >
            زمانەکان
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {cvData.languages.length} زمان
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                const level = document.getElementById('languageLevel').value;
                addLanguageWithLevel(languageInput, level);
              }
            }}
            className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all placeholder-slate-500 text-slate-800"
            placeholder="زمان زیادبکە..."
            style={{ direction: "rtl" }}
          />
          <select
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all text-slate-800 bg-white"
            style={{ direction: "rtl" }}
            id="languageLevel"
          >
            <option value="beginner">سەرەتایی</option>
            <option value="elementary">سەرەتایی پێشکەوتوو</option>
            <option value="intermediate">ناوەند</option>
            <option value="upper_intermediate">ناوەندی پێشکەوتوو</option>
            <option value="advanced">پێشکەوتوو</option>
            <option value="fluent">فێربوو</option>
            <option value="native">ڕەسەن</option>
          </select>
          <button
            onClick={() => {
              const level = document.getElementById('languageLevel').value;
              addLanguageWithLevel(languageInput, level);
            }}
            className="bg-[#F5CDB3] text-black px-4 py-2.5 rounded-lg hover:bg-[#E7B18E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "NRT, sans-serif" }}
            disabled={!languageInput.trim()}
                      >
            زیادکردن
          </button>
        </div>
        
        {/* Helpful hint */}
        <p className="text-xs text-gray-500 text-right" style={{ direction: "rtl", fontFamily: "NRT, sans-serif" }}>
          💡 دەتوانیت ئاستی زمانەکان دیاری بکەیت: سەرەتایی، سەرەتایی پێشکەوتوو، ناوەند، ناوەندی پێشکەوتوو، پێشکەوتوو، فێربوو، یان ڕەسەن
        </p>

        <div className="flex flex-wrap gap-2">
          {cvData.languages.map((language, index) => (
            <span
              key={index}
              className="bg-[#F5CDB3] text-black px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {typeof language === 'string' ? language : `${language.name} (${getLanguageLevelText(language.level)})`}
              <button
                onClick={() => removeLanguage(index)}
                className="text-black hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {showAutocomplete && autocompleteSuggestions.length > 0 && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-w-xs max-h-48 overflow-y-auto"
          style={{
            top: autocompletePosition.top,
            left: autocompletePosition.left,
            minWidth: '200px'
          }}
        >
          {autocompleteSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 text-gray-800"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSkillAutocompleteSelect(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
