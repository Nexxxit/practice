import { Container } from '@/shared/ui/container/Container'
import { RichContent } from '@/shared/ui/richContent/RichContent'
import { cn } from '@/shared/lib/cn'
import './questionDetailsAnswer.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/button/Button'
import { ChevroneDown } from '@/shared/icons/ChevroneDown'

interface QuestionDetailsAnswerProps {
    title: string
    content?: string
    className?: string
    collapsible?: boolean
}

export const QuestionDetailsAnswer = ({ title, content, className, collapsible }: QuestionDetailsAnswerProps) => {
    const [expanded, setExpanded] = useState(!collapsible)
    const [overflowing, setOverflowing] = useState(false)
    const collapseRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (!collapsible || expanded || !collapseRef.current) return
        const el = collapseRef.current
        const measure = () => setOverflowing(el.scrollHeight > el.clientHeight)
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(el)
        return () => observer.disconnect()
    }, [content, expanded, collapsible])

    return (
        <Container className={cn('question-details-answer', className)}>
            <h3 className='question-details-answer__title'>{title}</h3>
            <div
                ref={collapseRef}
                className={cn('question-details-answer__collapse', collapsible && !expanded && 'question-details-answer__collapse--collapsed')}
            >
                <RichContent
                    className='question-details-answer__content'
                    content={content}
                />
            </div>
            {collapsible && overflowing && (
                <Button
                    className={cn('question-details-answer__toggle', expanded && 'question-details-answer__toggle--expanded')}
                    variant='tertiary'
                    size='M'
                    iconRight={<ChevroneDown />}
                    aria-expanded={expanded}
                    onClick={() => setExpanded(prev => !prev)}
                >
                    {expanded ? 'Свернуть' : 'Развернуть'}
                </Button>
            )}
        </Container>
    )
}
