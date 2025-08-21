'use client'
import React, { useEffect, useState } from 'react'
import Card from '../ui/Card'
import CustomStepperProgressBar from '../CustomStepperProgressBar'
import Button from '../ui/Button'
import Image from 'next/image'
import Logs from './Logs'
import { useGetMocBasicDetailsMutation } from '@/redux/api/MocApis'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setMocBasicDetails } from '@/redux/slices/mocSlice'
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

    const { id } = useParams();
    const [getMocBasicDetails] = useGetMocBasicDetailsMutation();
    const dispatch = useDispatch();
    const mocBasicDetails = useSelector((state) => state.moc.mocBasicDetails?.data)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        setLoading(true)

        getMocBasicDetails(id)
            .unwrap()
            .then((res) => {
                dispatch(setMocBasicDetails(res))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    console.log('mocBasicDetails', mocBasicDetails?.formSteps);


    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-primary-100"></div>
            </div>
        )
    }

    // Grouping logic
    const groupedComponents = [];
    let currentGroup = [];

    // loop through all steps/components
    mocBasicDetails?.formSteps?.forEach((component) => {
        if (component.type === "SEPARATOR") {
            if (currentGroup.length > 0) {
                groupedComponents.push(currentGroup);
            }
            // Start new group with separator
            currentGroup = [component];
        } else {
            currentGroup.push(component);
        }
    });

    // push last group
    if (currentGroup.length > 0) {
        groupedComponents.push(currentGroup);
    }

    return (
        <div>
            <div className="space-y-4">
                {groupedComponents.map((group, idx) => {
                    const separator = group.find((comp) => comp.type === "SEPARATOR");
                    const title = separator?.title || separator?.separator;

                    return (
                        <Card key={idx} className="p-3 shadow rounded-xl">
                            {/* Card Title */}
                            {title && (
                                <h2 className="text-lg font-semibold mb-4 pb-1">
                                    {title}
                                </h2>
                            )}

                            {/* Card Body Fields */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {group
                                    .filter((item) => item.type !== "SEPARATOR")
                                    .map((item, index) =>
                                        Object.entries(item)
                                            .filter(([key]) => key !== "required" && key !== "type")
                                            .map(([key, value], subIndex) => (
                                                <div
                                                    key={`moc-header-${index}-${subIndex}`}
                                                    className="flex gap-4"
                                                >
                                                    <span className="text-gray-500 w-1/2">{key}</span>
                                                    <span className="font-medium">{String(value)}</span>
                                                </div>
                                            ))
                                    )}
                            </div>
                        </Card>
                    );
                })}
            </div>


        </div>
    )
}

