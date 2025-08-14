// 'use client';
// import React from 'react';
// import { Check, Dot, Circle, X } from 'lucide-react';

// const Steper = ({ steps, activeStep }) => {
//   return (
//     <div className="flex flex-col pl-6 relative">
//       {steps.map((step, index) => {
//         let status =
//           index < activeStep
//             ? 'completed'
//             : index === activeStep
//             ? 'active'
//             : step.status === 'closed'
//             ? 'closed'
//             : 'pending';

//         return (
//           <div key={index} className="relative flex items-start pb-6">
//             {/* Connector line */}
//             {index !== steps.length - 1 && (
//               <span className="absolute left-[10px] top-[18px] h-full w-[2px] bg-gray-300 z-0"></span>
//             )}

//             {/* Status Icon */}
//             <div className="relative z-10">
//               {status === 'completed' &&
//                 (step.parent ? (
//                   <Check className="w-6 h-6 text-white bg-[#12B690] rounded-full p-1" />
//                 ) : (
//                   <Dot className="w-5 h-5 text-[#12B690] border-black " />
//                 ))}

//               {status === 'active' &&
//                 (step.parent ? (
//                   <Circle className="w-4 h-4 text-blue-600 fill-blue-100 " />
//                 ) : (
//                   <Dot className="w-5 h-5 text-blue-600" />
//                 ))}

//               {status === 'pending' &&
//                 (step.parent ? (
//                   <Circle className="w-4 h-4 text-gray-400" />
//                 ) : (
//                   <Dot className="w-5 h-5 text-gray-400" />
//                 ))}

//               {status === 'closed' && (
//                 <X className="w-6 h-6 text-white bg-red-500 rounded-full p-1" />
//               )}
//             </div>

//             {/* Step Text */}
//             <div className="ml-4">
//               <span
//                 className={`${step.parent ? 'text-base' : 'text-sm'} ${
//                   status === 'completed'
//                     ? 'text-gray-900 font-medium'
//                     : status === 'active'
//                     ? 'text-blue-600 bg-blue-50 px-2 py-1 rounded-lg font-medium'
//                     : status === 'pending'
//                     ? 'text-gray-400 font-medium'
//                     : 'text-red-500 font-medium'
//                 }`}
//               >
//                 {step.title}
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Steper;

'use client';
import React from 'react';
import { Check, Dot, Circle, X, ChevronRight } from 'lucide-react';

