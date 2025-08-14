"use client"

import Divider from "@/components/ui/Divider"
import Switch from "@/components/ui/form/Switch"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from "@tanstack/react-table"
import { BoltIcon, Eye, Globe, RotateCcw, Smartphone } from "lucide-react"
import React, { useMemo, useState } from "react"

const users = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    sr: `${i + 1}`.padStart(2, "0"),
    name: `User ${i + 1}`,
    employeeId: `EMP${(i + 1).toString().padStart(5, "0")}`,
    designation: `Designation ${(i % 5) + 1}`
}))

const departments = [
    { id: "dept-1", name: "IT" },
    { id: "dept-2", name: "HR" },
    { id: "dept-3", name: "Finance" },
    { id: "dept-4", name: "Marketing" }
]

const Page = () => {
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")
    const [userDepartmentSettings, setUserDepartmentSettings] = useState({})

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={(e) =>
                        table.toggleAllPageRowsSelected(e.target.checked)
                    }
                    className="w-4 h-4"
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={(e) => row.toggleSelected(e.target.checked)}
                    className="w-4 h-4"
                />
            )
        },
        { accessorKey: "sr", header: "Sr" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "employeeId", header: "Employee ID" },
        { accessorKey: "designation", header: "Designation" }
    ]

    const table = useReactTable({
        data: users,
        columns,
        state: { rowSelection, globalFilter },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const handleDepartmentChange = (userId, deptId, isChecked) => {
        setUserDepartmentSettings((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [deptId]: isChecked
                    ? {
                          isAdmin: false,
                          hasWebAccess: false,
                          hasMobileAccess: false,
                          isObserver: false,
                          roles: []
                      }
                    : undefined
            }
        }))
    }

    const handleSettingChange = (userId, deptId, setting, value) => {
        setUserDepartmentSettings((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [deptId]: {
                    ...prev[userId]?.[deptId],
                    [setting]: value
                }
            }
        }))
    }

    const handleRoleChange = (userId, deptId, role, isChecked) => {
        setUserDepartmentSettings((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [deptId]: {
                    ...prev[userId]?.[deptId],
                    roles: isChecked
                        ? [...(prev[userId]?.[deptId]?.roles || []), role]
                        : (prev[userId]?.[deptId]?.roles || []).filter(
                              (r) => r !== role
                          )
                }
            }
        }))
    }

    const handleSave = () => {
        const selectedUsers = Object.keys(rowSelection).map(
            (index) => users[parseInt(index)]
        )
        console.log("Saving changes for users:", selectedUsers)
        console.log("User department settings:", userDepartmentSettings)
        // Here you would typically call your API to save the changes
    }

    const handleReset = () => {
        setRowSelection({})
        setUserDepartmentSettings({})
    }

    const rows = Object.keys(rowSelection)

    return (
        <div className="container mx-auto px-4 mt-4 pb-4 rounded-lg bg-white">
            <div className="mt-4 flex overflow-hidden h-[80vh]">
                <div
                    className={` transition-all duration-300 ease-in-out ${
                        rows.length > 0 ? " w-1/2" : " w-full"
                    }`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">User Management</h1>
                        <input
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="p-2 px-3 font-lg shadow border rounded-lg"
                            placeholder="Search..."
                        />
                    </div>

                    <div className="overflow-y-auto h-[72vh] border rounded-lg">
                        <table className="min-w-full bg-white">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
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
                                                className={
                                                    "px-6 py-4 whitespace-no-wrap border-b border-gray-200 " +
                                                    (rowSelection[row.id]
                                                        ? "bg-blue-700/10"
                                                        : "")
                                                }
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
                </div>
                <div
                    className={` ml-4 transition-all duration-300 ease-in-out px-2  ${
                        rows.length > 0 ? "opacity-100 w-1/2" : "opacity-0 w-0"
                    }`}
                >
                    <h2 className="text-xl font-semibold mt-3 mb-4 ">
                        Department Settings
                    </h2>
                    <div className="h-[72vh] overflow-auto px-2">
                        {departments.map((dept) => (
                            <div
                                key={dept.id}
                                className={
                                    "mb-4 p-4 border rounded-lg  bg-gray-50"
                                }
                            >
                                <label className="flex items-center mb-2">
                                    <div className="inline-flex items-center">
                                        <label className="flex items-center cursor-pointer relative">
                                            <input
                                                checked={rows.some(
                                                    (userId) =>
                                                        userDepartmentSettings[
                                                            users[
                                                                parseInt(userId)
                                                            ].id
                                                        ]?.[dept.id]
                                                )}
                                                onChange={(e) => {
                                                    Object.keys(
                                                        rowSelection
                                                    ).forEach((userId) => {
                                                        handleDepartmentChange(
                                                            users[
                                                                parseInt(userId)
                                                            ].id,
                                                            dept.id,
                                                            e.target.checked
                                                        )
                                                    })
                                                }}
                                                type="checkbox"
                                                className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-blue-700 checked:border-blue-700"
                                                id="check-custom-style"
                                            />
                                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3.5 w-3.5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeWidth={1}
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex flex-col pl-4 gap-2">
                                        <span className="font-semibold text-sm">
                                            {dept.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Shift Time: 7 AM - 3PM, 2PM - 10 PM,
                                            10 PM - 7 AM
                                        </span>
                                    </div>
                                </label>

                                {rows.some(
                                    (userId) =>
                                        userDepartmentSettings[
                                            users[parseInt(userId)].id
                                        ]?.[dept.id]
                                ) && (
                                    <div className="ml-6">
                                        <Divider title="Role" />
                                        <div
                                            className={
                                                "flex items-center mb-2 gap-2 border p-4 rounded-lg bg-blue-700/10 justify-between " +
                                                (rows.every(
                                                    (userId) =>
                                                        userDepartmentSettings[
                                                            users[
                                                                parseInt(userId)
                                                            ].id
                                                        ]?.[dept.id]?.isAdmin
                                                )
                                                    ? " border-blue-700"
                                                    : "")
                                            }
                                        >
                                            <span className="text-sm">
                                                Admin
                                            </span>
                                            <Switch
                                                checked={rows.every(
                                                    (userId) =>
                                                        userDepartmentSettings[
                                                            users[
                                                                parseInt(userId)
                                                            ].id
                                                        ]?.[dept.id]?.isAdmin
                                                )}
                                                onChange={(e) => {
                                                    Object.keys(
                                                        rowSelection
                                                    ).forEach((userId) => {
                                                        handleSettingChange(
                                                            users[
                                                                parseInt(userId)
                                                            ].id,
                                                            dept.id,
                                                            "isAdmin",
                                                            e.target.checked
                                                        )
                                                    })
                                                }}
                                                name="isAdmin"
                                                color="primary"
                                            />
                                        </div>

                                        <Divider title="Platform" />
                                        <div className="flex w-full gap-4">
                                            <div
                                                className={
                                                    "flex items-center mb-2 gap-2 border p-4 rounded-lg bg-blue-700/10 justify-between w-full " +
                                                    (Object.keys(
                                                        rowSelection
                                                    ).every(
                                                        (userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[dept.id]
                                                                ?.hasWebAccess
                                                    )
                                                        ? " border-blue-700"
                                                        : "")
                                                }
                                            >
                                                <span className="flex items-center gap-2">
                                                    <Globe color="#153ac7" />
                                                    Web{" "}
                                                </span>
                                                <Switch
                                                    checked={Object.keys(
                                                        rowSelection
                                                    ).every(
                                                        (userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[dept.id]
                                                                ?.hasWebAccess
                                                    )}
                                                    onChange={(e) => {
                                                        Object.keys(
                                                            rowSelection
                                                        ).forEach((userId) => {
                                                            handleSettingChange(
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id,
                                                                dept.id,
                                                                "hasWebAccess",
                                                                e.target.checked
                                                            )
                                                        })
                                                    }}
                                                    name="hasWebAccess"
                                                    color="primary"
                                                />
                                            </div>
                                            <div
                                                className={
                                                    "flex items-center mb-2 gap-2 border p-4 rounded-lg bg-blue-700/10 justify-between w-full " +
                                                    (Object.keys(
                                                        rowSelection
                                                    ).every(
                                                        (userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[dept.id]
                                                                ?.hasMobileAccess
                                                    )
                                                        ? " border-blue-700"
                                                        : "")
                                                }
                                            >
                                                <span className="inline-flex gap-2 text-sm">
                                                    <Smartphone color="#153ac7" />
                                                    Mobile{" "}
                                                </span>
                                                <Switch
                                                    checked={Object.keys(
                                                        rowSelection
                                                    ).every(
                                                        (userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[dept.id]
                                                                ?.hasMobileAccess
                                                    )}
                                                    onChange={(e) => {
                                                        Object.keys(
                                                            rowSelection
                                                        ).forEach((userId) => {
                                                            handleSettingChange(
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id,
                                                                dept.id,
                                                                "hasMobileAccess",
                                                                e.target.checked
                                                            )
                                                        })
                                                    }}
                                                    name="hasMobileAccess"
                                                    color="primary"
                                                />
                                            </div>
                                        </div>

                                        <Divider title="Access Control" />

                                        <div
                                            className={
                                                "flex items-center mb-4 gap-2 p-4 rounded-lg justify-between w-fit "
                                            }
                                        >
                                            <span className="inline-flex gap-2 mr-2">
                                                <BoltIcon color="#153ac7" />
                                                Manage
                                            </span>
                                            <Switch
                                                checked={rows.every(
                                                    (userId) =>
                                                        userDepartmentSettings[
                                                            users[
                                                                parseInt(userId)
                                                            ].id
                                                        ]?.[dept.id]?.isObserver
                                                )}
                                                onChange={(e) => {
                                                    Object.keys(
                                                        rowSelection
                                                    ).forEach((userId) => {
                                                        handleSettingChange(
                                                            users[
                                                                parseInt(userId)
                                                            ].id,
                                                            dept.id,
                                                            "isObserver",
                                                            e.target.checked
                                                        )
                                                    })
                                                }}
                                                name="isObserver"
                                                color="primary"
                                            />
                                            <span className="inline-flex gap-2 ml-2">
                                                <Eye color="#153ac7" />
                                                Observer
                                            </span>
                                        </div>
                                        {!rows.every(
                                            (userId) =>
                                                userDepartmentSettings[
                                                    users[parseInt(userId)].id
                                                ]?.[dept.id]?.isObserver
                                        ) && (
                                            <div className="flex w-full gap-4">
                                                <div
                                                    className={
                                                        "flex items-center mb-2 gap-2 border p-4 rounded-lg bg-blue-700/10 justify-between w-full " +
                                                        (Object.keys(
                                                            rowSelection
                                                        ).every((userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[
                                                                dept.id
                                                            ]?.roles.includes(
                                                                "Team Lead"
                                                            )
                                                        )
                                                            ? " border-blue-700"
                                                            : "")
                                                    }
                                                >
                                                    <span className="flex items-center gap-2">
                                                        Team Lead
                                                    </span>
                                                    <Switch
                                                        checked={Object.keys(
                                                            rowSelection
                                                        ).every((userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[
                                                                dept.id
                                                            ]?.roles.includes(
                                                                "Team Lead"
                                                            )
                                                        )}
                                                        onChange={(e) => {
                                                            Object.keys(
                                                                rowSelection
                                                            ).forEach(
                                                                (userId) => {
                                                                    handleRoleChange(
                                                                        users[
                                                                            parseInt(
                                                                                userId
                                                                            )
                                                                        ].id,
                                                                        dept.id,
                                                                        "Team Lead",
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            )
                                                        }}
                                                        name="Team Lead"
                                                        color="primary"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        "flex items-center mb-2 gap-2 border p-4 rounded-lg bg-blue-700/10 justify-between w-full " +
                                                        (Object.keys(
                                                            rowSelection
                                                        ).every((userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[
                                                                dept.id
                                                            ]?.roles.includes(
                                                                "USER"
                                                            )
                                                        )
                                                            ? " border-blue-700"
                                                            : "")
                                                    }
                                                >
                                                    <span className="flex items-center gap-2">
                                                        User
                                                    </span>
                                                    <Switch
                                                        checked={Object.keys(
                                                            rowSelection
                                                        ).every((userId) =>
                                                            userDepartmentSettings[
                                                                users[
                                                                    parseInt(
                                                                        userId
                                                                    )
                                                                ].id
                                                            ]?.[
                                                                dept.id
                                                            ]?.roles.includes(
                                                                "USER"
                                                            )
                                                        )}
                                                        onChange={(e) => {
                                                            Object.keys(
                                                                rowSelection
                                                            ).forEach(
                                                                (userId) => {
                                                                    handleRoleChange(
                                                                        users[
                                                                            parseInt(
                                                                                userId
                                                                            )
                                                                        ].id,
                                                                        dept.id,
                                                                        "USER",
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            )
                                                        }}
                                                        name="USER"
                                                        color="primary"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {rows.length > 0 && (
                <div className="flex justify-end gap-2">
                    {/* // reset buttton */}
                    <button
                        onClick={handleReset}
                        className="mt-4 px-4 py-2  text-gray-600 rounded-lg  inline-flex gap-2 items-center"
                    >
                        <RotateCcw className="w-4 h-auto" />
                        Reset
                    </button>
                    <button
                        onClick={handleSave}
                        className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    )
}

export default Page
