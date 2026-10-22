import { baseApi } from "@/shared/api/baseApi";
import { API_CONFIG } from "@/shared/config/api/apiConfig";
import type { Skills } from "../model/types";

const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchSkills: builder.query<Skills, void>({
            query: () => API_CONFIG.skills,
            providesTags: ['Skills']
        })
    })
})

export const { useFetchSkillsQuery } = skillApi