import React from "react"
import SingleDropdown from "./SingleDropdown"
import InputField from "./Input"
import { CalendarDays } from "lucide-react"
import DefaultFieldSetInput from "./DefaultFieldSetInput"
// import DefaultFieldSetInput from "@/components/asset/DefaultFieldSetInput"

const FieldSetInput = ({ fields, formData, handleChange, dropdownFields, assetQty, optDropdownnFields }) => {
    return (
        <div className="flex-1 p-2">
            <div className="gap-4">
                {fields.map((field, index) => {
                    const fieldName = field.label.toLowerCase().replace(/\s+/g, "")
                    const fieldValue = formData[fieldName] || ""
                    const totalAmount = formData.rateperunit * assetQty;
                    return (
                        <fieldset key={index} className="border rounded-lg">
                            <legend className="text-sm px-2 text-gray-400">
                                {field.label}
                            </legend>
                            {field.type === "dropdown" ? (
                                <SingleDropdown
                                    name={fieldName}
                                    options={dropdownFields[fieldName] || []}
                                    value={fieldValue}
                                    onChange={(value) => handleChange(fieldName, value)}
                                    className="w-full border-0 py-2 px-2 focus:outline-none"
                                />
                            ) : field.type === "textarea" ? (
                                <textarea
                                    value={fieldValue}
                                    onChange={(e) => handleChange(fieldName, e.target.value)}
                                    className="w-full border-0 py-2 px-2 focus:outline-none"
                                />
                            ) : field.readOnly ? (
                                <input
                                    type={field.type}
                                    value={totalAmount || 0}
                                    onChange={(e) => handleChange(fieldName, e.target.value)}
                                    className="w-full border-0 py-2 px-2 focus:outline-none"
                                    readOnly
                                />
                            ) : field.type === "optDropdown" ? (
                                <select
                                    // placeholder="Select an option"
                                    name={fieldName}
                                    options={optDropdownnFields[fieldName] || []}
                                    value={fieldValue || ""}
                                    onChange={(e) => handleChange(fieldName, e.target.value)}
                                    className="w-full border-0 py-2 px-2 focus:outline-none"
                                >
                                    <option value="">Select an option</option>
                                    {optDropdownnFields[fieldName] &&
                                        Object.entries(optDropdownnFields[fieldName]).map(([group, options]) => (
                                            <optgroup key={group} label={group}>
                                                {Array.isArray(options)
                                                    ? options.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))
                                                    : null}
                                            </optgroup>
                                        ))}
                                </select>
                            ) : field.type === "date" ? (
                                <DefaultFieldSetInput
                                    label={field.label}
                                    type="date"
                                    placeholder={field.label}
                                    required
                                    icon={CalendarDays}
                                    value={fieldValue}
                                    className="w-full border-0  outline-none focus:outline-none"
                                    onChange={(e) => handleChange(fieldName, e.target.value)}
                                />
                            ) : (
                                <input
                                    type={field.type || "text"}
                                    value={fieldValue}
                                    placeholder={field.label}
                                    onChange={(e) => handleChange(fieldName, e.target.value)}
                                    className="w-full border-0 py-2 px-2 focus:outline-none"
                                />
                            )}
                        </fieldset>
                    )
                })}
            </div>
        </div>
    )
}

export default FieldSetInput
