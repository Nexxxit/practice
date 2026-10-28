import { useEffect, useRef, useState } from "react"
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
import { useMediaQuery } from "@/shared/lib/useMediaQuery"
import { useFocusTrap } from "@/shared/lib/useFocusTrap"

export const Questions = () => {
    const [filtersOpen, setFiltersOpen] = useState(false)
    const { page, filters, setSearchParams } = useQuestionFilters()
    const filtersPanelRef = useRef<HTMLElement>(null)
    const filtersToggleRef = useRef<HTMLButtonElement>(null)
    const isMobile = useMediaQuery('(max-width: 1023px)')

    const { currentData: questions, isFetching, error, refetch } = useFetchQuestionQuery({ ...filters, page, limit: PER_PAGE })

    const totalPages = Math.ceil((questions?.total ?? 0) / PER_PAGE)

    const resetFilters = () => {
        setSearchParams('')
    }

    useEffect(() => {
        if (!isMobile) return
        if (filtersOpen) {
            filtersPanelRef.current?.focus()
        } else {
            filtersToggleRef.current?.focus()
        }
    }, [filtersOpen, isMobile])

    useFocusTrap(filtersPanelRef, isMobile && filtersOpen)

    const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (isMobile && e.key === 'Escape') {
            setFiltersOpen(false)
        }
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
                        ref={filtersToggleRef}
                    >
                        <Filter />
                    </button>
                </div>
                {error ? (
                    <ErrorView message={getErrorMessage(error)} onRetry={refetch} />
                ) : isFetching && !questions ? (
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
                {!isFetching && !error && <Pagination totalPages={totalPages} />}
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
                onKeyDown={handlePanelKeyDown}
                inert={isMobile && !filtersOpen}
                tabIndex={isMobile && filtersOpen ? -1 : undefined}
                role={isMobile ? 'dialog' : undefined}
                aria-modal={isMobile || undefined}
                aria-label="Фильтры"
                ref={filtersPanelRef}
            />
        </div>
    )
}