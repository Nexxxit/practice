import { Container } from '@/shared/ui/container/Container'
import { Button } from '@/shared/ui/button/Button'
import { AltArrowLeft } from '@/shared/icons/AltArrowLeft'
import { AltArrowRight } from '@/shared/icons/AltArrowRigth'
import { cn } from '@/shared/lib/cn'
import './questionDetailsNavigation.css'

interface QuestionDetailsNavigationProps {
    onPrev: () => void
    onNext: () => void
    className?: string
    isPrevDisabled?: boolean
    isNextDisabled?: boolean
}

export const QuestionDetailsNavigation = ({ onPrev, onNext, className, isNextDisabled, isPrevDisabled }: QuestionDetailsNavigationProps) => {
    return (
        <Container className={cn('question-details-navigation', className)}>
            <Button
                className='question-details-navigation__prev-btn'
                variant='tertiary'
                size='M'
                iconleft={<AltArrowLeft />}
                onClick={onPrev}
                disabled={isPrevDisabled}
            >
                Предыдущий
            </Button>
            <Button
                className='question-details-navigation__next-btn'
                variant='tertiary'
                size='M'
                iconRight={<AltArrowRight />}
                onClick={onNext}
                disabled={isNextDisabled}
            >
                Следующий
            </Button>
        </Container>
    )
}
