'use client'

import { useSelector, useDispatch } from 'react-redux';
import { setShowTransferTypes, setSelectedInwardType, setShowForm } from '../../redux/slices/gatePassSlice';
import Image from 'next/image';
import { Info } from 'lucide-react';
import Button from '../ui/Button';
import { CardContent } from '../ui/CardContent';
import TransferTypes from './TransferTypes';
import ClientPassForm from './ClientPassForm';
import SifyPassForm from './SifyPassForm';
import VendorPassForm from './VendorPassForm';
import SifyDeliveryImage from '../../images/sify-delivery.png';
import ClientDeliveryImage from '../../images/client-delivery.png';
import VendorDeliveryImage from '../../images/venor-delivery.png';

export default function InwardGatePass() {
    const dispatch = useDispatch();
    const showTransferTypes = useSelector((state) => state.getGatePass.showTransferTypes);
    const selectedInward = useSelector((state) => state.getGatePass.selectedInwardType);
    const showForm = useSelector((state) => state.getGatePass.showForm);
    const selectedTransferType = useSelector((state) => state.getGatePass.selectedTransferType);
    console.log('showTransferTypes', showTransferTypes);

    const inwardOptions = [
        {
            id: 'sifydelivery',
            title: 'Sify Delivery',
            icon: SifyDeliveryImage,
        },
        {
            id: 'clientdelivery',
            title: 'Client Delivery',
            icon: ClientDeliveryImage,
        },
        {
            id: 'vendordelivery',
            title: 'Vendor Delivery',
            icon: VendorDeliveryImage,
        },
    ];

    // States are now managed by Redux
    if (showTransferTypes) {
        return <TransferTypes />;
    }
    if (showForm === 'client') {
        return <ClientPassForm />;
    }
    if (showForm === 'sify') {
        return <SifyPassForm />;
    }
    if (showForm === 'vendor') {
        return <VendorPassForm />;
    }
    return (
        <div className="w-full mx-auto my-6 px-4">
            {selectedTransferType === 'outward' ? (
                <h1 className="text-xl my-5 font-semibold">Outward Gate Pass</h1>
            ) : (
                <h1 className="text-xl my-5 font-semibold">Inward Gate Pass</h1>
            )}            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {inwardOptions.map((type) => {
                    const isSelected = selectedInward === type.id;
                    return (
                        <div
                            key={type.id}
                            className={`cursor-pointer p-4 rounded-xl border transition-all ${isSelected
                                ? 'border-blue-600 bg-blue-100'
                                : 'border-gray-300 bg-white hover:shadow-md'
                                }`}
                            onClick={() => {
                                dispatch(setSelectedInwardType(type.id));
                                // Do not show ClientPassForm here
                            }}
                        >
                            <CardContent className="text-start">
                                <Image
                                    src={type.icon}
                                    alt={type.title}
                                    width={150}
                                    height={150}
                                    className="w-20 h-20 mb-6"
                                />
                                <h3 className="text-lg font-semibold flex justify-between items-center">
                                    {type.title}
                                    <Info size={16} className="inline-block ml-2" />
                                </h3>
                            </CardContent>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end w-full my-6 gap-5">
                <Button
                    variant="secondary"
                    className="flex items-center rounded-md"
                    onClick={() => dispatch(setShowTransferTypes(true))}
                >
                    Back
                </Button>
                <Button
                    variant="primary"
                    className="flex items-center rounded-md"
                    onClick={() => {
                        if (selectedInward === 'clientdelivery') {
                            dispatch(setShowForm('client'));
                        }
                        else if (selectedInward === 'sifydelivery') {
                            dispatch(setShowForm('sify'));
                        }
                        else if (selectedInward === 'vendordelivery') {
                            dispatch(setShowForm('vendor'));
                        }
                        else {
                            dispatch(setShowTransferTypes(true));
                        }
                    }}
                >
                    Save & Continue
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                    >
                        <path
                            d="M2.73582 11.765C3.04917 12.0783 3.55436 12.0783 3.86771 11.765L9.18186 6.45084C9.43126 6.20144 9.43126 5.79856 9.18186 5.54916L3.86771 0.235012C3.55436 -0.0783373 3.04917 -0.0783373 2.73582 0.235012C2.42247 0.548361 2.42247 1.05356 2.73582 1.36691L7.36571 6.0032L2.72942 10.6395C2.42247 10.9464 2.42247 11.458 2.73582 11.765Z"
                            fill="white"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    );
}
