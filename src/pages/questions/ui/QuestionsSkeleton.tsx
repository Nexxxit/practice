import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import { PER_PAGE } from '@/entities/question/model/useQuestionFilters'
import './questionsSkeleton.css'

const TITLE_WIDTHS = [62, 45, 70, 52, 58, 66, 48, 74, 55, 64]

const QuestionCardSkeleton = ({ index }: { index: number }) => (
    <div className='question-card-skeleton'>
        <div className='question-card-skeleton__title-wrapper'>
            <Skeleton
                className='question-card-skeleton__dot'
                width={8}
                height={8}
                borderRadius='50%'
            />
            <Skeleton
                height={24}
                width={`${TITLE_WIDTHS[index % TITLE_WIDTHS.length]}%`}
                borderRadius={8}
            />
            <Skeleton
                className='question-card-skeleton__icon'
                width={24}
                height={24}
                borderRadius={8}
            />
        </div>
    </div>
)

export const QuestionsSkeleton = () => {
    return (
        <>
            {Array.from({ length: PER_PAGE }, (_, index) => (
                <QuestionCardSkeleton key={index} index={index} />
            ))}
            <div className='pagination-skeleton'>
                <Skeleton width={28} height={28} borderRadius={8} />
                {Array.from({ length: 5 }, (_, index) => (
                    <Skeleton key={index} width={18} height={17} borderRadius={2} />
                ))}
                <Skeleton width={28} height={28} borderRadius={8} />
            </div>
        </>
    )
}
