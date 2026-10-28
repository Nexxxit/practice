import { baseApi } from "@/shared/api/baseApi";
import { API_CONFIG } from "@/shared/config/api/apiConfig";
import type { Specializations } from "../model/types";

interface SpecializationGetArg {
    page?: number
}

export const specializationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchSpecializations: builder.query<Specializations, SpecializationGetArg>({
            query: ({ page }) => ({
                url: API_CONFIG.specialization,
                params: { page }
            }),
            providesTags: ['Specializations']
        })
    })
})

export const { useFetchSpecializationsQuery } = specializationApi