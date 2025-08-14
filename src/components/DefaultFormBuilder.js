"use client"
import { PROJECT_PATHNAME } from "@/config/constants"
import { useCreateHotoFormMutation } from "@/redux/api/hotoApi"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { createContext, useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { CalendarDays } from "lucide-react"


import TabFormBlock from "./takeover/Form/TabFormBlock"
import Button from "./ui/Button"
import Card from "./ui/Card"
import CardWithInitials from "./ui/CardWithInitials"
import InputField from "./ui/form/Input"
import TextArea from "./ui/form/TextArea"
import Modal from "./ui/overlays/Modal"
import StepperProgressBar from "./ui/StepperProgressBar"
import DatePicker from "react-datepicker"
import DefaultCard from "./ui/DefaultCard"
import RadioButton from "./ui/form/RadioButton"
import DefaultFieldSetInput from "./ui/form/DefaultFieldSetInput"
import BulkUpload from "./ui/form/BulkUpload"
import ClientAssetListning from "./gatePass/ClientAssetListning"
import AssetsTable from "./moc/AssetsTable"

// Utility wrapper for input label formatting
export const InputLabelFormatWrapper = ({
    children,
    label,
    error,
    type,
    mendatory
}) => {
    return (
        <div
            className={
                "flex items-baseline w-full justify-stretch gap-3 " +
                (type === "CUSTOM_USER_BLOCK" ? "" : "!mb-6")
            }
        >
            <label className="block text-base font-medium text-gray-950 w-2/5">
                {label}{" "}
                <span className="text-red-600">{mendatory ? "*" : ""}</span>:
            </label>
            <div className="flex-col w-3/5">
                {children}
                {error && (
                    <span className="text-red-600 text-sm mt-2">{error}</span>
                )}
            </div>
        </div>
    )
}

// Add this new component at the top of your file
const CustomUserSearch = ({ options, onSelect, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)

    const filteredOptions = options?.filter((option) =>
        option.displayText.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="relative">
            <div className="relative">
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setShowDropdown(true)
                    }}
                    onFocus={() => setShowDropdown(true)}
                />
            </div>

            {showDropdown && filteredOptions?.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.map((option) => (
                        <div
                            key={option.displayId}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onSelect(option)
                                setSearchTerm("")
                                setShowDropdown(false)
                            }}
                        >
                            <div className="font-medium">
                                {option.displayText}
                            </div>
                            <div className="text-sm text-gray-600">
                                {option.userData.userDepartment}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// Simplified component map without react-hook-form
export const componentMap = {
    // DATE_TIME: ({ value, onChange, componentProps }) => {
    //     const now = new Date()
    //     const tzOffset = now.getTimezoneOffset() * 60000 // offset in milliseconds
    //     const localISO = new Date(now - tzOffset).toISOString().slice(0, 16)
    //     useEffect(() => {
    //         onChange(localISO)
    //     }, [])
    //     return (
    //         <InputLabelFormatWrapper
    //             label={componentProps.displayLable}
    //             error={componentProps.error}
    //             mendatory={componentProps.mendatory}
    //         >
    //             <InputField
    //                 id={componentProps.displayFiledName}
    //                 className="w-full"
    //                 type="datetime-local"
    //                 placeholder={componentProps.displayLable}
    //                 value={value || ""}
    //                 // disabled
    //                 onChange={(e) => onChange(e.target.value)}
    //             />
    //         </InputLabelFormatWrapper>
    //     )
    // },
    DATE_TIME_RANGE: ({ value, onChange, componentProps }) => {
        const fieldValue = value || ""
        return (
            <div className="flex items-center gap-4 mb-4 justify-between">
                {/* Label on Left */}
                {/* <label className="w-1/3 font-medium text-gray-700">
                    {componentProps.displayLable}
                    {componentProps.mendatory && <span className="text-red-500">*</span>}
                </label> */}
                <InputLabelFormatWrapper label={componentProps.displayLable}
                    error={componentProps.error}
                    mendatory={componentProps.mendatory}
                >

                    {/* Date Inputs on Right */}
                    <div className="flex gap-2 ">
                        <DefaultFieldSetInput
                            label={componentProps.displayLable}
                            type="date"
                            // placeholder={componentProps.displayLable}
                            placeholder="From Date & Time"
                            required
                            icon={CalendarDays}
                            value={fieldValue.split(" to ")[0] || ""}
                            className="w-full border border-gray-300 rounded outline-none focus:outline-none text-gray-600"
                            onChange={(e) => onChange(`${e.target.value} to ${fieldValue.split(" to ")[1] || ""}`)}
                        />
                        <span className="flex items-center text-gray-600">To</span>
                        <DefaultFieldSetInput
                            label={componentProps.displayLable}
                            type="date"
                            // placeholder={componentProps.displayLable}
                            placeholder="To Date & Time"
                            required
                            icon={CalendarDays}
                            value={fieldValue.split(" to ")[1] || ""}
                            className="w-full border border-gray-300 rounded outline-none focus:outline-none text-gray-600"
                            onChange={(e) => onChange(`${fieldValue.split(" to ")[0] || ""} to ${e.target.value}`)}
                        />
                    </div>
                    {/* <DefaultFieldSetInput
                        label={componentProps.displayLable}
                        type="date"
                        placeholder={componentProps.displayLable}
                        required
                        icon={CalendarDays}
                        value={fieldValue}
                        className="w-full border-0  outline-none focus:outline-none"
                        onChange={(e) => onChange(e.target.value)}
                    /> */}
                </InputLabelFormatWrapper>
            </div>
        )
    },

    DATE: ({ value, onChange, componentProps }) => {
        const [selectedDate, setSelectedDate] = useState(new Date())

        useEffect(() => {
            const now = new Date()
            setSelectedDate(now)
            onChange(formatToYYYYMMDD(now)) // Set value as yyyy-mm-dd
        }, [])

        const formatToYYYYMMDD = (date) => {
            const year = date.getFullYear()
            const month = `${date.getMonth() + 1}`.padStart(2, "0")
            const day = `${date.getDate()}`.padStart(2, "0")
            return `${year}-${month}-${day}` // yyyy-mm-dd
        }

        const handleChange = (date) => {
            setSelectedDate(date)
            onChange(formatToYYYYMMDD(date)) // Keep backend value consistent
        }

        return (
            <InputLabelFormatWrapper
                label={componentProps.displayLable}
                error={componentProps.error}
                mendatory={componentProps.mendatory}
            >
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd MMMM yyyy" // Display format: 10 July 2025
                    customInput={
                        <InputField
                            id={componentProps.displayFiledName}
                            className="w-full"
                            placeholder={
                                componentProps.placeholder || "dd-MMMM-yyyy"
                            }
                        />
                    }
                />
            </InputLabelFormatWrapper>
            //     <InputLabelFormatWrapper
            //     label={componentProps.displayLable}
            //     error={componentProps.error}
            // >
            //     <InputField
            //         id={componentProps.displayFiledName}
            //         className="w-full"
            //         type="date"
            //         placeholder={componentProps.displayLable}
            //         value={value || ""}
            //         // disabled
            //         onChange={(e) => onChange(e.target.value)}
            //     />
            // </InputLabelFormatWrapper>
        )
    },
    TIME: ({ value, onChange, componentProps }) => {
        const [selectedTime, setSelectedTime] = useState(null)

        useEffect(() => {
            const now = new Date()
            setSelectedTime(now)
            onChange(formatTimeTo24(now)) // Send HH:mm format
        }, [])

        const formatTimeTo24 = (date) => {
            const hours = date.getHours().toString().padStart(2, "0")
            const minutes = date.getMinutes().toString().padStart(2, "0")
            return `${hours}:${minutes}`
        }

        const handleChange = (date) => {
            setSelectedTime(date)
            onChange(formatTimeTo24(date))
        }

        return (
            <InputLabelFormatWrapper
                label={componentProps.displayLable}
                error={componentProps.error}
                mendatory={componentProps.mendatory}
            >
                <DatePicker
                    selected={selectedTime}
                    onChange={handleChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa" // shows time like 2:30 PM
                    customInput={
                        <InputField
                            id={componentProps.displayFiledName}
                            className="w-full"
                            placeholder="hh:mm AM/PM"
                        />
                    }
                />
            </InputLabelFormatWrapper>
        )
    },
    INPUT_BOX: ({ value, onChange, componentProps }) => (
        <InputLabelFormatWrapper
            label={componentProps.displayLable}
            error={componentProps.error}
            mendatory={componentProps.mendatory}
        >
            <InputField
                id={componentProps.displayFiledName}
                className="w-full"
                type={"text"}
                maxLength={componentProps?.maxlength}
                placeholder={componentProps.placeholder}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </InputLabelFormatWrapper>
    ),
    TEXT_AREA: ({ value, onChange, componentProps }) => (
        <InputLabelFormatWrapper
            label={componentProps.displayLable}
            error={componentProps.error}
            mendatory={componentProps.mendatory}
        >
            <TextArea
                id={componentProps.displayFiledName}
                className="w-full"
                placeholder={componentProps.placeholder}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                maxLength={componentProps.maxlength}
            />
        </InputLabelFormatWrapper>
    ),
    RADIO_BUTTON: ({ value, onChange, componentProps }) => (
        <InputLabelFormatWrapper
            label={componentProps.displayLable}
            error={componentProps.error}
            mendatory={componentProps.mendatory}
        >
            <RadioButton
                options={componentProps.options}
                value={value}
                onChange={onChange}
                error={componentProps.error}
                name={componentProps.displayFiledName}
            />
        </InputLabelFormatWrapper>
    ),
    TABLE: ({ value, onChange, componentProps }) => (
        // <ClientAssetListning />
        <AssetsTable className="shadow-lg rounded-lg" />
    ),
    FILE_UPLOAD: ({ value, onChange, componentProps }) => {
        return (
            <>
                <InputLabelFormatWrapper
                    label={componentProps.displayLable}
                    error={componentProps.error}
                    mendatory={componentProps.mendatory}
                    className="mb-1"
                />
                <BulkUpload
                    value={value}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />
            </>
        )
    },
    SELECT_BOX: ({ value, onChange, componentProps }) => {
        useEffect(() => {
            if (componentProps.displayOptions?.length === 1) {
                onChange(componentProps.displayOptions[0].displayId)
            }
        }, [])
        return (
            <InputLabelFormatWrapper
                label={componentProps.displayLable}
                error={componentProps.error}
                mendatory={componentProps.mendatory}
            >
                <select
                    className="w-full p-2 rounded border disabled:bg-gray-100 disabled:text-gray-950 disabled:border-slate-300 focus:outline-none"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={componentProps.displayOptions?.length === 1}
                >
                    <option value="" disabled style={{ color: '#6B7280' }}>
                        Select {componentProps.displayLable}
                    </option>
                    {componentProps.displayOptions?.map((option) => (
                        <option
                            key={option.displayId}
                            value={option.displayId}
                            style={{ color: '#1A201C' }}
                        >
                            {option.displayText}
                        </option>
                    ))}
                </select>
            </InputLabelFormatWrapper>
        )
    },
    CUSTOM_USER_BLOCK: ({ value, onChange, componentProps }) => {
        const [showModal, setShowModal] = useState(false)
        const [externalUserForm, setExternalUserForm] = useState({})
        const [externalUserErrors, setExternalUserErrors] = useState({})

        const handleUserSelect = (selected) => {
            if (!value.find((user) => user.displayId === selected.displayId)) {
                onChange([...value, selected])
            }
        }

        const handleRemoveUser = (userId) => {
            onChange(value.filter((user) => user.displayId !== userId))
        }

        const validateExternalUser = () => {
            const errors = {}
            let isValid = true

            componentProps.addExternalUserCompnents?.forEach((field) => {
                if (
                    field.mendatory &&
                    !externalUserForm[field.displayFiledName]
                ) {
                    errors[field.displayFiledName] =
                        field.displayAlertText || "This field is required"
                    isValid = false
                }
            })

            setExternalUserErrors(errors)
            return isValid
        }

        const handleExternalUserSubmit = () => {
            if (validateExternalUser()) {
                const newUser = {
                    displayId: `ext-${Date.now()}`,
                    displayText: externalUserForm.hju67ft, // Name field
                    userData: {
                        userId: `ext-${Date.now()}`,
                        userName: externalUserForm.hju67ft,
                        userDepartment: externalUserForm.vgh67tg, // Designation field
                        email: externalUserForm.ghye4er,
                        mobileNo: externalUserForm.vgh67tg,
                        isExternal: true
                    }
                }
                onChange([...value, newUser])
                setExternalUserForm({})
                setShowModal(false)
            }
        }

        return (
            <div className="border-t">
                <InputLabelFormatWrapper
                    label={componentProps.displayLable}
                    error={componentProps.error}
                    type={"CUSTOM_USER_BLOCK"}
                    mendatory={componentProps.mendatory}
                >
                    <div className="space-y-4 pt-4">
                        <CustomUserSearch
                            options={componentProps.userList}
                            onSelect={handleUserSelect}
                            placeholder={`Search ${componentProps.displayLable}`}
                        />

                        {componentProps.addExternalUser && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setShowModal(true)}
                            >
                                {componentProps.addExternalUserButtonTitle}
                            </Button>
                        )}
                    </div>
                </InputLabelFormatWrapper>

                <div className="grid grid-cols-3 gap-3 w-full my-4">
                    {value?.length > 0 &&
                        value.map((user, index) => (
                            <CardWithInitials
                                key={index}
                                label={user.displayText}
                                onClickTrash={() =>
                                    handleRemoveUser(user.displayId)
                                }
                                view_only={false}
                            >
                                <div className="flex flex-col justify-between items-start">
                                    <div className="text-lg font-semibold">
                                        {user.displayText}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {user.userData.userDepartment}
                                    </div>
                                </div>
                            </CardWithInitials>
                        ))}
                </div>

                {
                    <Modal
                        title={componentProps.addExternalUserButtonTitle}
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <div className="space-y-4">
                            {componentProps.addExternalUserCompnents?.map(
                                (field, index) => {
                                    const Component =
                                        componentMap[
                                        field.displayInputElementType
                                        ]
                                    if (!Component) return null

                                    return (
                                        <Component
                                            key={index}
                                            value={
                                                externalUserForm[
                                                field.displayFiledName
                                                ]
                                            }
                                            onChange={(value) =>
                                                setExternalUserForm((prev) => ({
                                                    ...prev,
                                                    [field.displayFiledName]:
                                                        value
                                                }))
                                            }
                                            componentProps={{
                                                ...field,
                                                error: externalUserErrors[
                                                    field.displayFiledName
                                                ]
                                            }}
                                        />
                                    )
                                }
                            )}
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleExternalUserSubmit}
                                >
                                    Add User
                                </Button>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        )
    },
    TAB_FORM_BLOCK: ({ value, onChange, componentProps }) => (
        <TabFormBlock
            formConfig={componentProps}
            value={value}
            onChange={(data) => {
                onChange(data)
            }}
        />
    )
}

// Context for form data
const FormContext = createContext()

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({})

    const updateFormData = (stepIndex, data) => {
        setFormData((prev) => ({ ...prev, [stepIndex]: data }))
    }

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    )
}

