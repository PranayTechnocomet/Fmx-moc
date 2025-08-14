"use client"

import FormBuilder, { FormProvider } from "@/components/FormBuilder"
import { useFetchDataMutation } from "@/redux/api/hotoApi"
import { useParams, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

function App() {
    const [formConfig, setFormConfig] = useState(null)
    const params = useParams()
    const search = useSearchParams()
    const [fetchData] = useFetchDataMutation()
    const hotoId = search.get("ref")
    useEffect(() => {
        fetchData({
            hotoConfigId: params.id
        })
            .unwrap()
            .then((res) => setFormConfig(res.data))
    }, [])

    return (
        <>
            {formConfig ? (
                <FormProvider>
                    <FormBuilder
                        formConfig={formConfig}
                        hotoId={hotoId}
                    />
                </FormProvider>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default App
