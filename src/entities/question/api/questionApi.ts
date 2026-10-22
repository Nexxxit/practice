import { baseApi } from "@/shared/api/baseApi";
import type { GetQuestionsArg, QuestionBySlug, Questions } from "../model/types";
import { API_CONFIG } from "@/shared/config/api/apiConfig";


export const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchQuestion: builder.query<Questions, GetQuestionsArg>({
            query: ({ page, limit, skills, specializationSlug, rate, complexity, titleOrDescription, keywords }) => ({
                url: API_CONFIG.questions,
                params: { page, limit, skills, specializationSlug, rate, complexity, titleOrDescription, keywords },
            }),
            providesTags: ['Question']
        }),
        getQuestionBySlug: builder.query<QuestionBySlug, string>({
            query: (slug) => `${API_CONFIG.questionsBySlug}/${slug}`,
            providesTags: ['Question']
        })
    }),
    overrideExisting: false,
})

export const { useFetchQuestionQuery, useGetQuestionBySlugQuery } = questionApi;
