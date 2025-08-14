"use client"

import { PROJECT_PATHNAME } from "@/config/constants"
import { STATUS } from "@/utils/constants"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

import InputField from "../ui/form/Input"
import SingleSelect from "../ui/form/SingleSelect"
import Modal from "../ui/overlays/Modal"
import StatusPill from "../ui/StatusPill"

const defaultData = [
    {
        id: "00",
        hoto_id: "UI UX Handover 1",
        meeting_name: "UI UX Handover 1",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-01",
        time: "2:30 PM - 4:00 PM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 2",
        meeting_name: "UI UX Handover 2",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-02",
        time: "1:00 PM - 2:30 PM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 3",
        meeting_name: "UI UX Handover 3",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-03",
        time: "3:00 PM - 4:30 PM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 4",
        meeting_name: "UI UX Handover 4",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-04",
        time: "10:00 AM - 11:30 AM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 5",
        meeting_name: "UI UX Handover 5",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-05",
        time: "9:00 AM - 10:30 AM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 6",
        meeting_name: "UI UX Handover 6",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-06",
        time: "5:00 PM - 6:30 PM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "-- --",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 7",
        meeting_name: "UI UX Handover 7",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-07",
        time: "11:00 AM - 12:30 PM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.CLOSED
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 8",
        meeting_name: "UI UX Handover 8",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-08",
        time: "8:00 AM - 9:30 AM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 9",
        meeting_name: "UI UX Handover 9",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-09",
        time: "4:00 PM - 5:30 PM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 10",
        meeting_name: "UI UX Handover 10",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-10",
        time: "6:00 PM - 7:30 PM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "",
        takeover_at: "18 Aug, 2024 6: 45 PM",
        status: STATUS.CLOSED
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 11",
        meeting_name: "UI UX Handover 11",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-11",
        time: "7:00 AM - 8:30 AM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "",
        takeover_at: "18 Aug, 2024 6: 45 PM",
        status: STATUS.OPEN
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 12",
        meeting_name: "UI UX Handover 12",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-12",
        time: "9:00 AM - 10:30 AM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.CLOSED
    },
    {
        id: "00",
        hoto_id: "UI UX Handover 13",
        meeting_name: "UI UX Handover 13",
        city: "Mumbai",
        site: "MUMNTT",
        date: "2021-06-13",
        time: "10:00 AM - 11:30 AM (1h 30 mins)",
        calendar: "File need to prepare for the period",
        shift: "Planned activity raised by BMM",
        handover_by: "Shanshank Sharma",
        handover_at: "18 Aug, 2024 6:45 PM",
        takeover_by: "Sarika Desai",
        takeover_at: "18 Aug, 2024 6:45 PM",
        status: STATUS.OPEN
    }
]

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor("id", {
        id: "id",
        header: () => "#",
        cell: (info) => (
            <span className="text-center pr-3">{info.getValue()}</span>
        ),
        size: 50
    }),
    columnHelper.accessor("hoto_id", {
        header: () => "HOTO ID",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("meeting_name", {
        header: () => "HOTO Name",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("handover_at", {
        header: () => "Created On",
        cell: (info) => info.getValue(),
        size: 80
    }),

    columnHelper.accessor("site", {
        header: () => "Topics",
        cell: (info) => info.getValue(),
        size: 80
    }),
    columnHelper.accessor("calendar", {
        header: () => "Description",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("shift", {
        header: () => "Comments / Related information to review:",
        cell: (info) => info.getValue(),
        size: 200
    }),
    columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => {
            const value = info.getValue()
            const { tw_light_bg_color, tw_text_color } =
                value === STATUS.OPEN
                    ? {
                          tw_light_bg_color: "bg-teal-50",
                          tw_text_color: "text-teal-600"
                      }
                    : value === STATUS.CLOSED
                    ? {
                          tw_light_bg_color: "bg-red-50",
                          tw_text_color: "text-red-700"
                      }
                    : {
                          tw_light_bg_color: "bg-yellow-100",
                          tw_text_color: "text-yellow-700"
                      }
            return (
                <StatusPill
                    className={`${tw_text_color} ${tw_light_bg_color}`}
                    value={value}
                />
            )
        },
        size: 80
    }),
    columnHelper.display({
        id: "actions",
        header: () => "Actions",
        cell: () => (
            <button className="px-4 py-2.5 bg-white text-slate-700 rounded-lg border flex ">
                View Details
            </button>
        ),
        size: 110
    })
]

const TaskTableView = () => {
    const [showFiltersModal, setShowFiltersModal] = useState(false)

    const [data, _setData] = useState(() => [...defaultData])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })
    const [filters, setFilters] = useState({
        query: "",
        from_date: "",
        to_date: "",
        city: "",
        site: "",
        day: ""
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        },
        defaultColumn: {
            size: 200, //starting column size
            minSize: 50, //enforced during column resizing
            maxSize: 500 //enforced during column resizing
        }
    })

    const closeModal = () => {
        setShowFiltersModal(false)
    }

    const handleFileChange = (event) => {
        setFilters({ ...filters })
    }
    return (
        <>
            <div className="rounded-lg bg-white">
                <div
                    className={
                        "flex w-full gap-x-3 bg-white p-4 rounded-lg h-20 place-items-center justify-between"
                    }
                >
                    <InputField
                        type="search"
                        placeholder="Search"
                        icon={() => (
                            <Search
                                className="w-4"
                                color="gray"
                            />
                        )}
                        className="!w-4/12 rounded-lg"
                        value={filters.query}
                        inputContainerStyle="!px-3 py-1"
                        onChange={() => {}}
                    />
                    <SingleSelect
                        selectStyle=" h-12 "
                        className="!w-1/12"
                        options={["Camplus 1", "Camplus 2"]}
                        value={filters.city}
                        onChange={(event) => {}}
                        placeholder={"City"}
                    />
                    <SingleSelect
                        selectStyle=" h-12 "
                        className="!w-1/12"
                        options={["Camplus 1", "Camplus 2"]}
                        value={filters.city}
                        onChange={(event) => {}}
                        placeholder={"Site"}
                    />
                    <SingleSelect
                        selectStyle=" h-12 "
                        className="!w-1/12"
                        options={["Camplus 1", "Camplus 2"]}
                        value={filters.city}
                        onChange={(event) => {}}
                        placeholder={"Day"}
                    />
                    <InputField
                        type="date"
                        inputContainerStyle="h-12"
                        className=" !w-2/12"
                        value={filters.from_date}
                        onChange={(e) => {}}
                        placeholder={"From Date*"}
                    />
                    <InputField
                        type="date"
                        className=" !w-2/12"
                        inputContainerStyle="h-12"
                        value={filters.to_date}
                        onChange={(e) => {}}
                        placeholder={"To Date*"}
                    />
                </div>
                <table className="w-full text-sm">
                    <thead className="border-b bg-slate-50 rounded-s-lg">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-slate-500 font-normal text-sm text-left py-2 pl-3"
                                        style={{
                                            width: `${header.getSize()}px`
                                        }}
                                    >
                                        {" "}
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-slate-100"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="py-2 pl-3"
                                        style={{
                                            width: `${cell.column.getSize()}px`
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center px-4 py-2">
                    {/* show first 3 page last 3 page and elippsis in between and blue color to active */}
                    <div className="flex gap-2">
                        {table.getPageOptions().map((page) => (
                            <button
                                key={page}
                                className={`px-4 py-2 rounded-lg ${
                                    page === pagination.pageIndex
                                        ? "bg-primary-100 text-white"
                                        : "bg-white text-slate-500"
                                }`}
                                onClick={() => table.setPageIndex(page)}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showFiltersModal}
                onClose={closeModal}
            ></Modal>
        </>
    )
}

export default TaskTableView
