'use client';

import React, { useEffect, useState } from 'react';
import { useHierarchy } from '@/hooks/useHierarchy';
import FormBuilder, { FormProvider } from '../FormBuilder';
import { FormBuilderResponse } from '@/utils/staticData';
import DefaultFormBuilder from '../DefaultFormBuilder';
import Calendar from '../Calendar';
import { useGetAllDetailsMutation } from '@/redux/api/MocApis';

export default function TestForm() {
    const { loading } = useHierarchy();
    // const [formData, setFormData] = useState({})
    const formData = FormBuilderResponse;
    const [formConfig, setFormConfig] = useState({});
    const [getAllDetails] = useGetAllDetailsMutation()
    const url = new URL(window.location.href);
    const formIdParam = url.searchParams.get('formId');

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await getAllDetails(formIdParam).unwrap()
            console.log("response11111", response);
            setFormConfig(response.data)
            // setFormData(response.data?.data)
        }
        fetchDetails()
    }, [getAllDetails, formIdParam])

    console.log("formConfig", formConfig)
    console.log("formConfig-->", formConfig?.formSteps?.[0])
    console.log("formData", formData)
    
    
    if (!formConfig || loading) {
        return <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-100"></div>
        </div>; // or a spinner
    }

    const formConfigObj = {
        formSteps: formData?.data[0]?.formSteps || [],
        data: formData?.data[0] || {},
    };
       // const formConfigObj = {
    //     formSteps: formData?.formSteps || [],
    //     data: formData?.data || {},
    // };
    // const formConfigObj = formConfig || []; 

    return (
        <div className='mt-4 overflow-y-auto w-full'>
            <FormProvider>
                <DefaultFormBuilder formConfig={formConfigObj} formId={formIdParam} />
            </FormProvider>
        </div>
    );
}

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useHierarchy } from '@/hooks/useHierarchy';
// import { FormProvider } from '../FormBuilder';
// import DefaultFormBuilder from '../DefaultFormBuilder';
// import { useGetAllDetailsMutation } from '@/redux/api/MocApis';

// export default function TestForm() {
//   const { loading } = useHierarchy();
//   const [formConfig, setFormConfig] = useState(null);
//   const [getAllDetails, { isLoading: apiLoading }] = useGetAllDetailsMutation();

//   // Get formId safely
//   const [formId, setFormId] = useState(null);
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const url = new URL(window.location.href);
//       setFormId(url.searchParams.get('formId'));
//     }
//   }, []);

//   // Fetch form details when formId is available
//   useEffect(() => {
//     if (!formId) return;

//     const fetchDetails = async () => {
//       try {
//         const response = await getAllDetails({ formId }).unwrap();
//         console.log('API Response:', response);

//         if (response?.data) {
//           setFormConfig({
//             formSteps: response.data.formSteps || [],
//             data: response.data,
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching details:', error);
//       }
//     };

//     fetchDetails();
//   }, [formId, getAllDetails]);

//   // Loader state
//   if (loading || apiLoading || !formConfig) {
//     return (
//       <div className="w-full h-full flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-100"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-4 overflow-auto flex justify-center items-center">
//       <FormProvider>
//         <DefaultFormBuilder formConfig={formConfig} formId={formId} />
//       </FormProvider>
//     </div>
//   );
// }
