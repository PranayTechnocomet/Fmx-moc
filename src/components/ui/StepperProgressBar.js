import React from "react"

export default function StepperProgressBar({ steps, activeStep }) {
    return (
        <div className="flex justify-between items-center my-4 w-4/5 mx-auto">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center relative">
                        <div
                            className={`w-7 h-7 rounded-full flex justify-center items-center font-thin border-2 mt-3 ${
                                index < activeStep
                                    ? "bg-white border-green-500 text-green-500"
                                    : index === activeStep
                                    ? "bg-blue-800 border-blue-800  text-white"
                                    : "bg-gray-300 border-gray-300 text-gray-700"
                            }`}
                        >
                            {index < activeStep ? "✓" : index + 1}
                        </div>
                        <span
                            className={`mt-2.5 text-sm font-bold ${
                                index === activeStep
                                    ? "text-blue-800"
                                    : "text-black"
                            }`}
                        >
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={` border-t flex flex-1 -mx-10 mb-4 ${
                                index < activeStep
                                    ? " border-double border-green-500 "
                                    : " border-dashed border-slate-400 "
                            }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}
