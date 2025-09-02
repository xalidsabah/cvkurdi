import React from "react";

export function EducationForm({ cvData, handleInputChange, addArrayItem, removeArrayItem }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold text-black dark:text-white"
          style={{
            fontFamily: "NRT, sans-serif",
            direction: "rtl",
          }}
        >
          خوێندن
        </h2>
        <button
          onClick={() =>
            addArrayItem("education", {
              school: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
              current: false,
            })
          }
          className="bg-[#F5CDB3] text-black px-4 py-2 rounded-lg hover:bg-[#E7B18E] transition-colors"
          style={{ fontFamily: "NRT, sans-serif" }}
        >
          + زیادکردن
        </button>
      </div>

      {cvData.education.map((edu, index) => (
        <div
          key={edu.id}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-start">
            <h3
              className="text-lg font-semibold text-black dark:text-white"
              style={{ direction: "rtl" }}
            >
              خوێندن #{index + 1}
            </h3>
            {cvData.education.length > 1 && (
              <button
                onClick={() => removeArrayItem("education", edu.id)}
                className="text-red-500 hover:text-red-700"
              >
                سڕینەوە
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                style={{ direction: "rtl" }}
              >
                ناوی قوتابخانە/زانکۆ *
              </label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) =>
                  handleInputChange("education", "school", e.target.value, index)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all"
                placeholder="ناوی قوتابخانە یان زانکۆ"
                style={{ direction: "rtl" }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                style={{ direction: "rtl" }}
              >
                بڕوانامە *
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  handleInputChange("education", "degree", e.target.value, index)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all"
                placeholder="بڕوانامە (بەکالۆریۆس، ماستەر، دکتۆرا)"
                style={{ direction: "rtl" }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                style={{ direction: "rtl" }}
              >
                بواری خوێندن
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) =>
                  handleInputChange("education", "field", e.target.value, index)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all"
                placeholder="بواری خوێندن"
                style={{ direction: "rtl" }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                style={{ direction: "rtl" }}
              >
                بەرواری دەستپێکردن
              </label>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) =>
                  handleInputChange(
                    "education",
                    "startDate",
                    e.target.value,
                    index
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                style={{ direction: "rtl" }}
              >
                بەرواری کۆتایی
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "endDate",
                      e.target.value,
                      index
                    )
                  }
                  disabled={edu.current}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "current",
                        e.target.checked,
                        index
                      )
                    }
                    className="rounded"
                  />
                  <span
                    className="text-sm text-gray-600 dark:text-gray-400"
                    style={{ direction: "rtl" }}
                  >
                    ئێستا خوێندکارم
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
