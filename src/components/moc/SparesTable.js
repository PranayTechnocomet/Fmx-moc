"use client"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import InputField from "../ui/form/Input"
import SingleSelect from "../ui/form/SingleSelect"
import Button from "../ui/Button"

const defaultData = [
    {
        id: "01",
        itemName: "Furniture",
        category: "Category1",
        partNo: "CHR2-0024",
        make: "Chairs",
        model: "Office Chair",
        availableQty: "Active",
        requiredQty: "",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "02",
        itemName: "Furniture",
        category: "Category1",
        partNo: "CHR2-0024",
        make: "Chairs",
        model: "Office Chair",
        availableQty: "Active",
        requiredQty: "",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "03",
        itemName: "Furniture",
        category: "Category1",
        partNo: "CHR2-0024",
        make: "Chairs",
        model: "Office Chair",
        availableQty: "Active",
        requiredQty: "",
        createdAt: "2024-08-18T12:45:00"
    },
    {
        id: "04",
        itemName: "Furniture",
        category: "Category1",
        partNo: "CHR2-0024",
        make: "Chairs",
        model: "Office Chair",
        availableQty: "Active",
        requiredQty: "",
        createdAt: "2024-08-18T12:45:00"
    }
]

// RequiredQty Cell
function RequiredQty({ row, setData }) {
    const [inputValue, setInputValue] = useState(
        row.requiredQty !== undefined && row.requiredQty !== null
            ? row.requiredQty.toString()
            : ""
    );

    useEffect(() => {
        setInputValue(
            row.requiredQty !== undefined && row.requiredQty !== null
                ? row.requiredQty.toString()
                : ""
        );
    }, [row.requiredQty]);

    const handleChange = (e) => {
        const value = e.target.value;
        // Allow only digits
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleBlur = () => {
        const numberValue = inputValue === "" ? null : parseInt(inputValue, 10);
        setData(prev =>
            prev.map(sp =>
                sp.id === row.id ? { ...sp, requiredQty: numberValue } : sp
            )
        );
    };

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-24 px-2 py-2 rounded-md border border-gray-300 
                           focus:outline-none focus:ring-1 focus:none
                           placeholder:text-gray-400 no-spinner"
                inputMode="numeric"
                placeholder="Qty"
            />
        </div>
    );
}



const columnHelper = createColumnHelper()

