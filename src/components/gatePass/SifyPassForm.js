import React from 'react';
import PassForm from './PassForm';
import { useSelector } from 'react-redux';
// Centralized form config for gate pass forms
const sifyFormConfig = [
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
        section: 'Sify Details',
        stepLabel: 'Sify Details',
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
                type: 'select',
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


export default function SifyPassForm() {
    const selectedTransferType = useSelector(state => state.getGatePass.selectedTransferType);
    // Filter out 'Return Details' if outward
    const filteredConfig = selectedTransferType === 'outward'
        ? sifyFormConfig.filter(section => section.section !== 'Return Details')
        : sifyFormConfig;
    return (
        <div>
            <PassForm formConfig={filteredConfig} />
        </div>
    );
}
