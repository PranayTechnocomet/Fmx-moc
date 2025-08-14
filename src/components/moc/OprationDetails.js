// 'use client'
// import React, { useState } from 'react'
// import FileIcon from '../ui/FileIcon'
// import InputField from '../ui/form/Input'
// import MultiSelect from '../ui/form/MultiSelect'
// import RadioButton from '../ui/form/RadioButton'
// import DropdownInput from '../ui/form/DropdownInput'
// import SingleDropdown from '../ui/form/SingleDropdown'

// const OperationalDetails = () => {
//     const [vendorType, setVendorType] = useState("Registered")
//     const [vendor, setVendor] = useState("")
//     const [contract, setContract] = useState("")
//     const [workPermits, setWorkPermits] = useState([])

//     const dummyContract = {
//         title: "Chiller AMC",
//         code: "AMC2025012312",
//         vendorName: "Yuvraj",
//         vendorCompany: "PunctualBiz",
//         contactNumber: "7900000060",
//         email: "Product@punctualbiz.com",
//         agreementDate: "01/01/2025",
//         validUpto: "31/12/2025",
//         contractCopy: {
//             name: "File Name.format",
//             size: "5.0 MB"
//         }
//     }

//     return (
//         <div className="p-6 border border-dashed rounded-md">

//             {/* Vendor Type */}
//             <div className="flex items-center mb-6">
//                 <label className="font-medium w-1/4 text-slate-500">Vendor Type <span className="text-red-500">*</span></label>
//                 <div className="flex items-center mt-2">
//                     <RadioButton
//                         value={vendorType}
//                         onChange={(e) => setVendorType(e.target.value)}
//                         direction="horizontal"
//                         options={[
//                             { value: "Registered", label: "Registered" },
//                             { value: "Non-Registered", label: "Non-Registered" }
//                         ]}
//                     />
//                 </div>
//             </div>

//             {/* Vendor + Contract Dropdowns */}
//             <div className="grid grid-cols-1 gap-4 mb-6">
//                 <div className="flex items-center gap-4">
//                     <label className="font-medium w-1/4 text-slate-500">Vendor</label>
//                     <SingleDropdown
//                         value={vendor}
//                         onChange={setVendor}
//                         placeholder="Select the vendor"
//                         options={[
//                             { label: "vender-1", value: "vender-1" },
//                             { label: "vender-2", value: "vender-2" },
//                             { label: "vender-3", value: "vender-3" }
//                         ]}
//                     />
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <label className="font-medium w-1/4 text-slate-500">Link Contract</label>
//                     <SingleDropdown
//                         value={contract}
//                         onChange={setContract}
//                         placeholder="Select the contract"
//                         options={[
//                             { label: "Link Contract-1", value: "linkcontract1" },
//                             { label: "Link Contract-2", value: "linkcontract2" },
//                             { label: "Link Contract-3", value: "linkcontract3" }
//                         ]}
//                     />
//                 </div>
//             </div>

//             {/* Contract Info Card */}
//             <div className="border rounded-md p-4  mb-6 flex flex-row">
//                 <div className="flex flex-col items-start justify-center mr-4">
//                     <div className="bg-blue-50 text-blue-800 px-2 py-1 w-12 h-12 flex items-center justify-center rounded-full text-xs font-semibold">AMC</div>
//                 </div>
//                 <div className="flex flex-col w-full">
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Contract Title</div>
//                             <div className="font-medium">{dummyContract.title}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Contract Code</div>
//                             <div className="font-medium">{dummyContract.code}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Vendor Company</div>
//                             <div className="font-medium">{dummyContract.vendorCompany}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Vendor Name</div>
//                             <div className="font-medium">{dummyContract.vendorName}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Contact Number</div>
//                             <div className="font-medium">{dummyContract.contactNumber}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Email ID</div>
//                             <div className="font-medium">{dummyContract.email}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Agreement Date</div>
//                             <div className="font-medium">{dummyContract.agreementDate}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Valid upto</div>
//                             <div className="font-medium">{dummyContract.validUpto}</div>
//                         </div>
//                         <div className="flex items-center col-span-1">
//                             <div className="text-slate-500 w-1/2">Contract Copy</div>
//                             <FileIcon name={dummyContract.contractCopy.name} size={dummyContract.contractCopy.size} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Work Permit */}
//             <div className='grid grid-cols-2 items-center border border-gray-200 rounded-md p-5'>
//                 <div className='flex flex-col'>
//                     <h2 className="font-bold text-xl mb-2">Work Permit Required?</h2>
//                     <p className="font-sm text-slate-500 mb-2">Select Permit types if required to execute the change</p>
//                 </div>
//                 <MultiSelect
//                     value={workPermits}
//                     onChange={setWorkPermits}
//                     placeholder="Select the permits required"
//                     options={[
//                         { label: "Electrical", value: "electrical" },
//                         { label: "Civil", value: "civil" },
//                         { label: "Hot Work", value: "hotwork" }
//                     ]}
//                 />
//             </div>
//         </div >
//     )
// }

// export default OperationalDetails


'use client'
import React, { useState } from 'react'
import FileIcon from '../ui/FileIcon'
import InputField from '../ui/form/Input'
import MultiSelect from '../ui/form/MultiSelect'
import RadioButton from '../ui/form/RadioButton'
import SingleDropdown from '../ui/form/SingleDropdown'

