// "use client"

// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     getPaginationRowModel,
//     useReactTable
// } from "@tanstack/react-table"
// import { useSelector } from "react-redux"
// import React, { useEffect, useState } from "react"
// import InputField from "../ui/form/Input"
// import SingleSelect from "../ui/form/SingleSelect"
// import Button from "../ui/Button"

// const defaultData = [
//     {
//         id: "01",
//         itemName: "Furniture",
//         category: "Category1",
//         customerId: "CHR2-0024",
//         make: "Chairs",
//         model: "Office Chair",
//         availableQty: "Active",
//         requiredQty: "",
//         createdAt: "2024-08-18T12:45:00"
//     },

// ]

// // Action Cell
// function ActionCell({ row, setData }) {
//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const router = useRouter();

//     // Close dropdown on outside click
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className="relative" ref={dropdownRef}>
//             <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-8 w-8 p-0 border-none focus:outline-none focus:ring-0"
//                 onClick={() => setOpen((prev) => !prev)}
//             >
//                 <MoreVertical className="h-4 w-4" />
//             </Button>

//             {open && (
//                 <div className="absolute right-0 mt-2 w-32 bg-white border  rounded-md shadow-lg z-10">
//                     <Button
//                         variant="secondary"
//                         className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b"
//                         onClick={() => {
//                             router.push(`/view/${row.asset_display_id}`);
//                             setOpen(false);
//                         }}
//                     >
//                         View
//                     </Button>
//                     <Button
//                         variant="secondary"
//                         className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b"
//                         onClick={() => {
//                             router.push(`/edit/${row.asset_display_id}`);
//                             setOpen(false);
//                         }}
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         variant="secondary"

//                         className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 border-b"
//                         onClick={() => {
//                             if (window.confirm(`Delete ${row.asset_display_id}?`)) {
//                                 setData((prev) => prev.filter((item) => item.id !== row.id));
//                             }
//                             setOpen(false);
//                         }}
//                     >
//                         Delete
//                     </Button>
//                 </div>
//             )}
//         </div>
//     );
// }



// const columnHelper = createColumnHelper()

// export const getColumns = (setData) => [
//     columnHelper.accessor("id", {
//         header: "Sr No",
//         cell: info => <span className="text-center pr-3">{info.getValue()}</span>
//     }),
//     columnHelper.accessor("customerName", { header: "Customer Name" }),
//     columnHelper.accessor("customerId", { header: "Customer ID." }),
//     columnHelper.accessor("category", { header: "Category" }),
//     columnHelper.accessor("model", { header: "Model" }),
//     columnHelper.accessor("availableQty", { header: "Available Qty" }),
//     columnHelper.accessor("category", { header: "Category" }),
//     columnHelper.display({
//         id: "actions",
//         header: () => "Action",
//         cell: (info) => (
//             <ActionCell row={info.row.original} setData={setData} />
//         ),
//         size: 60
//     })

// ]

// const CustomerAffected = () => {
//     const showReturnAllColumn = useSelector((state) => state.getGatePass?.showReturnAllColumn)
//     const [data, setData] = useState(defaultData)
//     const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

//     const [filters, setFilters] = useState({
//         cutomerCategory: "", customer: ""
//     })

//     const filterConfig = {
//         label: "Select Customer",
//         required: true,
//         fields: [
//             {
//                 key: "cutomerCategory",
//                 placeholder: "Cutomer Category",
//                 options: [{ label: "Cutomer Category-1", value: "Cutomer Category-1" }, { label: "Cutomer Category-2", value: "Cutomer Category-2" }]
//             },
//             {
//                 key: "customer",
//                 placeholder: "Cutomer",
//                 options: [{ label: "Cutomer-1", value: "Cutomer-1" }, { label: "Cutomer-2", value: "Cutomer-2" }]
//             },
//         ]
//     }

//     const columns = getColumns(setData)
//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onPaginationChange: setPagination,
//         state: { pagination }
//     })

