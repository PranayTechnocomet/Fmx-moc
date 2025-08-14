"use client"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { EyeIcon, FileText, MoreVertical, Search } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

import InputField from "../ui/form/Input"
import SingleSelect from "../ui/form/SingleSelect"
import Modal from "../ui/overlays/Modal"
import StatusPill from "../ui/StatusPill"
import StatusCard from "../ui/StatusCard"
import Button from "../ui/Button"
import { RETURNED_STATUS } from "@/utils/constants"
import { useSelector } from "react-redux"
import Switch from "../ui/form/Switch"
import MultiSelect from "../ui/form/MultiSelect"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { toast } from "react-toastify"
import { ActionMenu } from "./ActionMenu"

// const defaultData = [
//     {
//         id: "01",
//         asset_display_id: "CHR2-0024",
//         group: "Furniture",
//         sub_group: "Chairs",
//         asset: "Office Chair",
//         // status: RETURNED_STATUS.PENDING,
//         statusText: "Active",
//         createdAt: "2024-08-18T12:45:00"
//     },
//     {
//         id: "02",
//         asset_display_id: "CHR2-0024",
//         group: "Furniture",
//         sub_group: "Chairs",
//         asset: "Office Chair",
//         // status: RETURNED_STATUS.PENDING,
//         statusText: "Active",
//         createdAt: "2024-08-18T12:45:00"
//     },

// ]

// const columnHelper = createColumnHelper()

// const getColumns = (showReturnAllColumn = false) => {
//     const baseColumns = [
//         columnHelper.accessor("id", {
//             id: "id",
//             header: () => "Sr No",
//             cell: (info) => (
//                 <span className="text-center pr-3">{info.getValue()}</span>
//             ),
//             size: 50
//         }),
//         columnHelper.accessor("asset_display_id", {
//             header: () => "Asset Display ID",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("group", {
//             header: () => "Group",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("sub_group", {
//             header: () => "Sub-Group",
//             cell: (info) => info.getValue(),
//             size: 80
//         }),
//         columnHelper.accessor("asset", {
//             header: () => "Asset",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("status", {
//             header: () => "Status",
//             cell: (info) => info.getValue(),
//             size: 150
//         }),
//         columnHelper.accessor("action", {
//             header: () => "Action",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         // columnHelper.accessor("proposed_change", {
//         //     header: () => "Proposed Change",
//         //     cell: (info) => info.getValue(),
//         //     size: 100
//         // }),
//         // columnHelper.accessor("asset_type", {
//         //     header: () => "Asset Type",
//         //     cell: (info) => info.getValue(),
//         //     size: 80
//         // }),
//         // columnHelper.accessor("asset_name", {
//         //     header: () => "Asset Name",
//         //     cell: (info) => info.getValue(),
//         //     size: 80
//         // }),
//         // columnHelper.accessor("attachment", {
//         //     header: () => "Attachment",
//         //     cell: (info) => (
//         //         <Button
//         //             variant="secondary"
//         //             className="font-semibold rounded-lg flex items-center justify-center"
//         //         >
//         //             {/* <FileText size={16} /> */}
//         //             <Button variant="secondary">View</Button>
//         //             {/* {info.getValue()} */}
//         //         </Button>
//         //     ),
//         //     size: 80
//         // }),
//         // columnHelper.accessor("status", {
//         //     header: () => "Status",
//         //     cell: (info) => info.getValue(),
//         //     size: 80
//         // })
//     ]
//     return baseColumns
// }
// Sample Data
const defaultData = [
    {
        id: "01",
        asset_display_id: "CHR2-0024",
        group: "Furniture",
        sub_group: "Chairs",
        asset: "Office Chair",
        statusText: "Active",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "02",
        asset_display_id: "CHR2-0025",
        group: "Furniture",
        sub_group: "Chairs",
        asset: "Office Chair",
        statusText: "Active",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "03",
        asset_display_id: "CHR2-0025",
        group: "Furniture",
        sub_group: "Chairs",
        asset: "Office Chair",
        statusText: "Active",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "04",
        asset_display_id: "CHR2-0025",
        group: "Furniture",
        sub_group: "Chairs",
        asset: "Office Chair",
        statusText: "Active",
        createdAt: "2024-08-18T12:45:00"
    },
];

