"use client"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/form/Input"
import Switch from "@/components/ui/form/Switch"
import { useFetchDataMutation } from "@/redux/api/hotoApi"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from "@tanstack/react-table"
import { RotateCcw } from "lucide-react"
import React, { useState } from "react"
import { toast } from "react-toastify"

const Page = () => {
    const { data, error, isLoading } = useFetchDataMutation()
    const [globalFilter, setGlobalFilter] = useState("")
    const [userChanges, setUserChanges] = useState({})

    const columns = [
        {
            accessorKey: "userId",
            header: "Sr",
            cell: (info) =>
                parseInt(info.getValue()).toString().padStart(2, "0")
        },
        {
            accessorKey: "userDetails.name",
            header: "Name"
        },
        {
            accessorKey: "userDetails.employeeId",
            header: "Employee ID"
        },
        {
            accessorKey: "userDetails.designation",
            header: "Designation"
        },
        {
            accessorKey: "HOTO_ACCESS",
            header: "HOTO Access",
            cell: ({ row }) => (
                <Switch
                    checked={
                        userChanges[row.original.userId] ??
                        row.original.HOTO_ACCESS
                    }
                    onChange={(checked) =>
                        handleHotoAccessChange(row.original.userId, checked)
                    }
                />
            )
        }
    ]

    const table = useReactTable({
        data: data?.users ?? [],
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const handleHotoAccessChange = (userId, checked) => {
        setUserChanges((prev) => ({
            ...prev,
            [userId]: checked
        }))
    }

    const handleSaveChanges = () => {
        console.log("Saving changes:", userChanges)
        // Here you would typically call your API to save the changes
        // After successful save, you might want to reset the userChanges state
        setUserChanges({})
        toast.success("Changes saved successfully!")
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading data</div>

    return (
        <div className="container mx-auto my-6 p-4 bg-white h-[calc(100vh-10%)] rounded-lg border ">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>
                <Input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="p-2 font-lg max-w-sm"
                    placeholder="Search all columns..."
                />
            </div>
            <div className="overflow-auto h-[75vh] border rounded-lg">
                <table className="min-w-full bg-white rounded-lg border-collapse">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
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
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
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
            {Object.keys(userChanges).length > 0 && (
                <div className="mt-2 flex justify-end">
                    <button
                        onClick={() => {
                            setUserChanges({})
                        }}
                        className=" px-4 py-2  text-gray-600 rounded-lg  inline-flex gap-2 items-center"
                    >
                        <RotateCcw className="w-4 h-auto" />
                        Reset
                    </button>
                    <Button
                        onClick={handleSaveChanges}
                        className="!rounded-lg "
                        disabled={Object.keys(userChanges).length === 0}
                    >
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Page
