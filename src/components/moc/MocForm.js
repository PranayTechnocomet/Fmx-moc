// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useHierarchy } from '@/hooks/useHierarchy';
// import FormBuilder, { FormProvider } from '../FormBuilder';
// import { FormBuilderResponse } from '@/utils/staticData';
// import DefaultFormBuilder from '../DefaultFormBuilder';
// import Calendar from '../Calendar';
// import { useGetAllDetailsMutation } from '@/redux/api/MocApis';

// export default function MocForm() {
//     const { loading } = useHierarchy();
//     // const [formData, setFormData] = useState({})
//     const formData = FormBuilderResponse;
//     const [formConfig, setFormConfig] = useState({});
//     const [getAllDetails] = useGetAllDetailsMutation()
//     const url = new URL(window.location.href);
//     const formIdParam = url.searchParams.get('formId');

//     useEffect(() => {
//         const fetchDetails = async () => {
//             const response = await getAllDetails(formIdParam).unwrap()
//             console.log("response11111", response);
//             setFormConfig(response.data)
//             // setFormData(response.data?.data)
//         }
//         fetchDetails()
//     }, [getAllDetails, formIdParam])

//     console.log("formConfig", formConfig)
//     console.log("formConfig-->", formConfig?.formSteps?.[0])
//     console.log("formData", formData)


//     if (!formConfig || loading) {
//         return <div className="w-full h-full flex items-center justify-center">
//             <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-100"></div>
//         </div>; // or a spinner
//     }

//     const formConfigObj = {
//         formSteps: formData?.data[0]?.formSteps || [],
//         data: formData?.data[0] || {},
//     };
//        // const formConfigObj = {
//     //     formSteps: formData?.formSteps || [],
//     //     data: formData?.data || {},
//     // };
//     // const formConfigObj = formConfig || []; 

//     return (
//         <div className='mt-4 overflow-y-auto w-full'>
//             <FormProvider>
//                 <FormBuilder formConfig={formConfigObj} formId={formIdParam} />
//             </FormProvider>
//         </div>
//     );
// }

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

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const url = new URL(window.location.href);
                const formIdParam = url.searchParams.get('formId');

                const response = await getAllDetails(formIdParam).unwrap();
                console.log("response11111", response?.data?.mocConfigId);

                // Ensure formConfig has correct structure
                setFormConfig(response?.data || {});
            } catch (err) {
                console.error("Failed to fetch details", err);
            }
        };

        fetchDetails();
    }, [getAllDetails]);

    if (loading || !formConfig?.formSteps) {
        return (
            <div className="flex justify-center items-center  h-[calc(100vh-120px)]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    const isGridLayout = formConfig?.formSteps?.isFormGrid !== true;

    return (
        <div className='mt-4 overflow-auto h-screen w-full'>
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
