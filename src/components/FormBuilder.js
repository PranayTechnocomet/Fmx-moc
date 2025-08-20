'use client'
import { CM_LISTING, PROJECT_PATHNAME } from "@/config/constants"
import { useCreateHotoFormMutation } from "@/redux/api/hotoApi"
import { CalendarDays, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { createContext, useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"

import TabFormBlock from "./takeover/Form/TabFormBlock"
import Button from "./ui/Button"
import Card from "./ui/Card"
import CardWithInitials from "./ui/CardWithInitials"
import InputField from "./ui/form/Input"
import TextArea from "./ui/form/TextArea"
import Modal from "./ui/overlays/Modal"
import StepperProgressBar from "./ui/StepperProgressBar"
import RadioButton from "./ui/form/RadioButton"
import DefaultFieldSetInput from "./ui/form/DefaultFieldSetInput"
import DropdownInput from "./ui/form/DropdownInput"
import BulkUpload from "./ui/form/BulkUpload"
import AssetsTable from "./moc/AssetsTable"
import GatePassProfile from "./gatePass/GatePassProfile"
import OprationDetails from "./moc/OprationDetails"
import SparesTable from "./moc/SparesTable"
// import { onChange } from "react-toastify/dist/core/store"
import CustomerAffected from "./moc/CustomerAffected"
import DescriptionAttachments from "./moc/DescriptionAttachments"
import { useCreateMocFormMutation } from "@/redux/api/MocApis"
import { useSelector } from "react-redux"
import { useMoc } from "@/hooks/useMoc"

// Utility wrapper for input label formatting
export const InputLabelFormatWrapper = ({ children, label, error, type }) => {
    return (
        <div
            className={
                "flex items-baseline w-full justify-stretch gap-3 " +
                (type === "CUSTOM_USER_BLOCK" ? "" : "!mb-6")
            }
        >
            <label className="block text-base font-medium text-gray-700 w-2/5">
                {label}:
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
    DATE_TIME: ({ value, onChange, componentProps }) => {
        const now = new Date()
        const tzOffset = now.getTimezoneOffset() * 60000 // offset in milliseconds
        const localISO = new Date(now - tzOffset).toISOString().slice(0, 16)
        useEffect(() => {
            onChange(localISO)
        }, [])

        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );
        return (
            <InputLabelFormatWrapper
                label={labelWithAsterisk}
                error={componentProps.error}
            >
                <InputField
                    id={componentProps.displayFiledName}
                    className="w-full"
                    type="datetime-local"
                    placeholder={labelWithAsterisk}
                    value={value || ""}
                    // disabled
                    onChange={(e) => onChange(e.target.value)}
                />
            </InputLabelFormatWrapper>
        )
    },
    FROM_TO_DATE_TIME: ({ value, onChange, componentProps }) => {
        const fieldValue = value || ""

        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );
        return (
            <div className="flex items-center gap-4 mb-4 justify-between">
                {/* Label on Left */}
                {/* <label className="w-1/3 font-medium text-gray-700">
                           {componentProps.displayLable}
                           {componentProps.mendatory && <span className="text-red-500">*</span>}
                       </label> */}
                <InputLabelFormatWrapper label={labelWithAsterisk}
                    error={componentProps.error}
                    mendatory={componentProps.mendatory && <span className="text-red-500">*</span>}
                >

                    {/* Date Inputs on Right */}
                    <div className="flex gap-2 ">
                        <DefaultFieldSetInput
                            label={labelWithAsterisk}
                            type="date"
                            // placeholder={labelWithAsterisk}
                            placeholder="From Date & Time"
                            required
                            icon={CalendarDays}
                            value={fieldValue.split(" to ")[0] || ""}
                            className="w-full border border-gray-300 rounded outline-none focus:outline-none text-gray-600"
                            onChange={(e) => onChange(`${e.target.value} to ${fieldValue.split(" to ")[1] || ""}`)}
                        />
                        <span className="flex items-center text-gray-600">To</span>
                        <DefaultFieldSetInput
                            label={labelWithAsterisk}
                            type="date"
                            // placeholder={labelWithAsterisk}
                            placeholder="To Date & Time"
                            required
                            icon={CalendarDays}
                            value={fieldValue.split(" to ")[1] || ""}
                            className="w-full border border-gray-300 rounded outline-none focus:outline-none text-gray-600"
                            onChange={(e) => onChange(`${fieldValue.split(" to ")[0] || ""} to ${e.target.value}`)}
                        />
                    </div>

                </InputLabelFormatWrapper>
            </div>
        )
    },
    DATE: ({ value, onChange, componentProps }) => {
        const [selectedDate, setSelectedDate] = useState(new Date());

        useEffect(() => {
            const now = new Date();
            setSelectedDate(now);
            onChange(formatToYYYYMMDD(now)); // Set value as yyyy-mm-dd
        }, []);

        const formatToYYYYMMDD = (date) => {
            const year = date.getFullYear();
            const month = `${date.getMonth() + 1}`.padStart(2, "0");
            const day = `${date.getDate()}`.padStart(2, "0");
            return `${year}-${month}-${day}`; // yyyy-mm-dd
        };

        const handleChange = (date) => {
            setSelectedDate(date);
            onChange(formatToYYYYMMDD(date)); // Keep backend value consistent
        };

        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );
        return (

            <InputLabelFormatWrapper
                label={labelWithAsterisk}
                error={componentProps.error}
            >
                <InputField
                    id={componentProps.displayFiledName}
                    className="w-full"
                    type="date"
                    placeholder={labelWithAsterisk}
                    value={value || ""}
                    // disabled
                    onChange={(e) => onChange(e.target.value)}
                />
            </InputLabelFormatWrapper>
        );
    },
    TIME: ({ value, onChange, componentProps }) => {
        const [selectedTime, setSelectedTime] = useState(null);

        useEffect(() => {
            const now = new Date();
            setSelectedTime(now);
            onChange(formatTimeTo24(now)); // Send HH:mm format
        }, []);

        const formatTimeTo24 = (date) => {
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
        };

        const handleChange = (date) => {
            setSelectedTime(date);
            onChange(formatTimeTo24(date));
        };

        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );

        return (
            <InputLabelFormatWrapper
                label={labelWithAsterisk}
                error={componentProps.error}
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
        );
    },
    INPUT_BOX: ({ value, onChange, componentProps }) => {
        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );
        useEffect(() => {
            if (componentProps?.disabled) {
                onChange(componentProps?.defaultValue ?? "");
            }
        }, [componentProps?.disabled]);


        const inputValue = value ?? componentProps?.defaultValue ?? "";

        return (
            <>
                <InputLabelFormatWrapper
                    label={labelWithAsterisk}
                    error={componentProps.error}
                >
                    <InputField
                        id={componentProps.displayFiledName}
                        className="w-full disabled:bg-gray-100 disabled:text-gray-950 disabled:border-slate-300"
                        type={"text"}
                        maxLength={componentProps?.maxlength}
                        placeholder={componentProps.displayLable}
                        // value={value || ""}
                        value={inputValue}

                        onChange={(e) => onChange(e.target.value)}
                        disabled={componentProps?.disabled}

                    />
                </InputLabelFormatWrapper>
            </>
        )

    },
    TEXT_AREA: ({ value, onChange, componentProps }) => {
        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );
        return (

            <InputLabelFormatWrapper
                label={labelWithAsterisk}
                error={componentProps.error}
            // mendatory={componentProps.mendatory}

            >
                <TextArea
                    id={componentProps.displayFiledName}
                    className="w-full"
                    placeholder={componentProps.displayLable}
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={componentProps.maxlength}
                />
            </InputLabelFormatWrapper>
        )
    },
    SELECT_BOX: ({ value, onChange, componentProps }) => {
        useEffect(() => {
            if (componentProps?.displayOptions?.length === 1) {
                onChange(componentProps?.displayOptions[0].displayId)
            }
        }, [])

        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );
        return (
            <InputLabelFormatWrapper
                label={labelWithAsterisk}
                error={componentProps.error}
            >
                <select
                    className="w-full p-2 rounded border disabled:bg-gray-100 disabled:text-gray-950 disabled:border-slate-300 focus:outline-none"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={componentProps?.displayOptions?.length === 1}
                >
                    <option key="0" value="" disabled className="text-red-100">
                        Select{componentProps.displayLable}
                    </option>
                    {componentProps?.displayOptions?.map((option, index) => (
                        <option key={index + 1} value={option.displayId}>
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

        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );

        return (
            <div className="border-t">
                <InputLabelFormatWrapper
                    label={labelWithAsterisk}
                    error={componentProps.error}
                    type={"CUSTOM_USER_BLOCK"}
                >
                    <div className="space-y-4 pt-4">
                        <CustomUserSearch
                            options={componentProps.userList}
                            onSelect={handleUserSelect}
                            placeholder={`Search ${labelWithAsterisk}`}
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
    ),
    RADIO_BUTTON: ({ value, onChange, componentProps }) => {
        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
            </span>
        );
        return (
            <InputLabelFormatWrapper
                label={labelWithAsterisk}
                error={componentProps.error}
            >
                <RadioButton
                    options={componentProps.displayOptions}
                    value={value}
                    onChange={onChange}
                // error={componentProps.error}
                />
            </InputLabelFormatWrapper>
        )
    },
    // INPUT_SELECT_TIME: ({ value, onChange, componentProps }) => {
    //     const [duration, setDuration] = useState('')
    //     const [unit, setUnit] = useState('Hrs')
    //     const labelWithAsterisk = (
    //         <span>
    //             {componentProps.displayLable}
    //             {componentProps?.mendatory && <span className="text-red-500 pl-1">*</span>}
    //         </span>
    //     );
    //     return (
    //         <>
    //             <InputLabelFormatWrapper
    //                 label={labelWithAsterisk}
    //                 error={componentProps.error}

    //             >
    //                 <DropdownInput
    //                     id={componentProps.displayFiledName}
    //                     className="w-full flex"
    //                     type="number"
    //                     placeholder={componentProps.displayLable}
    //                     value={duration}
    //                     // onChange={(e) => setDuration(e.target.value)}
    //                     onChange={(e) => onChange(e.target.value)}
    //                     dropdownValue={unit}
    //                     onDropdownChange={(e) => setUnit(e.target.value)}
    //                     options={['Hrs', 'Min']}
    //                 />
    //             </InputLabelFormatWrapper>

    //         </>
    //     )
    // },
    INPUT_SELECT_TIME: ({ value, onChange, componentProps }) => {
        const labelWithAsterisk = (
            <span>
                {componentProps.displayLable}
                {componentProps?.mendatory && (
                    <span className="text-red-500 pl-1">*</span>
                )}
            </span>
        );

        // Extract duration & unit from parent value
        let duration = value?.duration || "";
        let unit = value?.unit || "Hrs";

        return (
            <InputLabelFormatWrapper
                label={labelWithAsterisk}
                error={componentProps.error}
            >
                <DropdownInput
                    id={componentProps.displayFiledName}
                    className="w-full flex"
                    type="number"
                    placeholder={componentProps.displayLable}
                    value={duration}
                    onChange={(e) =>
                        onChange({ duration: e.target.value, unit })
                    }
                    dropdownValue={unit}
                    onDropdownChange={(e) =>
                        onChange({ duration, unit: e.target.value })
                    }
                    options={["Hrs", "Min"]}
                />
            </InputLabelFormatWrapper>
        );
    },

    CUSTOM_BLOCK_ASSETS: ({ value, onChange, componentProps }) => (
        <AssetsTable className="shadow-lg rounded-lg" />
    ),
    ATTACHMENT: ({ value, onChange, componentProps }) => {
        return (
            <>
                <BulkUpload
                    value={value}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />
            </>
        )
    },
    CUSTOM_BLOCK_OPERATIONAL_COMPLIANCE: ({ value, onChange, componentProps }) => {

        return (
            <>
                <OprationDetails
                    value={value}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />
            </>
        )
    },
    CUSTOM_BLOCK_SPARES: ({ value, onChange, componentProps }) => {

        return (
            <>
                <SparesTable
                    value={value}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />
            </>
        )
    },
    CUSTOM_BLOCK_CUSTOMER_AFFECTED: ({ value, onChange, componentProps }) => {

        return (
            <>
                <CustomerAffected
                    value={value}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />

            </>
        )
    },
    CUSTOM_BLOCK_IMPLEMENTATION: ({ value, onChange, componentProps }) => {
        return (
            <>
                <DescriptionAttachments
                    value={value || [{ id: Date.now(), description: "", filePath: "", fileName: "" }]}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />

            </>
        )
    },
    CUSTOM_BLOCK_BACKOUT: ({ value, onChange, componentProps }) => {
        return (
            <>
                <DescriptionAttachments
                    value={value || [{ id: Date.now(), description: "", filePath: "", fileName: "" }]}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />

            </>
        )
    },
    CUSTOM_BLOCK_PRECHANGE_TESTING: ({ value, onChange, componentProps }) => {
        return (
            <>
                <DescriptionAttachments
                    value={value || [{ id: Date.now(), description: "", filePath: "", fileName: "" }]}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />

            </>
        )
    },
    CUSTOM_BLOCK_POSTCHANGE_TESTING: ({ value, onChange, componentProps }) => {
        return (
            <>
                <DescriptionAttachments
                    value={value || [{ id: Date.now(), description: "", filePath: "", fileName: "" }]}
                    onChange={onChange}
                    componentProps={componentProps}
                    className="mb-4"
                />

            </>
        )
    },
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

// ================ FormBuilder Component =================
const FormBuilder = ({ formConfig, isGridLayout }) => {
    console.log("formConfigDetails--->", formConfig);

    const router = useRouter()
    const [activeStep, setActiveStep] = useState(0)
    const [errors, setErrors] = useState([{}])
    const [createMocForm] = useCreateMocFormMutation()
    const [formValues, setFormValues] = useState(() =>
        Array.from({ length: formConfig?.formSteps?.length || 0 }, () => ({}))
    );

    const handleInputChange = ({ activeStep, id, value }) => {
        setFormValues((prev) => {
            const newValues = [...prev];

            newValues[activeStep] = {
                ...(prev[activeStep] || {}),
                [id]: value
            };

            return newValues;
        });
    };


    const validateStep = () => {
        const currentStepComponents = groupedComponents[activeStep] || []
        const newErrors = [...errors]
        let isValid = true

        currentStepComponents.forEach((component) => {
            if (component.mendatory) {
                const value = formValues[activeStep]?.[component.displayFiledName]
                const isEmpty =
                    value === undefined || value === null || value === ""

                if (isEmpty) {
                    if (!newErrors[activeStep]) newErrors[activeStep] = {}

                    // Use API's displayAlertText if available, else fallback
                    newErrors[activeStep][component.displayFiledName] =
                        component.displayAlertText || "This field is required"

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
        setActiveStep(0)
    }

    // =============== Handle Submit ==================== 
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateStep()) {
            try {
                // normalize step-wise formValues into single object
                const normalizeMocFormData = (mocFormData) => {
                    if (!Array.isArray(mocFormData)) return mocFormData;

                    return mocFormData.reduce((acc, item) => {
                        return {
                            ...acc,
                            ...Object.fromEntries(
                                Object.entries(item).map(([key, value]) => {
                                    if (Array.isArray(value)) {
                                        return [key, value];
                                    }
                                    return [key, value];
                                })
                            ),
                        };
                    }, {});
                };

                const mergedFormValues = normalizeMocFormData(formValues);

                // merge attachments properly
                // const finalFormData = {
                //     ...mergedFormValues,
                // };

                const payload = {
                    mocConfigId: formConfig?.mocConfigId,
                    mocNo: formConfig?.mocNo,
                    mocFormData: mergedFormValues,
                };
                console.log("MOC Form API Payload:", payload);

                const res = await createMocForm(payload).unwrap();

                if (res.success) {
                    toast.success(res.message || "Form submitted successfully");
                    router.push(CM_LISTING);
                } else {
                    toast.error(res.error || res.message || "Submission failed");
                }
            } catch (err) {
                console.error("MOC Form Submit Error:", err);
                toast.error(err?.data?.message || err?.message || "Submission failed");
            }
        }
    };

    // Get Step Components
    const stepComponents = formConfig?.formSteps?.[activeStep]?.stepComponents || []

    // Group components by SEPARATORs
    const groupedComponents = []
    let currentGroup = []

    stepComponents.forEach((component) => {
        if (component.displayInputElementType === "SEPARATOR") {
            if (currentGroup.length > 0) groupedComponents.push(currentGroup)
            currentGroup = [component]
        } else {
            currentGroup.push(component)
        }
    })

    if (currentGroup.length > 0) {
        groupedComponents.push(currentGroup)
    }

    return (
        <form className="overflow-auto h-screen">
            {formConfig?.formSteps?.length > 1 && (
                <StepperProgressBar
                    className="max-w-xl mx-auto"
                    activeStep={activeStep}
                    steps={formConfig.formSteps.map((step) => ({
                        label: step.stepName
                    }))}
                />
            )}

            <div className="space-y-4 overflow-auto h-[70vh] max-w-full mx-auto ">
                {groupedComponents.map((group, groupIndex) => {
                    const separator = group.find((comp) => comp.displayInputElementType === "SEPARATOR");
                    const title = separator?.separatorName || formConfig?.formSteps?.[activeStep]?.stepName;
                    const description = separator?.stepDescription || formConfig?.formSteps?.[activeStep]?.stepDescription
                    const fullLayout = group?.[1]?.displayInputElementType === "CUSTOM_BLOCK_ASSETS" ||
                        group?.[1]?.displayInputElementType === "ATTACHMENT" ||
                        group?.[1]?.displayInputElementType === "CUSTOM_BLOCK_OPERATIONAL_COMPLIANCE" ||
                        group?.[1]?.displayInputElementType === "CUSTOM_BLOCK_SPARES" ||
                        group?.[1]?.displayInputElementType === "CUSTOM_BLOCK_CUSTOMER_AFFECTED" ||
                        group?.[0]?.displayInputElementType === "CUSTOM_BLOCK_IMPLEMENTATION" ||
                        group?.[0]?.displayInputElementType === "CUSTOM_BLOCK_BACKOUT" ||
                        group?.[0]?.displayInputElementType === "CUSTOM_BLOCK_PRECHANGE_TESTING" ||
                        group?.[1]?.displayInputElementType === "CUSTOM_BLOCK_POSTCHANGE_TESTING"

                    // const formGrid = formConfig?.formSteps?.[activeStep]?.isFormGrid
                    console.log('description-->', group);

                    return (
                        <Card key={groupIndex} className="rounded-2xl mb-6 p-4 pt-0">
                            <div className="text-lg font-bold mb-0">{title}</div>
                            <div className="text-sm font-normal text-gray-600 mb-5">{separator ? "" : description}</div>

                            <div className={`${isGridLayout && !fullLayout ? "grid grid-cols-2" : "grid grid-cols-1"} gap-4`} >
                                {/* <div className={`${isGridLayout ? "grid grid-cols-1" : "grid grid-cols-1"} gap-4`} > */}

                                {group.map((component, index) => {
                                    if (component.displayInputElementType === "SEPARATOR") return null;

                                    // Fallback to generic mapped component
                                    const Component = componentMap[component.displayInputElementType];
                                    if (!Component) return null;

                                    return (
                                        <div
                                            key={`${groupIndex}-${index}`}
                                            className={`${isGridLayout && group?.displayInputElementType !== "CUSTOM_BLOCK_ASSETS" ? "cols-span-6" : "cols-span-12"}`}
                                        >
                                            <Component
                                                value={formValues[activeStep]?.[component.displayFiledName] ?? null}
                                                onChange={(value) =>
                                                    handleInputChange({
                                                        activeStep,
                                                        id: component.displayFiledName,
                                                        value,
                                                        component,
                                                    })
                                                }
                                                component={component}
                                                componentProps={{
                                                    ...component,
                                                    error:
                                                        component.displayInputElementType !== "TAB_FORM_BLOCK"
                                                            ? errors[activeStep]?.[component.displayFiledName]
                                                            : null,
                                                }}
                                            />
                                        </div>
                                    );
                                })}

                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end mt-2 h-fit ">
                {activeStep > 0 && (
                    <Button
                        type="button"
                        className="border-transparent text-slate-700 inline-flex"
                        onClick={handleBack}
                    >
                        <ChevronLeft /> Back
                    </Button>
                )}

                <div className="flex items-center gap-4 ml-auto">
                    <Button
                        type="button"
                        className="border-transparent text-slate-700 inline-flex items-center gap-1"
                        onClick={handleReset}
                    >
                        <RotateCcw className="w-4 h-auto" />
                        Reset
                    </Button>

                    {activeStep === formConfig.formSteps.length - 1 ? (
                        <Button
                            variant="primary"
                            className="w-40 rounded-lg"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit
                            <ChevronRight />
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
        </form >
    )
}

export default FormBuilder
