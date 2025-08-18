// import { URL_PREFIX, TEST_PREFIX } from "./authApi"
// import { baseApi } from "./baseApi"

// export const MocApis = baseApi.injectEndpoints({

//     endpoints: (builder) => ({

//         // Get All Details
//         getAllDetails: builder.mutation({
//             query: (mocConfigId) => ({
//                 url: TEST_PREFIX + `/detail`,
//                 method: "POST",
//                 body: { mocConfigId }
//             })
//         }),

//         // Get List 
//         getList: builder.mutation({
//             query: () => ({
//                 url: TEST_PREFIX + `/list`,
//                 method: "POST"
//             }),
//             overrideExisting: true
//         }),

//         // File Upload
//         uploadFile: builder.mutation({
//             query: (formData) => ({
//                 url: '/pun/uploadFile',
//                 method: "POST",
//                 body: formData
//             })
//         }),

//         // Create MOC
//         createMocForm: builder.mutation({
//             query: ({ siteId, token, mocConfigId, mocNo, mocData }) => ({
//                 url: TEST_PREFIX + `/create`,
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "siteId": siteId,
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: {
//                     mocConfigId,
//                     mocNo,
//                     mocData
//                 }
//             })
//         }),
        
//     })
// })

// export const {
//     useGetAllDetailsMutation,
//     useGetListMutation,
//     useUploadFileMutation,
//     useCreateMocFormMutation
// } = MocApis



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
                // url: '/pun/uploadFile',
                url: URL_PREFIX + `/uploadFile`,
                method: "POST",
                body: formData
            })
        }),

        // Get List 
        getCmList: builder.mutation({
            query: () => ({
                url: URL_PREFIX + `/moc/list`,
                method: "POST"
            }),
            overrideExisting: true
        }),

        // Create MOC
        // createMocForm: builder.mutation({
        //     query: ({ siteId, token, mocConfigId, mocNo, mocData }) => ({
        //         url: URL_PREFIX + `/moc/create`,
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "siteId": siteId,
        //             "Authorization": `Bearer ${token}`
        //         },
        //         body: {
        //             mocConfigId,
        //             mocNo,
        //             mocData
        //         }
        //     })
        // }),
        createMocForm: builder.mutation({
            query: ({ mocConfigId, mocNo, mocFormData }) => ({
              url: URL_PREFIX + `/moc/create`,
              method: "POST",
              body: {
                mocConfigId,
                mocNo,
                mocFormData
              }
            })
          }),
          
        
    }),
    overrideExisting: true  
})

export const {
    useGetAllDetailsMutation,
    useGetListMutation,
    useUploadFileMutation,
    useGetCmListMutation,
    useCreateMocFormMutation
} = MocApis
