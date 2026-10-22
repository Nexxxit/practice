import { ArrowRight } from "@/shared/icons/ArrowRight"
import { Accordion } from "@/shared/ui/accordion/Accordion"
import { Badge } from "@/shared/ui/badge/Badge"
import { Button } from "@/shared/ui/button/Button"
import './questionCard.css'
import { Kebab } from '@/shared/icons/Kebab'
import { RichContent } from '@/shared/ui/richContent/RichContent'
import { Link, useLocation } from "react-router"
import { ROUTES_CONFIG } from "@/shared/config/routes/routesConfig"

interface QuestionCardProps {
    title: string
    score: number
    shortAnswer: string
    complexity: number
    rate: number
    slug: string
    imgSrc?: string
}

export const QuestionCard = ({ title, complexity, rate, shortAnswer, slug, imgSrc = '' }: QuestionCardProps) => {
    const { search } = useLocation()


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
                            <Badge type="rate" score={rate} />
                            <Badge type="complexity" score={complexity} />
                        </div>
                        <button type="button" className="button question-card__menu">
                            <Kebab className="question-card__menu-icon" />
                        </button>
                    </div>
                    {imgSrc && <img src={imgSrc} alt="quest" className="question-card__answer-img" />}
                    <RichContent className='question-card__description' content={shortAnswer} />
                    <Link className="question-card__link-details" to={{ pathname: `${ROUTES_CONFIG.QUESTIONS.BASE}/${slug}`, search }}>
                        <Button className="question-card__link-button" variant="link" size="L" iconRight={<ArrowRight />}>
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </Accordion.Content>
        </Accordion>
    )
}