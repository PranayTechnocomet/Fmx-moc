'use client'
import { useState } from "react"
import Button from "./ui/Button"

const UploadSheet = () => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.size <= 5 * 1024 * 1024) {
                setSelectedFile(file)
            } else {
                alert("Please upload a file up to 5MB in size")
            }
        }
    }

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex flex-col items-center justify-center space-y-3">
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
                    <h3 className="text-lg font-bold text-gray-900">
                        Upload Excel or Google Sheets File
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Please upload an XLSX file (max 5MB)
                    </p>
                </div>
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                />
                <Button
                    variant="secondary"
                    className="font-semibold rounded-lg"
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    Browse File
                </Button>
            </div>
        </div>
    )
}

export default UploadSheet