const OperationalDetails = () => {
    const [vendorType, setVendorType] = useState("Registered")
    const [vendor, setVendor] = useState("")
    const [contract, setContract] = useState("")
    const [workPermits, setWorkPermits] = useState([])

    // For Non-Registered Vendor
    const [vendorName, setVendorName] = useState("")
    const [vendorCompany, setVendorCompany] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [email, setEmail] = useState("")
    const [contractFile, setContractFile] = useState({ name: "", size: "" })

    const dummyContract = {
        title: "Chiller AMC",
        code: "AMC2025012312",
        vendorName: "Yuvraj",
        vendorCompany: "PunctualBiz",
        contactNumber: "7900000060",
        email: "Product@punctualbiz.com",
        agreementDate: "01/01/2025",
        validUpto: "31/12/2025",
        contractCopy: {
            name: "File Name.format",
            size: "5.0 MB"
        }
    }

    return (
        <div className="p-6 border border-dashed rounded-md">
            {/* Vendor Type */}
            <div className="flex items-center mb-6">
                <label className="font-medium w-1/4 text-slate-500">
                    Vendor Type <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center mt-2">
                    <RadioButton
                        value={vendorType}
                        onChange={(e) => {
                            const newValue = typeof e === 'string' ? e : e?.target?.value
                            setVendorType(newValue)
                        }}
                        direction="horizontal"
                        options={[
                            { value: "Registered", label: "Registered" },
                            { value: "Non-Registered", label: "Non-Registered" }
                        ]}
                    />
                </div>
            </div>

            {/* Dynamic Fields */}
            {vendorType === "Registered" ? (
                <>
                    {/* Vendor & Contract */}
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <label className="font-medium w-1/4 text-slate-500">Vendor</label>
                            <SingleDropdown
                                value={vendor}
                                onChange={setVendor}
                                placeholder="Select the vendor"
                                options={[
                                    { label: "vender-1", value: "vender-1" },
                                    { label: "vender-2", value: "vender-2" },
                                    { label: "vender-3", value: "vender-3" }
                                ]}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="font-medium w-1/4 text-slate-500">Link Contract</label>
                            <SingleDropdown
                                value={contract}
                                onChange={setContract}
                                placeholder="Select the contract"
                                options={[
                                    { label: "Link Contract-1", value: "linkcontract1" },
                                    { label: "Link Contract-2", value: "linkcontract2" },
                                    { label: "Link Contract-3", value: "linkcontract3" }
                                ]}
                            />
                        </div>
                    </div>

                    {/* Contract Info Card */}
                    <div className="border rounded-md p-4 mb-6 flex flex-row">
                        <div className="flex flex-col items-start justify-center mr-4">
                            <div className="bg-blue-50 text-blue-800 px-2 py-1 w-12 h-12 flex items-center justify-center rounded-full text-xs font-semibold">AMC</div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                {[
                                    { label: "Contract Title", value: dummyContract.title },
                                    { label: "Contract Code", value: dummyContract.code },
                                    { label: "Vendor Company", value: dummyContract.vendorCompany },
                                    { label: "Vendor Name", value: dummyContract.vendorName },
                                    { label: "Contact Number", value: dummyContract.contactNumber },
                                    { label: "Email ID", value: dummyContract.email },
                                    { label: "Agreement Date", value: dummyContract.agreementDate },
                                    { label: "Valid upto", value: dummyContract.validUpto },
                                ].map((item, idx) => (
                                    <div className="flex items-center col-span-1" key={idx}>
                                        <div className="text-slate-500 w-1/2">{item.label}</div>
                                        <div className="font-medium">{item.value}</div>
                                    </div>
                                ))}
                                <div className="flex items-center col-span-1">
                                    <div className="text-slate-500 w-1/2">Contract Copy</div>
                                    <FileIcon name={dummyContract.contractCopy.name} size={dummyContract.contractCopy.size} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Non-Registered Vendor UI
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <InputField
                        label="Vendor Name"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        placeholder="Enter vendor name"
                    />
                    <InputField
                        label="Vendor Company"
                        value={vendorCompany}
                        onChange={(e) => setVendorCompany(e.target.value)}
                        placeholder="Enter company name"
                    />
                    <InputField
                        label="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Enter contact number"
                    />
                    <InputField
                        label="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email ID"
                    />
                    <div className="col-span-2">
                        <label className="block font-medium text-slate-500 mb-1">Contract Copy</label>
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setContractFile({
                                        name: file.name,
                                        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                                    })
                                }
                            }}
                        />
                        {contractFile.name && (
                            <div className="mt-2">
                                <FileIcon name={contractFile.name} size={contractFile.size} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Work Permit */}
            <div className='grid grid-cols-2 items-center border border-gray-200 rounded-md p-5'>
                <div className='flex flex-col'>
                    <h2 className="font-bold text-xl mb-2">Work Permit Required?</h2>
                    <p className="text-slate-500 mb-2 text-sm">Select Permit types if required to execute the change</p>
                </div>
                <MultiSelect
                    value={workPermits}
                    onChange={setWorkPermits}
                    placeholder="Select the permits required"
                    options={[
                        { label: "Electrical", value: "electrical" },
                        { label: "Civil", value: "civil" },
                        { label: "Hot Work", value: "hotwork" }
                    ]}
                />
            </div>
        </div>
    )
}

export default OperationalDetails
