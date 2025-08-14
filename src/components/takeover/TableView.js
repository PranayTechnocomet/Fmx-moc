"use client"

import { PROJECT_PATHNAME } from "@/config/constants"
import { findStatusColor } from "@/utils"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"
import { useRouter } from "next/navigation"

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor("status", {
        id: "id",
        header: "Sr.",
        cell: ({ row }) => {
            const { tw_bg_color } = findStatusColor(row.original.status)
            return (
                <div className="inline-flex gap-2 items-center">
                    <span className="text-center pr-3">{row.index + 1}.</span>
                    <div
                        className={`h-6 w-6 rounded-full ${tw_bg_color} text-xs text-white flex items-center justify-center`}
                    >
                        {row.original.status.charAt(0) +
                            row.original.status.charAt(9)}
                    </div>
                </div>
            )
        },
        size: 80
    }),
    columnHelper.accessor("title", {
        header: () => <div className="w-36">Shift</div>,
        cell: (info) => info.getValue(),
        size: 200
    }),
    columnHelper.accessor("handoverBy", {
        header: () => "Handover By",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("takeoverBy", {
        header: () => "Takeover By",
        cell: (info) => info.getValue()
    })
    // columnHelper.accessor("handoverAt", {
    //     header: () => "Handover At",
    //     cell: (info) => (
    //         <span className="inline-flex">
    //             {new Date(info.getValue()).toLocaleDateString("en-IN", {
    //                 day: "numeric",
    //                 month: "short",
    //                 year: "numeric"
    //             })}
    //             <br />
    //             {new Date(info.getValue()).toLocaleTimeString("en-IN", {
    //                 hour: "numeric",
    //                 minute: "numeric",
    //                 hour12: true
    //             })}
    //         </span>
    //     ),
    //     size: 110
    // }),
    // columnHelper.accessor("takeoverAt", {
    //     header: () => "Takeover At",
    //     cell: (info) => (
    //         <span className="inline-flex">
    //             {new Date(info.getValue()).toLocaleDateString("en-IN", {
    //                 day: "numeric",
    //                 month: "short",
    //                 year: "numeric"
    //             })}
    //             <br />
    //             {new Date(info.getValue()).toLocaleTimeString("en-IN", {
    //                 hour: "numeric",
    //                 minute: "numeric",
    //                 hour12: true
    //             })}
    //         </span>
    //     ),
    //     size: 110
    // })
]

const TableView = ({ table_data = [] }) => {
    const router = useRouter()
    const table = useReactTable({
        data: table_data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <div className="w-full h-full overflow-y-auto mt-3 relative rounded">
            <table className="w-full border rounded-lg">
                <thead className="border bg-slate-100 top-0 w-full sticky">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-slate-500 font-normal text-sm text-left py-2 pl-3"
                                    style={{
                                        width: header.getSize()
                                    }}
                                >
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
                <tbody className="text-sm">
                    {table_data.length > 0 ? (
                        <>
                            {table?.getRowModel().rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b border-b-slate-200 hover:cursor-pointer`}
                                    style={{
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "#ffffff"
                                                : "#f8f8f8"
                                    }}
                                    onClick={() =>
                                        router.push(
                                            `${PROJECT_PATHNAME}/new/${row.original.hotoConfigId}?ref=${row.original.hotoId}`
                                        )
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className={`pt-2 pl-3 text-blue-950`}
                                            style={{
                                                width: cell.column.getSize()
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
                        </>
                    ) : null}
                </tbody>
            </table>
        </div>
    )
}

export default TableView
