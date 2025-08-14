'use client'
import React, { useState } from 'react'
import Card from '../ui/Card'
import CustomStepperProgressBar from '../CustomStepperProgressBar'
import Button from '../ui/Button'
import Image from 'next/image'
import Logs from './Logs'
// import AttachmentGif from '../../images/attachment-img.jfif'

const approvalSteps = [
    { label: 'Pass Created' },
    { label: 'L1 Approval' },
    { label: 'L2 Approval' },
    { label: 'Security Clearance' },
    { label: 'Material Returned' },
    { label: 'Pass Closed' },
];
const defaultStatus = {
    l1Approved: true,
    l2Approved: true,
    securityCleared: true,
    materialReturned: false,
    passClosed: false
};

function getActiveApprovalStep(status = {}) {
    if (!status.l1Approved) return 1; // L1 Approval
    if (!status.l2Approved) return 2; // L2 Approval
    if (!status.securityCleared) return 3; // Security Clearance
    if (!status.materialReturned) return 4; // Material Returned
    if (!status.passClosed) return 5; // Pass Closed
    return 6; // All done
}

import { useDispatch } from 'react-redux';
import { setShowReturnAllColumn } from '../../redux/slices/gatePassSlice';

export default function ClientPassDetails({
    details = {},
    approval = {},
    logs = [],
    onApprove, onReturnForEdits, onReject,
}) {
    // Compute active step dynamically from approval.status
    const activeApprovalStep = getActiveApprovalStep(approval.status || defaultStatus);
    const dispatch = useDispatch();
    return (
        <div>
            <div className="grid grid-cols-12 gap-6">
                {/* Left: Details Sections */}
                <div className="col-span-6 space-y-5 ">
                    {/* GRN Detail */}
                    <Card className='mb-5 pt-0'>

                        <div className="font-semibold mb-4 text-lg">
                            GRN Detail
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-6 grid grid-cols-12 gap-4 text-md">
                                <div className="col-span-6 text-gray-500">Site:</div>
                                <span className="col-span-6 font-medium">{details.site || 'Empress'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">GRN No.:</div>
                                <span className="col-span-6 font-medium">{details.grnNo || '123456789'}</span>
                            </div>
                        </div>
                    </Card>
                    {/* Return Details */}
                    <Card className='mb-5 pt-0'>
                        <div className="font-semibold mb-4 text-lg">
                            Return Details
                        </div>
                        <div className="col-span-6 grid grid-cols-12 gap-4">
                            <div className="col-span-6 text-gray-500">Return Date:</div>
                            <span className="col-span-6 font-medium">
                                {details.returnDate || '23 April 2024'}
                            </span>
                        </div>
                    </Card>
                    {/* Client Delivery Details */}
                    <Card className='mb-5 pt-0'>
                        <div className="font-semibold mb-4 text-lg">
                            Client Delivery Details
                        </div>
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Customer Name:</div>
                                <span className="col-span-6 font-medium">
                                    {details.customerName || 'Tarang Jain'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Ticket No.:</div>
                                <span className="col-span-6 font-medium">
                                    {details.ticketNo || 'BBYD346789'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">BUA:</div>
                                <span className="col-span-6 font-medium">
                                    {details.bua || 'BUA'}
                                </span>
                            </div>
                        </div>
                    </Card>
                    {/* Vehicle Details */}
                    <Card className='mb-5 pt-0'>
                        <div className="font-semibold mb-4 text-lg">Vehicle Details</div>
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Vehicle Type:</div>
                                <span className="col-span-6 font-medium">
                                    {details.vehicleType || 'Vehicle Type'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Vehicle No.:</div>
                                <span className="col-span-6 font-medium">
                                    {details.vehicleNo || 'MH46B03667'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Driver Name:</div>
                                <span className="col-span-6 font-medium">
                                    {details.driverName || 'Hetet Ztakia'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Driver Contact No.:</div>
                                <span className="col-span-6 font-medium">
                                    {details.driverContactNo || '+91-9135772168'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Driver License No.:</div>
                                <span className="col-span-6 font-medium">
                                    {details.driverLicenseNo || '20BFB690'}
                                </span>
                            </div>
                        </div>
                    </Card>
                    {/* Security Detail */}
                    <Card className='mb-5 pt-0'>
                        <div className="font-semibold mb-4 text-lg">Security Detail</div>
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Date Time:</div>
                                <span className="col-span-6 font-medium">
                                    {details.securityDateTime || '12-11-2024'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Security Agency:</div>
                                <span className="col-span-6 font-medium">
                                    {details.securityAgency || 'Elite Security Agency'}
                                </span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Security Guard Name:</div>
                                <span className="col-span-6 font-medium">
                                    {details.securityGuardName || 'Alex Pandian'}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* Right: Approval & Logs */}
                <div className="col-span-6">

                    {/* Approval Section */}
                    <Card className="mb-5 pt-0">
                        <div className="font-semibold mb-4 text-lg"
                        >Pass Approval Or Cancellation
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold mb-2">
                                Gate Pass Status
                            </div>
                            <CustomStepperProgressBar steps={approvalSteps} activeStep={activeApprovalStep} />
                            {(activeApprovalStep === 1 || activeApprovalStep === 2) && (
                                <>
                                    {/* L1 and L2 Approval */}
                                    <div className="relative w-full">
                                        <label className="absolute -top-2 left-2 px-1 text-sm text-gray-400 bg-white z-10">
                                            Remarks
                                        </label>
                                        <textarea
                                            className="w-full border border-gray-200 rounded-md p-2 pt-4 text-sm text-gray-900 resize-none shadow-sm bg-white focus:outline-none"
                                            rows={2}
                                            value={approval.remarks || 'Ready to install, Approve it for this release'}
                                            readOnly
                                        />
                                    </div>
                                </>
                            )}

                            {(activeApprovalStep === 3) && (
                                <>
                                    {/* SecurityCleared Approval */}
                                    <div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 my-4">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                <div className="text-center flex flex-col items-center justify-center">
                                                    <h3 className="text-lg font-bold text-gray-900 text-center">
                                                        Upload File
                                                    </h3>
                                                    <p className='text-sm text-gray-600 text-center'>
                                                        Please upload in JPG, JPEG, PNG, PDF File Format
                                                    </p>
                                                </div>{" "}
                                                <div className="flex gap-5">
                                                    <Button
                                                        variant="secondary"
                                                        className="font-bold rounded-lg"
                                                        onClick={() =>
                                                            document
                                                                .querySelector(
                                                                    'input[type="file"]'
                                                                )
                                                                .click()
                                                        }
                                                    >
                                                        <input
                                                            type="file"
                                                            name="123"
                                                            className="hidden"
                                                            accept=".xlsx"
                                                        // onChange={(e) => handleFileUpload(e)}
                                                        />

                                                        <span className="font-semibold">
                                                            Browse Files
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Display uploaded files */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-4 w-full border-2 border-dashed border-gray-200 p-2 rounded-lg">
                                                {/* <Image
                                                    src={AttachmentGif}
                                                    alt="Image 1"
                                                    width={240}
                                                    height={240}
                                                    className="w-10 h-10 object-cover rounded"
                                                /> */}
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">
                                                        File Name.Format
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-medium">
                                                        5.0 MB
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}
                            {(activeApprovalStep === 4) && (
                                <>
                                    {/* Material Returned Approval */}
                                    <Button variant='primary'
                                        onClick={() => {
                                            if (defaultStatus.securityCleared) {
                                                dispatch(setShowReturnAllColumn(true));
                                            }
                                        }}
                                    >
                                        Start Return Process
                                    </Button>

                                </>
                            )}
                        </div>
                        {!defaultStatus.securityCleared && (
                            <div className="flex gap-3 mt-2">
                                <Button className="bg-[#14CDA2] text-white font-semibold rounded-md border-0" onClick={() => {
                                    // onApprove()
                                    getActiveApprovalStep(activeApprovalStep + 1)
                                }}>
                                    Approved
                                </Button>
                                <Button variant="secondary" onClick={onReturnForEdits}>
                                    Return For Edits
                                </Button>
                                <Button className="bg-[#FDF5F6] text-[#D1404C] font-semibold rounded-md border-0" onClick={onReject}>
                                    Reject
                                </Button>
                            </div>
                        )}

                    </Card>
                    {/* Logs Section */}
                    <Logs />
                    {/* <Card className='mb-5 pt-0'>
                        <div className="font-semibold mb-4 text-lg">
                            Logs
                        </div>
                        <div className="space-y-2 text-sm">
                            {logs.length === 0 ? (
                                <div className="text-gray-400">No logs found</div>
                            ) : (
                                logs.map((log, idx) => (
                                    <div key={idx} className="border-b pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
                                        <div className="font-medium">
                                            Requested By {log.requestedBy}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {log.time}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            Created By {log.createdBy}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card> */}
                </div>
            </div>
        </div>
    )
}