// Status Colors
const getStatusConfig = (statusText) => {
    const statusMap = {
        Active: { style: "text-green-600 bg-green-50", label: "Active" },
        Pending: { style: "text-yellow-600 bg-yellow-50", label: "Pending" },
        Rejected: { style: "text-red-600 bg-red-50", label: "Rejected" },
        Completed: { style: "text-blue-700 bg-blue-50", label: "Completed" }
    };
    return statusMap[statusText] || { style: "text-gray-600 bg-gray-50", label: statusText || "Unknown" };
};


// Action Cell Component (inside same file)
function ActionCell({ row, setData }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 border-none focus:outline-none focus:ring-0"
                onClick={() => setOpen((prev) => !prev)}
            >
                <MoreVertical className="h-4 w-4" />
            </Button>

            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white border  rounded-md shadow-lg z-10">
                    <Button
                        variant="secondary"
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b"
                        onClick={() => {
                            router.push(`/view/${row.asset_display_id}`);
                            setOpen(false);
                        }}
                    >
                        View
                    </Button>
                    <Button
                        variant="secondary"
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b"
                        onClick={() => {
                            router.push(`/edit/${row.asset_display_id}`);
                            setOpen(false);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="secondary"

                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 border-b"
                        onClick={() => {
                            if (window.confirm(`Delete ${row.asset_display_id}?`)) {
                                setData((prev) => prev.filter((item) => item.id !== row.id));
                            }
                            setOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            )}
        </div>
    );
}

// Columns
const columnHelper = createColumnHelper();

export const getColumns = (setData) => [
    columnHelper.accessor("id", {
        header: () => "Sr No",
        cell: (info) => (
            <span className="text-center pr-3">{info.getValue()}</span>
        ),
        size: 50
    }),
    columnHelper.accessor("asset_display_id", {
        header: () => "Asset Display ID",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("group", {
        header: () => "Group",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("sub_group", {
        header: () => "Sub-Group",
        cell: (info) => info.getValue(),
        size: 80
    }),
    columnHelper.accessor("asset", {
        header: () => "Asset",
        cell: (info) => info.getValue(),
        size: 100
    }),
    columnHelper.accessor("statusText", {
        header: () => "Status",
        cell: (info) => {
            const { style, label } = getStatusConfig(info.getValue());
            return <StatusPill className={style} value={label} />;
        },
        size: 150
    }),
    columnHelper.display({
        id: "actions",
        header: () => "Action",
        cell: (info) => (
            <ActionCell row={info.row.original} setData={setData} />
        ),
        size: 60
    })
];


// const columnHelper = createColumnHelper();
// export const getColumns = (setData) => {
//     const router = useRouter();

//     return [
//         columnHelper.accessor("id", {
//             id: "id",
//             header: () => "Sr No",
//             cell: (info) => (
//                 <span className="text-center pr-3">{info.getValue()}</span>
//             ),
//             size: 50
//         }),
//         columnHelper.accessor("asset_display_id", {
//             header: () => "Asset Display ID",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("group", {
//             header: () => "Group",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("sub_group", {
//             header: () => "Sub-Group",
//             cell: (info) => info.getValue(),
//             size: 80
//         }),
//         columnHelper.accessor("asset", {
//             header: () => "Asset",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("statusText", {
//             header: () => "Status",
//             cell: (info) => {
//                 const { style, label } = getStatusConfig(info.getValue());
//                 return <StatusPill className={style} value={label} />;
//             },
//             size: 150
//         }),
//         columnHelper.display({
//             id: "actions",
//             header: () => "Action",
//             cell: (info) => {
//                 const row = info.row.original;
//                 const [open, setOpen] = useState(false);

//                 return (
//                     <div className="relative">
//                         {/* 3 Dot Button */}
//                         <Button
//                             variant="secondary"
//                             size="sm"
//                             onClick={() => setOpen((prev) => !prev)}
//                         >
//                             <MoreVertical className="h-4 w-4" />
//                         </Button>

//                         {/* Dropdown */}
//                         {open && (
//                             <div
//                                 className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10"
//                                 onClick={(e) => {
//                                     if (e.target.closest(".absolute")) return;
//                                     setOpen(false);
//                                 }}
//                             >
//                                 <Button
//                                     className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
//                                     onClick={() => {
//                                         router.push(`/view/${row.asset_display_id}`);
//                                         setOpen(false);
//                                     }}
//                                 >
//                                     View
//                                 </Button>
//                                 <Button
//                                     className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
//                                     onClick={() => {
//                                         router.push(`/edit/${row.asset_display_id}`);
//                                         setOpen(false);
//                                     }}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     className="block w-full text-left px-3 py-1 text-sm text-red-500 hover:bg-gray-100"
//                                     onClick={() => {
//                                         if (
//                                             window.confirm(
//                                                 `Are you sure you want to delete ${row.asset_display_id}?`
//                                             )
//                                         ) {
//                                             setData((prev) =>
//                                                 prev.filter((item) => item.id !== row.id)
//                                             );
//                                         }
//                                         setOpen(false);
//                                     }}
//                                 >
//                                     Delete
//                                 </Button>
//                             </div>
//                         )}
//                     </div>
//                 );
//             },
//             size: 60
//         })
//     ];
// };

//   export const getColumns = () => {
//     return [
//       columnHelper.accessor("id", {
//         id: "id",
//         header: () => "Sr No",
//         cell: (info) => (
//           <span className="text-center pr-3">{info.getValue()}</span>
//         ),
//         size: 50
//       }),
//       columnHelper.accessor("asset_display_id", {
//         header: () => "Asset Display ID",
//         cell: (info) => info.getValue(),
//         size: 100
//       }),
//       columnHelper.accessor("group", {
//         header: () => "Group",
//         cell: (info) => info.getValue(),
//         size: 100
//       }),
//       columnHelper.accessor("sub_group", {
//         header: () => "Sub-Group",
//         cell: (info) => info.getValue(),
//         size: 80
//       }),
//       columnHelper.accessor("asset", {
//         header: () => "Asset",
//         cell: (info) => info.getValue(),
//         size: 100
//       }),
//       columnHelper.accessor("statusText", {
//         header: () => "Status",
//         cell: (info) => {
//           const { style, label } = getStatusConfig(info.getValue());
//           return <StatusPill className={style} value={label} />;
//         },
//         size: 150
//       }),
//       columnHelper.display({
//         id: "actions",
//         header: () => "Action",
//         cell: (info) => {
//           const row = info.row.original;
//           return (
//           <Button
//           variant="secondary"
//           size="sm"
//           onClick={() => alert(`Action: ${info.getValue()}`)}
//         >
//             ...
//         </Button>
//           );
//         },
//         size: 60
//       })
//     ];
// }
// export const getColumns = () => {
//     const baseColumns = [
//         columnHelper.accessor("id", {
//             id: "id",
//             header: () => "Sr No",
//             cell: (info) => (
//                 <span className="text-center pr-3">{info.getValue()}</span>
//             ),
//             size: 50
//         }),
//         columnHelper.accessor("asset_display_id", {
//             header: () => "Asset Display ID",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("group", {
//             header: () => "Group",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("sub_group", {
//             header: () => "Sub-Group",
//             cell: (info) => info.getValue(),
//             size: 80
//         }),
//         columnHelper.accessor("asset", {
//             header: () => "Asset",
//             cell: (info) => info.getValue(),
//             size: 100
//         }),
//         columnHelper.accessor("statusText", {
//             header: () => "Status",
//             cell: (info) => {
//                 const { style, label } = getStatusConfig(info.getValue());
//                 return <StatusPill className={style} value={label} />;
//             },
//             size: 150
//         }),
//         columnHelper.accessor("action", {
//             header: () => "Action",
//             cell: (info) => (
//                 <Button
//                     variant="secondary"
//                     size="sm"
//                     onClick={() => alert(`Action: ${info.getValue()}`)}
//                 >
//                     {info.getValue()}
//                 </Button>
//             ),
//             size: 100
//         })
//     ];
//     return baseColumns;
// };
const AssetsTable = () => {
    const showReturnAllColumn = useSelector(
        (state) => state.getGatePass.showReturnAllColumn
    )
    const [showFiltersModal, setShowFiltersModal] = useState(false)

    const [data, _setData] = useState(defaultData)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    // Dropdown Data Filters
    const [filters, setFilters] = useState({
        query: "",
        from_date: "",
        to_date: "",
        city: "",
        site: "",
        day: "",
        category: "",
        subCategory: "",
        asset: "",
    })

    // filterConfig Dropdown Data
    const filterConfig = {
        label: "Select Asset",
        required: true,
        fields: [
            {
                key: "city",
                placeholder: "Asset Location",
                options: [
                    { label: "Asset Location-1", value: "Asset Location-1" },
                    { label: "Asset Location-2", value: "Asset Location-2" }
                ]
            },
            {
                key: "category",
                placeholder: "Asset Category",
                options: [
                    { label: "Asset Category-1", value: "Asset Category-1" },
                    { label: "Asset Category-2", value: "Asset Category-2" }
                ]
            },
            {
                key: "subCategory",
                placeholder: "Asset Sub-Category",
                options: [
                    { label: "Asset Sub-Category-1", value: "Asset Sub-Category-1" },
                    { label: "Asset Sub-Category-2", value: "Asset Sub-Category-2" }
                ]
            },
            {
                key: "asset",
                placeholder: "Asset",
                options: [
                    { label: "Asset-1", value: "Asset-1" },
                    { label: "Asset-2", value: "Asset-2" }
                ]
            }
        ]
    };

    const getStatusConfig = (statusText) => {
        const statusMap = {
            Active: { style: "text-green-600 bg-green-50", label: "Active" },
            Pending: { style: "text-yellow-600 bg-yellow-50", label: "Pending" },
            Rejected: { style: "text-red-600 bg-red-50", label: "Rejected" },
            Completed: { style: "text-blue-700 bg-blue-50", label: "Completed" }
        };

        return statusMap[statusText] || { style: "text-gray-600 bg-gray-50", label: statusText || "Unknown" };
    };

    const columns = getColumns(showReturnAllColumn)
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

    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage, setRecordsPerPage] = useState(10)

    const totalPages = Math.ceil(data?.length / recordsPerPage)
    const paginatedData = data.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    )
    // const generatePageNumbers = () => {
    //     const pages = []
    //     if (totalPages <= 6) {
    //         for (let i = 1; i <= totalPages; i++) pages?.push(i)
    //     } else {
    //         if (currentPage <= 3) {
    //             pages?.push(1, 2, 3, "...", totalPages)
    //         } else if (currentPage >= totalPages - 2) {
    //             pages?.push(
    //                 1,
    //                 "...",
    //                 totalPages - 2,
    //                 totalPages - 1,
    //                 totalPages
    //             )
    //         } else {
    //             pages?.push(
    //                 1,
    //                 "...",
    //                 currentPage - 1,
    //                 currentPage,
    //                 currentPage + 1,
    //                 "...",
    //                 totalPages
    //             )
    //         }
    //     }
    //     return pages
    // }

    const router = useRouter()

    // console.log("paginatedData", paginatedData)



    return (
        <>
            <div className="mb-10 p-5 rounded-lg shadow overflow-hidden">
                <div className="flex flex-col w-full bg-white rounded-lg">
                    {/* Dynamic Label */}
                    <label className="text-sm font-medium text-gray-400">
                        {filterConfig.label}
                        {filterConfig.required && <span className="text-red-500">*</span>}
                    </label>

                    {/* Dynamic Filters Row */}
                    <div className="flex w-full mb-3 gap-x-3 h-20 place-items-center justify-between">
                        {filterConfig.fields.map((field) => (
                            <SingleSelect
                                key={field.key}
                                selectStyle="h-12"
                                className="!w-3/12"
                                options={field.options}
                                value={filters[field.key]}
                                onChange={(value) => setFilters({ ...filters, [field.key]: value })}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </div>
                </div>

                <table className="w-full text-sm rounded-lg overflow-x-auto overflow-y-auto">
                    <thead className="bg-slate-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-slate-600 font-semibold text-center py-3 px-4 border-b"
                                        style={{ width: `${header.getSize()}px` }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : header.column.columnDef.header()}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-slate-50 hover:bg-gray-50 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="text-center py-3 px-4 text-gray-700"
                                    >
                                        {cell.column.columnDef.cell(cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* <div className="flex items-end justify-between p-4 rounded-br-lg rounded-bl-lg bg-white">
                    <div className="flex space-x-2">
                        {generatePageNumbers()?.map((page, idx) =>
                            page === "..." ? (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className="px-3 py-2 text-gray-500"
                                >
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={`page-${page}-${idx}`}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-0 rounded ${
                                        currentPage === page
                                            ? "bg-primary-100 text-white"
                                            : "border"
                                    }`}
                                >
                                    {page}
                                </Button>
                            )
                        )}
                    </div>
                    <div>
                        <Button
                            variant=""
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={`inline-flex min-w-fit items-center rounded-lg ms-2 ${
                                currentPage === 1 ? "" : "bg-[#F3F4FB] border-0"
                            }`}
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
                                    fill={`${
                                        currentPage === 1
                                            ? "#B8BABC"
                                            : "#153AC7"
                                    }`}
                                />
                            </svg>
                            <span
                                className={`ml-2 ${
                                    currentPage === 1
                                        ? "text-gray-400"
                                        : "text-[#153AC7]"
                                }`}
                            >
                                Previous
                            </span>
                        </Button>
                        <Button
                            variant=""
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={`inline-flex min-w-fit items-center rounded-lg ms-2 ${
                                currentPage === totalPages
                                    ? ""
                                    : "bg-[#F3F4FB] border-0"
                            }`}
                        >
                            <span
                                className={`mr-2 ${
                                    currentPage === totalPages
                                        ? "text-gray-400"
                                        : "text-[#153AC7]"
                                }`}
                            >
                                Next
                            </span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.73582 11.765C3.04917 12.0783 3.55436 12.0783 3.86771 11.765L9.18186 6.45084C9.43126 6.20144 9.43126 5.79856 9.18186 5.54916L3.86771 0.235012C3.55436 -0.0783373 3.04917 -0.0783373 2.73582 0.235012C2.42247 0.548361 2.42247 1.05356 2.73582 1.36691L7.36571 6.0032L2.72942 10.6395C2.42247 10.9464 2.42247 11.458 2.73582 11.765Z"
                                    fill={`${
                                        currentPage === totalPages
                                            ? "#B8BABC"
                                            : "#153AC7"
                                    }`}
                                />
                            </svg>
                        </Button>
                    </div>
                </div> */}
            </div>
            {/* <Modal
                isOpen={showFiltersModal}
                onClose={closeModal}
            ></Modal> */}
        </>
    )
}

export default AssetsTable
