import { baseApi } from "@/shared/api/baseApi";
import { API_CONFIG } from "@/shared/config/api/apiConfig";
import type { Skills } from "../model/types";

interface SkillsGetArg {
    page?: number
}

const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchSkills: builder.query<Skills, SkillsGetArg>({
            query: ({ page }) => ({
                url: API_CONFIG.skills,
                params: { page }
            }),
            providesTags: ['Skills']
        })
    })
})

export const { useFetchSkillsQuery } = skillApi