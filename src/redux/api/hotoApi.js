// redux/services/otherApi.ts

import { baseApi } from "./baseApi"

const URL_PREFIX = "/hoto-apis/pun/hoto"

export const hotoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchData: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + "/config/details",
                method: "POST",
                body
            }),
            transformResponse: (response) => response
        }),
        getAllTurnovers: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + `/listing/list`,
                method: "POST",
                body
            })
        }),
        getCalendarListing: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + `/listing/calender`,
                method: "POST",
                body
            })
        }),
        getTurnoverDetails: builder.mutation({
            query: (body) => {
                return {
                    url: URL_PREFIX + `/listing/details`,
                    method: "POST",
                    body
                }
            }
        }),
        createHotoForm: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + `/listing/create`,
                method: "POST",
                body
            })
        }),
        getDropdownValues: builder.mutation({
            query: () => ({
                method: "POST",
                url: URL_PREFIX + `/dropdowns/list`
            })
        }),
        getTakeovers: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + `/listing/list/takeover`,
                method: "POST",
                body
            })
        }),
        approveTakeover: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + `/listing/approve`,
                method: "POST",
                body
            })
        })
    })
})

export const {
    useFetchDataMutation,
    useCheckExisitingUserQuery,
    useGetAllTurnoversMutation,
    useGetTurnoverDetailsMutation,
    useCreateHotoFormMutation,
    useGetCalendarListingMutation,
    useGetDropdownValuesMutation,
    useGetTakeoversMutation,
    useApproveTakeoverMutation
} = hotoApi
