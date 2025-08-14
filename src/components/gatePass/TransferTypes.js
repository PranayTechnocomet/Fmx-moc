'use client'

import Card from '../ui/Card';
import Button from '../ui/Button';
import { Building, Shield } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTransferType } from '../../redux/slices/gatePassSlice';
import { CardContent } from '../ui/CardContent';
import InwardGatePass from './InwardGatePass';
import OutwardGatepass from './OutwardGatepass';
import ClosedGatePass from './ClosedGatePass';
import Image from 'next/image';
import InwardImage from '../../images/Inward.png';
import OutwardImage from '../../images/Outward.png';

export default function TransferTypes() {
    const selectedTransferType = useSelector((state) => state.getGatePass.selectedTransferType);
    const dispatch = useDispatch();

    const handleTransferTypeSelect = (typeId) => {
        dispatch(setSelectedTransferType(typeId));
    };

    const transferTypes = [
        {
            id: 'inward',
            title: 'Standard Change Management',
            description: 'Choose this option to for planned, low-risk changes with predefined procedures and approvals.',
            image: InwardImage,
        },
        {
            id: 'outward',
            title: 'Non Standard Change Management',
            description: 'Choose this option to for complex, high-impact changes that fall outside routine procedures and require extensive review and risk mitigation.',
            image: OutwardImage,
        }
    ];

    if (selectedTransferType === 'inward') {
        return <InwardGatePass />;
    }
    if (selectedTransferType === 'outward') {
        // return <ClosedGatePass />;
        return <InwardGatePass />;
    }

    return (
        <div className="w-full my-4 ">
            <Card className='pt-0'>
                <h2 className="text-xl font-semibold">Change Request Types</h2>
                <p className="text-sm text-gray-500 mb-6">Select change request types</p>

                <div className="flex w-full gap-6">
                    {transferTypes.map((type) => (
                        <div
                            key={type.id}
                            className="w-full cursor-pointer transition-all p-6 rounded-xl border border-gray-300 bg-white shadow-md group hover:border-blue-800 hover:bg-blue-100"
                            onClick={() => handleTransferTypeSelect(type.id)}
                        >
                            <CardContent className="p-6 text-center">
                                {/* <div className="rounded-full p-3 mx-auto mb-2 w-28 group-hover:bg-blue-800"> */}
                                    <Image src={type.image} alt={type.title} width={500} height={500} className="w-16 mx-auto text-white group-hover:text-white" />
                                {/* </div> */}
                                <h3 className="font-semibold text-center text-lg my-2 text-gray-900 group-hover:text-gray-900">{type.title}</h3>
                                <p className="text-md text-gray-500 text-center my-2 ">{type.description}</p>
                            </CardContent>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
}
