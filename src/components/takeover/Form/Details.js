"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import CardWithInitials from "@/components/ui/CardWithInitials"
import InputField from "@/components/ui/form/Input"
import SearchInputHF from "@/components/ui/form/SearchInputHF"
import SelectHF from "@/components/ui/form/SelectHF"
import SingleSelect from "@/components/ui/form/SingleSelect"
import Modal from "@/components/ui/overlays/Modal"
import { useCheckExisitingUserQuery } from "@/redux/api/hotoApi"
import { Calendar as CalendarIcon, XIcon } from "lucide-react"
import React, { useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"

const items = [
    {
        label: "Santacruz",
        value: "santacruz"
    },
    {
        label: "Borivali",
        value: "borivali"
    },
    {
        label: "Andheri",
        value: "andheri"
    },
    {
        label: "Vikhroli",
        value: "vikhroli"
    }
]

export default function Details({ formState }) {
    const [newInviteModal, setNewInviteModal] = useState(false)
    const [newInvite, setNewInvite] = useState({
        name: "",
        email: "",
        type: "",
        phone: "",
        designation: ""
    })

    const { control, register } = useFormContext()
    const {
        fields: incomingFields,
        append: incomingAppend,
        remove: incomingRemove
    } = useFieldArray({
        control,
        name: "incoming_participant"
    })

    const {
        fields: outgoingFields,
        append: outgoingAppend,
        remove: outgoingRemove
    } = useFieldArray({
        control,
        name: "outgoing_participant"
    })
    const { isSuccess, data: existingUser } = useCheckExisitingUserQuery(
        newInvite.phone,
        {
            skip: !newInvite.phone || newInvite.phone.length < 10
        }
    )

    const handleSelect = (item, type) => {
        if (
            type === "incoming" &&
            !incomingFields.some((field) => field.value === item.value)
        ) {
            incomingAppend(item)
        }
        if (
            type === "outgoing" &&
            !outgoingFields.some((field) => field.value === item.value)
        ) {
            outgoingAppend(item)
        }
    }

    const handleRemove = (index, type) => {
        if (type === "incoming") incomingRemove(index)
        else if (type === "outgoing") outgoingRemove(index)
        else console.log("Invalid type")
    }

    const closeModal = () => {
        setNewInvite({
            name: "",
            email: "",
            type: "",
            phone: "",
            designation: ""
        })
        setNewInviteModal(false)
    }
    const openModal = (type) => {
        setNewInvite({ ...newInvite, type })
        setNewInviteModal(true)
    }

    const handleNewInviteChange = (e) => {
        setNewInvite({ ...newInvite, [e.target.name]: e.target.value })
    }

    const handleNewInviteSubmit = () => {
        if (isSuccess) return toast.error(existingUser.message)
        if (newInvite.type === "incoming") {
            incomingAppend(newInvite)
        } else if (newInvite.type === "outgoing") {
            outgoingAppend(newInvite)
        }
        closeModal()
    }

    return (
        <>
            <div className="flex justify-between items-end w-[830px] mb-2 mx-auto">
                <h3 className="font-bold text-xl">Basic Details</h3>
            </div>
            <div className=" w-full mx-auto pb-10 h-full overflow-y-auto">
                <div className=" flex flex-col gap-4 w-[830px] mx-auto">
                    <Card
                        title={"Details"}
                        className="space-y-4"
                    >
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="hoto_id"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                HOTO ID:
                            </label>
                            <InputField
                                id="hoto_id"
                                {...register("hoto_id")}
                                disabled={true}
                                className="block w-full mt-1"
                            />
                        </div>
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="subject"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                HOTO Name:
                            </label>
                            <InputField
                                id="hoto_name"
                                disabled={true}
                                {...register("hoto_name")}
                                className="block w-full mt-1"
                            />
                        </div>
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="subject"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                City:
                            </label>
                            <SelectHF
                                id="city"
                                name="city"
                                options={["New York", "Mumbai"]}
                                register={register}
                                placeholder="Select City"
                                disabled
                            />
                        </div>
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="subject"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Site:
                            </label>
                            <SelectHF
                                id="site"
                                name="Site"
                                options={["Site B", "Site A"]}
                                register={register}
                                placeholder="Select Site"
                                disabled
                            />
                        </div>

                        <div className="flex items-baseline">
                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                Date:
                            </label>
                            <div className="flex w-full gap-4">
                                <InputField
                                    id="date"
                                    type="date"
                                    name="date"
                                    className="w-full"
                                    placeholder="Start Date"
                                    {...register("date")}
                                    min={new Date().toISOString().split("T")[0]}
                                    error={formState.errors?.date?.message}
                                    rightIcon={
                                        <CalendarIcon
                                            className="w-4 h-4 text-gray-400"
                                            stroke="gray"
                                        />
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="subject"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Calendar:
                            </label>
                            <InputField
                                id="calendar"
                                {...register("calendar")}
                                rightIcon={
                                    <CalendarIcon
                                        className="w-4 h-4 text-gray-400"
                                        stroke="gray"
                                    />
                                }
                                className="block w-full mt-1"
                            />
                        </div>
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="subject"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Shift Time:
                            </label>
                            <SelectHF
                                id="shift_time"
                                name="shift_time"
                                options={[
                                    "Morning Shift 09 AM - 11 AM",
                                    "Afternoon Shift 11 AM - 4 AM"
                                ]}
                                register={register}
                                placeholder={"Select Shift Time"}
                            />
                        </div>
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="subject"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Handover By:
                            </label>
                            <SelectHF
                                id="handover_by"
                                name="handover_by"
                                options={["Shashank Sharma", "Person B"]}
                                register={register}
                                placeholder={"Select Handover By"}
                            />
                        </div>
                        <div className="flex items-center w-full justify-stretch">
                            <label
                                htmlFor="subject"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Takeover By:
                            </label>
                            <SelectHF
                                id="takeover_by"
                                name="takeover_by"
                                options={["Person A", "Person B"]}
                                register={register}
                                required={true}
                                placeholder={"Select Takeover By"}
                            />
                        </div>
                    </Card>

                    <Card
                        title="In-Coming Shift Participant"
                        className="space-y-4"
                    >
                        <div className="flex items-baseline w-full justify-stretch gap-6">
                            <SingleSelect
                                selectStyle=" h-10 "
                                options={["Camplus 1", "Camplus 2"]}
                                value={""}
                                onChange={() => {}}
                                placeholder={"Complex"}
                            />
                            <SingleSelect
                                selectStyle=" h-10 "
                                options={["Site 1", "Site 2"]}
                                value={""}
                                onChange={() => {}}
                                placeholder={"Site"}
                            />
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                Name:
                            </label>
                            <SearchInputHF
                                items={items}
                                selectedItems={incomingFields}
                                onSelect={(value) =>
                                    handleSelect(value, "incoming")
                                }
                                placeholder="Search Name or Email ID"
                            />
                        </div>
                        <div className="grid w-full grid-cols-3 gap-6">
                            {incomingFields.map((guest, index) => (
                                <CardWithInitials
                                    key={index}
                                    label={guest.label}
                                    view_only={false}
                                    onClickTrash={() =>
                                        handleRemove(index, "incoming")
                                    }
                                >
                                    <span className="text-sm">
                                        {guest.label}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {guest.role}
                                    </span>
                                    <span className="text-xs text-black">
                                        {guest.email}
                                    </span>
                                    <span className="text-xs text-black">
                                        {guest.phone}
                                    </span>
                                </CardWithInitials>
                            ))}
                        </div>
                        <Button
                            variant="custom"
                            className={"bg-white text-slate-500 rounded-lg"}
                            onClick={() => openModal("incoming")}
                        >
                            {"+ Add Invitees"}
                        </Button>
                    </Card>
                    <Card
                        title="Out-Going Shift Participant"
                        className="space-y-4"
                    >
                        <div className="flex items-baseline w-full justify-stretch gap-6">
                            <SingleSelect
                                selectStyle=" h-10 "
                                options={["Camplus 1", "Camplus 2"]}
                                value={""}
                                onChange={() => {}}
                                placeholder={"Complex"}
                            />
                            <SingleSelect
                                selectStyle=" h-10 "
                                options={["Site 1", "Site 2"]}
                                value={""}
                                onChange={() => {}}
                                placeholder={"Site"}
                            />
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                Name:
                            </label>
                            <SearchInputHF
                                items={items}
                                selectedItems={outgoingFields}
                                onSelect={(value) =>
                                    handleSelect(value, "outgoing")
                                }
                                placeholder="Search Name or Email ID"
                            />
                        </div>
                        <div className="grid w-full grid-cols-3 gap-6">
                            {outgoingFields.map((guest, index) => (
                                <CardWithInitials
                                    key={index}
                                    label={guest.label}
                                    view_only={false}
                                    onClickTrash={() =>
                                        handleRemove(index, "outgoing")
                                    }
                                >
                                    <span className="text-sm">
                                        {guest.label}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {guest.role}
                                    </span>
                                    <span className="text-xs text-black">
                                        {guest.email}
                                    </span>
                                    <span className="text-xs text-black">
                                        {guest.phone}
                                    </span>
                                </CardWithInitials>
                            ))}
                        </div>
                        <Button
                            variant="custom"
                            className={"bg-white text-slate-500 rounded-lg"}
                            onClick={() => openModal("outgoing")}
                        >
                            {"+ Add Invitees"}
                        </Button>
                    </Card>
                </div>
            </div>
            <Modal
                isOpen={newInviteModal}
                onClose={closeModal}
            >
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-black font-semibold capitalize">
                            Add New {newInvite.type} Participant
                        </h3>
                        <XIcon
                            onClick={closeModal}
                            className="w-5 h-5 cursor-pointer"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <InputField
                            id="name"
                            name="name"
                            value={newInvite.name}
                            placeholder="Name"
                            onChange={(e) => handleNewInviteChange(e)}
                        />
                        <InputField
                            id="designation"
                            name="designation"
                            value={newInvite.designation}
                            placeholder="Designation"
                            onChange={(e) => handleNewInviteChange(e)}
                        />
                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            value={newInvite.email}
                            placeholder="Email"
                            onChange={(e) => handleNewInviteChange(e)}
                        />
                        <InputField
                            placeholder="Phone"
                            name="phone"
                            id="phone"
                            type="tel"
                            value={newInvite.phone}
                            onChange={(e) => handleNewInviteChange(e)}
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <Button
                            variant="custom"
                            className="py-2 bg-white border rounded-lg text-slate-500 border-slate-300 hover:bg-white"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="py-2 text-white bg-blue-00 border border-blue-500 rounded-lg hover:bg-primary-100"
                            onClick={handleNewInviteSubmit}
                        >
                            Add User
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
