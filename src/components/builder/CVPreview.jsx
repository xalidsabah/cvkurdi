import React, { memo, useState, useEffect } from "react";
import { ArrowLeft, Download, Save, Loader2, Palette, Eye } from "lucide-react";
import { renderTemplate } from '../../templates';
import { templates } from '../../templates';

const CVPreview = memo(function CVPreview({
  cvData,
  setPreviewMode,
  saveCV,
  saving,
  downloadPDF,
  saveMessage,
  currentTemplate,
  setTemplate,
  getLocalizedText,
  darkMode,
  setDarkMode,
}) {
  const [showTemplateSwitcher, setShowTemplateSwitcher] = useState(false);

  // Keyboard shortcut for template switcher
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        setShowTemplateSwitcher(prev => !prev);
      }
      if (e.key === 'Escape' && showTemplateSwitcher) {
        setShowTemplateSwitcher(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTemplateSwitcher]);

  const getLocalizedTemplateName = (template) => {
    switch (cvData.language) {
      case 'ku':
        return template.name_ku;
      case 'ar':
        return template.name_ar;
      default:
        return template.name_en;
    }
  };

  const getLocalizedCategory = (template) => {
    switch (cvData.language) {
      case 'ku':
        return template.category;
      case 'ar':
        return template.category_ar || template.category;
      default:
        return template.category_en;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setPreviewMode(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: "NRT, sans-serif" }}>
              گەڕانەوە بۆ دەستکاری
            </span>
          </button>
          <div className="flex gap-2">
            {/* Template Switcher Button */}
            <button
              onClick={() => setShowTemplateSwitcher(!showTemplateSwitcher)}
              className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 border border-blue-200"
              title={cvData.language === 'ku' ? 'Ctrl+T بۆ گۆڕینی تێمپلەیت' : 
                     cvData.language === 'ar' ? 'Ctrl+T لتغيير القالب' : 'Ctrl+T to change template'}
            >
              <Palette size={16} />
              <span style={{ fontFamily: "NRT, sans-serif" }}>
                {cvData.language === 'ku' ? 'گۆڕینی تێمپلەیت' : 
                 cvData.language === 'ar' ? 'تغيير القالب' : 'Change Template'}
              </span>
            </button>
            
            <button
              onClick={() => saveCV()}
              disabled={saving}
              className="bg-[#F5CDB3] text-black px-4 py-2 rounded-lg hover:bg-[#E7B18E] transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              پاشەکەوتکردن
            </button>
            <button
              onClick={downloadPDF}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              داگرتنی PDF
            </button>
          </div>
        </div>
      </div>

      {saveMessage && (
        <div className="max-w-4xl mx-auto px-6 py-2">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {saveMessage}
          </div>
        </div>
      )}

      {/* Template Switcher */}
      {showTemplateSwitcher && (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 animate-in slide-in-from-top-2 duration-300">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1" style={{ fontFamily: "NRT, sans-serif" }}>
                  {cvData.language === 'ku' ? 'تێمپلەیتی هەڵبژێرە' : 
                   cvData.language === 'ar' ? 'اختر القالب' : 'Choose Template'}
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: "NRT, sans-serif" }}>
                  {cvData.language === 'ku' ? 'بەخێرایی تێمپلەیتەکان بگۆڕە بۆ بینینی جیاوازییەکان (Ctrl+T)' : 
                   cvData.language === 'ar' ? 'قم بتبديل القوالب بسرعة لرؤية الاختلافات (Ctrl+T)' : 'Quickly switch templates to see the differences (Ctrl+T)'}
                </p>
              </div>
              <button
                onClick={() => setShowTemplateSwitcher(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                title={cvData.language === 'ku' ? 'داخستن' : 
                       cvData.language === 'ar' ? 'إغلاق' : 'Close'}
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setTemplate(template.id);
                    setShowTemplateSwitcher(false);
                  }}
                  className={`relative group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    currentTemplate?.id === template.id
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
                  }`}
                >
                  {/* Template Preview Image */}
                  <div className={`w-full h-28 rounded-lg mb-4 flex items-center justify-center transition-all duration-300 ${
                    currentTemplate?.id === template.id
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-50 group-hover:to-blue-100'
                  }`}>
                    <div className="text-center">
                      <Eye size={28} className={`mx-auto mb-2 ${
                        currentTemplate?.id === template.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                      }`} />
                      <div className="text-xs text-gray-500">
                        {cvData.language === 'ku' ? 'پێشبینین' : 
                         cvData.language === 'ar' ? 'معاينة' : 'Preview'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="text-center">
                    <h4 className={`font-bold mb-2 transition-colors ${
                      currentTemplate?.id === template.id ? 'text-blue-800' : 'text-gray-800'
                    }`} style={{ fontFamily: "NRT, sans-serif" }}>
                      {getLocalizedTemplateName(template)}
                    </h4>
                    <p className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      currentTemplate?.id === template.id 
                        ? 'bg-blue-200 text-blue-700' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                    }`} style={{ fontFamily: "NRT, sans-serif" }}>
                      {getLocalizedCategory(template)}
                    </p>
                  </div>
                  
                  {/* Current Template Indicator */}
                  {currentTemplate?.id === template.id && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  )}
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    currentTemplate?.id === template.id
                      ? 'bg-blue-500/5'
                      : 'bg-blue-500/0 group-hover:bg-blue-500/5'
                  }`} />
                </button>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm text-gray-500" style={{ fontFamily: "NRT, sans-serif" }}>
                  {cvData.language === 'ku' ? 'تێمپلەیتی ئێستا:' : 
                   cvData.language === 'ar' ? 'القالب الحالي:' : 'Current template:'}
                </span>
                <span className="font-semibold text-blue-600" style={{ fontFamily: "NRT, sans-serif" }}>
                  {currentTemplate ? getLocalizedTemplateName(currentTemplate) : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Dynamic Template Rendering */}
          {currentTemplate && renderTemplate(currentTemplate.id, cvData)}
        </div>
      </div>
    </div>
  );
});

export { CVPreview };
