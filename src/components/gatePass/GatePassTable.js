"use client"
import { PROJECT_PATHNAME } from "@/config/constants"
// import { MAIL_TYPE } from "@/utils/constants"
// import upload from "../../../public/icons/upload.png"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { CalendarDays, FileText } from "lucide-react"
import React, { useEffect, useState } from "react"

import Modal from "../ui/overlays/Modal"
import StatusPill from "../ui/StatusPill"
import Button from "../ui/Button"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { GATE_PASS_STATUS } from "@/utils/constants"



const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor("id", {
        id: "id",
        header: () => "#",
        cell: (info) => (
            <span className="text-center pr-3">{info.getValue()}</span>
        ),
        size: 30
    }),
    // columnHelper.accessor("mail_type", {
    //     header: () => "Mail Type",
    //     cell: (info) => info.getValue(),
    //     size: 100
    // }),
    // columnHelper.accessor("mail_type", {
    //     header: () => "Mail Type",
    //     cell: (info) => {
    //         const value = info.getValue()
    //         const { tw_light_bg_color, tw_text_color } =
    //             value === MAIL_TYPE.INWARD_PACKAGE
    //                 ? {
    //                     tw_light_bg_color: "bg-[#F3F4FB]",
    //                     tw_text_color: "text-[#7E63A7]"
    //                 }
    //                 : value === MAIL_TYPE.OUTWARD_PACKAGE
    //                     ? {
    //                         tw_light_bg_color: "bg-[#F3F4FB]",
    //                         tw_text_color: "text-[#6296BC]"
    //                     }
    //                     : value === MAIL_TYPE.INTERNAL_TRANSFER
    //                         ? {
    //                             tw_light_bg_color: "bg-[#F3F4FB]",
    //                             tw_text_color: "text-[#27ACB4]"
    //                         }
    //                         : {
    //                             tw_light_bg_color: "bg-yellow-100",
    //                             tw_text_color: "text-yellow-700"
    //                         }
    //         return (
    //             <>
    //                 <div className="flex items-center gap-2">
    //                     <Image
    //                         src={info.row.original.mail_icon}
    //                         alt="mail"
    //                         width={8}
    //                         height={8}
    //                         className="w-6 h-6"
    //                     />
    //                     <StatusPill
    //                         className={`${tw_text_color} ${tw_light_bg_color}`}
    //                         value={value}
    //                     />
    //                 </div>
    //             </>
    //         )
    //     },
    //     size: 100
    // }),
    columnHelper.accessor("gate_pass_no", {
        header: () => "Gate Pass No.",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("handover_at", {
        header: () => "Date & Time",
        cell: (info) => info.getValue(),
        size: 100
    }),

    columnHelper.accessor("site", {
        header: () => "Site",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("material_description", {
        header: () => "Material Description",
        cell: (info) => info.getValue(),
        size: 150
    }),
    columnHelper.accessor("vendor_name", {
        header: () => "Vendor Name",
        cell: (info) => info.getValue(),
        size: 150
    }),
    columnHelper.accessor("category", {
        header: () => "Category",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("return_date", {
        header: () => "Return Date",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("outward_receipt", {
        header: () => "Outward Gate Pass Receipt",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <Button variant="secondary" className='font-semibold rounded-lg flex items-center justify-center'>
                    <FileText size={16} />
                    {info.getValue()}
                </Button>
            </div>
        ),
        size: 30
    }),
    columnHelper.accessor("inward_receipt", {
        header: () => "Inward Gate Pass Receipt",
        cell: (info) => (
            <div className="flex items-center gap-2">
                <Button variant="custom" className='bg-gray-50 text-gray-400 font-semibold border-0 rounded-lg flex items-center '><FileText size={16} /> {info.getValue()}</Button>

            </div>),
        size: 30
    }),

    columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => {
            const value = info.getValue()
            const { tw_light_bg_color, tw_text_color } =
                value === GATE_PASS_STATUS.MY_APPROVAL_PENDING
                    ? {
                        tw_light_bg_color: "bg-orange-40",
                        tw_text_color: "text-orange-400"
                    }
                    : value === GATE_PASS_STATUS.APPROVAL_PENDING
                        ? {
                            tw_light_bg_color: "bg-blue-50",
                            tw_text_color: "text-blue-500"
                        }
                        : value === GATE_PASS_STATUS.REJECTED
                            ? {
                                tw_light_bg_color: "bg-red-50",
                                tw_text_color: "text-red-400"
                            }
                            : value === GATE_PASS_STATUS.RETURN_PENDING
                                ? {
                                    tw_light_bg_color: "bg-purple-50",
                                    tw_text_color: "text-purple-500"
                                }
                                : value === GATE_PASS_STATUS.ACCEPTANCE_PENDING
                                    ? {
                                        tw_light_bg_color: "bg-teal-50",
                                        tw_text_color: "text-teal-500"
                                    }
                                    : value === GATE_PASS_STATUS.CLOSED
                                        ? {
                                            tw_light_bg_color: "bg-green-50",
                                            tw_text_color: "text-green-500"
                                        }
                                        : value === GATE_PASS_STATUS.DRAFT
                                            ? {
                                                tw_light_bg_color: "bg-gray-50",
                                                tw_text_color: "text-gray-500"
                                            }
                                            : value === GATE_PASS_STATUS.OVERDUE
                                                ? {
                                                    tw_light_bg_color: "bg-red-50",
                                                    tw_text_color: "text-red-500"
                                                }
                                                : {
                                                    tw_light_bg_color: "bg-yellow-100",
                                                    tw_text_color: "text-yellow-700"
                                                }
            return (
                <>
                    <div className="flex flex-col items-start gap-2">
                        <StatusPill
                            className={`${tw_text_color} ${tw_light_bg_color}`}
                            value={value}
                        />
                        <div className="flex items-center gap-1">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_4_6269)">
                                    <path
                                        d="M7.65742 8.45356C7.75392 8.55971 7.87696 8.61037 8.02654 8.60555C8.17612 8.60072 8.30398 8.54524 8.41013 8.43908C8.53558 8.32328 8.59831 8.18818 8.59831 8.03378C8.59831 7.87937 8.54041 7.75392 8.42461 7.65742L6.5573 5.77563V3.45959C6.5573 3.32449 6.50905 3.20627 6.41255 3.10495C6.31604 3.00362 6.19059 2.95296 6.03619 2.95296C5.89144 2.95296 5.7684 3.00362 5.66707 3.10495C5.56574 3.20627 5.51508 3.32931 5.51508 3.47407V5.99276C5.51508 6.06031 5.52714 6.12786 5.55127 6.19542C5.57539 6.26297 5.61641 6.33052 5.67431 6.39807L7.65742 8.45356ZM5.99276 12C5.1725 12 4.39807 11.8432 3.66948 11.5296C2.94089 11.2159 2.30398 10.7865 1.75875 10.2413C1.21351 9.69602 0.784077 9.06152 0.470446 8.33776C0.156815 7.61399 0 6.83715 0 6.00724C0 5.18697 0.156815 4.41255 0.470446 3.68396C0.784077 2.95537 1.21351 2.31846 1.75875 1.77322C2.30398 1.22799 2.94089 0.79614 3.66948 0.477684C4.39807 0.159228 5.1725 0 5.99276 0C6.81303 0 7.58746 0.159228 8.31604 0.477684C9.04463 0.79614 9.68154 1.22799 10.2268 1.77322C10.772 2.31846 11.2039 2.95537 11.5223 3.68396C11.8408 4.41255 12 5.18697 12 6.00724C12 6.8275 11.8408 7.60193 11.5223 8.33052C11.2039 9.05911 10.772 9.69602 10.2268 10.2413C9.68154 10.7865 9.04704 11.2159 8.32328 11.5296C7.59952 11.8432 6.82268 12 5.99276 12ZM5.99276 10.8565C7.32449 10.8565 8.46562 10.3836 9.41616 9.43788C10.3667 8.49216 10.842 7.34861 10.842 6.00724C10.842 4.67551 10.3667 3.53438 9.41616 2.58384C8.46562 1.63329 7.32449 1.15802 5.99276 1.15802C4.66104 1.15802 3.5199 1.63329 2.56936 2.58384C1.61882 3.53438 1.14355 4.67551 1.14355 6.00724C1.14355 7.34861 1.61882 8.49216 2.56936 9.43788C3.5199 10.3836 4.66104 10.8565 5.99276 10.8565Z"
                                        fill="#686687"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4_6269">
                                        <rect
                                            width="12"
                                            height="12"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className="text-xs text-gray-500">2 hour, 23 mins</span>
                        </div>
                    </div>{" "}
                </>
            )
        },
        size: 150
    })

    // columnHelper.display({
    //     id: "actions",
    //     header: () => "Actions",
    //     cell: () => (
    //         <button className="px-4 py-2.5 bg-white text-slate-700 rounded-lg border flex ">
    //             View Details
    //         </button>
    //     ),
    //     size: 110
    // })
]

const GatePassTable = ({ data }) => {
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    useEffect(() => {
        const hasShownToast = sessionStorage.getItem("toastShown")
        if (!hasShownToast) {
            toast.success(
                <div className="flex items-center w-full">
                    <span className="ml-2 font-medium text-sm">
                        Form successfully Approved by L2
                    </span>
                </div>,
                {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    className: "custom-toast"
                }
            )
            sessionStorage.setItem("toastShown", "true")
        }
        return () => {
            sessionStorage.removeItem("toastShown")
        }
    }, [])

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
            size: 200,
            minSize: 10,
            maxSize: 500
        }
    })

    const closeModal = () => {
        setShowFiltersModal(false)
    }

    // handleSearch now just filters the passed data (not mutating state)
    const handleSearch = (searchQuery) => {
        // Filtering is handled in the table rendering below
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }))
    }
    const router = useRouter()

    return (
        <>
            <div className="rounded-lg h-[510px]">
                <table className="w-full text-sm">
                    <thead className="border-b bg-slate-50 rounded-s-lg">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                className="cursor-pointer"
                                key={headerGroup.id}
                            >
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
                    <tbody className="bg-white">
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-10 text-gray-400">
                                    No records found with this status
                                </td>
                            </tr>
                        ) : (
                            table
                                .getRowModel()
                                .rows.filter((row) => {
                                    const searchTerm = filters?.query?.toLowerCase?.() || "";
                                    return Object.values(row.original).some(
                                        (value) =>
                                            value &&
                                            value
                                                .toString()
                                                .toLowerCase()
                                                .includes(searchTerm)
                                    );
                                })
                                .map((row) => (
                                    <tr
                                        key={row.id}
                                        className="border-b border-slate-100 cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `/createGetPass/gatePassListing/${row?.id || ""}`
                                            )
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="py-3 pl-3"
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
                                ))
                        )}
                    </tbody>
                </table>
                {/* Pagination  */}
                <div className="flex justify-between bg-white items-center px-4 py-2">
                    <div className="flex gap-2">
                        {table.getPageOptions().map((page) => {
                            const totalPages = table.getPageCount()
                            const currentPage =
                                table.getState().pagination.pageIndex
                            const filteredRows =
                                table.getFilteredRowModel().rows.length

                            if (filteredRows === 0) {
                                return null
                            }

                            if (
                                page < 2 ||
                                page === currentPage ||
                                page === totalPages - 1 ||
                                page === currentPage - 1 ||
                                page === currentPage + 1
                            ) {
                                return (
                                    <button
                                        key={page}
                                        className={`px-4 py-2 rounded-lg ${page === currentPage
                                            ? "bg-primary-100 text-white"
                                            : "bg-white text-slate-500"
                                            }`}
                                        onClick={() => table.setPageIndex(page)}
                                    >
                                        {page + 1}
                                    </button>
                                )
                            } else if (
                                (page === 2 && currentPage > 3) ||
                                (page === totalPages - 2 &&
                                    currentPage < totalPages - 3)
                            ) {
                                return (
                                    <span
                                        key={`ellipsis-${page}`}
                                        className="px-2"
                                    >
                                        ...
                                    </span>
                                )
                            }
                            return null
                        })}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="inline-flex min-w-fit items-center rounded-lg ms-2"
                        >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.13309 0.235012C8.81974 -0.0783373 8.31455 -0.0783373 8.0012 0.235012L2.68705 5.54916C2.43765 5.79856 2.43765 6.20144 2.68705 6.45084L8.0012 11.765C8.31455 12.0783 8.81974 12.0783 9.13309 11.765C9.44644 11.4516 9.44644 10.9464 9.13309 10.6331L4.5032 5.9968L9.13949 1.36051C9.44644 1.05356 9.44644 0.541966 9.13309 0.235012Z"
                                    fill="#B8BABC"
                                />
                            </svg>
                            <span className="text-gray-400">Previous</span>
                        </Button>
                        <Button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="inline-flex min-w-fit items-center text-[#686687] bg-[#F5F5F5] rounded-lg ms-2"
                        >
                            <span className="font-semibold">Next</span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.73582 11.765C3.04917 12.0783 3.55436 12.0783 3.86771 11.765L9.18186 6.45084C9.43126 6.20144 9.43126 5.79856 9.18186 5.54916L3.86771 0.235012C3.55436 -0.0783373 3.04917 -0.0783373 2.73582 0.235012C2.42247 0.548361 2.42247 1.05356 2.73582 1.36691L7.36571 6.0032L2.72942 10.6395C2.42247 10.9464 2.42247 11.458 2.73582 11.765Z"
                                    fill="#B8BABC"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>{" "}
            </div>
            <Modal
                isOpen={showFiltersModal}
                onClose={closeModal}
            ></Modal>
        </>
    )
}


export default GatePassTable
