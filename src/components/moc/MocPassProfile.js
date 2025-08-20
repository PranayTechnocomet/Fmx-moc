"use client"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from "../ui/Card"
import DefaultTab from "../DefaultTab"
import ChangeRequiestDetails from "../moc/ChangeRequiestDetails"
import Approvals from "../moc/Approvals"
import Updates from "../moc/Updates"
import Logs from "../moc/Logs"
import StatusPill from "../ui/StatusPill"
import { useGetMocDetailsMutation } from "@/redux/api/MocApis"
import { useParams } from "next/navigation"
import { setMocDetails } from "@/redux/slices/mocSlice"
import { CM_LIST_MAIN_STATUS } from "@/utils/constants"

const tabList = ["Details", "Approvals", "Updates", "Logs"]

// Status Colors
const getStatusConfig = (statusText) => {
    return (
        {
            style: CM_LIST_MAIN_STATUS[statusText]?.color,
            label: CM_LIST_MAIN_STATUS[statusText]?.text
        } || {
            style: "text-gray-600 bg-gray-50",
            label: statusText || "Unknown"
        }
    )
}

export default function MocPassProfile() {
    const gatePasses = useSelector((state) => state.getGatePass.gatePasses)

    const [activeTab, setActiveTab] = useState("Details")
    const { id } = useParams()

    // Example: Pick first gate pass for profile (or adjust as needed)
    const currentPass = gatePasses?.[0] || {
        requestType: "Emergency Change Request",
        requestId: "SR992",
        region: "East",
        site: "Site 1",
        startDate: "12:30 am, 19/10/24",
        endDate: "12:30 am, 19/10/24",
        createdBy: "Yuvraj Thakur",
        status: "Pending"
    }

    const mocDetails = useSelector((state) => state.moc.mocDetails)
    const [getMocDetails] = useGetMocDetailsMutation()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { style: statusStyle, label: statusLabel } = getStatusConfig(
        mocDetails?.detailHeader?.status
    )
    
    useEffect(() => {
        if (!id) return
        setLoading(true)
        getMocDetails(id)
            .unwrap()
            .then((res) => {
                dispatch(setMocDetails(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [getMocDetails, id])

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-primary-100"></div>
            </div>
        )
    }
    return (
        <div className="p-6 min-h-screen overflow-auto h-screen pb-20">
            <Card className="mb-5 pt-0">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-[65px] h-[65px] p-4 flex justify-center items-center rounded-full bg-[#F5F5F7]">
                        {/* SVG Icon */}
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 34 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.03125 18.5938C11.9606 18.5938 14.3438 16.2106 14.3438 13.2812C14.3438 10.3519 11.9606 7.96875 9.03125 7.96875C6.10194 7.96875 3.71875 10.3519 3.71875 13.2812C3.71875 16.2106 6.10194 18.5938 9.03125 18.5938ZM9.03125 9.03125C11.3746 9.03125 13.2812 10.9379 13.2812 13.2812C13.2812 15.6246 11.3746 17.5312 9.03125 17.5312C6.68791 17.5312 4.78125 15.6246 4.78125 13.2812C4.78125 10.9379 6.68791 9.03125 9.03125 9.03125Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M7.88408 15.3999C7.91223 15.4047 7.94092 15.4068 7.96908 15.4068C8.1088 15.4068 8.24427 15.3516 8.34467 15.2512L12.0634 11.5324L11.3122 10.7812L8.11464 13.9788L7.38205 12.5131L6.43164 12.9886L7.49414 15.1136C7.57064 15.2661 7.71514 15.3728 7.88408 15.3999Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M1.15388 23.6613C1.26969 23.8324 1.47103 23.9201 1.67928 23.8882L4.44603 23.4366L5.35022 25.6971C5.42672 25.8883 5.60681 26.018 5.81188 26.0302C5.8225 26.0307 5.83313 26.0312 5.84375 26.0312C6.03713 26.0312 6.21669 25.9261 6.31019 25.7545L8.5 21.7393V30.8125C8.5 32.2772 9.6916 33.4688 11.1563 33.4688H30.2812C31.7459 33.4688 32.9375 32.2772 32.9375 30.8125V4.78125C32.9375 3.31659 31.7459 2.125 30.2812 2.125H27.0938C27.0938 1.24631 26.3787 0.53125 25.5 0.53125H15.9375C15.0588 0.53125 14.3438 1.24631 14.3438 2.125H11.1563C9.6916 2.125 8.5 3.31659 8.5 4.78125V6.40209C4.96984 6.67675 2.15581 9.65175 2.125 13.277C2.10959 15.1013 2.80341 16.8194 4.07894 18.1146C4.08956 18.1252 4.10125 18.1342 4.11188 18.1448L1.13847 23.0897C1.03169 23.2672 1.03806 23.4903 1.15388 23.6613ZM15.9375 6.90625H25.5C26.3787 6.90625 27.0938 6.19119 27.0938 5.3125H29.2188C29.5115 5.3125 29.75 5.55103 29.75 5.84375V29.75C29.75 30.0432 29.5115 30.2812 29.2188 30.2812H12.2188C11.926 30.2812 11.6875 30.0432 11.6875 29.75V25.6355L11.7523 25.7545C11.8458 25.9261 12.0254 26.0312 12.2188 26.0312C12.2294 26.0312 12.24 26.0307 12.2506 26.0302C12.4557 26.0185 12.6358 25.8883 12.7123 25.6971L13.6165 23.4366L16.3832 23.8882C16.5883 23.9211 16.7928 23.8329 16.9086 23.6613C17.025 23.4903 17.0308 23.2672 16.924 23.0897L13.9549 18.1517C15.2394 16.8512 15.9444 15.1242 15.9375 13.2791C15.9269 10.4157 14.1711 7.95494 11.6875 6.9105V5.84375C11.6875 5.55103 11.926 5.3125 12.2188 5.3125H14.3438C14.3438 6.19119 15.0588 6.90625 15.9375 6.90625ZM13.1368 18.853L15.4227 22.6546L13.3668 22.3189C13.1182 22.2785 12.8802 22.415 12.7877 22.6461L12.1444 24.2542L9.89666 20.1333C11.0776 19.9947 12.1853 19.5548 13.1368 18.853ZM30.2812 3.1875C31.1599 3.1875 31.875 3.90256 31.875 4.78125V30.8125C31.875 31.6912 31.1599 32.4062 30.2812 32.4062H11.1563C10.2776 32.4062 9.5625 31.6912 9.5625 30.8125V21.7393L10.625 23.6874V29.75C10.625 30.6287 11.3401 31.3438 12.2188 31.3438H29.2188C30.0974 31.3438 30.8125 30.6287 30.8125 29.75V5.84375C30.8125 4.96506 30.0974 4.25 29.2188 4.25H27.0938V3.1875H30.2812ZM15.4063 2.125C15.4063 1.83228 15.6448 1.59375 15.9375 1.59375H25.5C25.7927 1.59375 26.0312 1.83228 26.0312 2.125V5.3125C26.0312 5.60522 25.7927 5.84375 25.5 5.84375H15.9375C15.6448 5.84375 15.4063 5.60522 15.4063 5.3125V2.125ZM11.1563 3.1875H14.3438V4.25H12.2188C11.3401 4.25 10.625 4.96506 10.625 5.84375V6.56944C10.2797 6.48709 9.92534 6.43025 9.5625 6.40209V4.78125C9.5625 3.90256 10.2776 3.1875 11.1563 3.1875ZM3.1875 13.286C3.21513 10.0608 5.83631 7.4375 9.03125 7.4375C12.2416 7.4375 14.8633 10.0597 14.875 13.2834C14.8808 14.8601 14.2752 16.3365 13.1692 17.4388C12.0679 18.5364 10.5873 19.1176 9.03497 19.125C7.43166 19.1138 5.94044 18.4907 4.8365 17.3692C3.75966 16.2759 3.17422 14.8261 3.1875 13.286ZM4.93266 18.8418C5.88094 19.5357 6.987 19.9761 8.17063 20.1253L5.91813 24.2553L5.27478 22.6472C5.18234 22.4156 4.94275 22.2812 4.69572 22.3199L2.63978 22.6557L4.93266 18.8418Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M18.4171 12.7502C18.5749 12.7502 18.7241 12.68 18.8251 12.5589L20.5957 10.4339L19.7797 9.75391L18.4171 11.3891L17.94 10.8164L17.124 11.4964L18.0096 12.5589C18.1095 12.68 18.2593 12.7502 18.4171 12.7502ZM18.4171 18.0627C18.5749 18.0627 18.7241 17.9925 18.8251 17.8719L20.5957 15.7469L19.7797 15.0669L18.4171 16.7021L17.94 16.1294L17.124 16.8094L18.0096 17.8719C18.1095 17.9925 18.2593 18.0627 18.4171 18.0627Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 10.0938H21.7812V11.1562H28.6875V10.0938Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 11.6875H21.7812V12.75H28.6875V11.6875Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 15.4062H21.7812V16.4688H28.6875V15.4062Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 17H21.7812V18.0625H28.6875V17Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M18.4171 23.3752C18.5749 23.3752 18.7241 23.305 18.8251 23.1844L20.5957 21.0594L19.7797 20.3789L18.4171 22.0141L17.94 21.4414L17.124 22.1219L18.0096 23.1844C18.1095 23.305 18.2593 23.3752 18.4171 23.3752ZM18.4171 28.6877C18.5749 28.6877 18.7241 28.6175 18.8251 28.4969L20.5957 26.3719L19.7797 25.6914L18.4171 27.3266L17.94 26.7539L17.124 27.4344L18.0096 28.4969C18.1095 28.6175 18.2593 28.6877 18.4171 28.6877Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 20.7188H21.7812V21.7812H28.6875V20.7188Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 22.3125H21.7812V23.375H28.6875V22.3125Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 26.0312H21.7812V27.0938H28.6875V26.0312Z"
                                fill="#153AC7"
                            />
                            <path
                                d="M28.6875 27.625H21.7812V28.6875H28.6875V27.625Z"
                                fill="#153AC7"
                            />
                        </svg>
                    </div>

                    <div>
                        <div className="font-bold text-xl">
                            {mocDetails?.detailHeader?.title}
                        </div>
                        <div className="text-gray-500">
                            {mocDetails?.detailHeader?.mocNo}
                        </div>
                    </div>

                    <div className="ml-auto flex flex-col items-end">
                        <StatusPill
                            className={statusStyle}
                            value={statusLabel}
                        />
                    </div>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-3 gap-7 mb-4 text-md">
                    {mocDetails?.detailHeader?.formData.map((item, index) =>
                        Object.entries(item)
                            .filter(([key]) => key !== "required")
                            .map(([key, value], subIndex) => (
                                <div
                                    className="grid grid-cols-12 gap-4"
                                    key={`moc-header-${index}-${subIndex}`}
                                >
                                    <div className="col-span-6 text-gray-500">
                                        {key}
                                    </div>
                                    <span className="col-span-6 font-medium">
                                        {String(value)}
                                    </span>
                                </div>
                            ))
                    )}

                    {/* <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 text-gray-500">Region:</div>
                        <span className="col-span-6 font-medium">
                            {currentPass.region}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 text-gray-500">Site:</div>
                        <span className="col-span-6 font-medium">
                            {currentPass.site}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 text-gray-500">
                            Start Date & Time:
                        </div>
                        <span className="col-span-6 font-medium">
                            {currentPass.startDate}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 text-gray-500">
                            End Date & Time:
                        </div>
                        <span className="col-span-6 font-medium">
                            {currentPass.endDate}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 text-gray-500">
                            Created By:
                        </div>
                        <span className="col-span-6 font-medium">
                            {currentPass.createdBy}
                        </span>
                    </div> */}
                </div>
            </Card>

            {/* Tabs */}
            <DefaultTab
                tabs={tabList}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Tab Content */}
            <div className="mt-5">
                {activeTab === "Details" && <ChangeRequiestDetails />}
                {activeTab === "Approvals" && <Approvals />}
                {activeTab === "Updates" && <Updates />}
                {activeTab === "Logs" && <Logs />}
            </div>
        </div>
    )
}
