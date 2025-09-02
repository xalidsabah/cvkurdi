import React from "react";
import { ArrowLeft, ArrowRight, Eye, Sparkles } from "lucide-react";

export function NavigationButtons({
  currentStep,
  setCurrentStep,
  steps,
  setPreviewMode,
  cvData,
  getLocalizedText,
}) {
  const getNavText = (key) => {
    const texts = {
      ku: {
        previous: "پێشتر",
        next: "دواتر",
        complete: "تەواوکردن",
      },
      ar: {
        previous: "السابق",
        next: "التالي",
        complete: "إنهاء",
      },
      en: {
        previous: "Previous",
        next: "Next",
        complete: "Complete",
      },
    };
    return texts[cvData?.language || "ku"]?.[key] || texts.ku[key];
  };

  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        disabled={currentStep === 0}
        className="group flex items-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 font-medium"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        <span style={{ fontFamily: "NRT, sans-serif" }}>
          {getNavText("previous")}
        </span>
      </button>

      {/* Step Indicator */}
      <div className="hidden sm:flex items-center gap-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= currentStep
                ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-110"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Next/Complete Button */}
      {currentStep === steps.length - 1 ? (
        <button
          onClick={() => setPreviewMode(true)}
          className="group flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
        >
          <Sparkles
            size={20}
            className="group-hover:rotate-12 transition-transform duration-300"
          />
          <span style={{ fontFamily: "NRT, sans-serif" }}>
            {getNavText("complete")}
          </span>
          <Eye
            size={20}
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </button>
      ) : (
        <button
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          className="group flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
        >
          <span style={{ fontFamily: "NRT, sans-serif" }}>
            {getNavText("next")}
          </span>
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}
