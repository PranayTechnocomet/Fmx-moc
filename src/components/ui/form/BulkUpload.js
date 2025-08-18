// 'use client'
// import React, { useState } from "react"
// import Button from "../Button"
// import { toast } from "react-toastify"

// export default function BulkUpload() {
//     const [selectedFile, setSelectedFile] = useState(null)
//     const [previewUrl, setPreviewUrl] = useState(null)

//     // Handle File Upload
//     const handleFileUpload = (e) => {
//         const file = e.target.files[0]
//         if (file) {
//             const fileType = file.type
//             const validTypes = [
//                 "image/jpeg",
//                 "image/jpg",
//                 "image/png",
//                 "application/pdf",
//             ]
//             if (validTypes.includes(fileType)) {
//                 setSelectedFile(file)

//                 if (fileType.startsWith("image/")) {
//                     const reader = new FileReader()
//                     reader.onloadend = () => {
//                         setPreviewUrl(reader.result)
//                     }
//                     reader.readAsDataURL(file)
//                 } else {
//                     setPreviewUrl(null)
//                 }
//             } else {
//                 toast("Please upload a file in JPG, JPEG, PNG, PDF format")
//             }
//         }
//     }

//     const handleCancel = () => {
//         setSelectedFile(null)
//         setPreviewUrl(null)
//     }

//     return (
//         <div>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-5 relative">
//                 {previewUrl && (
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x absolute top-2 right-2 cursor-pointer" onClick={handleCancel}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
//                 )}
//                 <div className="flex flex-col items-center justify-center space-y-4">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-12 w-12 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                     </svg>

//                     <div className="text-center">
//                         <h3 className="text-md font-bold text-gray-900">
//                             Upload File
//                         </h3>
//                         <p className="mt-2 max-w-4xl text-gray-500 text-sm">
//                             Please upload in JPG, JPEG, PNG, PDF File Format
//                         </p>
//                     </div>

//                     <div className="flex gap-4 flex-wrap items-center justify-center">
//                         <Button
//                             variant="secondary"
//                             className="font-bold rounded-lg relative overflow-hidden"
//                             onClick={() =>
//                                 document.querySelector("#bulk-upload-file").click()
//                             }
//                         >
//                             <input
//                                 type="file"
//                                 id="bulk-upload-file"
//                                 className="hidden"
//                                 accept=".jpg,.jpeg,.png,.pdf"
//                                 onChange={handleFileUpload}
//                             />
//                             <span className="text-md font-medium text-blue-[#153AC7]">
//                                 {selectedFile ? "Change File" : "Browse File"}
//                             </span>
//                         </Button>
//                     </div>

//                     {selectedFile && (
//                         <div className="text-center mt-4 space-y-2">
//                             <p className="text-gray-600 text-sm">
//                                 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
//                             </p>

//                             {previewUrl && (
//                                 <img
//                                     src={previewUrl}
//                                     alt="Preview"
//                                     className="min-w-[550px] max-h-[500px] p-1 flex justify-center rounded-lg border shadow"
//                                     style={{ objectFit: "contain" }}
//                                 />
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'
import React, { useState, useEffect } from "react"
import Button from "../Button"
import { toast } from "react-toastify"
import { useMoc } from "@/hooks/useMoc";

// PDF Icon Component
const PdfIcon = ({ size = 350 }) => (
    <div
        className="flex items-center justify-center bg-red-50 rounded-md shadow border"
        style={{ width: size, height: size }}
    >
        <svg
            width={size * 0.6}
            height={size * 0.6}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#DC2626" />
            <path d="M14 2V8H20" fill="#FCA5A5" />
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PDF</text>
        </svg>
    </div>
);

export default function BulkUpload({ value, onChange, componentProps }) {
    const [selectedFile, setSelectedFile] = useState(value || null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const { fileUpload } = useMoc();


    // Generate image preview if file is image
    useEffect(() => {
        if (selectedFile && selectedFile.type?.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = () => setPreviewUrl(reader.result)
            reader.readAsDataURL(selectedFile)
        } else {
            setPreviewUrl(null)
        }
    }, [selectedFile])

    // const handleFileUpload = (e) => {
    //     const file = e.target.files[0]
    //     if (file) {
    //         const validTypes = [
    //             "image/jpeg",
    //             "image/jpg",
    //             "image/png",
    //             "application/pdf"
    //         ]
    //         if (!validTypes.includes(file.type)) {
    //             toast.error("Please upload JPG, JPEG, PNG, or PDF")
    //             return
    //         }
    //         setSelectedFile(file)
    //         onChange?.(file) // send to parent
    //     }
    // }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "application/pdf"
            ];
            if (!validTypes.includes(file.type)) {
                toast.error("Please upload JPG, JPEG, PNG, or PDF");
                return;
            }

            try {
                // UI ma store karo
                setSelectedFile(file);
                onChange?.(file); // parent ne pass karo

                // API call karo
                const response = await fileUpload(file);

                if (response?.success) {
                    toast.success("File uploaded successfully!");
                    console.log("Upload Response:", response);
                } else {
                    toast.error(response?.message || "File upload failed");
                }
            } catch (error) {
                console.error("Upload Error:", error);
                toast.error("Something went wrong while uploading the file");
            }
        }
    };


    const handleCancel = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        onChange?.(null)
    }

    const inputId = `bulk-upload-${componentProps?.displayFiledName}`

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-5 relative">
            {/* Cancel Button */}
            {selectedFile && (
                <button
                    type="button"
                    onClick={handleCancel}
                    className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                    ✕
                </button>
            )}

            <div className="flex flex-col items-center justify-center space-y-4">
                {/* Empty State Icon */}
                {!selectedFile && (
                    <>
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
                        <div className="text-center">
                            <h3 className="text-md font-bold text-gray-900">
                                Upload File
                            </h3>
                            <p className="mt-2 text-gray-500 text-sm">
                                Please upload in JPG, JPEG, PNG, PDF File Format
                            </p>
                        </div>
                    </>
                )}

                {/* Browse Button */}
                <Button
                    variant="secondary"
                    className="font-bold rounded-lg relative overflow-hidden"
                    onClick={() => document.getElementById(inputId).click()}
                >
                    <input
                        type="file"
                        id={inputId}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileUpload}
                    />
                    <span className="text-md font-medium text-blue-[#153AC7]">
                        {selectedFile ? "Change File" : "Browse File"}
                    </span>
                </Button>

                {/* File Info & Preview */}
                {selectedFile && (
                    <div className="text-center mt-4 space-y-2">
                        <p className="text-gray-600 text-sm">
                            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                        </p>

                        {/* Image Preview */}
                        {selectedFile.type?.startsWith("image/") && previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-[350px] max-h-[350px] p-1 rounded-lg border shadow mx-auto"
                                style={{ objectFit: "contain" }}
                            />
                        )}

                        {/* PDF Preview */}
                        {selectedFile.type === "application/pdf" && (
                            <div className="flex justify-center items-center mt-2">
                                <PdfIcon size={350} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
