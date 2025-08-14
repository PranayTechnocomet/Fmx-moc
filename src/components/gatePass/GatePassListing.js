"use client"

import { useState } from "react"
import Button from "../ui/Button"
import InputField from "../ui/form/Input"
import SingleSelect from "../ui/form/SingleSelect"
import StatusCard from "../ui/StatusCard"
import GatePassTable from "./GatePassTable"
import { CalendarDays, Info, Search, SearchIcon, X } from "lucide-react"
import Image from "next/image"
import { GATE_PASS_STATUS } from "@/utils/constants";
import SearchImage from "../../images/search.png";

export default function GatePassListing() {
    const [filters, setFilters] = useState({
        query: "",
        from_date: "",
        to_date: "",
        city: "",
        site: "",
        day: ""
    })
    const [filteredStatus, setFilteredStatus] = useState(null)
    const [cities] = useState(["Ahmedabad", "Surat", "Vadodara"])
    const [campuses, setCampuses] = useState([])
    const [sites, setSites] = useState([])

    const handleCityChange = (city) => {
        setFilters({ ...filters, city: city })
        if (city === "Ahmedabad") {
            setCampuses(["Campus A", "Campus B", "Campus C"])
        } else if (city === "Surat") {
            setCampuses(["Campus X", "Campus Y"])
        } else if (city === "Vadodara") {
            setCampuses(["Campus M", "Campus N"])
        }
        setSites([])
    }

    const handleCampusChange = (campus) => {
        setFilters({ ...filters, site: campus })
        if (campus === "Campus A") {
            setSites(["Site 1", "Site 2", "Site 3"])
        } else if (campus === "Campus B") {
            setSites(["Site 4", "Site 5"])
        } else if (campus === "Campus C") {
            setSites(["Site 6", "Site 7"])
        }
    }

    const [showSearchPopup, setShowSearchPopup] = useState(false)
    // Gate pass data array (moved from GatePassTable.js)
    const gatePassData = [
        {
            id: "00",
            mail_icon: "/mail/icons/mail-room-outward-package-icon.png",
            gate_pass_no: "Raheja/2024/102",
            site: "Empress",
            room_no: "Mail Room 101",
            date: "2021-06-01",
            time: "2:30 PM - 4:00 PM (1h 30 mins)",
            material_description: "Model 1",
            vendor_name: "Infotech",
            category: "Returnable",
            handover_at: "8 Apr, 2024 10:46:54",
            takeover_by: "Sarika Desai",
            return_date: "18 Aug, 2024",
            outward_receipt: "report",
            inward_receipt: "report",
            courier_service: "WhiteSR",
            status: GATE_PASS_STATUS.REJECTED
        },
        {
            id: "00",
            mail_icon: "/mail/icons/mail-room-Inward-package icon.png",
            gate_pass_no: "Raheja/2024/102",
            site: "Empress",
            room_no: "Mail Room 101",
            date: "2021-06-02",
            time: "1:00 PM - 2:30 PM (1h 30 mins)",
            material_description: "Model 1",
            vendor_name: "Infotech",
            category: "Returnable",
            handover_at: "8 Apr, 2024 10:46:54",
            takeover_by: "Sarika Desai",
            return_date: "18 Aug, 2024",
            outward_receipt: "report",
            inward_receipt: "report",
            courier_service: "WhiteSR",
            status: GATE_PASS_STATUS.RETURN_PENDING
        },
        {
            id: "00",
            mail_icon: "/mail/icons/mail-room-outward-package-icon.png",
            gate_pass_no: "Raheja/2024/102",
            site: "Empress",
            room_no: "Mail Room 101",
            date: "2021-06-03",
            time: "3:00 PM - 4:30 PM (1h 30 mins)",
            material_description: "Model 1",
            vendor_name: "Infotech",
            category: "Returnable",
            handover_at: "8 Apr, 2024 10:46:54",
            takeover_by: "Sarika Desai",
            return_date: "18 Aug, 2024",
            outward_receipt: "report",
            inward_receipt: "report",
            courier_service: "WhiteSR",
            status: GATE_PASS_STATUS.OVERDUE
        },
        {
            id: "00",
            mail_icon: "/mail/icons/mail-room-outward-package-icon.png",
            gate_pass_no: "Raheja/2024/102",
            site: "Empress",
            room_no: "Mail Room 101",
            date: "2021-06-03",
            time: "3:00 PM - 4:30 PM (1h 30 mins)",
            material_description: "Model 1",
            vendor_name: "Infotech",
            category: "Returnable",
            handover_at: "8 Apr, 2024 10:46:54",
            takeover_by: "Sarika Desai",
            return_date: "18 Aug, 2024",
            outward_receipt: "report",
            inward_receipt: "report",
            courier_service: "WhiteSR",
            status: GATE_PASS_STATUS.OVERDUE
        },
        {
            id: "00",
            mail_icon: "/mail/icons/mail-room-outward-package-icon.png",
            gate_pass_no: "Raheja/2024/102",
            site: "Empress",
            room_no: "Mail Room 101",
            date: "2021-06-03",
            time: "3:00 PM - 4:30 PM (1h 30 mins)",
            material_description: "Model 1",
            vendor_name: "Infotech",
            category: "Returnable",
            handover_at: "8 Apr, 2024 10:46:54",
            takeover_by: "Sarika Desai",
            return_date: "18 Aug, 2024",
            outward_receipt: "report",
            inward_receipt: "report",
            courier_service: "WhiteSR",
            status: GATE_PASS_STATUS.ACCEPTANCE_PENDING
        },
        {
            id: "00",
            mail_icon: "/mail/icons/mail-room-outward-package-icon.png",
            gate_pass_no: "Raheja/2024/102",
            site: "Empress",
            room_no: "Mail Room 101",
            date: "2021-06-03",
            time: "3:00 PM - 4:30 PM (1h 30 mins)",
            material_description: "Model 1",
            vendor_name: "Infotech",
            category: "Returnable",
            handover_at: "8 Apr, 2024 10:46:54",
            takeover_by: "Sarika Desai",
            return_date: "18 Aug, 2024",
            outward_receipt: "report",
            inward_receipt: "report",
            courier_service: "WhiteSR",
            status: GATE_PASS_STATUS.RETURN_PENDING
        },
        {
            id: "00",
            mail_icon: "/mail/icons/mail-room-outward-package-icon.png",
            gate_pass_no: "Raheja/2024/102",
            site: "Empress",
            room_no: "Mail Room 101",
            date: "2021-06-03",
            time: "3:00 PM - 4:30 PM (1h 30 mins)",
            material_description: "Model 1",
            vendor_name: "Infotech",
            category: "Returnable",
            handover_at: "8 Apr, 2024 10:46:54",
            takeover_by: "Sarika Desai",
            return_date: "18 Aug, 2024",
            outward_receipt: "report",
            inward_receipt: "report",
            courier_service: "WhiteSR",
            status: GATE_PASS_STATUS.REJECTED
        },
        // ... add the rest of your data here, or fetch from API
    ];

    // Status mapping for cards
    const statusCardConfig = [
        {
            status: "Total",
            color: "bg-primary-100",
            text: "text-primary-100",
            number: gatePassData.length,
            statusKey: null
        },
        {
            status: "My Approval Pending",
            color: "bg-orange-400",
            text: "text-orange-400",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.MY_APPROVAL_PENDING).length,
            statusKey: GATE_PASS_STATUS.MY_APPROVAL_PENDING
        },
        {
            status: "Approval Pending",
            color: "bg-yellow-500",
            text: "text-yellow-500",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.APPROVAL_PENDING).length,
            statusKey: GATE_PASS_STATUS.APPROVAL_PENDING
        },
        {
            status: "Rejected",
            color: "bg-red-400",
            text: "text-red-400",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.REJECTED).length,
            statusKey: GATE_PASS_STATUS.REJECTED
        },
        {
            status: "Return Pending",
            color: "bg-blue-400",
            text: "text-blue-400",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.RETURN_PENDING).length,
            statusKey: GATE_PASS_STATUS.RETURN_PENDING
        },
        {
            status: "Acceptance Pending",
            color: "bg-blue-600",
            text: "text-blue-600",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.ACCEPTANCE_PENDING).length,
            statusKey: GATE_PASS_STATUS.ACCEPTANCE_PENDING
        },
        {
            status: "Closed",
            color: "bg-gray-400",
            text: "text-gray-400",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.CLOSED).length,
            statusKey: GATE_PASS_STATUS.CLOSED
        },
        {
            status: "Draft",
            color: "bg-cyan-800",
            text: "text-cyan-800",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.DRAFT).length,
            statusKey: GATE_PASS_STATUS.DRAFT
        },
        {
            status: "Overdue",
            color: "bg-red-800",
            text: "text-red-800",
            number: gatePassData.filter(g => g.status === GATE_PASS_STATUS.OVERDUE).length,
            statusKey: GATE_PASS_STATUS.OVERDUE
        }
    ];

    const filteredData = filteredStatus ? gatePassData.filter(g => g.status === filteredStatus) : gatePassData;

    return (
        <>
         <div className="p-1 h-screen overflow-auto">
            <div
                className={
                    "flex w-full gap-x-0 bg-white p-2 rounded-lg h-20 place-items-center justify-between my-5"
                }
            >

                <div onClick={() => setShowSearchPopup(true)}>
                    <Image src={SearchImage} alt="Logo" height={200} width={200} className="h-12 w-auto cursor-pointer" />
                </div>
                {showSearchPopup && (
                    <div className="absolute top-44 left-10 z-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                            <div className="flex items-center border rounded-lg p-2">
                                <SearchIcon className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full outline-none"
                                    value={filters.query}
                                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                                />
                                <button
                                    className="text-gray-500"
                                    onClick={() => setShowSearchPopup(false)}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    </div>)}
                    
                <SingleSelect
                    selectStyle=" h-12 "
                    className="!w-1/12"
                    options={cities}
                    value={filters.city}
                    onChange={handleCityChange}
                    placeholder={"City"}
                />
                <SingleSelect
                    selectStyle=" h-12 "
                    className="!w-1/12"
                    options={campuses}
                    value={filters.site}
                    onChange={handleCampusChange}
                    placeholder={"Complex"}
                />
                <SingleSelect
                    selectStyle=" h-12 "
                    className="!w-1/12"
                    options={sites}
                    value={filters.site}
                    onChange={(event) => setFilters({ ...filters, site: event })}
                    placeholder={"Site"}
                />

                <InputField
                    type="date"
                    inputContainerStyle="h-12"
                    className=" !w-[150px]"
                    value={filters.from_date}
                    onChange={(e) => setFilters({ ...filters, from_date: e.target.value })}
                    placeholder="From Date*"
                    icon={CalendarDays}
                    iconposition="right"
                />
                <InputField
                    type="date"
                    className="!w-[150px]"
                    inputContainerStyle="h-12"
                    value={filters.to_date}
                    onChange={(e) => setFilters({ ...filters, to_date: e.target.value })}
                    placeholder={"To Date*"}
                    icon={CalendarDays}
                    iconposition="right"
                />
                <SingleSelect
                    selectStyle=" h-12 "
                    className="!w-1/12"
                    options={["Today", "Yesterday", "Last 7 Days"]}
                    value={filters.day}
                    onChange={(event) => setFilters({ ...filters, day: event })}
                    placeholder={"Today"}
                />
                <Button
                    size="sm"
                    variant="custom"
                    className="font-semibold text-gray-500 rounded-md whitespace-nowrap border-0"
                    onClick={() => {
                        setFilters({
                            query: "",
                            from_date: "",
                            to_date: "",
                            city: "",
                            site: "",
                            day: ""
                        })
                        setCampuses([])
                        setSites([])
                    }}
                >
                    Reset
                </Button>
                <Button size="sm" className="font-semibold text-gray-500 rounded-md whitespace-nowrap border-0">
                    Lock Filter
                </Button>
                <Button variant="secondary" className="">
                    More Filter
                </Button>
                <Button className="py-3 rounded-md bg-red-100 text-red-600 border-0">
                    <Info size={22} />
                </Button>

            </div>
            <div className="grid grid-cols-9 gap-3 mb-5 max-h-[300px]">
                {statusCardConfig.map((card, index) => (
                    <StatusCard
                        key={index}
                        title={card.status}
                        number={card.number}
                        onClick={() => setFilteredStatus(card.statusKey)}
                        strip_color={card.color}
                        title_color={filteredStatus === card.statusKey ? `font-bold ${card.text}` : `font-normal ${card.text}`}
                        cardStyles="h-22"
                    />
                ))}
            </div>

            <div className="gap-y-6 h-screen overflow-auto flex flex-col pt-2 ">
                <GatePassTable data={filteredData} />
            </div>
        </div>
    </>
    )
}
