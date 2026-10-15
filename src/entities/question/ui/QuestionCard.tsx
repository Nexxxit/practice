import { ArrowRight } from "@/shared/icons/ArrowRight"
import { Accordion } from "@/shared/ui/accordion/Accordion"
import { Badge } from "@/shared/ui/badge/Badge"
import { Button } from "@/shared/ui/button/Button"
import './questionCard.css'
import kebab from '@/assets/Kebab.svg'

interface QuestionCardProps {
    title: string
    score: number
    description: string
    imgSrc?: string
}

export const QuestionCard = ({ title, score, description, imgSrc = '' }: QuestionCardProps) => {
    return (
        <Accordion className="question-card">
            <Accordion.Trigger className="question-card__header">
                <div className="question-card__title-wrapper">
                    <span className="question-card__dot"></span>
                    <h3 className="question-card__title">{title}</h3>
                </div>
            </Accordion.Trigger>
            <Accordion.Content className="question-card__content">
                <div className="question-card__inner">
                    <div className="question-card__meta">
                        <div className="question-card__badges">
                            <Badge type="rate" score={score} />
                            <Badge type="complexity" score={score} />
                        </div>
                        <button type="button" className="button question-card__menu">
                            <img src={kebab} className="question-card__menu-icon" />
                        </button>
                    </div>
                    {imgSrc && <img src={imgSrc} alt="quest" className="question-card__answer-img" />}
                    <p className="question-card__description">{description}</p>
                    <Button className="question-card__link-details" variant="link" size="L" icon_right={<ArrowRight />}>
                        Подробнее
                    </Button>
                </div>
            </Accordion.Content>
        </Accordion>
    )
}