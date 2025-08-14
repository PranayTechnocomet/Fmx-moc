import Image from 'next/image';
import React from 'react';
import SifyLogo from '../../images/sify.png'
// Mock data (replace with props or external data as needed)
const gatePassData = {
    logoUrl: SifyLogo,
    header: {
        number: 'SIFY/2024/102',
        date: '24 Apr, 2024, 4:30 PM',
        address: 'Sify\nOpp, Chandrakant Dhuru Wadi\nPrabhadevi, Mumbai, Maharashtra 400025',
    },
    basicDetails: [
        { label: 'City', value: 'Mumbai' },
        { label: 'Site', value: 'Empress' },
        { label: 'Building', value: 'Tower' },
        { label: 'Creator Name', value: 'Maya Sripada' },
        { label: 'Creator Contact', value: '9231132324' },
        { label: 'Creator Email', value: 'mayasripad@gmail.com' },
        { label: 'Vendor GST No', value: '162762623267362' },
        { label: 'Vendor Company Name', value: 'Paladion Networks PVT LTD' },
        { label: 'Vendor Person Name', value: 'Rahul Jain' },
        { label: 'Vendor Contact Number', value: '9811123234' },
        { label: 'Vendor Email ID', value: 'rahul@hotmail.com' },
        { label: 'Vendor Address', value: 'Mumbai' },
        { label: "Sender's Name", value: 'Priyank Sharma' },
        { label: "Sender's Contact No", value: '18283621891' },
        { label: 'Category', value: 'Returnable' },
        { label: 'Return Date', value: '20 Apr 2024' },
    ],
    assetDetails: [
        {
            type: 'Bounded',
            description: 'ARPS new Motherboard',
            model: '06910',
            hsn: '123412',
            serial: 'RS6',
            value: '9000 INR',
            remarks: 'Amount Details',
            quantity: 10,
        },
        {
            type: 'Non Bounded',
            description: 'Upgrade Microprocessor',
            model: '06911',
            hsn: '421345',
            serial: 'SM9',
            value: '12000 INR',
            remarks: 'Version Name',
            quantity: 12,
        },
    ],
    records: {
        requisitioner: { name: 'Zeshaan', date: '8 May, 2024 | 10:46' },
        gatePassPreparedBy: { name: 'Shashank Sharma', date: '8 May, 2024 | 03:33' },
        empowermentRep: { name: 'Zaheer Ali', date: '9 May, 2024 | 11:43' },
        security: { name: 'Mahendra Kumar', date: '10 May, 2024 | 12:06' },
    },
};

const ClosedGatePass = () => {
    const { logoUrl, header, basicDetails, assetDetails, records } = gatePassData;

    // Split details into 3 columns for display
    const detailColumns = [[], [], []];
    basicDetails.forEach((item, idx) => {
        detailColumns[idx % 3].push(item);
    });

    return (
        <div className="h-screen py-8 px-2 overflow-auto pb-20">
            <div className=" bg-white rounded-xl shadow-lg p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <Image src={logoUrl} alt="Logo" height={500} width={500} className="h-16 w-16 mr-4" />
                    <div className="flex-1 text-center">
                        <div className="font-bold text-xl  tracking-wide">{header.number}</div>
                        <div className="text-sm text-gray-600 mt-1">{header.date}</div>
                    </div>
                    <div className="text-right text-sm text-gray-600 whitespace-pre-line min-w-[200px]">{header.address}</div>
                </div>

                {/* Basic Details */}
                <div className="font-semibold text-lg mb-5 mt-7">Basic Detail</div>
                <div className="grid grid-cols-3 gap-8">
                    {detailColumns.map((col, i) => (
                        <div key={i}>
                            {col.map((item, j) => (
                                <div key={j} className="grid grid-cols-12 gap-4 mb-4">
                                    <span className="text-gray-600 font-medium col-span-6">{item.label}:</span>
                                    <span className="text-gray-900 font-normal col-span-6">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Asset Details Table */}
                <div className="font-semibold text-lg mb-2 mt-10">Asset Details</div>
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-sm bg-gray-50 rounded-lg border">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 font-semibold text-start">
                                <th className="py-2 px-2 text-start">#</th>
                                <th className="py-2 px-2 text-start">Asset Type</th>
                                <th className="py-2 px-2 text-start">Material Description</th>
                                <th className="py-2 px-2 text-start">Model</th>
                                <th className="py-2 px-2 text-start">HSN No</th>
                                <th className="py-2 px-2 text-start">Service tag / Serial no</th>
                                <th className="py-2 px-2 text-start">Value</th>
                                <th className="py-2 px-2 text-start">Remarks</th>
                                <th className="py-2 px-2 text-start">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetDetails.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white border-b' : 'bg-white'}>
                                    <td className="py-4 px-2 text-start">{idx + 1}</td>
                                    <td className="py-4 px-2 text-start">{row.type}</td>
                                    <td className="py-4 px-2 text-start">{row.description}</td>
                                    <td className="py-4 px-2 text-start">{row.model}</td>
                                    <td className="py-4 px-2 text-start">{row.hsn}</td>
                                    <td className="py-4 px-2 text-start">{row.serial}</td>
                                    <td className="py-4 px-2 text-start">{row.value}</td>
                                    <td className="py-4 px-2 text-start">{row.remarks}</td>
                                    <td className="py-4 px-2 text-start">{row.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Records and Outwarded/Material Inward Records */}
                <div className="flex gap-6 mt-8">
                    {/* Records */}
                    <div className="flex-2 shadow-md rounded-lg p-5 min-h-[170px] w-2/3">
                        <div className="font-semibold mb-3">Records</div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="mb-2 grid grid-cols-2">
                                <div className="text-gray-600 font-medium">Requisitioner:</div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{records.requisitioner.name}</span>
                                    <span className="text-gray-400 text-xs ">{records.requisitioner.date}</span>
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2">
                                <div className="text-gray-600 font-medium">Gate Pass Prepared By:</div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{records.gatePassPreparedBy.name}</span>
                                    <span className="text-gray-400 text-xs">{records.gatePassPreparedBy.date}</span>
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2">
                                <div className="text-gray-600 font-medium">Empowerment Representative:</div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{records.empowermentRep.name}</span>
                                    <span className="text-gray-400 text-xs">{records.empowermentRep.date}</span>
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2">
                                <div className="text-gray-600 font-medium">Security:</div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{records.security.name}</span>
                                    <span className="text-gray-400 text-xs">{records.security.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Outwarded By */}
                    <div className="flex-1 shadow-md rounded-lg p-5 min-h-[170px] w-1/3">
                        <div className="font-semibold mb-3">Outwarded By<br /><span className="font-normal">(Security Seal & Sign)</span></div>
                    </div>
                </div>

                {/* Material Inward Records */}
                <div className="font-semibold text-lg mt-10 mb-3 text-center">Material Inward Records</div>
                <div className="flex gap-6 mt-2 ">
                    <div className="flex-1 shadow-md rounded-lg p-5 min-h-[100px]">
                        <div className="font-semibold mb-20">Inwarded By<br /><span className="font-normal">(Security Seal & Sign)</span></div>
                    </div>
                    <div className="flex-1 shadow-md rounded-lg p-5 min-h-[100px]">
                        <div className="font-semibold mb-20">Acknowledged By<br /><span className="font-normal">(Name & Sign)</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClosedGatePass;
