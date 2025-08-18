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
    recordsPerPage
}) => {
    let cellValue = row.mocFormData[0][col.key]

    // ID Column
    if (col.key === "id") {
        cellValue = rowIndex + 1 + (currentPage - 1) * recordsPerPage
    }

    // Date Column
    if (col.type === "date" && row.mocFormData[0][col.key]) {
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
                key={colIndex}
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
                key={colIndex}
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
                                    // await updateOrderDetails(order.orderUId, "RECEIVED");
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
                                        d="M12.5962 7.71422C12.4334 7.58885 12.2439 7.50275 12.0425 7.46262C11.841 7.4225 11.633 7.42943 11.4346 7.48289L9.14648 8.00898C9.19972 7.7841 9.20136 7.55009 9.15129 7.32449C9.10122 7.09888 9.00074 6.88754 8.85738 6.70629C8.71401 6.52504 8.53148 6.3786 8.32346 6.27793C8.11545 6.17726 7.88734 6.12498 7.65625 6.125H4.91859C4.68869 6.12442 4.46094 6.16941 4.24853 6.25736C4.03611 6.34532 3.84322 6.47449 3.68102 6.63742L2.44398 7.875H0.875C0.642936 7.875 0.420376 7.96719 0.256282 8.13128C0.0921872 8.29538 0 8.51794 0 8.75L0 10.9375C0 11.1696 0.0921872 11.3921 0.256282 11.5562C0.420376 11.7203 0.642936 11.8125 0.875 11.8125H6.5625C6.59827 11.8125 6.63391 11.8081 6.66859 11.7994L10.1686 10.9244C10.1909 10.9191 10.2127 10.9117 10.2337 10.9025L12.3594 9.99797L12.3834 9.98703C12.5877 9.88495 12.7627 9.73253 12.8918 9.54415C13.0209 9.35577 13.0999 9.13762 13.1214 8.91025C13.1429 8.68288 13.1062 8.45378 13.0147 8.24454C12.9232 8.03529 12.7799 7.85279 12.5984 7.71422H12.5962ZM0.875 8.75H2.1875V10.9375H0.875V8.75ZM12.0001 9.19899L9.92195 10.0838L6.50781 10.9375H3.0625V8.49352L4.30008 7.25648C4.38103 7.17488 4.47741 7.11018 4.58359 7.06615C4.68977 7.02212 4.80365 6.99963 4.91859 7H7.65625C7.8303 7 7.99722 7.06914 8.12029 7.19221C8.24336 7.31528 8.3125 7.4822 8.3125 7.65625C8.3125 7.8303 8.24336 7.99722 8.12029 8.12029C7.99722 8.24336 7.8303 8.3125 7.65625 8.3125H6.125C6.00897 8.3125 5.89769 8.35859 5.81564 8.44064C5.73359 8.52269 5.6875 8.63397 5.6875 8.75C5.6875 8.86603 5.73359 8.97731 5.81564 9.05936C5.89769 9.14141 6.00897 9.1875 6.125 9.1875H7.875C7.90793 9.18741 7.94075 9.18374 7.97289 9.17656L11.637 8.33383L11.6539 8.32945C11.7658 8.2984 11.8851 8.30981 11.9891 8.36149C12.093 8.41317 12.1742 8.50146 12.217 8.60938C12.2597 8.7173 12.2611 8.83722 12.2207 8.94607C12.1804 9.05492 12.1012 9.145 11.9984 9.19899H12.0001ZM8.44047 4.24703C8.35838 4.16494 8.31226 4.0536 8.31226 3.9375C8.31226 3.8214 8.35838 3.71006 8.44047 3.62797C8.52256 3.54588 8.6339 3.49976 8.75 3.49976C8.8661 3.49976 8.97744 3.54588 9.05953 3.62797L10.0625 4.63148V1.3125C10.0625 1.19647 10.1086 1.08519 10.1906 1.00314C10.2727 0.921094 10.384 0.875 10.5 0.875C10.616 0.875 10.7273 0.921094 10.8094 1.00314C10.8914 1.08519 10.9375 1.19647 10.9375 1.3125V4.63148L11.9405 3.62797C12.0226 3.54588 12.1339 3.49976 12.25 3.49976C12.3661 3.49976 12.4774 3.54588 12.5595 3.62797C12.6416 3.71006 12.6877 3.8214 12.6877 3.9375C12.6877 4.0536 12.6416 4.16494 12.5595 4.24703L10.8095 5.99703C10.7689 6.03771 10.7206 6.06998 10.6675 6.09199C10.6144 6.11401 10.5575 6.12534 10.5 6.12534C10.4425 6.12534 10.3856 6.11401 10.3325 6.09199C10.2794 6.06998 10.2311 6.03771 10.1905 5.99703L8.44047 4.24703Z"
                                        fill="#030037"
                                    />
                                </svg>
                                Received
                            </button>
                            <button
                                className="p-2 hover:bg-gray-100 text-left flex items-center gap-2"
                                onClick={async () => {
                                    // await updateOrderDetails(order.orderUId, "DELIVERED");
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
                                        d="M4.32199 10.2415L1.42256 7.34206C1.09669 7.01619 0.570277 7.01619 0.244405 7.34206C-0.0814682 7.66793 -0.0814682 8.19434 0.244405 8.52022L3.73709 12.0129C4.06297 12.3388 4.58938 12.3388 4.91525 12.0129L13.7556 3.17256C14.0815 2.84669 14.0815 2.32028 13.7556 1.9944C13.4297 1.66853 12.9033 1.66853 12.5774 1.9944L4.32199 10.2415Z"
                                        fill="#030037"
                                    />
                                </svg>
                                Delivered
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
                                Cancelled
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
                key={colIndex}
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
            key={colIndex}
            className="p-3 text-sm"
        >
            {cellValue || "-"}
        </td>
    )
}