const Steper = ({ steps, activeStep }) => {
  return (
    <div className="flex flex-col pl-6 relative">
      {steps.map((step, index) => {
        let status =
          index < activeStep
            ? 'completed'
            : index === activeStep
            ? 'active'
            : step.status === 'closed'
            ? 'closed'
            : 'pending'
            ;

        const isCABStep = step.title.toLowerCase().includes('cab approval');

        return (
          <div key={index} className="relative flex items-start pb-6">
            {/* Connector line */}
            {index !== steps.length - 1 && (
              <span
                className={`absolute left-[10px] top-[18px] h-full w-[2px] ${
                  index < activeStep ? 'bg-gray-500' : 'bg-gray-400'
                } z-0`}
              ></span>
            )}

            {/* Status Icon */}
            <div className="relative z-10">
              {status === 'completed' &&
                (step.parent ? (
                  <Check className="w-6 h-6 text-white bg-[#12B690] rounded-full p-1" />
                ) : (
                  <Dot className="w-5 h-5 text-[#12B690]" />
                ))}

              {status === 'active' &&
                (step.parent ? (
                  // <Circle className="w-4 h-4 text-blue-600 fill-blue-100" />
                  <Dot className="w-5 h-5 text-gray-400 flex items-center justify-center" />
                ) : (
                  <Dot className="w-5 h-5 text-blue-600" />
                ))}

              {status === 'pending' &&
                (step.parent ? (
                  <Dot className="w-5 h-5 text-gray-400 flex items-center justify-center" />
                ) : (
                  <Dot className="w-5 h-5 text-gray-400" />
                ))}

              {status === 'closed' && (
                <X className="w-6 h-6 text-white bg-red-500 rounded-full p-1" />
               
              )}
            </div>

            {/* Step Text */}
            <div className="ml-4 flex items-center gap-2 w-full">
              <span
                className={`${step.parent ? 'text-base' : 'text-sm'} flex items-center ${
                  status === 'completed'
                    ? 'text-gray-900 font-medium'
                    : status === 'active'
                    ? 'text-blue-600 bg-blue-50 px-2 py-1 rounded-lg font-medium flex-1'
                    : status === 'pending'
                    ? 'text-gray-400 font-medium'
                    : 'text-red-500 font-medium'
                }`}
              >
                {step.title}
              {/* Show right icon only if active and NOT CAB Approval */}
              {status === 'active' && !isCABStep && (
                <ChevronRight className="w-4 h-4 text-blue-600 ml-auto" />
              )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steper;




// import React, { useState } from 'react';
// import { ChevronRight, Check, X } from 'lucide-react';

// export default function Steper() {
//   const [currentStep, setCurrentStep] = useState(4); // CAB Approval is currently active
  
//   const workflowSteps = [
//     {
//       id: 0,
//       title: "Change Request",
//       type: "start",
//       status: "completed"
//     },
//     {
//       id: 1,
//       title: "Change Requested Created (Building Manager)",
//       type: "step",
//       status: currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "pending"
//     },
//     {
//       id: 2,
//       title: "Reviewer (DC Manager / Site Lead)",
//       type: "step", 
//       status: currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "pending"
//     },
//     {
//       id: 3,
//       title: "Technical Approver (Cluster Lead)",
//       type: "step",
//       status: currentStep > 3 ? "completed" : currentStep === 3 ? "active" : "pending"
//     },
//     {
//       id: 4,
//       title: "CAB Approval",
//       type: "step",
//       status: currentStep > 4 ? "completed" : currentStep === 4 ? "active" : "pending"
//     },
//     {
//       id: 5,
//       title: "Process Reviewer",
//       type: "step",
//       status: currentStep > 5 ? "completed" : currentStep === 5 ? "active" : "pending"
//     },
//     {
//       id: 6,
//       title: "Process Start",
//       type: "process",
//       status: currentStep > 6 ? "completed" : currentStep === 6 ? "active" : "pending"
//     },
//     {
//       id: 7,
//       title: "Process Closed",
//       type: "end",
//       status: currentStep > 7 ? "completed" : currentStep === 7 ? "active" : "closed"
//     }
//   ];

//   const handleStepClick = (stepId) => {
//     setCurrentStep(stepId);
//   };

//   const handleNext = () => {
//     if (currentStep < workflowSteps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const getStepIcon = (step) => {
//     if (step.type === "start" && step.status === "completed") {
//       return (
//         <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
//           <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
//         </div>
//       );
//     }
    
//     if (step.type === "end") {
//       return (
//         <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
//           <X className="w-3.5 h-3.5 text-white stroke-[2.5]" />
//         </div>
//       );
//     }
    
//     if (step.type === "process") {
//       return (
//         <div className={`w-4 h-4 rounded-full border-2 border-[#939596] ${
//           step.status === "completed" ? "bg-blue-500" :
//           step.status === "active" ? "bg-blue-500 bg-black" : 
//           "bg-gray-400 bg-black"
//         }`} />
//       );
//     }
    
//     // Diamond shape for regular steps
//     return (
//       <div className={`w-1 h-1 rounded-full ${
//         step.status === "completed" ? "bg-blue-500" :
//         step.status === "active" ? "bg-blue-500" : 
//         "bg-gray-300"
//       }`} />
//     );
//   };

//   const getConnectingLine = (index) => {
//     const currentStepObj = workflowSteps[index];
//     const nextStepObj = workflowSteps[index + 1];
    
//     if (!nextStepObj) return null;
    
//     const isCompleted = currentStepObj.status === "completed" || 
//                       (currentStepObj.status === "active" && currentStep > index);
    
//     return (
//       <div className={`absolute left-2.5 w-0.5 h-6 ${
//         isCompleted ? "bg-blue-400" : "bg-gray-300"
//       }`} 
//       style={{ top: "32px" }} />
//     );
//   };

//   return (
//     <div className="max-w-sm mx-auto">
//       {/* Workflow Steps */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-4">
//           {workflowSteps.map((step, index) => (
//             <div key={step.id} className="relative">
//               {/* Connecting Line */}
//               {getConnectingLine(index)}
              
//               {/* Step Row */}
//               <div 
//                 className={`flex items-center py-2 px-3 -mx-3 rounded-md cursor-pointer transition-colors duration-150 ${
//                   step.status === "active" 
//                     ? "bg-indigo-50 border border-indigo-200" 
//                     : "hover:bg-gray-50"
//                 }`}
//                 // onClick={() => handleStepClick(step.id)}
//               >
//                 {/* Icon */}
//                 <div className="flex-shrink-0 mr-3 flex items-center justify-center relative z-10">
//                   {getStepIcon(step)}
//                 </div>
                
//                 {/* Title */}
//                 <div className="flex-1 min-w-0">
//                   <div className={`text-sm font-medium leading-5 ${
//                     step.status === "active" 
//                       ? "text-[#939596]" 
//                       : step.status === "completed"
//                       ? "text-gray-700"
//                       : step.status === "closed"
//                       ? "text-gray-500"
//                       : "text-gray-400"
//                   }`}>
//                     {step.title}
//                   </div>
//                 </div>
                
//                 {/* Arrow for active step */}
//                 {step.status === "active" && (
//                   <ChevronRight className="w-4 h-4 text-[#939596] flex-shrink-0" />
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      

//     </div>
//   );
// }