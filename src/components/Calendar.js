"use client"

import {
    useGetAllTurnoversMutation,
    useGetDropdownValuesMutation
} from "@/redux/api/hotoApi"
import { StatusToShow, monthNameToIndex, upperSnakeToCamel } from "@/utils"
import {
    SHIFT_TURNOVER_STATUSES,
    SHIFT_TURNOVER_STATUSES_COLORS
} from "@/utils/constants"
import {
    ChevronLeft,
    ChevronRight,
    Download,
    DownloadIcon,
    FilterIcon,
    Info
} from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import MonthView from "./takeover/MonthView"
import TableView from "./takeover/TableView"
import Button from "./ui/Button"
import Card from "./ui/Card"
import MultiSelect from "./ui/form/MultiSelect"
import SingleSelect from "./ui/form/SingleSelect"
import Modal from "./ui/overlays/Modal"
import Popover from "./ui/overlays/Popover"
import StatusCard from "./ui/StatusCard"
import VerticalTabsFilter from "./ui/VerticalTabsFilter"

export default function Calendar() {
    const currentDate = new Date()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(currentDate)

    const [filters, setFilters] = useState({
        status: []
    })

    const [getAllTOForms, { isLoading, data: pageData, isError, error }] =
        useGetAllTurnoversMutation()

    const [shiftDepartments, setShiftDepartments] = useState([])

    const [getDropdownValues, { data: departmentsList }] =
        useGetDropdownValuesMutation()

    useEffect(() => {
        getDropdownValues().unwrap()
    }, [])

    useEffect(() => {
        const filterObj = {}
        // add status only if its greater than one
        if (filters.status.length > 0) {
            filterObj.status = filters.status
        }
        if (filters.departments?.length > 0) {
            filterObj.departments = filters.departments
        }
        if (filters.client) {
            filterObj.client = filters.client
        }
        if (filters.city) {
            filterObj.city = filters.city
        }
        if (filters.cluster) {
            filterObj.cluster = filters.cluster
        }
        if (filters.site) {
            filterObj.site = filters.site
        }

        // Get the ISO date string ("yyyy-mm-dd")
        const isoString = selectedDate.toISOString().split("T")[0]

        // Split into [year, month, day]
        const [year, month, day] = isoString.split("-")

        // Rearrange to "dd-mm-yyyy"
        const formattedDate = `${day}-${month}-${year}`

        getAllTOForms({
            ...filterObj,
            date: formattedDate
        }).unwrap()
    }, [selectedDate, filters])

    const handleDayClick = (data) => {
        const year = new Date().getFullYear() // Replace with specific year if needed
        const monthIndex = monthNameToIndex(data.month)
        const day = data.date

        const dateObject = new Date(year, monthIndex, day)
        setSelectedDate(dateObject)
    }

    const handleFilterStatus = (status) => {
        setFilters({
            ...filters,
            status
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error || "Something went wrong"}</div>
    }

    return (
        <>
            <div className="rounded-lg flex flex-col h-full mt-2 gap-4">
                <div className="bg-white py-2 px-2.5 shadow rounded-lg flex gap-3 items-center">
                    <SingleSelect
                        options={[]}
                        disabled
                        placeholder="Client"
                    />
                    <SingleSelect
                        options={[]}
                        disabled
                        placeholder="City"
                    />
                    <SingleSelect
                        options={[]}
                        disabled
                        placeholder="Cluster"
                    />
                    <SingleSelect
                        options={[]}
                        disabled
                        placeholder="Site"
                    />
                    <Popover
                        trigger={
                            <div className="bg-primary-50 grid place-items-center rounded-lg p-2.5 mt-0.5">
                                <Info className="stroke-primary-100 h-6 w-6" />
                            </div>
                        }
                        position="bottom"
                    >
                        {`Note: By default you are viewing 'Return for Edit' irrespective of filter selection`}
                    </Popover>

                    <Button
                        variant="primary"
                        type="button"
                        className="inline-flex min-w-fit items-center rounded-lg "
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FilterIcon size={20} />
                        More Filter
                    </Button>
                    <Button
                        variant="secondary"
                        className="inline-flex items-center rounded-lg"
                        onClick={() => toast.info("Coming Soon!")}
                    >
                        <DownloadIcon size={16} />
                        Export
                    </Button>
                </div>
                <div className="flex gap-4">
                    {SHIFT_TURNOVER_STATUSES_COLORS.map((item) => {
                        const upperSnakeToCamelStatus = upperSnakeToCamel(
                            item.status
                        )
                        const num =
                            pageData?.data.counts[upperSnakeToCamelStatus] || 0
                        const cardStyles =
                            filters.status.length === 0
                                ? ""
                                : filters.status.includes(item.status)
                                ? item.tw_border_color
                                : "opacity-40"
                        const title = StatusToShow(item.status)

                        return (
                            <StatusCard
                                key={item.status}
                                number={num}
                                title={title}
                                strip_color={item.tw_bg_color}
                                title_color={item.tw_text_color}
                                cardStyles={cardStyles}
                                onClick={() => {
                                    const status =
                                        filters.status.length >= 1 &&
                                        filters.status.includes(item.status)
                                            ? []
                                            : filters.status.length > 1
                                            ? filters.status.filter(
                                                  (e) => item.status !== e
                                              )
                                            : [item.status]
                                    handleFilterStatus(status)
                                }}
                            />
                        )
                    })}
                </div>
                <div className="flex gap-4 flex-1 pb-20 overflow-hidden">
                    <Card className="flex flex-col w-1/2 bg-white rounded-lg px-3 h-full overflow-hidden">
                        <div className="border-b pb-2 -mt-6">
                            <div className="flex items-center justify-between w-full">
                                <div className="space-x-3 flex items-center">
                                    <button
                                        onClick={() => {
                                            setSelectedDate(
                                                new Date(
                                                    selectedDate.getFullYear(),
                                                    selectedDate.getMonth() - 1,
                                                    selectedDate.getDate()
                                                )
                                            )
                                        }}
                                        className="p-1 rounded-full hover:bg-gray-200"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <h2 className="font-semibold text-base">
                                        {selectedDate.toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            }
                                        )}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setSelectedDate(
                                                new Date(
                                                    selectedDate.getFullYear(),
                                                    selectedDate.getMonth() + 1,
                                                    selectedDate.getDate()
                                                )
                                            )
                                        }}
                                        className="p-1 rounded-full hover:bg-gray-200"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <Button
                                    variant="secondary"
                                    onClick={() => setSelectedDate(new Date())}
                                    className="p-1 hover:bg-gray-200 font-semibold rounded-lg"
                                >
                                    Today
                                </Button>
                            </div>
                        </div>

                        <MonthView
                            selectedDate={selectedDate}
                            handleDayClick={handleDayClick}
                        />
                    </Card>
                    <Card
                        className={
                            "flex flex-col w-1/2 p-2.5 h-full overflow-hidden bg-red-500"
                        }
                        title={
                            <span className="text-black text-sm">
                                {`Shifts of 
                            ${selectedDate.toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "2-digit"
                            })}`}
                            </span>
                        }
                        rightComponent={
                            <div className="flex gap-2 items-baseline w-3/4">
                                <MultiSelect
                                    options={shiftDepartments}
                                    value={[]}
                                    onChange={(value) =>
                                        setFilters({
                                            ...filters,
                                            departments: value
                                        })
                                    }
                                    className="w-full"
                                    placeholder="Dept."
                                />
                                <MultiSelect
                                    options={Object.keys(
                                        SHIFT_TURNOVER_STATUSES
                                    ).map((key) => ({
                                        value: SHIFT_TURNOVER_STATUSES[key],
                                        label: key
                                            .replaceAll("_", " ")
                                            .toLocaleLowerCase()
                                    }))}
                                    value={filters.status}
                                    onChange={(selected) =>
                                        handleFilterStatus(
                                            selected.map((e) => e.value)
                                        )
                                    }
                                    placeholder="Statuses"
                                    className="w-full capitalize"
                                />
                                {/* <SearchIcon className="w-12 h-auto text-slate-500" /> */}
                                <Button
                                    variant="secondary"
                                    className={"flex items-center"}
                                    onClick={() => toast.info("Coming Soon!")}
                                >
                                    <Download className="w-4 h-auto" />
                                    Export
                                </Button>
                            </div>
                        }
                    >
                        {/* <InputField
                        type="search"
                        placeholder="Search"
                        icon={() => (
                            <Search
                                className="w-4"
                                color="gray"
                            />
                        )}
                        className="w-full rounded-lg mt-2 mb-1"
                        value={""}
                        inputContainerStyle="!px-3 py-0"
                        onChange={() => {}}
                    /> */}
                        <TableView table_data={pageData?.data?.data} />
                    </Card>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <VerticalTabsFilter
                    values={[
                        {
                            label: "departments",
                            options: departmentsList?.data.departments || [],
                            selected: shiftDepartments
                        }
                    ]}
                    filters={filters}
                    onCancel={() => setIsModalOpen(false)}
                    onApply={(moreFilter) => {
                        setFilters((prev) => {
                            return {
                                ...prev,
                                ...moreFilter
                            }
                        })
                        setShiftDepartments(moreFilter.departments)
                        setIsModalOpen(false)
                    }}
                    onReset={() => {
                        setFilters({
                            departments: [],
                            status: []
                        })
                        setIsModalOpen(false)
                    }}
                />
            </Modal>
        </>
    )
}
