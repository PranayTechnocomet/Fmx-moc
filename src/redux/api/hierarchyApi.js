import { URL_PREFIX } from "./authApi"
import { baseApi } from "./baseApi"

export const hierarchyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getClients: builder.mutation({
            query: () => ({
                url: URL_PREFIX + "/clients",
                method: "POST"
            }),
            providesTags: ["Clients"]
        }),

        getClusters: builder.mutation({
            query: (clientId) => ({
                url: URL_PREFIX + `/clients/${clientId}/clusters`,
                method: "POST"
            }),
            providesTags: ["Clusters"]
        }),

        getSites: builder.mutation({
            query: () => ({
                url: URL_PREFIX + `/user/getMySites`,
                method: "POST"
            }),
            transformResponse: (response) => ({
                clusters: response.data.map((e) => ({
                    id: e.clusterName,
                    name: e.clusterName,
                    ...e
                }))
            }),
            providesTags: ["Sites"]
        }),
        getAllSites: builder.mutation({
            query: () => ({
                url: URL_PREFIX + `/user/getMySites`,
                method: "POST"
            })
        }),
    })
})

export const {
    useGetClientsMutation,
    useGetClustersMutation,
    useGetSitesMutation,
    useGetAllSitesMutation
} = hierarchyApi
