import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"
import React, { useState } from "react"

const defaultData = [
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "00",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "01",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
    },
    {
        id: "02",
        module: "Daily Task",
        scheduled: 108,
        cancelled: 369,
        due: 579,
        completed: 1001,
        delayed: 222,
        missed: 44,
        completed_percentage: 88
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
    columnHelper.accessor("module", {
        header: () => <span className="text-center">Module</span>,
        cell: (info) => <span className="w-full">{info.getValue()}</span>,
        size: 440
    }),
    columnHelper.accessor("scheduled", {
        header: () => (
            <div className="text-center flex items-center gap-1">
                <div className=" rounded h-4 w-4 bg-blue-800" />
                Scheduled
            </div>
        ),
        cell: (info) => <span className="text-center">{info.getValue()}</span>,
        size: 140
    }),
    columnHelper.accessor("cancelled", {
        header: () => (
            <div className="text-center flex items-center gap-1">
                <div className=" rounded h-4 w-4 bg-red-800" />
                Cancelled
            </div>
        ),
        cell: (info) => <span className="text-center">{info.getValue()}</span>,
        size: 140
    }),
    columnHelper.accessor("due", {
        header: () => (
            <div className="text-center flex items-center gap-1">
                <div className=" rounded h-4 w-4 bg-red-500" />
                Due
            </div>
        ),
        cell: (info) => <span className="text-center">{info.getValue()}</span>,
        size: 140
    }),
    columnHelper.accessor("completed", {
        header: () => (
            <div className="text-center flex items-center gap-1">
                <div className=" rounded h-4 w-4 bg-green-500" />
                Completed
            </div>
        ),
        cell: (info) => <span className="text-center">{info.getValue()}</span>,
        size: 140
    }),

    columnHelper.accessor("delayed", {
        header: () => (
            <div className="text-center flex items-center gap-1">
                <div className=" rounded h-4 w-4 bg-amber-600" />
                Delayed
            </div>
        ),
        cell: (info) => <span className="text-center">{info.getValue()}</span>,
        size: 140
    }),
    columnHelper.accessor("missed", {
        header: () => (
            <div className="text-center flex items-center gap-1">
                <div className=" rounded h-4 w-4 bg-amber-400" />
                Missed
            </div>
        ),
        cell: (info) => <span className="text-center">{info.getValue()}</span>,
        size: 140
    }),
    columnHelper.accessor("completed_percentage", {
        header: () => (
            <div className="text-center flex items-center gap-1">
                % Complete
            </div>
        ),
        cell: (info) => <span className="text-center">{info.getValue()}</span>,
        size: 140
    })
]

const AnalyticsTableView = () => {
    const [data, _setData] = useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <div className="w-full mt-5 border h-96 overflow-y-auto rounded-lg">
            <table className="w-full ">
                <thead className=" border-b bg-slate-50 rounded-s-lg sticky top-0">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-slate-500 font-normal text-sm text-left py-2 pl-3"
                                    style={{
                                        width:
                                            header.getSize() === 150
                                                ? "100%"
                                                : header.getSize()
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
                <tbody className="text-sm h-full overflow-y-auto">
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b border-slate-100"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="py-2 pl-3 text-blue-950"
                                    style={{
                                        width: cell.column.getSize(),
                                        textAlign: "left"
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
        </div>
    )
}

export default AnalyticsTableView
