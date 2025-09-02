import React from "react";
import {
  FileText,
  Save,
  Eye,
  Loader2,
  ArrowRight,
  Sparkles,
  Palette,
} from "lucide-react";

export function BuilderHeader({
  saveCV,
  saving,
  setPreviewMode,
  saveMessage,
  setShowTemplateModal,
  cvData,
  getLocalizedText,
}) {
  const getHeaderText = (key) => {
    const texts = {
      ku: {
        siteName: "سی ڤی کوردی",
        building: "دروستکردنی سی ڤی",
        preview: "پێشبینین",
        save: "پاشەکەوتکردن",
        saving: "پاشەکەوتدەکرێت...",
        changeTemplate: "گۆڕینی تێمپلەیت",
      },
      ar: {
        siteName: "السيرة الذاتية الكردية",
        building: "إنشاء السيرة الذاتية",
        preview: "معاينة",
        save: "حفظ",
        saving: "جاري الحفظ...",
        changeTemplate: "تغيير القالب",
      },
      en: {
        siteName: "Kurdish CV",
        building: "Building CV",
        preview: "Preview",
        save: "Save",
        saving: "Saving...",
        changeTemplate: "Change Template",
      },
    };
    return texts[cvData?.language || "ku"]?.[key] || texts.ku[key];
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-filter backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <a href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <FileText size={24} />
              </div>
              <span
                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                style={{ fontFamily: "NRT, sans-serif" }}
              >
                {getHeaderText("siteName")}
              </span>
            </a>
            <div className="hidden md:flex items-center gap-2 text-gray-400">
              <span>|</span>
              <span
                className="text-lg text-gray-600 font-medium"
                style={{
                  fontFamily: "NRT, sans-serif",
                  direction: cvData?.language === "en" ? "ltr" : "rtl",
                }}
              >
                {getHeaderText("building")}
              </span>
            </div>
          </div>

          <div className="flex gap-3 items-center animate-slide-in-right">
            {/* Save Message */}
            {saveMessage && (
              <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                <Sparkles size={16} />
                {saveMessage}
              </div>
            )}

            {/* Template Button */}
            {setShowTemplateModal && (
              <button
                onClick={() => setShowTemplateModal(true)}
                className="group flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
              >
                <Palette
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="hidden sm:inline">
                  {getHeaderText("changeTemplate")}
                </span>
              </button>
            )}

            {/* Preview Button */}
            <button
              onClick={() => setPreviewMode(true)}
              className="group flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
            >
              <Eye
                size={16}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span className="hidden sm:inline">
                {getHeaderText("preview")}
              </span>
            </button>

            {/* Save Button */}
            <button
              onClick={() => saveCV()}
              disabled={saving}
              className="group flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              )}
              <span className="hidden sm:inline">
                {saving ? getHeaderText("saving") : getHeaderText("save")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Save Message */}
      {saveMessage && (
        <div className="sm:hidden bg-green-50 border-t border-green-200 px-6 py-2">
          <div className="flex items-center gap-2 text-green-700 text-sm font-medium animate-fade-in">
            <Sparkles size={14} />
            {saveMessage}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        @keyframes slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </header>
  );
}
