import { baseHeaders } from "@/config/constants"
import { createApi } from "@reduxjs/toolkit/query/react"

import { baseApi } from "./baseApi"

const users = "/user-apis/fmx/users"

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: baseApi,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: users + "/login",
                method: "POST",
                headers: baseHeaders,
                body: credentials
            })
        }),
        ssoLogin: builder.mutation({
            query: (ssoToken) => ({
                url: users + "/sso/login",
                method: "POST",
                body: { ssoToken }
            })
        }),
        sendOTP: builder.mutation({
            query: (body) => ({
                url: users + "/sendOtp",
                method: "POST",
                body
            })
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: users + "/changeUserPassword",
                method: "POST",
                body
            })
        }),
        getUserModule: builder.query({
            query: () => users + "/getUserModule"
        }),
        getMySites: builder.query({
            query: () => users + "/getMySites"
        }),
        getUserGroupsOfUser: builder.mutation({
            query: (body) => ({
                url: users + "/getUserGroupsOfUser",
                method: "POST",
                body
            })
        }),
        getAssignedUserGroups: builder.mutation({
            query: (body) => ({
                url: users + "/getUserGroups",
                method: "POST",
                body
            })
        }),
        getGroupUserList: builder.mutation({
            query: (groupId) => ({
                url: users + "/getGroupUsers",
                method: "POST",
                body: { groupId }
            })
        }),
        addMultipleUsersToGroups: builder.mutation({
            query: (body) => ({
                url: users + "/addUsersToGroups",
                method: "POST",
                body
            })
        })
    })
})
export const {
    useLoginMutation,
    useSsoLoginMutation,
    useSendOTPMutation,
    useChangePasswordMutation,
    useGetUserModuleQuery,
    useGetMySitesQuery,
    useGetUserGroupsOfUserMutation,
    useGetAssignedUserGroupsMutation,
    useGetGroupUserListMutation,
    useAddMultipleUsersToGroupsMutation
} = usersApi
