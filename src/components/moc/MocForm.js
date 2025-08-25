'use client';

import React, { useEffect, useState } from 'react';
import { useHierarchy } from '@/hooks/useHierarchy';
import FormBuilder, { FormProvider } from '../FormBuilder';
import { useGetAllDetailsMutation } from '@/redux/api/MocApis';
import DefaultFormBuilder from '../DefaultFormBuilder';

export default function MocForm() {
    const { loading } = useHierarchy();
    const [formConfig, setFormConfig] = useState(null);
    const [getAllDetails] = useGetAllDetailsMutation();
    const url = new URL(window.location.href);
    const formIdParam = url.searchParams.get('formId');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getAllDetails(formIdParam).unwrap();
                // console.log("response11111", response?.data?.mocConfigId);

                setFormConfig(response?.data || {});
            } catch (err) {
                console.error("Failed to fetch details", err);
            }
        };

        fetchDetails();
    }, [getAllDetails, formIdParam]);

    if (loading || !formConfig?.formSteps) {
        return (
            <div className="flex justify-center items-center  h-[calc(100vh-120px)]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    const isGridLayout = formConfig?.formSteps?.isFormGrid !== true;

    return (
        <div className='overflow-auto h-screen no-scrollbar mt-4 w-full'>
            <FormProvider>
                <FormBuilder
                    formConfig={formConfig}
                    isGridLayout={isGridLayout}
                    hotoId={formConfig?.id}
                />
            </FormProvider>
        </div>
    );
}