export const getColumns = (setData) => [
    columnHelper.accessor("id", {
        header: "Sr No",
        cell: info => <span className="text-center pr-3">{info.getValue()}</span>
    }),
    columnHelper.accessor("itemName", { header: "Item Name" }),
    columnHelper.accessor("partNo", { header: "Part No." }),
    columnHelper.accessor("make", { header: "Make" }),
    columnHelper.accessor("model", { header: "Model" }),
    columnHelper.accessor("availableQty", { header: "Available Qty" }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.display({
        id: "requiredQty",
        header: "Required Qty",
        cell: info => (
            <RequiredQty row={info.row.original} setData={setData} />
        )
    })

]

const SparesTable = () => {
    const showReturnAllColumn = useSelector((state) => state.getGatePass?.showReturnAllColumn)
    const [data, setData] = useState(defaultData)
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

    const [filters, setFilters] = useState({
        city: "", category: "", subCategory: "", asset: ""
    })

    const filterConfig = {
        label: "Select Spares",
        required: true,
        fields: [
            {
                key: "city",
                placeholder: "Type",
                options: [{ label: "Type-1", value: "Type-1" }, { label: "Type-2", value: "Type-2" }]
            },
            {
                key: "category",
                placeholder: "Category",
                options: [{ label: "Category-1", value: "Category-1" }, { label: "Category-2", value: "Category-2" }]
            },
            {
                key: "subCategory",
                placeholder: "Sub-Category",
                options: [{ label: "Sub-Category-1", value: "Sub-Category-1" }, { label: "Sub-Category-2", value: "Sub-Category-2" }]
            },
            {
                key: "asset",
                placeholder: "Spares",
                options: [{ label: "Spares-1", value: "Spares-1" }, { label: "Spares-2", value: "Spares-2" }]
            }
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

    // ------------------ Other Spares ------------------ //
    const [otherSpares, setOtherSpares] = useState([
        {
            id: "OS-1",
            category: "",
            itemName: "",
            partNo: "",
            make: "",
            model: "",
            requiredQty: ""
        }
    ])

    const handleOtherChange = (index, key, value) => {
        setOtherSpares(prev => {
            const updated = [...prev]
            updated[index][key] = key === "requiredQty" ? parseInt(value, 10) || "" : value
            return updated
        })
    }

    const handleAddOtherSpare = () => {
        const newSpare = {
            id: `OS-${otherSpares.length + 1}`,
            category: "",
            itemName: "",
            partNo: "",
            make: "",
            model: "",
            requiredQty: ""
        }
        setOtherSpares(prev => [...prev, newSpare])
    }

    const handleRemoveOtherRow = (index) => {
        setOtherSpares((prev) => prev.filter((_, i) => i !== (index === 0 ? 1 : index)))
    }

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

            {/* MAIN TABLE */}
            <table className="w-full text-sm shadow rounded-lg">
                <thead className="bg-slate-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="text-center py-3 px-4 border-b text-slate-600 font-semibold">
                                    {!header.isPlaceholder && header.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="text-center py-3 px-4 text-gray-700">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* OTHER SPARES */}
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Other Spares</h3>
                <table className="w-full text-sm shadow rounded-lg mb-6">
                    <thead className="bg-slate-100 text-slate-600 font-semibold">
                        <tr>
                            <th className="text-start py-2 px-3">Sr No</th>
                            <th className="text-start py-2 px-3">Category</th>
                            <th className="text-start py-2 px-3">Item Name</th>
                            <th className="text-start py-2 px-3">Part No.</th>
                            <th className="text-start py-2 px-3">Make</th>
                            <th className="text-start py-2 px-3">Model</th>
                            <th className="text-start py-2 px-3">Required Qty</th>
                            <th className="text-start py-2 px-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {otherSpares.map((spare, index) => (
                            <tr key={spare.id} className="text-start">
                                <td className="py-2 px-3">{index + 1}</td>
                                {["category", "itemName", "partNo", "make", "model"].map((key) => (
                                    <td key={key} className="py-2 px-3">
                                        <InputField
                                            type="text"
                                            className="rounded px-2 py-1 w-full"
                                            value={spare[key]}
                                            onChange={(e) => handleOtherChange(index, key, e.target.value)}
                                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                        />
                                    </td>
                                ))}
                                <td className="py-2 px-3">
                                    <InputField
                                        type="number"
                                        className="rounded px-2 py-1 w-full no-spinner"
                                        value={spare.requiredQty}
                                        onChange={(e) => handleOtherChange(index, "requiredQty", e.target.value)}
                                        placeholder="Required Qty"
                                    />
                                </td>
                                <td className="py-2 px-3 cursor-pointer" onClick={() => handleRemoveOtherRow(index)}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.4072 16C2.95748 16 2.56749 15.8349 2.23724 15.5046C1.90698 15.1744 1.74185 14.7844 1.74185 14.3347V2.52964H1.50996C1.27105 2.52964 1.07079 2.44884 0.909172 2.28722C0.747556 2.1256 0.666748 1.92534 0.666748 1.68643C0.666748 1.44752 0.747556 1.24726 0.909172 1.08564C1.07079 0.924023 1.27105 0.843215 1.50996 0.843215H5.15687C5.15687 0.604304 5.23767 0.40404 5.39929 0.242424C5.56091 0.080808 5.76117 0 6.00008 0H10.2583C10.4972 0 10.701 0.0843214 10.8696 0.252964C11.0383 0.421607 11.1226 0.618357 11.1226 0.843215H14.7484C14.9873 0.843215 15.1876 0.924023 15.3492 1.08564C15.5108 1.24726 15.5916 1.44752 15.5916 1.68643C15.5916 1.92534 15.5108 2.1256 15.3492 2.28722C15.1876 2.44884 14.9873 2.52964 14.7484 2.52964H14.5166V14.3347C14.5166 14.7844 14.3514 15.1744 14.0212 15.5046C13.6909 15.8349 13.3009 16 12.8512 16H3.4072ZM3.4072 2.52964V14.3347H12.8512V2.52964H3.4072ZM5.59955 11.8893C5.59955 12.0861 5.66982 12.2547 5.81036 12.3953C5.95089 12.5358 6.11954 12.6061 6.31629 12.6061C6.52709 12.6061 6.70276 12.5358 6.8433 12.3953C6.98383 12.2547 7.0541 12.0861 7.0541 11.8893V4.95389C7.0541 4.74308 6.98032 4.5639 6.83276 4.41634C6.68519 4.26877 6.51304 4.19499 6.31629 4.19499C6.10548 4.19499 5.93333 4.26877 5.79982 4.41634C5.66631 4.5639 5.59955 4.74308 5.59955 4.95389V11.8893ZM9.2043 11.8893C9.2043 12.0861 9.27808 12.2547 9.42564 12.3953C9.5732 12.5358 9.74536 12.6061 9.94211 12.6061C10.1529 12.6061 10.3286 12.5358 10.4691 12.3953C10.6097 12.2547 10.6799 12.0861 10.6799 11.8893V4.95389C10.6799 4.74308 10.6061 4.5639 10.4586 4.41634C10.311 4.26877 10.1389 4.19499 9.94211 4.19499C9.73131 4.19499 9.55564 4.26877 9.4151 4.41634C9.27457 4.5639 9.2043 4.74308 9.2043 4.95389V11.8893ZM3.4072 2.52964V14.3347V2.52964Z" fill="#E84754" />
                                    </svg>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Button
                    className="font-semibold rounded-lg text-slate-600"
                    variant="custom"
                    onClick={handleAddOtherSpare}
                >
                    + Add Spares
                </Button>
            </div>
        </div>
    )
}

export default SparesTable
