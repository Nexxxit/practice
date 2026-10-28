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
    isPrevLoading?: boolean
    isNextLoading?: boolean
    prevError?: string
    nextError?: string
    onPrevRetry?: () => void
    onNextRetry?: () => void
}

export const QuestionDetailsNavigation = ({
    onPrev,
    onNext,
    className,
    isNextDisabled,
    isPrevDisabled,
    isPrevLoading,
    isNextLoading,
    prevError,
    nextError,
    onPrevRetry,
    onNextRetry,
}: QuestionDetailsNavigationProps) => {
    return (
        <Container className={cn('question-details-navigation', className)}>
            <div className='question-details-navigation__side'>
                <Button
                    className='question-details-navigation__prev-btn'
                    variant='tertiary'
                    size='M'
                    iconleft={<AltArrowLeft />}
                    onClick={onPrev}
                    disabled={isPrevDisabled || isPrevLoading}
                >
                    {isPrevLoading ? 'Загрузка…' : 'Предыдущий'}
                </Button>
                {prevError && (
                    <span className='question-details-navigation__error'>
                        {prevError}
                        {onPrevRetry && (
                            <button type='button' className='question-details-navigation__retry' onClick={onPrevRetry}>
                                Повторить
                            </button>
                        )}
                    </span>
                )}
            </div>
            <div className='question-details-navigation__side question-details-navigation__side--right'>
                <Button
                    className='question-details-navigation__next-btn'
                    variant='tertiary'
                    size='M'
                    iconRight={<AltArrowRight />}
                    onClick={onNext}
                    disabled={isNextDisabled || isNextLoading}
                >
                    {isNextLoading ? 'Загрузка…' : 'Следующий'}
                </Button>
                {nextError && (
                    <span className='question-details-navigation__error'>
                        {nextError}
                        {onNextRetry && (
                            <button type='button' className='question-details-navigation__retry' onClick={onNextRetry}>
                                Повторить
                            </button>
                        )}
                    </span>
                )}
            </div>
        </Container>
    )
}
