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
            // transformResponse: (response) => ({
            //     clusters: response.data.map((e) => ({
            //         id: e.clusterName,
            //         name: e.clusterName,
            //         ...e
            //     }))
            // }),
            transformResponse: (response) => {
                console.log("getSites API response:", response);

                // Ensure we always work with an array
                const clusters = Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response)
                        ? response
                        : [];

                return {
                    clusters: clusters.map((e) => ({
                        id: e.clusterName,
                        name: e.clusterName,
                        ...e
                    })),
                    sites: clusters.flatMap((c) => c.sites || [])
                };
            },
            providesTags: ["Sites"]
        }),
        getAllSites: builder.mutation({
            query: () => ({
                url: URL_PREFIX + `/user/getMySites`,
                method: "POST"
            })
        }),
    }),
    overrideExisting: true

})

export const {
    useGetClientsMutation,
    useGetClustersMutation,
    useGetSitesMutation,
    useGetAllSitesMutation
} = hierarchyApi
