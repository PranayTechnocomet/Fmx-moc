// 'use client'
// import React, { useState } from 'react'
// import Card from '../ui/Card'
// import CustomStepperProgressBar from '../CustomStepperProgressBar'
// import Button from '../ui/Button'
// import Logs from './Logs'
// import StatusPill from '../ui/StatusPill'
// import FieldSetInput from '../ui/form/FieldSetInput'
// import Modal from '../ui/overlays/Modal'

// // Status Colors
// const getStatusConfig = (statusText) => {
//     const statusMap = {
//         Active: { style: "text-green-600 bg-green-50", label: "Active" },
//         Pending: { style: "text-yellow-600 bg-yellow-50", label: "Pending" },
//         Rejected: { style: "text-red-600 bg-red-50", label: "Rejected" },
//         Completed: { style: "text-blue-700 bg-blue-50", label: "Completed" }
//     };
//     return statusMap[statusText] || { style: "text-gray-600 bg-gray-50", label: statusText || "Unknown" };
// };


// export default function Approvals() {

//   const [showModal, setShowModal] = useState(false);

//     const approvalSteps = [
//         { label: 'Pass Created' },
//         { label: 'L1 Approval' },
//         { label: 'L2 Approval' },
//         { label: 'Security Clearance' },
//         { label: 'Material Returned' },
//         { label: 'Pass Closed' },
//     ];
//     const defaultStatus = {
//         l1Approved: true,
//         l2Approved: false,
//         securityCleared: false,
//         materialReturned: false,
//         passClosed: false
//     };

//     function getActiveApprovalStep(status = {}) {
//         if (!status.l1Approved) return 1; // L1 Approval
//         if (!status.l2Approved) return 2; // L2 Approval
//         if (!status.securityCleared) return 3; // Security Clearance
//         if (!status.materialReturned) return 4; // Material Returned
//         if (!status.passClosed) return 5; // Pass Closed
//         return 6; // All done
//     }

//     const { style: statusStyle, label: statusLabel } = getStatusConfig(currentPass.status);
//     const [remarks, setRemarks] = useState({
//         remarks: ""
//     });
//     const fields = [
//         { label: "Remarks", type: "textarea" },
//     ]

//     const handleChange = (name, value) => {
//         setRemarks((prevData) => ({
//             ...prevData,
//             [name]: value
//         }))
//     }

//     const handleReturnClick = () => {
//         setShowModal(true)
//       }

//       const handleCancel = () => {
//         setShowModal(false)
//       }


//     return (
//         <div className="grid grid-cols-12 gap-6">
//             {/* Left: Details Sections */}
//             <div className="col-span-6 space-y-5 ">
//                 {/* Logs Section */}
//                 <Card className='mb-5 pt-0'>
//                     <div className="font-semibold mb-4 text-lg">
//                         Logs
//                     </div>

//                     <div className="space-y-2 text-sm">
//                         <Logs />
//                     </div>
//                 </Card>
//             </div>

//             {/* Right: Approval & Logs */}
//             <div className="col-span-6">
//                 {/* Approval Section */}
//                 <Card className="mb-5 pt-0">
//                     <div className="font-semibold mb-4 text-lg">
//                         Change Request Approval Or Cancellation
//                     </div>
//                     <div className="mb-4">
//                         <div className="mb-2">
//                             {/* <StatusPill className={statusStyle} value={statusLabel} /> */}

//                             <span className='flex items-center gap-2 mt-1'>
//                                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M7.65742 8.45356C7.75392 8.55971 7.87696 8.61037 8.02654 8.60555C8.17612 8.60072 8.30398 8.54524 8.41013 8.43908C8.53558 8.32328 8.59831 8.18818 8.59831 8.03378C8.59831 7.87937 8.54041 7.75392 8.42461 7.65742L6.5573 5.77563V3.45959C6.5573 3.32449 6.50905 3.20627 6.41255 3.10495C6.31604 3.00362 6.19059 2.95296 6.03619 2.95296C5.89144 2.95296 5.7684 3.00362 5.66707 3.10495C5.56574 3.20627 5.51508 3.32931 5.51508 3.47407V5.99276C5.51508 6.06031 5.52714 6.12786 5.55127 6.19542C5.57539 6.26297 5.61641 6.33052 5.67431 6.39807L7.65742 8.45356ZM5.99276 12C5.1725 12 4.39807 11.8432 3.66948 11.5296C2.94089 11.2159 2.30398 10.7865 1.75875 10.2413C1.21351 9.69602 0.784077 9.06152 0.470446 8.33776C0.156815 7.61399 0 6.83715 0 6.00724C0 5.18697 0.156815 4.41255 0.470446 3.68396C0.784077 2.95537 1.21351 2.31846 1.75875 1.77322C2.30398 1.22799 2.94089 0.79614 3.66948 0.477684C4.39807 0.159228 5.1725 0 5.99276 0C6.81303 0 7.58746 0.159228 8.31604 0.477684C9.04463 0.79614 9.68154 1.22799 10.2268 1.77322C10.772 2.31846 11.2039 2.95537 11.5223 3.68396C11.8408 4.41255 12 5.18697 12 6.00724C12 6.8275 11.8408 7.60193 11.5223 8.33052C11.2039 9.05911 10.772 9.69602 10.2268 10.2413C9.68154 10.7865 9.04704 11.2159 8.32328 11.5296C7.59952 11.8432 6.82268 12 5.99276 12ZM5.99276 10.8565C7.32449 10.8565 8.46562 10.3836 9.41616 9.43788C10.3667 8.49216 10.842 7.34861 10.842 6.00724C10.842 4.67551 10.3667 3.53438 9.41616 2.58384C8.46562 1.63329 7.32449 1.15802 5.99276 1.15802C4.66104 1.15802 3.5199 1.63329 2.56936 2.58384C1.61882 3.53438 1.14355 4.67551 1.14355 6.00724C1.14355 7.34861 1.61882 8.49216 2.56936 9.43788C3.5199 10.3836 4.66104 10.8565 5.99276 10.8565Z" fill="#686687" />
//                                 </svg>
//                                 2 hours, 23 mins
//                             </span>

