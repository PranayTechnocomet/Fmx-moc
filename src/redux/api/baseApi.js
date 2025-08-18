// import { MODULE_NAME, baseHeaders } from "@/config/constants"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// export const baseApi = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({
//         baseUrl: process.env.API_BASE_URL,
//         prepareHeaders: (headers, { getState }) => {
//             const token =
//                 sessionStorage.getItem("token") || getState().auth.token
//             if (token) {
//                 headers.set("login-token", token)
//                 headers.set("module", `${MODULE_NAME}`)
//                 headers.set(
//                     "site-Id",
//                     getState().hierarchy.selectedSite || "NA"
//                 )
//             }
//             headers.set("login-source", baseHeaders["login-source"])
//             headers.set("deviceId", baseHeaders.deviceId)
//             headers.set("accountId", baseHeaders.accountId)

//             return headers
//         }
//     }),
//     endpoints: () => ({})
// })


import { MODULE_NAME, baseHeaders } from "@/config/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem("token") || getState().auth.token;
      const siteId = getState().hierarchy?.selectedSite;

      if (token) {
        headers.set("login-token", token);          // ✅ consistent
        headers.set("module", MODULE_NAME);
        headers.set("site-id", siteId || "NA");     // ✅ consistent key
      }

      // always attach common headers
      headers.set("login-source", baseHeaders["login-source"]);
      headers.set("device-id", baseHeaders.deviceId);
      headers.set("account-id", baseHeaders.accountId);

      return headers;
    }
  }),
  endpoints: () => ({})
});