// FormBuilder Component
const DefaultFormBuilder = ({ formConfig, hotoId }) => {
    console.log("formConfig777", formConfig)

    const router = useRouter()
    const [activeStep, setActiveStep] = useState(0)
    const [formValues, setFormValues] = useState(() => [
        ...Array(formConfig?.formSteps?.length).fill({})
    ])
    const [errors, setErrors] = useState([{}])
    const [createHotoForm] = useCreateHotoFormMutation()

    const handleInputChange = ({ activeStep, id, value }) => {
        setFormValues((prev) => {
            const currentStepValues = prev[activeStep] || [{}]
            const newValues = [...prev]
            newValues[activeStep] = {
                ...currentStepValues,
                [id]: value
            }
            return newValues
        })
    }

    const validateStep = () => {
        const currentStepComponents = formConfig?.formSteps?.[activeStep]?.stepComponents
        if (!currentStepComponents) return true

        const newErrors = [{}]
        let isValid = true

        currentStepComponents.forEach((component) => {
            if (component.mendatory) {
                const value = formValues[activeStep]?.[component.displayFiledName]
                const isEmpty =
                    value === undefined || value === null || value === ""
                // ||isValidHotoFormTabObject(value)
                if (isEmpty) {
                    newErrors[activeStep][component.displayFiledName] =
                        "This field is required"
                    isValid = false
                }
            }
        })
        setErrors(newErrors)
        return isValid
    }

    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prev) =>
                Math.min(prev + 1, formConfig.formSteps.length - 1)
            )
        }
    }

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0))
    }

    const handleReset = () => {
        setFormValues({})
        setErrors({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateStep()) {
            createHotoForm({
                hotoId: hotoId,
                hotoFormData: formValues
            })
                .unwrap()
                .then((res) => {
                    console.log("res", res)

                    toast.success(res?.message || "Form submitted successfully")
                    router.push(PROJECT_PATHNAME)
                })
                .catch((err) => {
                    console.log(err)
                })
            // Handle form submission
        }
    }

    return (
        <form>
            {formConfig.formSteps?.[activeStep]?.sections?.[0]?.steps && (
                <StepperProgressBar
                    className="w-full"
                    activeStep={activeStep}
                    steps={formConfig.formSteps[activeStep].sections[0].steps}
                />
            )}
            <div className="overflow-y-auto h-[80vh] p-5 max-w-full mx-auto space-y-6 ">
                {formConfig.formSteps?.[activeStep]?.sections?.map((section, index) => (
                    <DefaultCard key={index}>
                        {section.formConfig?.map(
                            (formConfig, index) => (
                                <div key={index} >
                                    <div className="text-black font-semibold mb-3">
                                        {formConfig.stepName}
                                        {formConfig.stepDescription && (
                                            <p className="text-sm font-normal text-gray-400">
                                                {formConfig.stepDescription}
                                            </p>
                                        )}
                                    </div>
                                    {formConfig.stepComponents.map(
                                        (component, index) => {
                                            const Component =
                                                componentMap[
                                                component
                                                    .displayInputElementType
                                                ]
                                            console.log("Component", component)

                                            if (!Component) return null
                                                
                                            return (
                                                <Component 
                                                    key={index}
                                                    value={
                                                        [
                                                            "CUSTOM_USER_BLOCK",
                                                            "TAB_FORM_BLOCK"
                                                        ].includes(
                                                            component.displayInputElementType
                                                        )
                                                            ? formValues[
                                                                activeStep
                                                            ][
                                                                component
                                                                    .displayFiledName
                                                            ]
                                                                ? formValues[
                                                                activeStep
                                                                ][
                                                                component
                                                                    .displayFiledName
                                                                ]
                                                                : []
                                                            : !!formValues[
                                                                activeStep
                                                            ][
                                                                component
                                                                    .displayFiledName
                                                            ]
                                                                ? formValues[
                                                                activeStep
                                                                ][
                                                                component
                                                                    .displayFiledName
                                                                ]
                                                                : null
                                                    }
                                                    onChange={(value) => {
                                                        handleInputChange({
                                                            activeStep,
                                                            id: component.displayFiledName,
                                                            value
                                                        })
                                                    }}
                                                    componentProps={{
                                                        ...component,
                                                        error:
                                                            "TAB_FORM_BLOCK" !==
                                                                component.displayInputElementType
                                                                ? errors[
                                                                activeStep
                                                                ]?.[
                                                                component
                                                                    .displayFiledName
                                                                ]
                                                                : null
                                                    }}
                                                />
                                            )
                                        }
                                    )}
                                </div>
                            )
                        )}
                    </DefaultCard>
                ))}
            </div>
            <div className="flex items-center justify-between mx-auto mt-2 h-fit max-w-4xl px-5">
                {activeStep > 0 ? (
                    <button
                        type="button"
                        className="text-slate-700 inline-flex items-center gap-1"
                        onClick={handleBack}
                    >
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.13309 0.235012C6.81974 -0.0783373 6.31455 -0.0783373 6.0012 0.235012L0.68705 5.54916C0.43765 5.79856 0.43765 6.20144 0.68705 6.45084L6.0012 11.765C6.31455 12.0783 6.81974 12.0783 7.13309 11.765C7.44644 11.4516 7.44644 10.9464 7.13309 10.6331L2.5032 5.9968L7.13949 1.36051C7.44644 1.05356 7.44644 0.541966 7.13309 0.235012Z" fill="#686687" />
                        </svg>

                        Back
                    </button>
                ) : (
                    <div></div>
                )}

                <div className="flex items-center gap-4 mb-3">
                    <Button
                        // type="button"
                        variant="secondary"
                        className="text-slate-700 inline-flex items-center gap-1 bg-transparent"
                        onClick={handleReset}
                    >
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.13309 0.235012C6.81974 -0.0783373 6.31455 -0.0783373 6.0012 0.235012L0.68705 5.54916C0.43765 5.79856 0.43765 6.20144 0.68705 6.45084L6.0012 11.765C6.31455 12.0783 6.81974 12.0783 7.13309 11.765C7.44644 11.4516 7.44644 10.9464 7.13309 10.6331L2.5032 5.9968L7.13949 1.36051C7.44644 1.05356 7.44644 0.541966 7.13309 0.235012Z" fill="#686687" />
                        </svg>

                        Back
                    </Button>

                    {activeStep === formConfig.formSteps.length - 1 ? (
                        <Button
                            variant="primary"
                            className="w-40 rounded-lg"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit
                            {/* <ChevronRight /> */}
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            className="w-40 rounded-lg"
                            type="button"
                            onClick={handleNext}
                        >
                            Next
                            <ChevronRight />
                        </Button>
                    )}
                </div>
            </div>
        </form>
    )
}

export default DefaultFormBuilder
