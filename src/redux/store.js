import { configureStore } from "@reduxjs/toolkit"

import { baseApi } from "./api/baseApi"
import { hierarchyApi } from "./api/hierarchyApi"
import { hotoApi } from "./api/hotoApi"
import { usersApi } from "./api/users"
import authReducer from "./slices/authSlice"
import hierarchyReducer from "./slices/hierarchySlice"
import getGatePassReducer from "./slices/gatePassSlice"
import mocReducer from "./slices/mocSlice"

const apiMiddlewares = [
  baseApi.middleware,
  hierarchyApi.middleware,
  hotoApi.middleware,
  usersApi.middleware
]

// Remove duplicates (by reference)
const uniqueMiddlewares = Array.from(new Set(apiMiddlewares))

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    getGatePass: getGatePassReducer,
    hierarchy: hierarchyReducer,
    [hierarchyApi.reducerPath]: hierarchyApi.reducer,
    moc: mocReducer,
    [hotoApi.reducerPath]: hotoApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(uniqueMiddlewares)
})
