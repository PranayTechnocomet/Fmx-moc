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
    // const handleFileUpload = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const validTypes = [
    //             "image/jpeg",
    //             "image/jpg",
    //             "image/png",
    //             "application/pdf"
    //         ];
    //         if (!validTypes.includes(file.type)) {
    //             toast.error("Please upload JPG, JPEG, PNG, or PDF");
    //             return;
    //         }

    //         try {
    //             // UI ma store karo
    //             setSelectedFile(file);
    //             onChange?.(file); // parent ne pass karo

    //             // API call karo
    //             const response = await fileUpload(file);

    //             if (response?.success) {
    //                 toast.success("File uploaded successfully!");
    //                 console.log("Upload Response:", response);
    //             } else {
    //                 toast.error(response?.message || "File upload failed");
    //             }
    //         } catch (error) {
    //             console.error("Upload Error:", error);
    //             toast.error("Something went wrong while uploading the file");
    //         }
    //     }
    // };

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
                onChange?.(file); // parent ne pass karo (raw file if needed)
    
                // API call karo
                const response = await fileUpload(file);
    
                if (response?.success && response?.data?.url) {
                    
                    const uploadedFile = {
                        fileName: file.name,
                        fileUrl: response.data.url,
                        fileSizeMB: (file.size / (1024 * 1024)).toFixed(2) // bytes → MB
                    };
    
                    console.log("Normalized Upload File:", uploadedFile);
    
                    onChange?.(uploadedFile);
    
                    toast.success("File uploaded successfully!");
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