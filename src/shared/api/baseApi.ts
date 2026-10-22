import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "../config/api/apiConfig";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.baseUrl }),
    tagTypes: ['Question', 'Skills', 'Specializations'],
    endpoints: () => ({})
})