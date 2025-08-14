import { useEffect } from "react"
import { useUploadFileMutation } from "../redux/api/MocApis"
import { toast } from "react-toastify"


export const useMoc = () => {
    const [fileUploads] = useUploadFileMutation();

    // File Upload
    const fileUpload = async (file) => {
        try {
          console.log('file', file)

            // Wrap File in FormData
            const formData = new FormData();
          formData.append("file", file); // must match multer's field name
          console.log('--',formData);

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

    // const fileUpload = async (file) => {
    //     try {
        //   const formData = new FormData();
        //   formData.append("assetAttachment", file); // must match multer's field name
      
    //       const response = await fileUploads(formData).unwrap();
      
    //       if (response.success === 1) {
    //         return response;
    //       } else {
    //         toast.error(response.message || "File Upload Failed", { toastId: "File Upload Error" });
    //         throw new Error(response.message || "Submission failed");
    //       }
    //     } catch (error) {
    //       console.error("Error uploading file:", error);
    //       throw error;
    //     }
    //   };
      


    return {
        fileUpload
    }
}
