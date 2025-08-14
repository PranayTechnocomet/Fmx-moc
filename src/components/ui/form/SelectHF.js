import React from "react"

const SelectHF = ({
    name,
    register,
    options,
    placeholder,
    className,
    required = false,
    ...props
}) => {
    return (
        <select
            name={name}
            {...register(name, {
                required: required
            })}
            className={
                "w-full px-4 py-2 border rounded-lg disabled:!bg-gray-100 disabled:border-slate-300 " +
                (className ? className : "")
            }
            {...props}
        >
            {placeholder && (
                <option
                    value=""
                    disabled
                >
                    {placeholder}
                </option>
            )}
            {options.map((option, index) => (
                <option
                    key={index}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    )
}

export default SelectHF
