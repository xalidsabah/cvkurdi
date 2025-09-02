import React, { useState, useEffect, useRef, memo } from "react";
import { User, Mail, Phone, MapPin, Briefcase, FileText, Camera, Upload, X } from "lucide-react";

const PersonalInfoForm = memo(function PersonalInfoForm({ cvData, handleInputChange, uploadImage, getLocalizedText, darkMode }) {
  const [imageUploading, setImageUploading] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [autocompletePosition, setAutocompletePosition] = useState({ top: 0, left: 0 });
  const [activeInputRef, setActiveInputRef] = useState(null);
  const inputRef = useRef(null);

  // Links management state
  const [linkInput, setLinkInput] = useState('');
  const [links, setLinks] = useState(Array.isArray(cvData.personalInfo.links) ? cvData.personalInfo.links : []);
  const [linkSuccessMessage, setLinkSuccessMessage] = useState('');
  const [linkErrorMessage, setLinkErrorMessage] = useState('');

  // Field validation states
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Initialize links as empty array if not present
  useEffect(() => {
    if (!Array.isArray(cvData.personalInfo.links)) {
      console.log('Initializing links as empty array');
      handleInputChange('personalInfo', 'links', []);
    }
  }, [cvData.personalInfo.links]);

  // Sync links with cvData changes
  useEffect(() => {
    const currentLinks = Array.isArray(cvData.personalInfo.links) ? cvData.personalInfo.links : [];
    console.log('Syncing links from cvData:', currentLinks);
    setLinks(currentLinks);
  }, [cvData.personalInfo.links]);

  // Clear success message after 2 seconds
  useEffect(() => {
    if (linkSuccessMessage) {
      const timer = setTimeout(() => setLinkSuccessMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [linkSuccessMessage]);

  // Clear error messages when inputs change externally
  useEffect(() => {
    if (cvData.personalInfo.email) {
      setEmailError('');
    }
  }, [cvData.personalInfo.email]);

  useEffect(() => {
    if (cvData.personalInfo.phone) {
      setPhoneError('');
    }
  }, [cvData.personalInfo.phone]);

  // Autocomplete data for Kurdish and Arabic
  const autocompleteData = {
    ku: {
      names: [
        "ئارام", "بەختەوەر", "ژیان", "کوردستان", "ئازاد", "هیوا", "خالد", "هیوا", "دیار", "سۆران", "رۆژان",
        "کەژاڵ", "نازانین", "پارێزەر", "ژیوەر", "بەهار", "گوڵان", "بانوو", "شەن", "نەوشیروان", "کەوان"
      ],
      skills: [
        "زانیاریی کۆمپیوتەر", "زمانە بیانییەکان", "کارگێڕی", "فۆتۆشۆپ", "ئێکسڵ", "وردپرس", "داتابەیس",
        "نەرمەکاڵای ئۆفیس", "شبکەسازی", "سێکیورەتی", "پڕۆگرامسازی", "دیزاین", "مارکیتینگ", "زانیاریی بازرگانی"
      ],
      phrases: [
        "بەڕێوەبردنی تیمی", "پڕۆژەکان", "کارە بەسەرکەوتووەکان", "زانیارییەکان", "شەپۆلەکان", "دەستەکان"
      ],
      cities: [
        "هەولێر", "سلێمانی", "دهۆک", "کەرکوک", "ئەربایل", "زاخۆ", "سۆران", "شانەدەر", "کەلار", "بادینان", "ڕانیە",
        "قەراج", "کەلار", "گەرمیان", "سەقز", "بەعقوبە", "حەلەبجە", "پیرمام", "سورچ", "ئاکرێ", "دەربەندیخان"
      ]
    },
    ar: {
      names: [
        "أحمد", "محمد", "فاطمة", "مريم", "علي", "حسن", "زينب", "عمر", "خالد", "سارة",
        "نور", "لينا", "رنا", "مروان", "يوسف", "هدى", "كريم", "ليلى", "أمل", "رامي"
      ],
      skills: [
        "الحاسوب", "اللغات الأجنبية", "إدارة المكاتب", "الفوتوشوب", "إكسل", "وورد", "قواعد البيانات",
        "برامج المكتب", "الشبكات", "الأمان السيبراني", "البرمجة", "التصميم", "التسويق", "المعلومات التجارية"
      ],
      phrases: [
        "إدارة الفرق", "المشاريع", "النجاحات", "المعلومات", "المهام", "الفرق"
      ],
      cities: [
        "بغداد", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء", "الكوت", "الناصرية", "الديوانية", "السماوة",
        "العمارة", "القادسية", "المثنى", "واسط", "بابل", "الأنبار", "نينوى", "صلاح الدين", "ديالى", "القادسية",
        "ذي قار", "ميسان", "كركوك", "السليمانية", "دهوك", "حلبجة", "زاخو", "أكرة", "جمجمال", "سوران"
      ]
    }
  };

  const getFieldLabel = (field) => {
    const labels = {
      ku: {
        fullName: "ناوی تەواو",
        email: "ئیمەیڵ",
        phone: "ژمارەی تەلەفۆن",
        address: "ناونیشان",
        profession: "پیشە",
        summary: "کورتەی دەربارەی خۆت",
        website: "ماڵپەڕ",
        linkedin: "لینکدین",
        github: "گیتهاب",
        profileImage: "وێنەی پرۆفایل"
      },
      ar: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني", 
        phone: "رقم الهاتف",
        address: "العنوان",
        profession: "المهنة",
        summary: "نبذة عنك",
        website: "الموقع الإلكتروني",
        linkedin: "لينكد إن",
        github: "جيت هاب",
        profileImage: "صورة الملف الشخصي"
      },
      en: {
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number", 
        address: "Address",
        profession: "Profession",
        summary: "Summary About You",
        website: "Website",
        linkedin: "LinkedIn",
        github: "GitHub",
        profileImage: "Profile Image"
      }
    };
    return labels[cvData.language]?.[field] || labels.ku[field];
  };

  const getPlaceholder = (field) => {
    const placeholders = {
      ku: {
        fullName: "ناوی تەواوت بنووسە",
        email: "example@email.com",
        phone: "٠٧٥٠ ١٢٣ ٤٥٦٧",
        address: "شار، وڵات",
        profession: "پیشەکەت بنووسە",
        summary: "کورتەیەک لەسەر ئەزموون و شارەزاییەکانت...",
        website: "https://yourwebsite.com",
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername"
      },
      ar: {
        fullName: "أدخل اسمك الكامل",
        email: "example@email.com",
        phone: "٠٧٥٠ ١٢٣ ٤٥٦٧",
        address: "المدينة، البلد",
        profession: "أدخل مهنتك",
        summary: "نبذة مختصرة عن خبرتك ومهاراتك...",
        website: "https://yourwebsite.com",
        linkedin: "https://linkedin.com/in/yourprofile", 
        github: "https://github.com/yourusername"
      },
      en: {
        fullName: "Enter your full name",
        email: "example@email.com",
        phone: "+964 0750 123 4567",
        address: "City, Country",
        profession: "Enter your profession",
        summary: "A brief summary about your experience and skills...",
        website: "https://yourwebsite.com",
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername"
      }
    };
    return placeholders[cvData.language]?.[field] || placeholders.ku[field];
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert(getLocalizedText('imageTooLarge') || 'Image size should be less than 5MB');
      return;
    }

    setImageUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        handleInputChange('personalInfo', 'profileImage', imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    handleInputChange('personalInfo', 'profileImage', null);
  };

  // Enhanced autocomplete functions with content awareness
  const getAutocompleteSuggestions = (inputValue, fieldType) => {
    if (!inputValue || inputValue.length < 2) return [];

    const currentLang = cvData?.language || 'ku';
    const langData = autocompleteData[currentLang];

    if (!langData) return [];

    const lowerInput = inputValue.toLowerCase();
    let suggestions = [];

    // Determine which data set to use based on field type
    if (fieldType === 'fullName' || fieldType === 'firstName' || fieldType === 'lastName') {
      // Smart name suggestions based on gender detection
      if (langData.names) {
        // Try to detect gender from existing input or other fields
        const hasFemaleIndicators = lowerInput.includes('fatima') || lowerInput.includes('mar') ||
                                  lowerInput.includes('fātima') || lowerInput.includes('maryam') ||
                                  lowerInput.includes('فاطمة') || lowerInput.includes('مريم') ||
                                  lowerInput.includes('هیوا') || lowerInput.includes('نازانین') ||
                                  lowerInput.includes('گوڵان') || lowerInput.includes('بانوو');

        if (hasFemaleIndicators && langData.names.female) {
          suggestions = [...langData.names.female, ...(langData.names.unisex || [])];
        } else if (langData.names.male) {
          suggestions = [...langData.names.male, ...(langData.names.unisex || [])];
        } else {
          suggestions = langData.names;
        }
      } else {
        suggestions = langData.names || [];
      }
    } else if (fieldType === 'summary' || fieldType === 'description') {
      // Context-aware phrase suggestions
      if (langData.phrases) {
        // Try to detect context from input
        if (lowerInput.includes('experience') || lowerInput.includes('work') ||
            lowerInput.includes('ئەزموون') || lowerInput.includes('کار') ||
            lowerInput.includes('خبرة') || lowerInput.includes('عمل')) {
          suggestions = langData.phrases.professional || langData.phrases;
        } else if (lowerInput.includes('achievement') || lowerInput.includes('success') ||
                   lowerInput.includes('دەستکەوت') || lowerInput.includes('سەرکەوتن') ||
                   lowerInput.includes('إنجاز') || lowerInput.includes('نجاح')) {
          suggestions = langData.phrases.achievements || langData.phrases;
        } else {
          suggestions = langData.phrases.personal || langData.phrases;
        }
      } else {
        suggestions = langData.phrases || [];
      }
    } else if (fieldType === 'address' || fieldType === 'city' || fieldType === 'location') {
      // City suggestions for address field
      if (langData.cities) {
        suggestions = langData.cities;
      } else {
        suggestions = langData.cities || [];
      }
    } else {
      // Skills or other field types
      suggestions = langData.skills || [];
    }

    // Advanced scoring algorithm
    const scoredSuggestions = suggestions.map(suggestion => {
      const suggestionLower = suggestion.toLowerCase();
      let score = 0;

      // Exact match gets highest score
      if (suggestionLower === lowerInput) score += 100;

      // Starts with input gets high score
      if (suggestionLower.startsWith(lowerInput)) score += 50;

      // Contains input gets medium score
      if (suggestionLower.includes(lowerInput)) score += 25;

      // Word boundary match gets bonus
      if (suggestionLower.match(new RegExp(`\\b${lowerInput}`, 'i'))) score += 15;

      // Length similarity bonus
      const lengthDiff = Math.abs(suggestion.length - inputValue.length);
      score += Math.max(0, 10 - lengthDiff);

      return { suggestion, score };
    });

    // Sort by score and return top suggestions
    return scoredSuggestions
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, fieldType === 'fullName' ? 8 : 5) // More suggestions for names
      .map(item => item.suggestion);
  };

  const handleInputChangeWithAutocomplete = (section, field, value, fieldType) => {
    handleInputChange(section, field, value);

    if (value && value.length >= 2) {
      const suggestions = getAutocompleteSuggestions(value, fieldType);
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

  const handleAutocompleteSelect = (suggestion, section, field) => {
    // Get the current input value
    const currentValue = cvData[section][field] || '';
    const currentInput = document.activeElement;

    if (currentInput && currentInput.value !== undefined) {
      // For input fields, get the current value from the input
      const inputValue = currentInput.value;

      // Find the last word being typed (after the last space or at the beginning)
      const words = inputValue.split(' ');
      const lastWord = words[words.length - 1];

      if (lastWord && lastWord.length > 0) {
        // Replace only the last word with the suggestion
        const newValue = inputValue.slice(0, -lastWord.length) + suggestion;
        handleInputChange(section, field, newValue);

        // Update the input field value directly for immediate feedback
        if (currentInput) {
          currentInput.value = newValue;
        }
      } else {
        // If no last word, just append the suggestion
        const newValue = inputValue + (inputValue ? ' ' : '') + suggestion;
        handleInputChange(section, field, newValue);

        if (currentInput) {
          currentInput.value = newValue;
        }
      }
    } else {
      // Fallback for cases where we can't access the input directly
      const words = currentValue.split(' ');
      if (words.length > 0) {
        words[words.length - 1] = suggestion;
        const newValue = words.join(' ');
        handleInputChange(section, field, newValue);
      } else {
    handleInputChange(section, field, suggestion);
      }
    }

    setShowAutocomplete(false);
  };

  const handleInputFocus = (event, fieldType) => {
    const rect = event.target.getBoundingClientRect();
    setAutocompletePosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    });

    const currentValue = event.target.value;
    if (currentValue && currentValue.length >= 2) {
      const suggestions = getAutocompleteSuggestions(currentValue, fieldType);
      if (suggestions.length > 0) {
        setAutocompleteSuggestions(suggestions);
        setShowAutocomplete(true);
      }
    }
  };

  const handleInputBlur = () => {
    // Delay hiding to allow clicking on suggestions
    setTimeout(() => setShowAutocomplete(false), 150);
  };

  // Links management functions
  const addLink = () => {
    const trimmedInput = linkInput.trim();
    console.log('addLink called with:', trimmedInput);

    const validation = validateUrl(trimmedInput);
    console.log('URL validation result:', validation);

    if (trimmedInput && validation.isValid) {
      const currentLinks = Array.isArray(cvData.personalInfo.links) ? cvData.personalInfo.links : [];
      const newLinks = [...currentLinks, trimmedInput];
      console.log('Adding link:', trimmedInput, 'Current links:', currentLinks, 'New links:', newLinks);
      setLinks(newLinks);
      handleInputChange('personalInfo', 'links', newLinks);
      setLinkInput('');
      setLinkSuccessMessage('Link added successfully!');
      setLinkErrorMessage('');
      console.log('Link added successfully');
    } else {
      setLinkErrorMessage(validation.message);
      setLinkSuccessMessage('');
      console.log('Link validation failed:', validation.message);
    }
  };

  const removeLink = (index) => {
    const currentLinks = Array.isArray(cvData.personalInfo.links) ? cvData.personalInfo.links : [];
    const newLinks = currentLinks.filter((_, i) => i !== index);
    console.log('Removing link at index:', index, 'Current links:', currentLinks, 'New links:', newLinks);
    setLinks(newLinks);
    handleInputChange('personalInfo', 'links', newLinks);
  };

  // Enhanced validation functions with error messages
  const validateUrl = (string) => {
    if (!string || !string.trim()) {
      return { isValid: false, message: '' };
    }

    const trimmed = string.trim();

    // Check if it's an email address (contains @ symbol)
    if (trimmed.includes('@') && trimmed.includes('.')) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ئەمە ئیمەیڵە، تکایە لینکێکی دروست داخڵ بکە' :
                 cvData.language === 'ar' ? 'هذا بريد إلكتروني، يرجى إدخال رابط صحيح' :
                 'This is an email address, please enter a valid URL'
      };
    }

    // Check if it's plain text (contains spaces or no domain-like structure)
    if (trimmed.includes(' ') && !trimmed.includes('.')) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ئەمە لینک نییە، تکایە لینکێکی دروست داخڵ بکە' :
                 cvData.language === 'ar' ? 'هذا ليس رابطاً، يرجى إدخال رابط صحيح' :
                 'This is not a link, please enter a valid URL'
      };
    }

    // Check for obvious non-URL text patterns
    const textPatterns = [
      /^[a-zA-Z\s]+$/i, // Only letters and spaces
      /^[\u0600-\u06FF\s]+$/, // Only Arabic/Kurdish text
      /^[\u0621-\u064A\s]+$/, // Arabic script only
      /^[\u0660-\u0669\s]+$/, // Arabic numbers only
    ];

    const isPlainText = textPatterns.some(pattern => pattern.test(trimmed) && trimmed.length > 5);
    if (isPlainText && !trimmed.includes('.')) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ئەمە دەقی سادەیە، تکایە لینکێکی دروست داخڵ بکە' :
                 cvData.language === 'ar' ? 'هذا نص عادي، يرجى إدخال رابط صحيح' :
                 'This appears to be plain text, please enter a valid URL'
      };
    }

    try {
      // Try with the string as-is first
      new URL(trimmed);
      return { isValid: true, message: '' };
    } catch (_) {
      try {
        // If that fails, try adding https:// prefix
        new URL(`https://${trimmed}`);
        return { isValid: true, message: '' };
      } catch (_) {
        // If both fail, check for basic URL patterns
        const urlPattern = /^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)?$/i;
        if (urlPattern.test(trimmed) && trimmed.length > 3) {
          return { isValid: true, message: '' };
        }

        return {
          isValid: false,
          message: cvData.language === 'ku' ? 'لینکێکی نادروستە، تکایە لینکێکی دروست داخڵ بکە' :
                   cvData.language === 'ar' ? 'رابط غير صحيح، يرجى إدخال رابط صحيح' :
                   'Invalid URL format, please enter a valid URL'
        };
      }
    }
  };

  const validateEmail = (email) => {
    if (!email || !email.trim()) {
      return { isValid: false, message: '' };
    }

    const trimmed = email.trim();

    // Check if it's a URL (common mistake)
    if (trimmed.includes('http') || (trimmed.includes('.') && !trimmed.includes('@'))) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ئەمە لینکە، تکایە ئیمەیڵ داخڵ بکە' :
                 cvData.language === 'ar' ? 'هذا رابط، يرجى إدخال بريد إلكتروني' :
                 'This is a URL, please enter an email address'
      };
    }

    // Check if it's plain text without @ symbol
    if (!trimmed.includes('@')) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ئیمەیڵێکی نادروستە، پێویستە @ هەبێت' :
                 cvData.language === 'ar' ? 'بريد إلكتروني غير صحيح، يجب أن يحتوي على @' :
                 'Invalid email format, must contain @ symbol'
      };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'فۆرماتی ئیمەیڵ نادروستە' :
                 cvData.language === 'ar' ? 'تنسيق البريد الإلكتروني غير صحيح' :
                 'Invalid email format'
      };
    }

    return { isValid: true, message: '' };
  };

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) {
      return { isValid: false, message: '' };
    }

    const trimmed = phone.trim();

    // Check if it's an email (common mistake)
    if (trimmed.includes('@')) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ئەمە ئیمەیڵە، تکایە ژمارەی تەلەفۆن داخڵ بکە' :
                 cvData.language === 'ar' ? 'هذا بريد إلكتروني، يرجى إدخال رقم هاتف' :
                 'This is an email, please enter a phone number'
      };
    }

    // Check if it's a URL
    if (trimmed.includes('http') || (trimmed.includes('www.') && !trimmed.match(/\d/))) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ئەمە لینکە، تکایە ژمارەی تەلەفۆن داخڵ بکە' :
                 cvData.language === 'ar' ? 'هذا رابط، يرجى إدخال رقم هاتف' :
                 'This is a URL, please enter a phone number'
      };
    }

    // Basic phone number pattern (allows various formats)
    const phonePattern = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    if (!phonePattern.test(trimmed.replace(/\s/g, ''))) {
      return {
        isValid: false,
        message: cvData.language === 'ku' ? 'ژمارەی تەلەفۆن نادروستە' :
                 cvData.language === 'ar' ? 'رقم الهاتف غير صحيح' :
                 'Invalid phone number format'
      };
    }

    return { isValid: true, message: '' };
  };

  // Legacy function for backward compatibility
  const isValidUrl = (string) => validateUrl(string).isValid;

  return (
    <div className="space-y-6">
      {/* Profile Image Section */}
      <div className="text-center">
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
          {getFieldLabel('profileImage')}
        </h3>
        
        <div className="flex justify-center mb-4">
          <div className="relative">
            {cvData.personalInfo.profileImage ? (
              <div className="relative group">
                <img
                  src={cvData.personalInfo.profileImage}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-gradient-to-r from-purple-500 to-pink-500 shadow-2xl"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className={`w-36 h-36 rounded-full ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-gray-200 to-gray-300'} flex items-center justify-center border-4 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <Camera size={40} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={imageUploading}
            />
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-purple-600 hover:via-violet-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              {imageUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Upload size={18} />
              )}
              <span className="font-semibold">
                {imageUploading ? (getLocalizedText('uploading') || 'Uploading...') : (getFieldLabel('profileImage'))}
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="relative group">
          <label className={`block text-sm font-bold md:font-semibold mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
            {getFieldLabel('fullName')} *
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center pointer-events-none z-10">
              <User size={20} className={`transition-colors duration-300 ${darkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-400 group-focus-within:text-purple-500'}`} />
            </div>
            <input
              ref={inputRef}
              type="text"
              name="fullName"
              value={cvData.personalInfo.fullName}
              onChange={(e) => handleInputChangeWithAutocomplete('personalInfo', 'fullName', e.target.value, 'fullName')}
              onFocus={(e) => handleInputFocus(e, 'fullName')}
              onBlur={handleInputBlur}
              placeholder={getPlaceholder('fullName')}
              className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}
              required
            />

            {/* Autocomplete Dropdown */}
            {showAutocomplete && autocompleteSuggestions.length > 0 && document.activeElement?.name === 'fullName' && (
              <div className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-w-xs max-h-48 overflow-y-auto mt-1 top-full left-0 right-0">
                {autocompleteSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 text-gray-800"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleAutocompleteSelect(suggestion, 'personalInfo', 'fullName')}
                    title={`Replace current word with: ${suggestion}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{suggestion}</span>
                      <span className="text-xs text-gray-400 ml-2">↩</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Email */}
                <div className="relative group">
          <label className={`block text-sm font-bold md:font-semibold mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
            {getFieldLabel('email')} *
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center pointer-events-none z-10">
              <Mail size={20} className={`transition-colors duration-300 ${darkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-400 group-focus-within:text-purple-500'}`} />
            </div>
            <input
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => {
                handleInputChange('personalInfo', 'email', e.target.value);
                if (e.target.value.trim()) {
                  const validation = validateEmail(e.target.value);
                  setEmailError(validation.message);
                } else {
                  setEmailError('');
                }
              }}
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  const validation = validateEmail(e.target.value);
                  setEmailError(validation.message);
                }
              }}
              placeholder={getPlaceholder('email')}
              className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 ${
                emailError
                  ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400'
                  : darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              style={{ direction: 'ltr' }}
              required
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600 text-center">{emailError}</p>
            )}
          </div>
        </div>

        {/* Phone */}
                <div className="relative group">
          <label className={`block text-sm font-bold md:font-semibold mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
            {getFieldLabel('phone')}
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center pointer-events-none z-10">
              <Phone size={20} className={`transition-colors duration-300 ${darkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-400 group-focus-within:text-purple-500'}`} />
            </div>
            <input
              type="tel"
              value={cvData.personalInfo.phone}
              onChange={(e) => {
                handleInputChange('personalInfo', 'phone', e.target.value);
                if (e.target.value.trim()) {
                  const validation = validatePhone(e.target.value);
                  setPhoneError(validation.message);
                } else {
                  setPhoneError('');
                }
              }}
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  const validation = validatePhone(e.target.value);
                  setPhoneError(validation.message);
                }
              }}
              placeholder="+964 0750 123 4567"
              className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 ${
                phoneError
                  ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400'
                  : darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              style={{ direction: 'ltr' }}
            />
            {phoneError && (
              <p className="mt-1 text-sm text-red-600 text-center">{phoneError}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="relative group">
          <label className={`block text-sm font-bold md:font-semibold mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
            {getFieldLabel('address')}
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center pointer-events-none z-10">
              <MapPin size={20} className={`transition-colors duration-300 ${darkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-400 group-focus-within:text-purple-500'}`} />
            </div>
            <input
              type="text"
              name="address"
              value={cvData.personalInfo.address}
              onChange={(e) => handleInputChangeWithAutocomplete('personalInfo', 'address', e.target.value, 'address')}
              onFocus={(e) => handleInputFocus(e, 'address')}
              onBlur={handleInputBlur}
              placeholder={getPlaceholder('address')}
              className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}
            />

            {/* Autocomplete Dropdown */}
            {showAutocomplete && autocompleteSuggestions.length > 0 && document.activeElement?.name === 'address' && (
              <div className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-w-xs max-h-48 overflow-y-auto mt-1 top-full left-0 right-0">
                {autocompleteSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 text-gray-800"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleAutocompleteSelect(suggestion, 'personalInfo', 'address')}
                    title={`Replace current word with: ${suggestion}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{suggestion}</span>
                      <span className="text-xs text-gray-400 ml-2">↩</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profession */}
        <div className="relative group">
          <label className={`block text-sm font-bold md:font-semibold mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
            {getFieldLabel('profession')}
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center pointer-events-none z-10">
              <Briefcase size={20} className={`transition-colors duration-300 ${darkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-400 group-focus-within:text-purple-500'}`} />
            </div>
            <input
              type="text"
              value={cvData.personalInfo.profession}
              onChange={(e) => handleInputChange('personalInfo', 'profession', e.target.value)}
              placeholder={getPlaceholder('profession')}
              className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}
            />
          </div>
        </div>

        {/* Website */}
        <div className="relative group">
          <label className={`block text-sm font-bold md:font-semibold mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
            {getFieldLabel('website')}
          </label>
          <input
            type="url"
            value={cvData.personalInfo.website || ''}
            onChange={(e) => {
              handleInputChange('personalInfo', 'website', e.target.value);
              if (e.target.value.trim()) {
                const validation = validateUrl(e.target.value);
                // For website field, we'll just clear any existing error since it's optional
                // and show validation on blur
              }
            }}
            onBlur={(e) => {
              if (e.target.value.trim()) {
                const validation = validateUrl(e.target.value);
                // Could add website error state if needed, but for now keeping it simple
              }
            }}
            placeholder={getPlaceholder('website')}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
            style={{ direction: 'ltr' }}
          />
        </div>

        {/* Links Section - لینکەکانم */}
        <div className="col-span-1 md:col-span-2">
          <h3
            className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
            style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}
          >
            لینکەکانم
          </h3>

          {/* Add Link Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={linkInput}
              onChange={(e) => {
                setLinkInput(e.target.value);
                // Clear error message when user starts typing
                if (linkErrorMessage) setLinkErrorMessage('');
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  console.log('Enter pressed, calling addLink');
                  addLink();
                }
              }}
              className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all ${
                linkErrorMessage
                  ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400'
                  : darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="https://example.com"
              style={{ direction: 'ltr' }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked, linkInput:', linkInput.trim(), 'isValidUrl:', isValidUrl(linkInput.trim()));
                addLink();
              }}
              disabled={!linkInput.trim() || !isValidUrl(linkInput.trim())}
              className="bg-[#F5CDB3] text-black px-6 py-3 rounded-lg hover:bg-[#E7B18E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E7B18E] focus:ring-opacity-50"
              style={{ fontFamily: "NRT, sans-serif", pointerEvents: (!linkInput.trim() || !isValidUrl(linkInput.trim())) ? 'none' : 'auto' }}
            >
              زیادکردن
            </button>
          </div>

          {/* Success Message */}
          {linkSuccessMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-lg text-sm text-center">
              {linkSuccessMessage}
            </div>
          )}

          {/* Error Message */}
          {linkErrorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-lg text-sm text-center">
              {linkErrorMessage}
          </div>
          )}



          {/* Links Display */}
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(cvData.personalInfo.links) ? cvData.personalInfo.links : []).map((link, index) => (
              <div
                key={index}
                className="bg-[#F5CDB3] text-black px-3 py-2 rounded-full text-sm flex items-center gap-2 max-w-xs"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate hover:underline"
                  title={link}
                >
                  {link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
                <button
                  onClick={() => removeLink(index)}
                  className="text-black hover:text-red-600 flex-shrink-0 ml-1"
                  title="Remove link"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
              <div className="relative group">
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
          {getFieldLabel('summary')}
        </label>
        <div className="relative">
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <FileText size={20} className={`transition-colors duration-300 ${darkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-400 group-focus-within:text-purple-500'}`} />
          </div>
          <textarea
            name="summary"
            value={cvData.personalInfo.summary}
            onChange={(e) => handleInputChangeWithAutocomplete('personalInfo', 'summary', e.target.value, 'summary')}
            onFocus={(e) => handleInputFocus(e, 'summary')}
            onBlur={handleInputBlur}
            placeholder={getPlaceholder('summary')}
            rows="5"
            className={`w-full pl-14 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 resize-none ${
              darkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
            style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}
          />

          {/* Autocomplete Dropdown */}
          {showAutocomplete && autocompleteSuggestions.length > 0 && document.activeElement?.name === 'summary' && (
            <div className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-w-xs max-h-48 overflow-y-auto mt-1 top-full left-0 right-0">
              {autocompleteSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 text-gray-800"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleAutocompleteSelect(suggestion, 'personalInfo', 'summary')}
                  title={`Replace current word with: ${suggestion}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{suggestion}</span>
                    <span className="text-xs text-gray-400 ml-2">↩</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Tips */}
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>
            <FileText size={20} className={darkMode ? 'text-blue-300' : 'text-blue-600'} />
          </div>
          <div>
            <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
              {cvData.language === 'ku' ? 'ئامۆژگاری' : cvData.language === 'ar' ? 'نصائح مهمة' : 'Important Tips'}
            </h4>
            <p className={`${darkMode ? 'text-blue-200' : 'text-blue-700'} leading-relaxed`} style={{ direction: cvData.language === 'en' ? 'ltr' : 'rtl' }}>
              {cvData.language === 'ku' 
                ? 'ناو و ئیمەیڵ پێویستن. وێنەیەکی پرۆفایل و کورتەیەک لەسەر خۆت باس بکە بۆ سی ڤی یەکی باشتر. لینکەکانی سۆشیال مێدیا زیاد بکە.'
                : cvData.language === 'ar' 
                ? 'الاسم والبريد الإلكتروني مطلوبان. أضف صورة شخصية ونبذة عنك للحصول على سيرة ذاتية أفضل. أضف أيضاً روابط وسائل التواصل الاجتماعي.'
                : 'Name and email are required. Add a profile image and summary for a better CV. Also include your social media links for a complete profile.'
              }
            </p>
          </div>
        </div>
      </div>



    </div>
  );
});

export { PersonalInfoForm };