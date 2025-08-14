import { createApi } from "@reduxjs/toolkit/query/react"

import { baseApi } from "./baseApi"

const usersInternal = "/user-apis/fmx/users-internal"

export const usersInternalApi = createApi({
    reducerPath: "usersInternalApi",
    baseQuery: baseApi,
    endpoints: (builder) => ({
        getUserRole: builder.query({
            query: () => usersInternal + "/getUserRole"
        }),
        addNewUser: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/addUser",
                method: "POST",
                body
            })
        }),
        getAllUsers: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/getAllUsers",
                method: "POST",
                body
            })
        }),
        getUserInfo: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/getUserDetails",
                method: "POST",
                body
            })
        }),
        getEmpID: builder.query({
            query: () => usersInternal + "/getEmployeeId"
        }),

        updateUserDetails: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/updateUserDetails",
                method: "POST",
                body
            })
        }),
        updateUserSiteDetails: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/updateUserSiteModuleAccess",
                method: "POST",
                body
            })
        }),
        checkGroupName: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/checkGroupName",
                method: "POST",
                body
            })
        }),

        createUserGroups: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/createUserGroup",
                method: "POST",
                body
            })
        }),
        addUserToGroup: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/addUserToGroups",
                method: "POST",
                body
            })
        }),
        removeUserFromGroups: builder.mutation({
            query: (body) => ({
                url: usersInternal + "/removeUserFromUserGroup",
                method: "POST",
                body
            })
        }),
        //helpdesk
        getServiceIssueList: builder.mutation({
            query: (groupId) => ({
                url: "/helpdesk-apis/clientAdmin/helpDesk/master/serviceIssue/getServiceIssueList",
                method: "POST",
                body: {
                    data: {
                        status: "ACTIVE",
                        groupId
                    }
                }
            })
        })
    })
})
export const {
    useGetUserModuleQuery,
    useGetMySitesQuery,
    useGetUserGroupsOfUserMutation,
    useGetAssignedUserGroupsMutation,
    useGetGroupUserListMutation,
    useAddMultipleUsersToGroupsMutation,
    useGetUserRoleQuery,
    useAddNewUserMutation,
    useGetAllUsersMutation,
    useGetUserInfoMutation,
    useGetEmpIDQuery,
    useUpdateUserDetailsMutation,
    useUpdateUserSiteDetailsMutation,
    useCheckGroupNameMutation,
    useCreateUserGroupsMutation,
    useAddUserToGroupMutation,
    useRemoveUserFromGroupsMutation,
    useGetServiceIssueListMutation
} = usersInternalApi
