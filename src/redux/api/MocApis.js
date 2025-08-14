import { URL_PREFIX, TEST_PREFIX } from "./authApi"
import { baseApi } from "./baseApi"

export const MocApis = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        // Get All Details
        getAllDetails: builder.mutation({
            query: (mocConfigId) => ({
                url: TEST_PREFIX + `/detail`,
                method: "POST",
                body: { mocConfigId }
            })
        }),

        // Get List 
        getList: builder.mutation({
            query: () => ({
                url: TEST_PREFIX + `/list`,
                method: "POST"
            }),
            overrideExisting: true
        }),

        // File Upload
        uploadFile: builder.mutation({
            query: (formData) => ({
                url: '/pun/uploadFile',
                method: "POST",
                body: formData
            })
        }),
    })
})

export const {
    useGetAllDetailsMutation,
    useGetListMutation,
    useUploadFileMutation,
} = MocApis
