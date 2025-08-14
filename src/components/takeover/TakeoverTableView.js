"use client"

import { PROJECT_PATHNAME } from "@/config/constants"
import { findStatusColor } from "@/utils"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { EllipsisVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

import Modal from "../ui/overlays/Modal"

const columnHelper = createColumnHelper()

const columns = [
    {
        id: "srNo",
        header: "#",
        cell: ({ row }) => row.index + 1,
        size: 20,
        align: "center"
    },
    columnHelper.accessor("hotoId", {
        header: () => "HOTO ID",
        cell: (info) => info.getValue(),
        size: 200
    }),
    columnHelper.accessor("title", {
        header: () => "Title",
        cell: (info) => info.getValue(),
        size: 160
    }),
    columnHelper.accessor("city", {
        header: () => "City",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("site", {
        header: () => "Site",
        cell: (info) => info.getValue(),
        size: 100
    }),
    // columnHelper.accessor("calendar", {
    //     header: () => "Working Calendar",
    //     cell: (info) => info.getValue()
    // }),
    columnHelper.accessor("shiftTime", {
        header: () => "Shift",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("handoverBy", {
        header: () => "Handover By",
        cell: (info) => info.getValue(),
        size: 160
    }),
    columnHelper.accessor("takeoverBy", {
        header: () => "Takeover By",
        cell: (info) => info.getValue(),
        size: 160
    }),
    // columnHelper.accessor("handover_at", {
    //     header: () => "Handover At",
    //     cell: (info) => info.getValue(),
    //     size: 140
    // }),
    // columnHelper.accessor("takeover_at", {
    //     header: () => "Takeover At",
    //     cell: (info) => info.getValue(),
    //     size: 140
    // }),
    columnHelper.accessor("status", {
        header: () => "Status",

        cell: (info) => {
            const value = info.getValue()
            const colors = findStatusColor(value)
            const title = value.replace("_", " ").toLowerCase()
            return (
                <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold capitalize ${
                        colors?.tw_light_bg_color || ""
                    } ${colors?.tw_text_color || ""}`}
                >
                    {title}
                </span>
            )
        },
        size: 120
    }),
    columnHelper.display({
        id: "actions",
        header: () => <span className="mr-2">Actions</span>,
        cell: () => (
            <div className="flex items-center justify-center">
                <button className="p-2 bg-white text-slate-700 rounded-lg ">
                    <EllipsisVertical className="h-auto w-4" />
                </button>
            </div>
        ),
        size: 10
    })
]

const TakeoverTableView = ({ table_data }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8
    })

    const table = useReactTable({
        data: table_data,
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

    const router = useRouter()
    const [showFiltersModal, setShowFiltersModal] = useState(false)

    const [filters, setFilters] = useState({
        query: "",
        from_date: null,
        to_date: null,
        city: null,
        site: null,
        day: null
    })

    const closeModal = () => {
        setShowFiltersModal(false)
    }

    const handleFileChange = () => {
        setFilters({ ...filters, city: value })
    }
    return (
        <>
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
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table_data?.length > 0 &&
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-slate-100 hover:cursor-pointer"
                                onClick={() =>
                                    router.push(
                                        `${PROJECT_PATHNAME}/takeover-listing/${row.original.hotoId}`
                                    )
                                }
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
                    {/* {table.getPageOptions().map((page) => (
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
                        ))} */}
                </div>
            </div>
            <Modal
                isOpen={showFiltersModal}
                onClose={closeModal}
            ></Modal>
        </>
    )
}

export default TakeoverTableView
