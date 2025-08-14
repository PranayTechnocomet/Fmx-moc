import React from "react"

export default function CustomStepperProgressBar({ steps, activeStep,className = "" }) {
    return (
        <div className={`w-full px-4 py-8 ${className}`}>
            <div className="relative">
                {/* Segmented Progress Line */} 
                <div className="absolute left-0 top-2.5 w-full flex items-center">
                    {steps.map((_, index) => {
                        if (index === steps.length - 1) return null
                        const isSegmentCompleted = index < activeStep
                        return (
                            <div
                                key={index}
                                className={`flex-1 mt-[7px] border-t-2 ${isSegmentCompleted
                                    ? "border-green-500 border-solid"
                                    : "border-gray-300 border-dashed"
                                    }`}
                            />
                        )
                    })}
                </div>


                {/* Step Circles & Labels */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const isCompleted = index < activeStep
                        const isCurrent = index === activeStep

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center z-10"
                            >
                                {/* Step Circle */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                                        ${isCompleted
                                            ? "bg-white text-green-500 border border-green-500"
                                            : isCurrent
                                                ? "border-0 bg-blue-700 text-white font-bold"
                                                : "border-2 border-gray-300 bg-white text-gray-500"
                                        }`}
                                >
                                    <span className="text-sm">
                                        {isCompleted ? "✓" : index + 1}
                                    </span>
                                </div>

                                {/* Step Label */}
                                <div
                                    className={`mt-2 text-xs sm:text-sm text-center w-20 font-semibold ${isCompleted
                                        ? "text-black font-semibold"
                                        : isCurrent
                                            ? "text-blue-700 font-semibold"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {step.label}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