//                         </div>

//                         <CustomStepperProgressBar steps={approvalSteps} activeStep={getActiveApprovalStep(defaultStatus)} />
//                         <div className="mt-2 text-xs">Remarks</div>

//                         <FieldSetInput
//                             key={index}
//                             type={field.type}
//                             className="w-full"
//                             fields={[field]}
//                             formData={remarks}
//                             handleChange={handleChange}
//                         />
//                     </div>
//                     <div className="flex gap-3 mt-2">
//                         <Button className="bg-[#14CDA2] text-white font-semibold rounded-md border-0">
//                             Approved
//                         </Button>
//                         <div className="p-2 flex gap-4">
//                             <Button
//     variant="danger"
//     onClick={handleReturnClick}
//     className="mt-1"
// >
//     <svg
//         width="12"
//         height="12"
//         viewBox="0 0 12 12"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="mt-1"
//     >
//         <g clipPath="url(#clip0_32_9946)">
//             <path
//                 d="M11.2299 5.07685H2.62795L6.38601 1.31879C6.68635 1.01845 6.68635 0.52559 6.38601 0.225253C6.08567 -0.0750842 5.60051 -0.0750842 5.30018 0.225253L0.225253 5.30018C-0.0750842 5.60051 -0.0750842 6.08567 0.225253 6.38601L5.30018 11.4609C5.60051 11.7613 6.08567 11.7613 6.38601 11.4609C6.68635 11.1606 6.68635 10.6754 6.38601 10.3751L2.62795 6.61704H11.2299C11.6535 6.61704 12 6.2705 12 5.84694C12 5.42339 11.6535 5.07685 11.2299 5.07685Z"
//                 fill="#D1404C"
//             />
//         </g>
//         <defs>
//             <clipPath id="clip0_32_9946">
//                 <rect
//                     width="12"
//                     height="12"
//                     fill="white"
//                 />
//             </clipPath>
//         </defs>
//     </svg>
//                                 Return For Edits
//                             </Button>
//                         </div>
//                         <Button className="bg-[#FDF5F6] text-[#D1404C] font-semibold rounded-md border-0">
//                             Reject
//                         </Button>
//                     </div>
//                 </Card>

//             </div>

//             {showModal && (
//                 <Modal
//                     isOpen={showModal}
//                     onClose={handleCancel}
//                 >
//                     <div className="p-4">
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="text-xl font-semibold">
//                                 Are you sure?
//                             </h3>
//                             <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>
//                         <p className="text-gray-600 mb-4">
//                             Are you sure you want to return this asset for
//                             edits? Please provide a reason below.
//                         </p>
//                         <textarea
//                             className="w-full p-2 border rounded mb-4"
//                             value={returnReason}
//                             onChange={(e) =>
//                                 setReturnReason(e.target.value)
//                             }
//                             placeholder="Enter reason for return"
//                             rows="4"
//                         />
//                         <div className="flex justify-end gap-4">
//                             <Button
//                                 variant="secondary"
//                                 onClick={handleCancel}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 variant="primary"
//                                 onClick={handleReturn}
//                                 disabled={!returnReason.trim()}
//                             >
//                                 Yes, Return for Edits
//                             </Button>
//                         </div>
//                     </div>
//                 </Modal>
//             )}
//         </div>
//     )
// }


'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatusPill from '../ui/StatusPill';
import FieldSetInput from '../ui/form/FieldSetInput';
import Modal from '../ui/overlays/Modal';
import { useSelector } from 'react-redux';
import Steper from './Steper';

