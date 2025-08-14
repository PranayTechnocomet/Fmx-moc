"use client"
import React from "react"
import Button from "./ui/Button"
import { Paperclip, Plus, Trash } from "lucide-react"
import InputField from "./ui/form/Input"
import SingleSelect from "./ui/form/SingleSelect"
import { useDispatch, useSelector } from "react-redux"
import {
    addPermit,
    removePermit,
    updatePermit
} from "@/redux/slices/permitSlice"

export default function EntryTabs({ handleFileChange }) {
    const dispatch = useDispatch()
    const { permits, attachments, fileName } = useSelector(
        (state) => state.permits
    )

    console.log("permits in entry tab", permits)

    return (
        <>
            <div>
                <table className="w-full mt-4 border rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 font-thin text-sm w-1/6">
                                Designation
                            </th>
                            <th className="p-2 font-thin text-sm w-1/6 text-start px-5">
                                Name
                            </th>
                            <th className="p-2 font-thin text-sm w-1/6 text-start px-5">
                                Mobile Number
                            </th>
                            <th className="p-2 font-thin text-sm w-1/6 text-start px-5">
                                Document Type
                            </th>
                            <th className="p-2 font-thin text-sm w-1/6 text-start px-5">
                                ID Number
                            </th>
                            <th className="p-2 font-thin text-sm w-1/6 text-start px-5">
                                Attachment
                            </th>
                            <th className="p-2 font-thin text-sm w-[10px] text-center">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {permits.map((permit, index) => (
                            <tr
                                key={permit.id}
                                className="flex flex-col md:table-row"
                            >
                                <td className="p-2 py-2.5 w-full md:w-auto">
                                    <SingleSelect
                                        options={
                                            index === 0
                                                ? [
                                                    {
                                                        label: "Supervisor",
                                                        value: "supervisor"
                                                    }
                                                ]
                                                : [
                                                    {
                                                        label: "Worker",
                                                        value: "worker"
                                                    },
                                                    {
                                                        label: "Helper",
                                                        value: "helper"
                                                    }
                                                ]
                                        }
                                        placeholder={
                                            index === 0
                                                ? "Supervisor"
                                                : "Select User Type *"
                                        }
                                        required={true}
                                        value={index === 0 ? "supervisor" : permit.designation}
                                        onChange={(value) => {
                                            dispatch(updatePermit({
                                                id: permit.id,
                                                field: 'designation',
                                                value: index === 0 ? "supervisor" : value
                                            }))
                                        }}
                                    />
                                </td>
                                <td className="p-2 py-2.5 w-full md:w-auto">
                                    <InputField
                                        type="text"
                                        placeholder="Name *"
                                        required={true}
                                        value={permit.name}
                                        onChange={(e) => {
                                            dispatch(updatePermit({
                                                id: permit.id,
                                                field: 'name',
                                                value: e.target.value
                                            }))
                                        }}
                                    />
                                </td>
                                <td className="p-2 py-2.5 w-full md:w-auto">
                                    <InputField
                                        type="number"
                                        placeholder="Number *"
                                        required={true}
                                        value={permit.phoneNumber}
                                        onChange={(e) => {
                                            dispatch(updatePermit({
                                                id: permit.id,
                                                field: 'phoneNumber',
                                                value: e.target.value
                                            }))
                                        }}
                                    />
                                </td>
                                <td className="p-2 py-2.5 w-full md:w-auto">
                                    <SingleSelect
                                        type="text"
                                        options={
                                            [
                                                {
                                                    label: "Aadhar Card",
                                                    value: "Aadhar Card"
                                                },
                                                {
                                                    label: "Driving License",
                                                    value: "Driving License"
                                                },
                                                {
                                                    label: "Voter ID",
                                                    value: "Voter ID"
                                                },
                                                {
                                                    label: "PAN Card",
                                                    value: "PAN Card"
                                                },
                                                {
                                                    label: "Passport",
                                                    value: "Passport"
                                                },
                                                {
                                                    label: "Company ID Card",
                                                    value: "Company ID Card"
                                                }
                                            ]
                                        }
                                        placeholder="Document Type *"
                                        required={true}
                                        value={permit.documentType}
                                        onChange={(value) => {
                                            dispatch(updatePermit({
                                                id: permit.id,
                                                field: 'documentType',
                                                value: value || ''
                                            }))
                                        }}
                                    />                                </td>
                                <td className="p-2 py-2.5 w-full md:w-auto">
                                    <InputField
                                        type="text"
                                        placeholder="Id Number *"
                                        required={true}
                                        value={permit.idNumber}
                                        onChange={(e) => {
                                            dispatch(updatePermit({
                                                id: permit.id,
                                                field: 'idNumber',
                                                value: e.target.value
                                            }))
                                        }}
                                    />
                                </td>
                                <td className="p-5 py-2.5 w-full md:w-auto">
                                    <div className="w-full">
                                        <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer text-gray-500 hover:border-gray-400">
                                            <Paperclip
                                                size={18}
                                                className="text-gray-400 rotate-45"
                                            />
                                            <span className="truncate">
                                                {fileName || "Attachment"}
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept=".jpg,.jpeg,.png,.doc,.dwg"
                                                required={true}
                                            />
                                        </label>
                                    </div>
                                </td>
                                <td className="p-2 py-2.5 flex justify-center w-full md:w-auto">
                                    <Button
                                        variant="outline"
                                        className={`border-0  ${permits.length === 1
                                            ? "opacity-35"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            dispatch(removePermit(permit.id))
                                        }
                                        disabled={permits.length === 1}
                                    >
                                        <Trash size={18} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-2">
                    <Button
                        variant="custom"
                        className="rounded-lg text-gray-500 font-semibold"
                        onClick={() => dispatch(addPermit())}
                    >
                        <Plus
                            size={18}
                            className="mt-1"
                        />{" "}
                        Add Worker
                    </Button>
                </div>
            </div>
        </>
    )
}
