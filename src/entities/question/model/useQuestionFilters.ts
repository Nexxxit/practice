import { useSearchParams } from 'react-router'
import type { GetQuestionsArg } from './types'

export const PER_PAGE = 10

const parseList = (value: string | null) => value?.split(',').filter(Boolean)
const parseNumbers = (value: string | null) => parseList(value)?.map(Number)

export const useQuestionFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const page = Math.max(1, Number(searchParams.get('page')) || 1)

    const filters: GetQuestionsArg = {
        skills: parseList(searchParams.get('skills')),
        specializationSlug: searchParams.get('specializationSlug') ?? undefined,
        rate: parseNumbers(searchParams.get('rate')),
        complexity: parseNumbers(searchParams.get('complexity')),
        titleOrDescription: searchParams.get('titleOrDescription') ?? undefined,
        keywords: parseList(searchParams.get('keywords')),
    }

    return { page, filters, searchParams, setSearchParams }
}
