'use client'
import React, { useState } from 'react'
import Card from '../ui/Card'
import CustomStepperProgressBar from '../CustomStepperProgressBar'
import Button from '../ui/Button'
import Image from 'next/image'
import Logs from './Logs'
// import AttachmentGif from "../../images/attachment-img.jfif"

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
export default function ChangeRequiestDetails({
    details = {},
    approval = {},
    logs = [],
    onApprove, onReturnForEdits, onReject,
}) {
    const activeApprovalStep = getActiveApprovalStep(approval.status || defaultStatus);
    const [showPreApprovedEmailPopup, setShowPreApprovedEmailPopup] = useState(false);
    const [showDCChallanPopup, setShowDCChallanPopup] = useState(false);
    return (
        <div>
            <div className="grid grid-cols-12 gap-6">
                {/* Left: Details Sections */}
                <div className="col-span-12 space-y-5 ">
                    {/* GRN Detail */}
                    <Card className='mb-5 pt-0'>

                        <div className="font-semibold mb-4 text-lg">
                            Basic Details
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-6 grid grid-cols-12 gap-4 text-md">
                                <div className="col-span-6 text-gray-500">Type of Change:</div>
                                <span className="col-span-6 font-medium">{details.typeOfChange || 'Planned'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Site Name:</div>
                                <span className="col-span-6 font-medium">{details.siteName || 'BOM11'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Date:</div>
                                <span className="col-span-6 font-medium">{details.date || '23 April 2024'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Change Reques:</div>
                                <span className="col-span-6 font-medium">{details.changeRequest || 'SR992'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Risk classification of Change:</div>
                                <span className="col-span-6 font-medium">{details.riskClassificationOfChange || 'Medium'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Date of Change:</div>
                                <span className="col-span-6 font-medium">{details.dateOfChange || '23 April 2024'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Proposed Change:</div>
                                <span className="col-span-6 font-medium">{details.proposedChange || 'Upgrade server hardware for improved data processing speed'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Department:</div>
                                <span className="col-span-6 font-medium">{details.department || 'IT Operations'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Reason for Proposed Change with Technical Justification:</div>
                                <span className="col-span-6 font-medium">{details.reasonForProposedChangeWithTechnicalJustification || 'Current server performance is inadequate for increased data load; upgrade will enhance response time and system stability.'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Equipment/Facility/Documentation Affected:</div>
                                <span className="col-span-6 font-medium">{details.equipmentFacilityDocumentationAffected || 'Server Rack B2, Data Center SOP Document, Network Map Diagram'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Asset Types:</div>
                                <span className="col-span-6 font-medium">{details.assetTypes || 'Server Hardware'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Asset Name:</div>
                                <span className="col-span-6 font-medium">{details.assetName || 'Dell PowerEdge R740'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Impacts of Change:</div>
                                <span className="col-span-6 font-medium">{details.impactsOfChange || 'Improved processing capacity, reduced latency'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Impact on redundancy:</div>
                                <span className="col-span-6 font-medium">{details.impactOnRedundancy || 'N'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Downtime:</div>
                                <span className="col-span-6 font-medium">{details.downtime || 'Yes'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Downtime Duration:</div>
                                <span className="col-span-6 font-medium">{details.downtimeDuration || '2 Hours : 30 Minutes'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Reviewer Comment:</div>
                                <span className="col-span-6 font-medium">{details.reviewerComment || 'Ensure rollback plan and notify all stakeholders before downtime'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Safety and Health Impact:</div>
                                <span className="col-span-6 font-medium">{details.safetyAndHealthImpact || 'No direct impact; follow standard electrical safety protocol'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Cost Benefit Analysis:</div>
                                <span className="col-span-6 font-medium">{details.costBenefitAnalysis || 'Short-term Cost: ₹2,50,000 Benefit: 30% performance boost, reduced error logs'}</span>
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 text-gray-500">Environmental Impact:</div>
                                <span className="col-span-6 font-medium">{details.environmentalImpact || 'Negligible; replaced parts will be recycled as per e-waste policy'}</span>
                            </div>
                        </div>
                    </Card>
                </div>
              
            </div>
        </div>
    )
}
