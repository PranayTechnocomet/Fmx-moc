import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { authApi } from "../api/authApi"

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.token = null
            state.user = null
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                if (payload.success) {
                    state.token = payload.data.loginToken
                    state.user = payload.data.userName
                    state.isAuthenticated = true
                } else {
                    console.error("slice err:", payload.message)
                    toast.error(payload.message, {
                        toastId: "loginError"
                    })
                }
            }
        )
    }
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
