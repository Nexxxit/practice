import { useRef, useState } from 'react'
import { useParams } from 'react-router'
import './questionDetails.css'
import { useGetQuestionBySlugQuery } from '@/entities/question/api/questionApi'
import { BackButton } from '@/shared/ui/backButton/BackButton'
import { QuestionDetailsSkeleton } from './QuestionDetailsSkeleton'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { ErrorView } from '@/shared/ui/errorView/ErrorView'
import { skipToken } from '@reduxjs/toolkit/query'
import { QuestionDetailsHeader } from './header/QuestionDetailsHeader'
import { QuestionDetailsNavigation } from './navigation/QuestionDetailsNavigation'
import { QuestionDetailsAnswer } from './answer/QuestionDetailsAnswer'
import { QuestionDetailsSidebar } from './sidebar/QuestionDetailsSidebar'
import { useQuestionNavigation } from '../model/useQuestionNavigation'
import { cn } from '@/shared/lib/cn'

export const QuestionDetails = () => {
    const { slug } = useParams()
    const [infoOpen, setInfoOpen] = useState(false)
    const { data: questionData, isLoading, error, refetch } = useGetQuestionBySlugQuery(slug ?? skipToken)
    const navigation = useQuestionNavigation()

    const prevDataRef = useRef(questionData)
    if (questionData) prevDataRef.current = questionData
    const shownQuestion = questionData ?? prevDataRef.current

    if (error) return <ErrorView message={getErrorMessage(error)} onRetry={refetch} />
    if (isLoading && !shownQuestion) return <QuestionDetailsSkeleton />

    return (
        <div className='question-details'>
            <BackButton className='question-details__back-btn' />
            <section className='question-details__inner'>
                <QuestionDetailsHeader
                    title={shownQuestion?.title}
                    description={shownQuestion?.description}
                    imageSrc={shownQuestion?.imageSrc}
                    onInfoClick={() => setInfoOpen(true)}
                />
                <QuestionDetailsNavigation {...navigation} />
                <QuestionDetailsAnswer title='Краткий ответ' content={shownQuestion?.shortAnswer} />
                <QuestionDetailsAnswer title='Развёрнутый ответ' content={shownQuestion?.longAnswer} collapsible />
            </section>

            <QuestionDetailsSidebar
                className={cn(
                    'question-details__sidebar',
                    infoOpen && 'question-details__sidebar--open',
                )}
                onClose={() => setInfoOpen(false)}
                complexity={shownQuestion?.complexity}
                rate={shownQuestion?.rate}
                questionSkills={shownQuestion?.questionSkills}
                keywords={shownQuestion?.keywords}
                authorUsername={shownQuestion?.createdBy?.username}
            />
        </div>
    )
}
