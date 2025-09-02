import React from "react";

export function ExperienceForm({ cvData, handleInputChange, addArrayItem, removeArrayItem }) {
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
          ئەزموونی کار
        </h2>
        <button
          onClick={() =>
            addArrayItem("experience", {
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
            })
          }
          className="bg-[#F5CDB3] text-black px-4 py-2 rounded-lg hover:bg-[#E7B18E] transition-colors"
          style={{ fontFamily: "NRT, sans-serif" }}
        >
          + زیادکردن
        </button>
      </div>

      {cvData.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-start">
            <h3
              className="text-lg font-semibold text-black dark:text-white"
              style={{ direction: "rtl" }}
            >
              ئەزموونی کار #{index + 1}
            </h3>
            {cvData.experience.length > 1 && (
              <button
                onClick={() => removeArrayItem("experience", exp.id)}
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
                ناوی کۆمپانیا *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    "company",
                    e.target.value,
                    index
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all"
                placeholder="ناوی کۆمپانیا"
                style={{ direction: "rtl" }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                style={{ direction: "rtl" }}
              >
                پۆست *
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    "position",
                    e.target.value,
                    index
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all"
                placeholder="پۆستەکەت"
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
                value={exp.startDate}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
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
                  value={exp.endDate}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "endDate",
                      e.target.value,
                      index
                    )
                  }
                  disabled={exp.current}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
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
                    ئێستا لێرە دەکارم
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              style={{ direction: "rtl" }}
            >
              وەسف
            </label>
            <textarea
              value={exp.description}
              onChange={(e) =>
                handleInputChange(
                  "experience",
                  "description",
                  e.target.value,
                  index
                )
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5CDB3] focus:border-transparent outline-none transition-all resize-none"
              placeholder="وەسفی کارەکانت و دەستکەوتەکانت..."
              style={{ direction: "rtl" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
