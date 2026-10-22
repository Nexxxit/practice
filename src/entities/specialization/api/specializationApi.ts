import { baseApi } from "@/shared/api/baseApi";
import { API_CONFIG } from "@/shared/config/api/apiConfig";
import type { Specializations } from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchSpecializations: builder.query<Specializations, void>({
            query: () => API_CONFIG.specialization,
            providesTags: ['Specializations']
        })
    })
})

export const { useFetchSpecializationsQuery } = specializationApi