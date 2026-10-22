import { cn } from "@/shared/lib/cn"
import { ArrowButton } from "@/shared/ui/arrowButton/ArrowButton"
import { useSearchParams } from "react-router"
import './pagination.css'

interface PaginationProps {
    totalPages: number
    className?: string
}

export const Pagination = ({ totalPages, className }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    if (totalPages <= 1) return null

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return

        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            next.set('page', String(page))
            return next
        })
    }

    const getPaginationItems = (current: number, total: number) => {
        if (total < 7) {
            return Array.from({ length: total }, (_, i) => i + 1)
        }

        if (current <= 5) {
            return [1, 2, 3, 4, 5, 6, '...', total];
        }

        if (current >= total - 4) {
            return [1, '...', total - 5, total - 4, total - 3, total - 2, total - 1, total];
        }

        return [1, '...', current - 1, current, current + 1, '...', total];
    }

    const paginationItems = getPaginationItems(currentPage, totalPages);

    return (
        <div className={cn("pagination", className)}>
            <ArrowButton className="pagination__button-back" onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} variant="left" />

            {paginationItems.map((item, i) => {
                if (item === '...') {
                    return (
                        <span
                            key={`dots-${i}`}
                            className="pagination__dots"
                        >
                            ...
                        </span>
                    )
                }

                const page = item as number
                const isSelected = currentPage === page

                return (
                    <button
                        key={page}
                        className={`pagination__button ${isSelected && 'pagination__button--selected'}`}
                        onClick={() => goToPage(page)}
                        aria-current={isSelected ? 'page' : undefined}
                    >
                        {page}
                    </button>
                )
            })}

            <ArrowButton className="pagination__button-next" onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages} variant="right" />
        </div>
    )
}