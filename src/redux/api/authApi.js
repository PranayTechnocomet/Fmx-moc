import { baseHeaders } from "@/config/constants"

import { baseApi } from "./baseApi"

export const URL_PREFIX = "/pun"
export const TEST_PREFIX = "/pun/moc/config"


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: URL_PREFIX + "/user/login",
                method: "POST",
                headers: baseHeaders,
                body: credentials
            })
        }),
        sendOTP: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + "/sendOtp",
                method: "POST",
                body
            })
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: URL_PREFIX + "/changeUserPassword",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useLoginMutation,
    useSendOTPMutation,
    useChangePasswordMutation
} = authApi