//     return (
//         <div className="mb-10 p-5 overflow-hidden">
//             {/* FILTERS */}
//             <div className="flex flex-col w-full bg-white rounded-lg">
//                 <label className="text-sm font-medium text-gray-400">
//                     {filterConfig.label}
//                     {filterConfig.required && <span className="text-red-500">*</span>}
//                 </label>
//                 <div className="flex w-full mb-6 gap-x-4">
//                     {filterConfig.fields.map((field) => (
//                         <SingleSelect
//                             key={field.key}
//                             selectStyle="h-12"
//                             className="w-1/4"
//                             options={field.options}
//                             value={filters[field.key]}
//                             onChange={(value) => setFilters({ ...filters, [field.key]: value })}
//                             placeholder={field.placeholder}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* MAIN TABLE */}
//             <table className="w-full text-sm rounded-lg overflow-x-auto overflow-y-auto">
//                 <thead className="bg-slate-100">
//                     {table.getHeaderGroups().map((headerGroup) => (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map((header) => (
//                                 <th
//                                     key={header.id}
//                                     className="text-slate-600 font-semibold text-center py-3 px-4 border-b"
//                                     style={{ width: `${header.getSize()}px` }}
//                                 >
//                                     {header.isPlaceholder
//                                         ? null
//                                         : header.column.columnDef.header()}
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>

//                 <tbody>
//                     {table.getRowModel().rows.map((row) => (
//                         <tr
//                             key={row.id}
//                             className="border-b border-slate-50 hover:bg-gray-50 transition-colors"
//                         >
//                             {row.getVisibleCells().map((cell) => (
//                                 <td
//                                     key={cell.id}
//                                     className="text-center py-3 px-4 text-gray-700"
//                                 >
//                                     {cell.column.columnDef.cell(cell.getContext())}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default CustomerAffected

"use client"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { MoreVertical } from "lucide-react"
import InputField from "../ui/form/Input"
import SingleSelect from "../ui/form/SingleSelect"
import Button from "../ui/Button"

const defaultData = [
    {
        id: "01",
        customerName: "John Doe",
        category: "Category1",
        customerId: "CHR2-0024",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "02",
        customerName: "John Doe",
        category: "Category1",
        customerId: "CHR2-0024",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "03",
        customerName: "John Doe",
        category: "Category1",
        customerId: "CHR2-0024",
        createdAt: "2024-08-18T12:45:00"
    },

]

// Action Cell
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
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                    <Button
                        variant="secondary"
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b"
                        onClick={() => {
                            router.push(`/view/${row.id}`);
                            setOpen(false);
                        }}
                    >
                        View
                    </Button>
                    <Button
                        variant="secondary"
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b"
                        onClick={() => {
                            router.push(`/edit/${row.id}`);
                            setOpen(false);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="secondary"
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        onClick={() => {
                            if (window.confirm(`Delete ${row.id}?`)) {
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

const columnHelper = createColumnHelper()

export const getColumns = (setData) => [
    columnHelper.accessor("id", {
        header: "Sr No",
        cell: info => <span className="text-center pr-3">{info.getValue()}</span>
    }),
    columnHelper.accessor("customerName", { header: "Customer Name" }),
    columnHelper.accessor("customerId", { header: "Customer ID" }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.display({
        id: "actions",
        header: "Action",
        cell: (info) => (
            <ActionCell row={info.row.original} setData={setData} />
        ),
        size: 60
    })
]

const CustomerAffected = () => {
    const showReturnAllColumn = useSelector((state) => state.getGatePass?.showReturnAllColumn)
    const [data, setData] = useState(defaultData)
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

    const [filters, setFilters] = useState({
        cutomerCategory: "", customer: ""
    })

    const filterConfig = {
        label: "Select Customer",
        required: true,
        fields: [
            {
                key: "cutomerCategory",
                placeholder: "Customer Category",
                options: [
                    { label: "Customer Category-1", value: "Customer Category-1" },
                    { label: "Customer Category-2", value: "Customer Category-2" }
                ]
            },
            {
                key: "customer",
                placeholder: "Customer",
                options: [
                    { label: "Customer-1", value: "Customer-1" },
                    { label: "Customer-2", value: "Customer-2" }
                ]
            },
        ]
    }

    const columns = getColumns(setData)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: { pagination }
    })

    return (
        <div className="mb-10 p-5 overflow-hidden">
            {/* FILTERS */}
            <div className="flex flex-col w-full bg-white rounded-lg">
                <label className="text-sm font-medium text-gray-400 mb-3">
                    {filterConfig.label}
                    {filterConfig.required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex w-full mb-6 gap-x-4">
                    {filterConfig.fields.map((field) => (
                        <SingleSelect
                            key={field.key}
                            selectStyle="h-12"
                            className="w-1/4"
                            options={field.options}
                            value={filters[field.key]}
                            onChange={(value) => setFilters({ ...filters, [field.key]: value })}
                            placeholder={field.placeholder}
                        />
                    ))}
                </div>
            </div>

            {/* TABLE */}
            <table className="w-full text-sm rounded-lg shadow overflow-x-auto overflow-y-auto">
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
                                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerAffected
