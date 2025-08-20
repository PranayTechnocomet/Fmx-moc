"use client";

import { Paperclip, Plus } from "lucide-react";
import React, { useState } from "react";
import InputField from "../ui/form/Input";
import Image from "next/image";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { useMoc } from "@/hooks/useMoc";

const DescriptionAttachments = ({ value = [], onChange }) => {
    const { fileUpload } = useMoc();
    const [previewModal, setPreviewModal] = useState({ open: false, file: null });
    const [loading, setLoading] = useState(false);

    // --- File Upload Handler ---
    const handleFileChange = async (id, file) => {
        if (!file) return;

        setLoading(true);
        try {
            const response = await fileUpload(file);

            if (response?.success && response?.data?.url) {
                toast.success("File uploaded successfully");

                const uploadedFile = {
                      id,
                    fileName: file.name,
                    fileUrl: response.data.url,
                    fileType: file.type,
                    fileSizeMB: (file.size / (1024 * 1024)).toFixed(2),
                };

                const updated = (value || []).map((att) =>
                  att.id === id ? { ...att, ...uploadedFile } : att
                );


                onChange(updated);
            } else {
                toast.error(response?.message || "File upload failed");
            }
        } catch (err) {
            console.error("File upload failed:", err);
            toast.error(err.message || "File upload failed");
        } finally {
            setLoading(false);
        }
    };

    // const handleFileChange = async ({ activeStep, id, file }) => {
    //   if (!file) return;

    //   setLoading(true);
    //   try {
    //     const response = await fileUpload(file);

    //     if (response?.success && response?.data?.url) {
    //       toast.success("File uploaded successfully");

    //       const uploadedFile = {
    //         url: response.data.url,
    //         fileName: file.name,
    //         fileType: file.type,
    //         fileSizeMB: (file.size / (1024 * 1024)).toFixed(2)
    //       };

    //       // 🔑 update inside formValues for current step
    //       setFormValues((prev) => {
    //         const newValues = [...prev];
    //         newValues[activeStep] = {
    //           ...(prev[activeStep] || {}),
    //           [id]: uploadedFile
    //         };
    //         return newValues;
    //       });
    //     } else {
    //       toast.error(response?.message || "File upload failed");
    //     }
    //   } catch (err) {
    //     console.error("File upload failed:", err);
    //     toast.error(err.message || "File upload failed");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // --- Add Step ---
    const handleAddAttachment = () => {
        const newAttachment = {
            id: Date.now(),
            description: "",
            attachment: {
                fileName: "",
                fileUrl: "",
                fileType: "",
            }
        };
        onChange([...(value || []), newAttachment]);
    };

    // --- Remove Step ---
    const handleRemoveAttachment = (id) => {
        onChange((value || []).filter((item) => item.id !== id));
    };

    return (
        <div className="mt-5">
            <table className="w-full mt-4 rounded-lg shadow mb-6">
                <thead>
                    <tr className="bg-gray-100 text-slate-600 text-left">
                        <td className="p-2 font-thin text-sm">Step</td>
                        <th className="p-2 font-thin text-sm w-auto px-5">Description</th>
                        <th className="p-2 px-5 font-thin text-sm w-1/4 text-start">
                            Attachment
                        </th>
                        <th className="p-2 font-thin text-sm w-[10px] text-center">
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(value || []).map((file, index) => (
                        <tr key={file.id}>
                            <td className="p-2">{(index + 1).toString().padStart(2, "0")}</td>

                            {/* --- Description --- */}
                            <td className="p-2 py-2.5">
                                <InputField
                                    value={file.description || ""}
                                    onChange={(e) => {
                                        const updated = (value || []).map((a) =>
                                            a.id === file.id
                                                ? { ...a, description: e.target.value }
                                                : a
                                        );
                                        onChange(updated);
                                    }}
                                    placeholder="Description"
                                    className="w-full"
                                />
                            </td>

                            {/* --- File Upload --- */}
                            <td className="p-5 py-2.5">
                                <div className="flex items-center w-full gap-2 border border-gray-300 rounded-lg px-4 text-gray-500 hover:border-gray-400">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <Paperclip size={18} className="text-gray-400 rotate-45" />
                                        <span className="py-2 block truncate">
                                            {file?.fileName
                                                ? file.fileName.length > 25
                                                    ? `${file.fileName.slice(0, 15)}...${file.fileName.slice(
                                                        -3
                                                    )}`
                                                    : file.fileName
                                                : "Attachment"}
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                const selected = e.target.files?.[0];
                                                if (selected) {
                                                    handleFileChange(file.id, selected);
                                                }
                                            }}
                                            accept=".jpg,.jpeg,.png,.doc,.dwg,.pdf"
                                        />
                                    </label>

                                    {/* Preview Thumbnail */}
                                    {file.fileUrl && (
                                        <div
                                            className="ml-auto h-9 w-10 bg-black rounded overflow-hidden cursor-pointer"
                                            onClick={() =>
                                                setPreviewModal({ open: true, file })
                                            }
                                        >
                                            {file.fileType?.startsWith("image/") ? (
                                                <img
                                                    src={file.fileUrl}
                                                    alt="preview"
                                                    className="h-full w-full object-cover"
                                                    width={40}
                                                    height={36}
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full w-full text-white">
                                                    <Paperclip size={16} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </td>

                            <td className="p-2 py-2.5 flex justify-center">
                                <Button
                                    variant="outline"
                                    className="border-0"
                                    onClick={() => handleRemoveAttachment(file.id)}
                                    disabled={(value || []).length === 1}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.40695 16C2.95724 16 2.56725 15.8349 2.23699 15.5046C1.90673 15.1744 1.7416 14.7844 1.7416 14.3347V2.52964H1.50972C1.27081 2.52964 1.07054 2.44884 0.908928 2.28722C0.747312 2.1256 0.666504 1.92534 0.666504 1.68643C0.666504 1.44752 0.747312 1.24726 0.908928 1.08564C1.07054 0.924023 1.27081 0.843215 1.50972 0.843215H5.15662C5.15662 0.604304 5.23743 0.40404 5.39905 0.242424C5.56066 0.080808 5.76093 0 5.99984 0H10.2581C10.497 0 10.7008 0.0843214 10.8694 0.252964C11.038 0.421607 11.1224 0.618357 11.1224 0.843215H14.7482C14.9871 0.843215 15.1874 0.924023 15.349 1.08564C15.5106 1.24726 15.5914 1.44752 15.5914 1.68643C15.5914 1.92534 15.5106 2.1256 15.349 2.28722C15.1874 2.44884 14.9871 2.52964 14.7482 2.52964H14.5163V14.3347C14.5163 14.7844 14.3512 15.1744 14.0209 15.5046C13.6907 15.8349 13.3007 16 12.851 16H3.40695ZM3.40695 2.52964V14.3347H12.851V2.52964H3.40695ZM5.59931 11.8893C5.59931 12.0861 5.66958 12.2547 5.81011 12.3953C5.95065 12.5358 6.11929 12.6061 6.31604 12.6061C6.52685 12.6061 6.70252 12.5358 6.84305 12.3953C6.98359 12.2547 7.05386 12.0861 7.05386 11.8893V4.95389C7.05386 4.74308 6.98007 4.5639 6.83251 4.41634C6.68495 4.26877 6.51279 4.19499 6.31604 4.19499C6.10524 4.19499 5.93308 4.26877 5.79957 4.41634C5.66606 4.5639 5.59931 4.74308 5.59931 4.95389V11.8893ZM9.20405 11.8893C9.20405 12.0861 9.27784 12.2547 9.4254 12.3953C9.57296 12.5358 9.74512 12.6061 9.94187 12.6061C10.1527 12.6061 10.3283 12.5358 10.4689 12.3953C10.6094 12.2547 10.6797 12.0861 10.6797 11.8893V4.95389C10.6797 4.74308 10.6059 4.5639 10.4583 4.41634C10.3108 4.26877 10.1386 4.19499 9.94187 4.19499C9.73106 4.19499 9.55539 4.26877 9.41486 4.41634C9.27432 4.5639 9.20405 4.74308 9.20405 4.95389V11.8893ZM3.40695 2.52964V14.3347V2.52964Z" fill="#E84754" />
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Step Button */}
            <div className="mt-2">
                <Button
                    variant="custom"
                    className="rounded-lg"
                    onClick={handleAddAttachment}
                >
                    <Plus size={18} className="mt-1" /> Add Step
                </Button>
            </div>

            {/* --- Preview Modal --- */}
            {previewModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                        <button
                            className="absolute top-2 right-3 text-gray-500 hover:text-black"
                            onClick={() => setPreviewModal({ open: false, file: null })}
                        >
                            ✕
                        </button>

                        {previewModal.file?.fileType?.startsWith("image/") ? (
                            <img
                                src={previewModal.file.fileUrl}
                                alt="Full Preview"
                                className="w-full h-auto rounded"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8">
                                <Paperclip className="h-24 w-24 text-red-500" />
                                <p className="mt-4 text-gray-700 font-semibold">
                                    {previewModal.file?.fileName}
                                </p>
                                <a
                                    href={previewModal.file?.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline mt-2"
                                >
                                    Open in new tab
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DescriptionAttachments;
