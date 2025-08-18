import { useEffect } from "react"
import { useCreateMocFormMutation, useCreateMocMutation, useUploadFileMutation } from "../redux/api/MocApis"
import { toast } from "react-toastify"


export const useMoc = () => {
    const [fileUploads] = useUploadFileMutation();
    const [createMoc] = useCreateMocFormMutation();

    // File Upload
    const fileUpload = async (file) => {
        try {
            console.log('file', file)

            // Wrap File in FormData
            const formData = new FormData();
            formData.append("file", file); // must match multer's field name
            console.log('--', formData);

            const response = await fileUploads(formData).unwrap();

            if (response.success === 1) {
                return response;
            } else {
                toast.error(response.message || "File Upload Failed", { toastId: "File Upload Error" });
                throw new Error(response.message || "Submission failed");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            // toast.error(error.message || "An error occurred while uploading the file.");
            throw error;
        }
    };

    // Create MOC
    // const createMocForm = async ({ file, mocConfigId, mocNo, mocFormData }) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         formData.append("mocConfigId", mocConfigId);
    //         formData.append("mocNo", mocNo);
    //         formData.append("mocFormData", JSON.stringify(mocFormData)); // JSON.stringify for arrays/objects

    //         const response = await createMoc(formData).unwrap();
    //         console.log('moc create', response);
            

    //         if (response.success === 1) {
    //             toast.success(response.message || "MOC created successfully");
    //             return response;
    //         } else {
    //             toast.error(response.message || "File Upload Failed");
    //             throw new Error(response.message || "Submission failed");
    //         }
    //     } catch (error) {
    //         const errMsg = error?.message || error?.data?.message || "An error occurred while uploading the file.";
    //         toast.error(errMsg);
    //         throw error;
    //     }
    // };

    const createMocForm = async ({ files = [], mocConfigId, mocNo, mocFormData }) => {
        try {
          const formData = new FormData()
          console.log("mocConfigId to send:", mocConfigId);  // 👈 debug
          console.log("mocNo to send:", mocNo);
      
          // append normal fields
          formData.append("mocConfigId", mocConfigId)
          formData.append("mocNo", mocNo)
          formData.append("mocFormData", JSON.stringify(mocFormData))
    
          // append files
          files.forEach((file) => {
            formData.append("files", file) // backend should accept files[]
          })
    
          const response = await createMoc(formData).unwrap()
          console.log("MOC create response", response)
    
          if (response.success === 1) {
            toast.success(response.message || "MOC created successfully")
            return response
          } else {
            toast.error(response.message || "MOC creation failed")
            throw new Error(response.message || "Submission failed")
          }
        } catch (error) {
          const errMsg = error?.data?.message || error?.message || "Upload error"
          toast.error(errMsg)
          throw error
        }
      }
    
    






    return {
        fileUpload,
        createMocForm
    }
}
