"use client"

import TakeoverTableView from "@/components/takeover/TakeoverTableView"
import Button from "@/components/ui/Button"
import InputField from "@/components/ui/form/Input"
import SingleSelect from "@/components/ui/form/SingleSelect"
import Modal from "@/components/ui/overlays/Modal"
import Popover from "@/components/ui/overlays/Popover"
import StatusCard from "@/components/ui/StatusCard"
import VerticalTabsFilter from "@/components/ui/VerticalTabsFilter"
import {
    useGetDropdownValuesMutation,
    useGetTakeoversMutation
} from "@/redux/api/hotoApi"
import {
    StatusToShow,
    findStatusColor,
    formatStringToUpperSnakeCase
} from "@/utils"
import { DownloadIcon, FilterIcon, Info, Search } from "lucide-react"
import { useEffect, useState } from "react"

const TAKEOVER_FILTER_OPTIONS = {
    ALL: "For All",
    PENDING: "Pending",
    USER: "For Me"
}

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filters, setFilters] = useState({
        status: TAKEOVER_FILTER_OPTIONS.ALL
    })

    const [getTakeovers, { data, isError, error, isLoading }] =
        useGetTakeoversMutation()

    const [shiftDepartments, setShiftDepartments] = useState([])

    const [getDropdownValues, { data: departmentsList }] =
        useGetDropdownValuesMutation()

    useEffect(() => {
        getDropdownValues().unwrap()
    }, [])

    useEffect(() => {
        getTakeovers().unwrap()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error || "Something went wrong"}</div>
    }

    return (
        <>
            <div className="bg-white py-2 mt-2 px-2.5 shadow rounded-lg flex gap-3 items-center">
                <SingleSelect
                    options={[]}
                    placeholder="Client"
                />
                <SingleSelect
                    options={[]}
                    placeholder="City"
                />
                <SingleSelect
                    options={[]}
                    placeholder="Cluster"
                />
                <SingleSelect
                    options={[]}
                    placeholder="Site"
                />
                <SingleSelect
                    options={[]}
                    placeholder="Day"
                />
                <InputField
                    type="date"
                    placeholder="From Date *"
                    className="w-full"
                />
                <InputField
                    type="date"
                    placeholder="Till Date *"
                    className="w-full"
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
                >
                    <DownloadIcon size={16} />
                    Export
                </Button>
            </div>
            <div className="flex gap-x-5 my-4">
                {Object.keys(data?.data?.counts || {}).map((key, index) => {
                    const formatted_status = formatStringToUpperSnakeCase(key)
                    const status = findStatusColor(formatted_status)
                    const title = StatusToShow(formatted_status)
                    const count = data?.data?.counts[key] || 0
                    return (
                        <StatusCard
                            key={index}
                            title={title}
                            number={count}
                            onClick={() => {}}
                            strip_color={status?.tw_bg_color}
                            title_color={status?.tw_text_color}
                            cardStyles="h-20"
                        />
                    )
                })}
            </div>
            <div className="gap-y-4 h-screen overflow-y-hidden flex flex-col pt-4 bg-white rounded-lg mb-3 shadow-lg">
                <div className="px-4 space-x-2 flex gap-3 justify-stretch items-center">
                    <div className="w-full">
                        {Object.values(TAKEOVER_FILTER_OPTIONS).map((e) => (
                            <button
                                className={`${
                                    filters.status === e
                                        ? "bg-primary-100 text-white"
                                        : " text-slate-500"
                                } rounded-lg py-1.5 px-4 text-sm font-semibold`}
                                key={e}
                                onClick={() => setFilters(e)}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                    <InputField
                        type="search"
                        placeholder="Search"
                        icon={() => (
                            <Search
                                className="w-4"
                                color="gray"
                            />
                        )}
                        className="!w-full rounded-lg"
                        value={filters.query}
                        inputContainerStyle="!px-3 py-1"
                        onChange={() => {}}
                    />
                    <SingleSelect
                        options={[
                            {
                                value: 2,
                                label: 2
                            },
                            {
                                value: 1,
                                label: 1
                            }
                        ]}
                        className="w-full"
                        selectStyle="h-12 py-2 px-3"
                        placeholder="Working Calendar"
                    />
                </div>
                <TakeoverTableView table_data={data?.data?.data} />
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <VerticalTabsFilter
                    values={[]}
                    onCancel={() => setIsModalOpen(false)}
                    onApply={(moreFilter) => {
                        setFilters((prev) => {
                            return {
                                ...prev,
                                ...moreFilter
                            }
                        })
                        setIsModalOpen(false)
                    }}
                    onReset={() => {
                        setFilters({
                            departments: [],
                            status: [],
                            date: new Date()
                        })
                        setIsModalOpen(false)
                    }}
                />
            </Modal>
        </>
    )
}
