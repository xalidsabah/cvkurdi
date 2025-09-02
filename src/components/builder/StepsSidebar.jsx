import React from "react";

export function StepsSidebar({
  steps,
  currentStep,
  setCurrentStep,
  cvData,
  getStepTitle,
  getLocalizedStepText,
}) {
  const getSidebarText = (key) => {
    const texts = {
      ku: {
        steps: "هەنگاوەکان",
        step: "هەنگاوی",
        progress: "پێشکەوتن",
        completed: "تەواو بووە",
        stepMessages: [
          "بە زانیارییەکانت دەست پێبکە!",
          "ئەزموونەکانت زیاد بکە",
          "خوێندنەکانت تۆمار بکە",
          "شارەزاییەکانت نیشان بدە",
        ],
      },
      ar: {
        steps: "الخطوات",
        step: "الخطوة",
        progress: "التقدم",
        completed: "مكتملة",
        stepMessages: [
          "ابدأ بمعلوماتك!",
          "أضف خبراتك",
          "سجل تعليمك",
          "أظهر مهاراتك",
        ],
      },
      en: {
        steps: "Steps",
        step: "Step",
        progress: "Progress",
        completed: "completed",
        stepMessages: [
          "Start with your info!",
          "Add your experience",
          "Record your education",
          "Show your skills",
        ],
      },
    };
    return texts[cvData?.language || "ku"]?.[key] || texts.ku[key];
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sticky top-24 shadow-lg border border-gray-100 hover-lift">
        <h3
          className="font-bold text-gray-800 mb-3 text-sm md:text-xs"
          style={{
            fontFamily: "NRT, sans-serif",
            direction: cvData?.language === "en" ? "ltr" : "rtl",
          }}
        >
          {getSidebarText("steps")}
        </h3>

        <div className="space-y-1.5">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`group w-full flex items-center gap-2 p-2.5 rounded-lg transition-all duration-300 text-left transform hover:scale-102 ${
                currentStep === index
                  ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-102`
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200"
              }`}
            >
              <div
                className={`p-1 rounded-md transition-all duration-300 ${
                  currentStep === index
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 group-hover:bg-white group-hover:shadow-md"
                }`}
              >
                {React.cloneElement(step.icon, { size: 14 })}
              </div>
              <div
                className="flex-1"
                style={{
                  textAlign: cvData?.language === "en" ? "left" : "right",
                }}
              >
                <span
                  className="font-semibold block text-sm md:text-xs"
                  style={{ fontFamily: "NRT, sans-serif" }}
                >
                  {getStepTitle ? getStepTitle(step) : step.title}
                </span>
                <span
                  className={`text-xs mt-0.5 block ${
                    currentStep === index ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {getLocalizedStepText
                    ? getLocalizedStepText("step")
                    : getSidebarText("step")}{" "}
                  {index + 1}
                </span>
              </div>

              {/* Step number indicator */}
              <div
                className={`w-4 h-4 rounded-full text-xs font-bold transition-all duration-300 step-number-circle ${
                  currentStep === index
                    ? "bg-white text-purple-600"
                    : index < currentStep
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                <span>
                  {index < currentStep ? "✓" : index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Progress Section */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-sm md:text-xs text-gray-600 mb-1.5">
            <span
              style={{ direction: cvData?.language === "en" ? "ltr" : "rtl" }}
              className="font-bold"
            >
              {getLocalizedStepText
                ? getLocalizedStepText("progress")
                : getSidebarText("progress")}
            </span>
            <span className="font-bold text-purple-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${steps[currentStep]?.color || "from-purple-500 to-pink-500"} h-1.5 rounded-full transition-all duration-700 ease-out`}
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            ></div>
          </div>
          <div
            className="mt-2 text-xs text-gray-500 text-center"
            style={{ direction: cvData?.language === "en" ? "ltr" : "rtl" }}
          >
            {currentStep + 1}{" "}
            {getLocalizedStepText ? getLocalizedStepText("of") : "لە"}{" "}
            {steps.length} {getSidebarText("completed")}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <div className="text-center">
            <div className="text-lg mb-1">🎯</div>
            <p
              className="text-sm md:text-xs text-gray-700 font-bold leading-tight"
              style={{ direction: cvData?.language === "en" ? "ltr" : "rtl" }}
            >
              {getSidebarText("stepMessages")[currentStep] ||
                getSidebarText("stepMessages")[0]}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
