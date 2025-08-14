import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"
import { Download, EllipsisVertical, Info, Pencil, Trash2 } from "lucide-react"

import Popover from "../ui/overlays/Popover"

const columnHelper = createColumnHelper()

// Reusable Table Component
const UserListForModule = ({
    columns = [
        columnHelper.accessor("Sr.no", {
            id: "id",
            header: "Sr.no",
            cell: ({ row }) => {
                const tw_bg_color = "bg-blue-50"
                return (
                    <div className="inline-flex gap-4 items-center">
                        <div
                            className={
                                "w-10 h-10 rounded-full inline-flex items-center justify-center text-primary-100 " +
                                tw_bg_color
                            }
                        ></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-700">
                                {row.original.file_name
                                    ? row.original.file_name
                                    : row.original.folder_name}
                            </span>
                            {row.original.size}
                        </div>
                    </div>
                )
            }
        }),

        columnHelper.accessor("last_modified", {
            header: () => "Last Modified",
            cell: (info) => info.getValue().split("T")[0],
            align: "center",
            size: 50
        })
    ],
    data,
    onAction
}) => {
    const handleAction = (action, document) => {
        onAction?.(action, document)
    }

    const ActionMenu = ({ document }) => (
        <Popover
            trigger={
                <button className="w-full h-full cursor-pointer">
                    <EllipsisVertical
                        className="w-4"
                        color="grey"
                    />
                </button>
            }
            position="bottom"
        >
            <div className="flex flex-col w-40">
                <button
                    className="p-2 hover:bg-gray-100 text-left flex items-center gap-2"
                    onClick={() => handleAction("details", document)}
                >
                    <Info className="w-4" />
                    Show Details
                </button>
                <button
                    className="p-2 hover:bg-gray-100 text-left flex items-center gap-2"
                    onClick={() => handleAction("download", document)}
                >
                    <Download className="w-4" />
                    Download
                </button>

                {document.permission === "manage" && (
                    <button
                        className="p-2 hover:bg-gray-100 text-left flex items-center gap-2 text-red-600"
                        onClick={() => handleAction("delete", document)}
                    >
                        <Trash2 className="w-4" />
                        Delete
                    </button>
                )}
            </div>
        </Popover>
    )

    // Update the columns to use the ActionMenu
    const columnsWithActions = columns.map((col) => {
        if (col.accessorKey === "takeoverAt") {
            return {
                ...col,
                cell: ({ row }) => <ActionMenu document={row.original} />
            }
        }
        return col
    })

    const table = useReactTable({
        data,
        columns: columnsWithActions,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            size: 100
        }
    })

    return (
        <div className="w-full h-full overflow-auto border rounded-lg mt-6">
            <table className="w-full border-collapse min-w-full table-fixed">
                <thead className="sticky top-0 z-10 bg-slate-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="border-b"
                        >
                            {headerGroup.headers.map((header, index) => {
                                const isFirstColumn = index === 0
                                const isLastThreeColumns =
                                    index >= columns.length - 3
                                const isActionColumn =
                                    index === columns.length - 1

                                let width
                                if (isFirstColumn) {
                                    width = "70%"
                                } else if (isLastThreeColumns) {
                                    width = isActionColumn ? "6%" : "12%"
                                }

                                return (
                                    <th
                                        key={header.id}
                                        className="text-slate-500 font-normal text-xs"
                                        style={{
                                            width,
                                            padding: isFirstColumn
                                                ? "8px 8px 8px 24px"
                                                : "8px",
                                            textAlign:
                                                header.column.columnDef.align ||
                                                "left"
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="text-sm bg-white">
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b hover:bg-gray-50 bg-white "
                        >
                            {row.getVisibleCells().map((cell, index) => {
                                const isFirstColumn = index === 0
                                const isLastThreeColumns =
                                    index >= columns.length - 3
                                const isActionColumn =
                                    index === columns.length - 1

                                let width
                                if (isFirstColumn) {
                                    width = "70%"
                                } else if (isLastThreeColumns) {
                                    width = isActionColumn ? "6%" : "12%"
                                }

                                return (
                                    <td
                                        key={cell.id}
                                        style={{
                                            width,
                                            padding: isFirstColumn
                                                ? "16px 8px 16px 24px"
                                                : "16px 8px",
                                            textAlign:
                                                cell.column.columnDef.align ||
                                                "left"
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserListForModule
