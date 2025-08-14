/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react';
import Card from '../ui/Card';
import StepperProgressBar from '../ui/StepperProgressBar';
import InputField from '../ui/form/Input';
import SingleSelect from '../ui/form/SingleSelect';
import RadioButton from '../ui/form/RadioButton';
import Tabs from '../ui/Tabs';
import { Paperclip, Plus, Trash } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setGatePasses } from '../../redux/slices/gatePassSlice';
import Button from '../ui/Button';
import CustomStepperProgressBar from '../CustomStepperProgressBar';

// Dynamic form configuration based on screenshot
// Helper to filter out Return Details if outward
function getFilteredFormConfig(selectedTransferType, config) {
    if (selectedTransferType === 'outward') {
        return config.filter(section => section.section !== 'Return Details');
    }
    return config;
}

const defaultFormConfig = [
    {
        section: 'Create GRN',
        stepLabel: 'Create GRN',
        fields: [
            {
                label: 'Site',
                name: 'site',
                type: 'select',
                required: true,
                options: ['Empress'],
                placeholder: 'Select Site',
            },
            {
                label: 'GRN No.',
                name: 'grnNo',
                type: 'text',
                required: true,
                placeholder: 'Enter GRN No.',
                defaultValue: '1234567890',
            },
        ],
    },
    {
        section: 'Client Details',
        stepLabel: 'Client Details',
        fields: [
            {
                label: 'Customer Name',
                name: 'customerName',
                type: 'text',
                required: true,
                placeholder: 'Enter Customer Name',
            },
            {
                label: 'Ticket No.',
                name: 'ticketNo',
                type: 'text',
                required: true,
                placeholder: 'Enter Ticket No.',
            },
            {
                label: 'BU Location',
                name: 'buLocation',
                type: 'text',
                required: true,
                placeholder: 'Enter BU Location',
            },
            {
                label: 'Challan/Invoice No.',
                name: 'challanNo',
                type: 'text',
                required: false,
                placeholder: 'Enter Challan/Invoice No.',
            },
            {
                label: 'Challan/Invoice Date',
                name: 'challanDate',
                type: 'date',
                required: false,
                placeholder: 'Enter Challan/Invoice Date',
            },
        ],
    },
    {
        section: 'Vehicle Details',
        stepLabel: 'Vehicle Details',
        fields: [
            {
                label: 'Vehicle Type',
                name: 'vehicleType',
                type: 'select',
                required: true,
                options: ['Truck', 'Van', 'Car', 'Other'],
                placeholder: 'Select Vehicle Type',
            },
            {
                label: 'Vehicle No.',
                name: 'vehicleNo',
                type: 'text',
                required: true,
                placeholder: 'Enter Vehicle No.',
            },
            {
                label: 'Driver Name',
                name: 'driverName',
                type: 'text',
                required: true,
                placeholder: 'Enter Driver Name',
            },
            {
                label: 'Driver Contact No.',
                name: 'driverContact',
                type: 'text',
                required: true,
                placeholder: 'Enter Driver Contact No.',
            },
            {
                label: 'Driver License No.',
                name: 'driverLicense',
                type: 'text',
                required: false,
                placeholder: 'Enter Driver License No.',
            },
        ],
    },
    {
        section: 'Return Details',
        stepLabel: 'Return Details',
        fields: [
            {
                label: 'Select Status',
                name: 'returnStatus',
                type: 'radio',
                required: true,
                options: [
                    { label: 'Returnable', value: 'returnable' },
                    { label: 'Non-Returnable', value: 'nonreturnable' },
                ],
            },
            {
                label: 'Return Date',
                name: 'returnDate',
                type: 'date',
                required: false,
                placeholder: 'Enter Return Date',
            },
        ],
    },
    {
        section: 'Add Asset',
        stepLabel: 'Add Asset',
        fields: [
            {
                label: 'Asset Type',
                name: 'assetType',
                type: 'select',
                required: true,
                placeholder: 'Select Asset Type',
            },
            {
                label: 'Asset Name',
                name: 'assetName',
                type: 'text',
                required: true,
                placeholder: 'Enter Asset Name',
            },
            {
                label: 'Model',
                name: 'model',
                type: 'seleect',
                required: true,
                placeholder: 'Enter Model',
            },
            {
                label: 'HSN Code',
                name: 'hsnCode',
                type: 'text',
                required: false,
                placeholder: 'Enter HSN Code',
            },
            {
                label: 'Service tag/Serial No.',
                name: 'serialNo',
                type: 'text',
                required: false,
                placeholder: 'Enter Service tag/Serial No.',
            },
            {
                label: 'Quantity',
                name: 'quantity',
                type: 'text',
                required: true,
                placeholder: 'Enter Quantity',
            },
            {
                label: 'Value',
                name: 'value',
                type: 'text',
                required: true,
                placeholder: 'Enter Value',
            },
            {
                label: 'Description',
                name: 'description',
                type: 'text',
                required: true,
                placeholder: 'Enter Description',
            },
            {
                label: 'Remarks',
                name: 'remarks',
                type: 'text',
                required: true,
                placeholder: 'Enter Remarks',
            },
            {
                label: 'Attachments',
                name: 'attachments',
                type: 'file',
                required: false,
                placeholder: 'Enter Attachments',
            },
        ],
        uploadSheet: true,
        enterManually: true,
    },
];

// const actionButtons = [
//     { label: 'Save As Draft', variant: 'outlined', type: 'button' },
//     { label: 'Generate Gate Pass', variant: 'contained', type: 'submit' },
// ];


export default function PassForm({ formConfig }) {
    const dispatch = useDispatch();
    const gatePasses = useSelector(state => state.getGatePass.gatePasses);
    console.log('gatePasses', gatePasses);

    const selectedTransferType = useSelector(state => state.getGatePass.selectedTransferType);
    // Always filter config dynamically
    const effectiveFormConfig = getFilteredFormConfig(selectedTransferType, formConfig || defaultFormConfig);
    console.log('effectiveFormConfig', effectiveFormConfig);
    // Stepper state
    const steps = [
        { label: 'Pass Type' },
        { label: 'Pass Form' },
        { label: 'Add Asset' },
    ];
    const [activeStep, setActiveStep] = useState(1);
    // const [uploadStatus, setUploadStatus] = React.useState('');
    // const [toolRows, setToolRows] = useState([{ id: 1, name: '', attachment: null }])
    // const [rows, setRows] = useState([{ id: 1, name: '', uom: '', quantity: '' }]);
    // Initialize form state
    const initialState = {};
    effectiveFormConfig.forEach(section => {
        if (section.section === 'Return Details' && selectedTransferType === 'outward') {
            return;
        }
        if (section.section === 'Add Asset') {
            // Initialize as an array with one empty asset object
            initialState['Add Asset'] = [
                Object.fromEntries((section.fields || []).map(field => [field.name, field.defaultValue || '']))
            ];
        } else if (section.fields) {
            section.fields.forEach(field => {
                initialState[field.name] = field.defaultValue || (field.type === 'radio' ? (field.options && field.options[0]?.value) : '');
            });
        }
        if (section.type === 'dynamicList' && section.section !== 'Add Asset') {
            initialState[section.section] = [{}];
        }
    });
    console.log('initialState', initialState);
    const [formState, setFormState] = useState(initialState);
    console.log('formState', formState);
    // Handlers
    const handleInputChange = (e, name) => {
        const value = e?.target?.type === 'checkbox' ? e?.target?.checked : e?.target?.value;
        setFormState({ ...formState, [name]: value });
    };

    const handleRadioChange = (name, value) => {
        setFormState({ ...formState, [name]: value });
    };

    // Dynamic List handlers
    // const handleDynamicListChange = (section, idx, colName, value) => {
    //     const updatedList = [...(formState[section] || [])];
    //     updatedList[idx] = { ...updatedList[idx], [colName]: value };
    //     setFormState({ ...formState, [section]: updatedList });
    // };

    // const handleAddDynamicRow = (section) => {
    //     setFormState({ ...formState, [section]: [...(formState[section] || []), {}] });
    // };

    // const handleRemoveDynamicRow = (section, idx) => {
    //     const updatedList = [...(formState[section] || [])];
    //     updatedList.splice(idx, 1);
    //     setFormState({ ...formState, [section]: updatedList });
    // };

    // Renderers
    const renderField = (field) => {
        // Use provided onChange if present (for Add Asset fields)
        const handleChange = field.onChange || (e => handleInputChange(e, field.name));
        // Use value from props if present (for Add Asset), else from formState
        const value = field.value !== undefined ? field.value : formState[field.name] || '';
        switch (field.type) {
            case 'text':
                return (
                    <InputField
                        type="text"
                        name={field.name}
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full"
                    />
                );
            case 'date':
            case 'datetime':
                return (
                    <InputField
                        type={field.type === 'datetime' ? 'datetime-local' : 'date'}
                        name={field.name}
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full"
                    />
                );
            case 'select':
                return (
                    <SingleSelect
                        name={field.name}
                        value={value}
                        onChange={field.onChange ? field.onChange : val => handleInputChange({ target: { value: val } }, field.name)}
                        placeholder={field.placeholder}
                        options={field.options?.map(opt => ({ value: opt?.value || opt, label: opt?.label || opt })) || []}
                        className="w-full"
                    />
                );
            case 'radio':
                return (
                    <RadioButton
                        name={field.name}
                        value={formState[field.name] || ''}
                        onChange={val => handleRadioChange(field.name, val)}
                        options={field.options.map(opt => ({ value: opt.value, label: opt.label }))}
                        className="w-full"
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        name={field.name}
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border p-2 rounded-lg"
                    />
                );
            case 'file':
                return (
                    <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer text-gray-500 hover:border-gray-400">
                        <Paperclip size={18} className="text-gray-400 rotate-45" />
                        <span>{value || "Attachment"}</span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleChange}
                            accept=".jpg,.jpeg,.png,.doc,.dwg"
                        />
                    </label>);
            default:
                return null;
        }
    };
    const renderAddAssetSectionFields = (fields, section) => {
        // If this is the Add Asset section, render the custom Add Asset UI
        if (section && section.section === 'Add Asset') {
            return (
                <div className='flex flex-col gap-12'>
                    <div>
                        {formState['Add Asset'] && formState['Add Asset'].map((asset, idx) => (
                            <Card key={asset.assetId || idx} className="mb-6 p-6 pt-0 border border-blue-100 bg-blue-50">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="font-semibold">{idx + 1}. Asset</div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    {section.fields.map(field => (
                                        <div key={field.name} className="grid grid-cols-12 gap-4">
                                            <label className="col-span-4 font-medium text-slate-500">
                                                {field.label}{field.required && <span className="text-red-600"> *</span>}
                                            </label>
                                            <div className="col-span-8">
                                                {renderField({
                                                    ...field,
                                                    value: asset[field.name] || '',
                                                    onChange: e => {
                                                        const value = e && e.target ? e.target.value : e;
                                                        setFormState(prev => {
                                                            const updated = [...(prev['Add Asset'] || [])];
                                                            updated[idx] = { ...updated[idx], [field.name]: value };
                                                            return { ...prev, ['Add Asset']: updated };
                                                        });
                                                    },
                                                    className: 'w-full',
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2"
                            onClick={() => {
                                setFormState(prev => ({
                                    ...prev,
                                    ['Add Asset']: [
                                        ...(prev['Add Asset'] || []),
                                        { assetId: Date.now() + Math.random() }
                                    ]
                                }));
                            }}
                        >
                            <Plus size={18} className="mr-2" /> Add More Asset
                        </Button>
                    </div>
                </div>
            );
        }
    };
    const renderSectionFields = (fields, section) => {
        // If this is the Add Asset section, render the custom Add Asset UI

        // Otherwise, render fields as usual
        return (
            <div className="w-full">
                {fields.map(field => {
                    if (section && section.section === 'Add Asset') return null;
                    console.log('section', section);

                    if (field.name === 'returnDate' && formState.returnStatus === 'nonreturnable') return null;
                    return (
                        <div key={field.name} className="flex w-full mb-5">
                            <div className="w-full">
                                <div className="grid grid-cols-12 items-start mb-1.5 w-full">
                                    <label className="font-medium col-span-3 text-start">
                                        {field.label}{field.required && <span className="text-red-600"> *</span>}
                                    </label>
                                    <div className="col-span-9">
                                        {renderField(field)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    // Use Tabs component for Manual Entry / Bulk Upload switching
    const DynamicListTabsWrapper = ({ section }) => {
        const [activeTab, setActiveTab] = React.useState('Entry Manually');
        const tabList = ['Entry Manually', 'Bulk Upload'];
        return (
            <div style={{ marginBottom: 24 }} className=''>

                <div className="flex justify-between items-center">

                    <div className="font-bold text-lg mb-6">{section.section}</div>
                    <Tabs tabs={tabList} activeTab={activeTab} setActiveTab={setActiveTab} className="" />
                </div>
                <div className="mt-4">

                    {activeTab === 'Entry Manually'
                        ? (section.section === 'Add Asset'
                            ? renderAddAssetSectionFields(section.fields, section)
                            : renderSectionFields(section.fields, section))
                        : renderDynamicListBulk(section)}
                </div>
            </div>
        );
    };



    // Bulk Upload UI for dynamic list (placeholder, replace with your UploadSheet component)
    const renderDynamicListBulk = (section) => {


        return (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                <div className="flex flex-col items-center justify-center space-y-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <div className="text-center flex flex-col items-center justify-center">
                        <h3 className="text-lg font-bold text-gray-900 text-center">
                            Upload Excel or Google Sheets File
                        </h3>
                        <p className="mt-2 max-w-56 text-medium text-gray-500 text-center">
                            Please upload in Xlsx Format Upto 5 MB file
                        </p>
                    </div>
                    <div className="flex gap-5">
                        <Button
                            variant="secondary"
                            className="font-bold rounded-lg"
                            onClick={() =>
                                document
                                    .querySelector('input[type="file"]')
                                    .click()
                            }
                        >
                            <input
                                type="file"
                                name="123"
                                className="hidden"
                                accept=".xlsx"
                            // onChange={handleFileUpload}
                            />
                            <span className="font-semibold">Format</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="font-bold rounded-lg"
                            onClick={() =>
                                document
                                    .querySelector('input[type="file"]')
                                    .click()
                            }
                        >
                            <input
                                type="file"
                                name="123"
                                className="hidden"
                                accept=".xlsx"
                            // onChange={handleFileUpload}
                            />
                            <span className="font-semibold">Browse File</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    // Main renderDynamicList
    const renderDynamicList = (section) => {
        if (section.uploadSheet && section.enterManually) {
            return <DynamicListTabsWrapper section={section} />;
        }
        // fallback to manual entry UI
        return renderSectionFields(section.fields);
        // return <DynamicListTabsWrapper section={section} />;
    };

    console.log('formState["Add Asset"]', formState['Add Asset']);


    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement submission logic
        // alert('Form submitted! (Demo)');
    };

    return (
        <div
            className={`mx-auto py-6 overflow-auto h-screen ${activeStep === 2 ? 'w-full' : 'max-w-[820px]'
                }`}
        >

            {/* Progress Stepper */}
            {activeStep === 0 && (
                <CustomStepperProgressBar className={`${activeStep === 2 ? 'px-96' : 'px-20'}`} steps={steps} activeStep={activeStep} />
            )}
            <div className="flex items-center mb-8">

            </div>
            {/* Step content */}
            {activeStep === 0 && (
                <div className="bg-white rounded-xl shadow mb-8 p-8 flex flex-col items-center">
                    <div className="font-bold text-lg mb-6 text-blue-600">Select Pass Type</div>
                    {/* Example: Replace below with your actual pass type selection logic */}
                    <select className="border border-gray-300 rounded-md px-4 py-2 mb-4" defaultValue="inward">
                        <option value="inward">Inward Gate Pass</option>
                        <option value="outward">Outward Gate Pass</option>
                    </select>
                    <button type="button" className="bg-blue-600 text-white rounded-md px-7 py-2.5 font-medium text-base" onClick={() => setActiveStep(1)}>
                        Next
                    </button>
                </div>
            )}
            {activeStep === 1 && (
                <form onSubmit={handleSubmit} autoComplete="off">
                    {formConfig
                        .filter(section => (!section.attachment && !section.enterManually) || (!section.uploadSheet && !section.enterManually))
                        .map(section => (
                            <Card key={section.section} className="mb-8 pt-0">
                                <div className="font-bold text-lg mb-6">{section.section}</div>
                                {section.type === 'dynamicList' ? (
                                    <div className="flex flex-row gap-12">
                                        {/* Card Section Title */}
                                        <div className="flex flex-col justify-start min-w-[220px] max-w-[260px]">
                                            <div className="font-bold text-lg mb-4.5">{section.section}</div>
                                        </div>
                                        {/* Dynamic List Tabs Wrapper */}
                                        <div className="flex-1">
                                            {renderDynamicList(section)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-12'>
                                        <div>
                                            {renderSectionFields(section.fields)}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    <div className="flex justify-start gap-4 pb-16">
                        {/* <Button variant='secondary'
                            onClick={() => setActiveStep(0)}>
                            Save as Draft
                        </Button> */}
                        <Button variant='secondary'
                            onClick={(e) => {
                                e.preventDefault(); // Prevent form submission
                                // Save draft logic here if needed
                                setActiveStep(0); // Then change step
                            }}>
                            Save as Draft
                        </Button>
                        <div className="flex gap-4">
                            <Button variant='primary'
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent form submission
                                    // Save draft logic here if needed
                                    setActiveStep(2); // Then change step
                                }}>
                                Next</Button>
                        </div>
                    </div>
                </form>
            )}
            {activeStep === 2 && (
                <form onSubmit={handleSubmit} autoComplete="off">
                    {/* Add Asset Section */}
                    {formConfig
                        .filter(section => section.section === 'Add Asset')
                        .map(section => (
                            <Card key={section.section} className="mb-8 pt-0">
                                {/* <div className="font-bold text-lg mb-6">{section.section}</div> */}
                                <div className="flex flex-col gap-12">
                                    <div>
                                        {renderDynamicList(section)}
                                    </div>
                                </div>

                            </Card>
                        ))}
                    {/* Other Step 2 Sections */}
                    {formConfig
                        .filter(section => (section.attachment && section.enterManually) || (section.uploadSheet && section.enterManually))
                        .map(section => {
                            if (section.section === 'Add Asset') return null;
                            const isToolSection = section.columns?.some(col => col.type === 'file');
                            return (
                                <Card key={section.section} className="mb-8 pt-0">
                                    <div className="font-bold text-lg mb-4.5">{section.section}</div>
                                    <div className="flex flex-col gap-12">
                                        <div>
                                            {renderDynamicList(section)}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}

                    <div className="flex justify-start gap-4 pb-16">
                        <Button variant='secondary'
                            onClick={(e) => {
                                e.preventDefault(); // Prevent form submission
                                // Save draft logic here if needed
                                setActiveStep(0); // Then change step
                            }}>
                            Save as Draft
                        </Button>
                        <div className="flex gap-4">
                            <Button variant='primary'
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Gather all form data here. Assuming formState holds the form data.
                                    // You may need to adjust this if your state structure is different.
                                    const newGatePass = { ...formState, createdAt: new Date().toISOString() };
                                    dispatch(setGatePasses([...gatePasses, newGatePass]));
                                    window.location.href = '/GatePass/createGetPass/gatePassListing';
                                }}
                            >Generate Gate Pass</Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}