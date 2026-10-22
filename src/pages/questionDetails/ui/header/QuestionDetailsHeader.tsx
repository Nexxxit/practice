import { Container } from '@/shared/ui/container/Container'
import { cn } from '@/shared/lib/cn'
import { InfoIcon } from '@/shared/icons/InfoIcon'
import pic from '@/assets/pic.png'
import './questionDetailsHeader.css'

interface QuestionDetailsHeaderProps {
    title?: string
    description?: string
    imageSrc?: string
    className?: string
    onInfoClick?: () => void
}

export const QuestionDetailsHeader = ({ title, description, imageSrc = pic, className, onInfoClick }: QuestionDetailsHeaderProps) => {
    return (
        <Container className={cn('question-details-header', className)}>
            <div className='question-details-header__image-container'>
                <img className='question-details-header__image' src={imageSrc} loading='lazy' />
            </div>
            <div className='question-details-header__content-container'>
                <div className='question-details-header__title-row'>
                    <h1 className='question-details-header__title'>{title}</h1>
                    <button
                        className='question-details-header__info-btn'
                        type='button'
                        aria-label='Открыть информацию о вопросе'
                        onClick={onInfoClick}
                    >
                        <InfoIcon />
                    </button>
                </div>
                <p className='question-details-header__description'>{description}</p>
            </div>
        </Container>
    )
}
