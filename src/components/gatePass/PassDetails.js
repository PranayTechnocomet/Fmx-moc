'use client'
import React, { useState } from 'react'
import Card from '../ui/Card'
import CustomStepperProgressBar from '../CustomStepperProgressBar'
import Button from '../ui/Button'
import Image from 'next/image'
// import AttachementGif from '../../images/attachment-img.jfif'

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
    l2Approved: false,
    securityCleared: false,
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
export default function SifyPassDetails({
    details = {},
    approval = {},
    logs = [],
    onApprove, onReturnForEdits, onReject,
}) {
    const activeApprovalStep = getActiveApprovalStep(approval.status || defaultStatus);
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
                            Sify Delivery Details
                        </div>
                        <div className="grid grid-cols-6 mb-4 gap-4">
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
                        <div className="mb-4 flex flex-col gap-2">
                            <div className="col-span-6 text-gray-500">Pre Approved Email attachment</div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4 w-full border-2 border-dashed border-gray-200 p-2 rounded-lg">
                                    {/* <Image
                                        src={AttachementGif}
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
                        <div className="mb-4 flex flex-col gap-2">
                            <div className="col-span-6 text-gray-500">Upload DC Challan / Invoice</div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4 w-full border-2 border-dashed border-gray-200 p-2 rounded-lg">
                                    {/* <Image
                                        src={AttachementGif}
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
                            <div className="mt-2 text-xs">Remarks</div>
                            <textarea
                                className="w-full border rounded-lg p-2 text-sm mt-1"
                                rows={2}
                                value={approval.remarks || ''}
                                readOnly
                            />
                        </div>
                        {/*                         
                        <div className="flex gap-3 mt-2 ">
                            <Button className="bg-[#14CDA2] text-white font-semibold rounded-md border-0" onClick={onApprove}>
                                Approved
                            </Button>
                            <Button variant="secondary" onClick={onReturnForEdits}>
                                Return For Edits
                            </Button>
                            <Button className="bg-[#FDF5F6] text-[#D1404C] font-semibold rounded-md border-0" onClick={onReject}>
                                Reject
                            </Button>
                        </div> */}
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
                    <Card className='mb-5 pt-0'>
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
                    </Card>
                </div>
            </div>
        </div>
    )
}
