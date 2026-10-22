import { useState } from "react"
import { QuestionCard } from "@/entities/question/ui/QuestionCard"
import './questions.css'
import { FiltersPanel } from "@/features/filterQuestion/ui/filtersPanel/FiltersPanel"
import { useFetchQuestionQuery } from "@/entities/question/api/questionApi"
import { PER_PAGE, useQuestionFilters } from "@/entities/question/model/useQuestionFilters"
import { Pagination } from "@/features/pagination/ui/Pagination"
import { getErrorMessage } from "@/shared/lib/getErrorMessage"
import { Button } from "@/shared/ui/button/Button"
import { Filter } from "@/shared/icons/Filter"
import { cn } from "@/shared/lib/cn"
import { ErrorView } from "@/shared/ui/errorView/ErrorView"
import { QuestionsSkeleton } from "./QuestionsSkeleton"

export const Questions = () => {
    const [filtersOpen, setFiltersOpen] = useState(false)
    const { page, filters, setSearchParams } = useQuestionFilters()

    const { data: questions, isLoading, error, refetch } = useFetchQuestionQuery({ ...filters, page, limit: PER_PAGE })

    const totalPages = Math.ceil((questions?.total ?? 0) / PER_PAGE)

    const resetFilters = () => {
        setSearchParams('')
    }

    return (
        <div className="question-list">
            <section className="question-list__container">
                <div className="question-list__header">
                    <h1 className="question-list__title">Вопросы React, JavaScript</h1>
                    <button
                        className="question-list__filters-toggle"
                        type="button"
                        aria-label="Открыть фильтры"
                        onClick={() => setFiltersOpen(true)}
                    >
                        <Filter />
                    </button>
                </div>
                {error ? (
                    <ErrorView message={getErrorMessage(error)} onRetry={refetch} />
                ) : isLoading ? (
                    <QuestionsSkeleton />
                ) : questions?.data.length ? (
                    questions?.data?.map(item => (
                        <QuestionCard
                            key={item.id}
                            shortAnswer={item.shortAnswer}
                            score={item.rate}
                            title={item.title}
                            rate={item.rate}
                            complexity={item.complexity}
                            slug={item.slug}
                            imgSrc={item.imageSrc}
                        />
                    ))
                ) : (
                    <div className="question-list__empty-list">
                        <p className="question-list__empty-list-title">Ничего не найдено, попробуйте сбросить фильтры</p>
                        <Button
                            className="question-list__empty-list-reset-button"
                            variant="primary"
                            size="M"
                            onClick={resetFilters}
                        >
                            Сбросить фильтры
                        </Button>
                    </div>
                )}
                {!isLoading && !error && <Pagination totalPages={totalPages} />}
            </section>

            {filtersOpen && (
                <div
                    className="question-list__filters-backdrop"
                    aria-hidden="true"
                    onClick={() => setFiltersOpen(false)}
                />
            )}

            <FiltersPanel
                className={cn(
                    'question-list__filters',
                    filtersOpen && 'question-list__filters--open',
                )}
                onClose={() => setFiltersOpen(false)}
            />
        </div>
    )
}