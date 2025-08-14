import { InputLabelFormatWrapper } from "@/components/FormBuilder"
import Button from "@/components/ui/Button"
import InputField from "@/components/ui/form/Input"
import TextArea from "@/components/ui/form/TextArea"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

// Simplified component map without react-hook-form
export const componentMap = {
    DATE_TIME: ({ value, onChange, componentProps }) => (
        <InputLabelFormatWrapper
            label={componentProps.displayLable}
            error={componentProps.error}
        >
            <InputField
                id={componentProps.displayFiledName}
                className="w-full"
                type="datetime-local"
                placeholder={componentProps.displayLable}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </InputLabelFormatWrapper>
    ),
    INPUT_BOX: ({ value, onChange, componentProps }) => (
        <InputLabelFormatWrapper
            label={componentProps.displayLable}
            error={componentProps.error}
        >
            <InputField
                id={componentProps.displayFiledName}
                className="w-full"
                type={"text"}
                maxLength={componentProps?.maxlength}
                placeholder={componentProps.displayLable}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </InputLabelFormatWrapper>
    ),
    TEXT_AREA: ({ value, onChange, componentProps }) => (
        <InputLabelFormatWrapper
            label={componentProps.displayLable}
            error={componentProps.error}
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
    ),

    SELECT_BOX: ({ value, onChange, componentProps }) => (
        <InputLabelFormatWrapper
            label={componentProps.displayLable}
            error={componentProps.error}
        >
            <select
                className="w-full p-2 rounded border"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Select an option"
            >
                <option
                    value=""
                    disabled
                >
                    Select an option
                </option>
                {componentProps.displayOptions?.map((option) => (
                    <option
                        key={option.displayId}
                        value={option.displayId}
                    >
                        {option.displayText}
                    </option>
                ))}
            </select>
        </InputLabelFormatWrapper>
    )
}

const TabFormBlock = ({ formConfig, onChange }) => {
    // State for maintaining dynamic arrays for each block type
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

    const [activeTab, setActiveTab] = useState(
        formConfig.blockTabs[0].displayTabId
    )

    // Initialize the data structure dynamically based on the block components
    const initializeData = () => {
        const initialData = {}
        formConfig.blockTabs.forEach((tab) => {
            initialData[tab.displayTabId] = []
            const newEntry = {}
            tab.blockComponents.forEach((field) => {
                newEntry[field.displayFiledName] =
                    field.defaultValue === "NA" ? "" : field.defaultValue // Initialize with defaultValue or empty string
            })
            initialData[tab.displayTabId].push(newEntry)
        })
        setData(initialData)
    }

    // Function to handle input changes dynamically
    const handleChange = (tabId, index, fieldName, value) => {
        const updatedData = { ...data }
        updatedData[tabId][index][fieldName] = value
        setData(updatedData)
    }

    // Validate a single entry
    const validateEntry = (tabId, index) => {
        const tabData = data[tabId][index]
        const tabConfig = formConfig.blockTabs.find(
            (tab) => tab.displayTabId === tabId
        )
        const errors = {}

        tabConfig.blockComponents.forEach((field) => {
            if (field.mendatory && !tabData[field.displayFiledName]) {
                errors[field.displayFiledName] = field.displayAlertText
            }
        })

        setErrors((prev) => ({
            ...prev,
            [tabId]: {
                ...prev[tabId],
                [index]: errors
            }
        }))

        return Object.keys(errors).length === 0
    }

    // Add a new entry to a block
    const addEntry = (tabId) => {
        const isValid = data[tabId]?.every((_, index) =>
            validateEntry(tabId, index)
        )
        if (!isValid) return

        const tabConfig = formConfig.blockTabs.find(
            (tab) => tab.displayTabId === tabId
        )
        const newEntry = {}

        tabConfig.blockComponents.forEach((field) => {
            newEntry[field.displayFiledName] =
                field.defaultValue === "NA" ? "" : field.defaultValue // Initialize with defaultValue or empty string
        })

        const updatedData = { ...data }
        updatedData[tabId] = [...(data[tabId] || []), newEntry]
        setData(updatedData)
    }

    // Remove an entry from a block
    const removeEntry = (tabId, index) => {
        const updatedData = { ...data }
        updatedData[tabId].splice(index, 1)
        setData(updatedData)
    }

    // Render fields dynamically based on block components
    const renderField = (field, tabId, index) => {
        const fieldError =
            errors[tabId] &&
            errors[tabId][index] &&
            errors[tabId][index][field.displayFiledName]
        const Component = componentMap[field.displayInputElementType]
        return (
            <Component
                key={field.displayFiledName}
                value={data[tabId][index][field.displayFiledName] || ""}
                onChange={(value) =>
                    handleChange(tabId, index, field.displayFiledName, value)
                }
                componentProps={{
                    ...field,
                    error: fieldError,
                    key: field.displayFiledName
                }}
            />
        )
    }

    // Render a single block
    const renderBlock = (tab) => {
        return (
            <div
                key={tab.displayTabId}
                style={{ marginBottom: "20px" }}
            >
                {data[tab.displayTabId]?.map((entry, index) => (
                    <div
                        key={index}
                        className={
                            "border p-4 my-4 rounded-lg flex flex-col w-full gap-2 "
                        }
                    >
                        {tab.blockComponents.map((field) =>
                            renderField(field, tab.displayTabId, index)
                        )}
                        <button
                            onClick={() => removeEntry(tab.displayTabId, index)}
                            className="border p-2 rounded bg-information-25 border-red-400 w-fit self-end"
                        >
                            <Trash2 color="red" />
                        </button>
                    </div>
                ))}
                <Button
                    variant="primary"
                    className="mt-2"
                    onClick={() => addEntry(tab.displayTabId)}
                >
                    {tab.addMoreButtonTitle || "Add Entry"}
                </Button>
            </div>
        )
    }

    useEffect(() => {
        initializeData()
    }, [])

    useEffect(() => {
        onChange(data)
    }, [data])

    return (
        <div>
            <div className="flex space-x-2">
                {formConfig.blockTabs?.map((tab, index) => (
                    <Button
                        key={index}
                        variant={
                            activeTab === tab.displayTabId
                                ? "primary"
                                : "tertiary"
                        }
                        onClick={() => setActiveTab(tab.displayTabId)}
                    >
                        {tab.displayTabLable}
                    </Button>
                ))}
            </div>
            {formConfig.blockTabs.map(
                (tab) => tab.displayTabId === activeTab && renderBlock(tab)
            )}
        </div>
    )
}

export default TabFormBlock