const getStatusConfig = (statusText) => {
  const normalizedStatus = (statusText || 'Pending').trim().toLowerCase();
  const statusMap = {
    active: { style: 'text-green-600 bg-green-50', label: 'Active' },
    pending: { style: 'text-yellow-600 bg-yellow-50', label: 'Pending' },
    rejected: { style: 'text-red-600 bg-red-50', label: 'Rejected' },
    completed: { style: 'text-blue-700 bg-blue-50', label: 'Completed' },
  };
  return statusMap[normalizedStatus] || statusMap.pending;
};

const getTimeDifference = (startDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const diffMs = now - start;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return `${hours} hours, ${mins} mins`;
};

export default function Approvals() {
  const currentPass = useSelector((state) => state.getGatePass.selectedPass);

  const steps = [
    { title: 'Change Request', parent: true },
    { title: 'Change Requested Created (Shift Manager)' },
    { title: 'Reviewer (DC Manager / Site Lead)' },
    { title: 'Technical Approver (Cluster Lead)' },
    { title: 'CAB Approval', parent: false },
    { title: 'Process Reviewer' },
    { title: 'Process Start', parent: true },
    { title: 'Process Closed', parent: false, status: 'closed' },
  ];

  const [activeStep, setActiveStep] = useState(1);

  // Simulate API Call to get current step from server
  useEffect(() => {
    const fetchCurrentStep = async () => {
      try {
        // Example API call
        const response = await fetch('/api/getApprovalStep');
        const data = await response.json();
        setActiveStep(data.activeStepIndex || 0);
      } catch (err) {
        console.error('Error fetching step:', err);
      }
    };
    fetchCurrentStep();
  }, []);

  const { style: statusStyle, label: statusLabel } = getStatusConfig(
    currentPass?.status
  );

  const [remarks, setRemarks] = useState({ remarks: '' });
  const [showModal, setShowModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');

  const fields = [{ label: 'Remarks', name: 'remarks', type: 'textarea' }];

  const handleChange = (name, value) => {
    setRemarks((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReturnClick = () => setShowModal(true);
  const handleCancel = () => {
    setShowModal(false);
    setReturnReason('');
  };
  const handleReturn = () => {
    console.log('Returned for edits:', returnReason);
    setShowModal(false);
    setReturnReason('');
  };

  const timeAgo = useMemo(() => {
    if (!currentPass?.updatedAt) return '2 hours, 23 mins';
    return getTimeDifference(currentPass.updatedAt);
  }, [currentPass?.updatedAt]);

  // Approve → Next Step (with API)
  const handleApprove = async () => {
    if (activeStep < steps.length - 1) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      try {
        await fetch('/api/updateApprovalStep', {
          method: 'POST',
          body: JSON.stringify({ stepIndex: nextStep }),
        });
      } catch (err) {
        console.error('Error approving step:', err);
      }
    }
  };

  // Reject → Previous Step (with API)
  const handleReject = async () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
      try {
        await fetch('/api/updateApprovalStep', {
          method: 'POST',
          body: JSON.stringify({ stepIndex: prevStep }),
        });
      } catch (err) {
        console.error('Error rejecting step:', err);
      }
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left: Stepper */}
      <div className="col-span-6 space-y-5">
        <Card className="mb-5 pt-0">
          <Steper steps={steps} activeStep={activeStep} />
        </Card>
      </div>

      {/* Right: Approvals */}
      <div className="col-span-6">
        <Card className="mb-5 pt-0">
          <div className="font-semibold mb-4 text-lg">
            Change Request Approval or Cancellation
          </div>
          <div className="mb-5">
            <div className="mb-4 flex-col gap-1">
              <StatusPill className={statusStyle} value={statusLabel} />
              <span className="flex items-center gap-2 text-xs text-gray-500">
                {timeAgo}
              </span>
            </div>
            <div className="mt-3">
              <FieldSetInput
                type="textarea"
                className="w-full"
                fields={fields}
                formData={remarks}
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-2">
            <Button
              variant="danger"
              onClick={handleReject}
              className="mt-1 font-semibold flex items-center"
            >
              Reject
            </Button>
            <Button
              variant="secondary"
              onClick={handleReturnClick}
              className="mt-1 font-semibold flex items-center"
            >
              Return For Edits
            </Button>
            <Button
              variant="success"
              onClick={handleApprove}
              className="mt-1 font-semibold flex items-center"
            >
              Approved
            </Button>
          </div>
        </Card>
      </div>

      {/* Return For Edits Modal */}
      {showModal && (
        <Modal isOpen={showModal} onClose={handleCancel}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Return for Edits</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Please provide a reason for returning this request.
            </p>
            <textarea
              className="w-full p-2 border rounded mb-4"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="Enter reason"
              rows="4"
            />
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleReturn}>
                Yes, Return
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
