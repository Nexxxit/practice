import { useNavigate, useParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFetchQuestionQuery } from '@/entities/question/api/questionApi'
import { PER_PAGE, useQuestionFilters } from '@/entities/question/model/useQuestionFilters'
import { ROUTES_CONFIG } from '@/shared/config/routes/routesConfig'
import type { Question } from '@/entities/question/model/types'

export const useQuestionNavigation = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { page, filters, searchParams } = useQuestionFilters()

    const { data: questionsListData } = useFetchQuestionQuery({ ...filters, page, limit: PER_PAGE })

    const items = questionsListData?.data ?? []
    const totalPages = questionsListData ? Math.ceil(questionsListData.total / PER_PAGE) : 1
    const currentQuestionIndex = items.findIndex((item) => item.slug === slug)

    const atStart = currentQuestionIndex === 0 && page > 1
    const atEnd = currentQuestionIndex !== -1 && currentQuestionIndex === items.length - 1 && page < totalPages

    const { data: prevPageData } = useFetchQuestionQuery(atStart ? { ...filters, page: page - 1, limit: PER_PAGE } : skipToken)
    const { data: nextPageData } = useFetchQuestionQuery(atEnd ? { ...filters, page: page + 1, limit: PER_PAGE } : skipToken)

    const canGoPrev = currentQuestionIndex > 0 || atStart
    const canGoNext = (currentQuestionIndex >= 0 && currentQuestionIndex < items.length - 1) || atEnd

    const goToQuestion = (question: Question, targetPage: number) => {
        const params = new URLSearchParams(searchParams)
        if (targetPage > 1) {
            params.set('page', String(targetPage))
        } else {
            params.delete('page')
        }
        navigate({ pathname: `${ROUTES_CONFIG.QUESTIONS.BASE}/${question.slug}`, search: params.toString() }, { replace: true })
        window.scrollTo(0, 0)
    }

    const onPrev = () => {
        if (currentQuestionIndex === -1) return
        if (currentQuestionIndex > 0) {
            goToQuestion(items[currentQuestionIndex - 1], page)
            return
        }
        if (atStart) {
            const prevItems = prevPageData?.data
            if (prevItems?.length) goToQuestion(prevItems[prevItems.length - 1], page - 1)
        }
    }

    const onNext = () => {
        if (currentQuestionIndex === -1) return
        if (currentQuestionIndex < items.length - 1) {
            goToQuestion(items[currentQuestionIndex + 1], page)
            return
        }
        if (atEnd) {
            const first = nextPageData?.data[0]
            if (first) goToQuestion(first, page + 1)
        }
    }

    return { onPrev, onNext, isPrevDisabled: !canGoPrev, isNextDisabled: !canGoNext }
}
