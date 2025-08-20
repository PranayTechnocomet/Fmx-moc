"use client"
import { EllipsisVertical, EyeIcon } from "lucide-react"
import Button from "../Button"
import { formatDistanceToNow } from "date-fns"

export const RenderTableRow = ({
    row,
    col,
    colIndex,
    rowIndex,
    currentPage,
    actionModalIndex,
    setActionModalIndex,
    recordsPerPage,
    handleViewDetails
}) => {
    let cellValue = row.mocFormData[0][col.key]

    // ID Column
    if (col.key === "id") {
        cellValue = rowIndex + 1 + (currentPage - 1) * recordsPerPage
    }

    // Date Column
    if (col.type === "date" && row.mocFormData[0][col.key]) {
    console.log("row.mocFormData[0][col.key]", row.mocFormData[0][col.key]);
    
        cellValue = new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }).format(new Date(row.mocFormData[0][col.key]))
    }

    // Status Column
    if (col.type === "status") {
        return (
            <td
                className="p-3 text-xs text-nowrap"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="bg-[#FFFDF5] text-[#918243] px-2 py-1 rounded">
                        {row.statusText || "Pending"}
                    </span>
                    <span>
                        {row.createdAt &&
                            formatDistanceToNow(new Date(row.createdAt), {
                                addSuffix: true
                            })}
                    </span>
                </div>
            </td>
        )
    }

    // Action Column
    if (col.type === "action") {
        return (
            <td
                className="p-3 text-sm relative"
            >
                <EllipsisVertical
                    className="h-4 w-4 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation() // Prevents table row click from toggling other things
                        setActionModalIndex(
                            actionModalIndex === rowIndex ? null : rowIndex
                        )
                    }}
                />
                {actionModalIndex === rowIndex && (
                    <div className="absolute top-8 right-24 z-10 bg-white border rounded shadow w-40">
                        <div className="flex flex-col">
                            <button
                                className="p-2 hover:bg-gray-100 text-left flex items-center gap-2"
                                onClick={async () => {
                                    handleViewDetails(row)
                                    // await updateOrderDetails(order.orderUId, "DELIVERED");
                                    setActionModalIndex(null)
                                    // window.location.reload()
                                }}
                            >
                                <EyeIcon size={16} />
                                View Details
                            </button>
                            <button
                                className="p-2 hover:bg-gray-100 text-left flex items-center gap-2"
                                onClick={async () => {
                                    // await updateOrderDetails(order.orderUId, "CANCELLED");
                                    setActionModalIndex(null)
                                    // window.location.reload()
                                }}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.00008 8.20549L2.63046 12.5751C2.45826 12.7473 2.25736 12.8334 2.02776 12.8334C1.79815 12.8334 1.59725 12.7473 1.42505 12.5751C1.25285 12.4029 1.16675 12.202 1.16675 11.9724C1.16675 11.7428 1.25285 11.5419 1.42505 11.3697L5.79467 7.00008L1.42505 2.63046C1.25285 2.45826 1.16675 2.25736 1.16675 2.02776C1.16675 1.79815 1.25285 1.59725 1.42505 1.42505C1.59725 1.25285 1.79815 1.16675 2.02776 1.16675C2.25736 1.16675 2.45826 1.25285 2.63046 1.42505L7.00008 5.79467L11.3697 1.42505C11.5419 1.25285 11.7428 1.16675 11.9724 1.16675C12.202 1.16675 12.4029 1.25285 12.5751 1.42505C12.7473 1.59725 12.8334 1.79815 12.8334 2.02776C12.8334 2.25736 12.7473 2.45826 12.5751 2.63046L8.20549 7.00008L12.5751 11.3697C12.7473 11.5419 12.8334 11.7428 12.8334 11.9724C12.8334 12.202 12.7473 12.4029 12.5751 12.5751C12.4029 12.7473 12.202 12.8334 11.9724 12.8334C11.7428 12.8334 11.5419 12.7473 11.3697 12.5751L7.00008 8.20549Z"
                                        fill="#030037"
                                    />
                                </svg>
                                Cancel Moc
                            </button>
                        </div>
                    </div>
                )}
            </td>
        )
    }

    // Docs Column
    if (col.type === "doc") {
        return (
            <td
                className="p-3 text-sm"
            >
                <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                >
                    <EyeIcon size={16} />
                    Docs
                </Button>
            </td>
        )
    }

    // Default Cell
    return (
        <td
            className="p-3 text-sm"
        >
            {cellValue || "-"}
        </td>
    )
}
