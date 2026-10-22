import { Container } from '@/shared/ui/container/Container'
import { Category } from '@/shared/ui/category/Category'
import { Badge } from '@/shared/ui/badge/Badge'
import { Close } from '@/shared/icons/Close'
import { cn } from '@/shared/lib/cn'
import type { QuestionSkills } from '@/entities/question/model/types'
import './questionDetailsSidebar.css'
import { Link, useSearchParams } from 'react-router'
import { ROUTES_CONFIG } from '@/shared/config/routes/routesConfig'

interface QuestionDetailsSidebarProps {
    complexity?: number
    rate?: number
    questionSkills?: QuestionSkills[]
    keywords?: string[]
    authorUsername?: string
    className?: string
    onClose?: () => void
}

export const QuestionDetailsSidebar = ({ complexity = 0, rate = 0, questionSkills, keywords = [], authorUsername, className, onClose }: QuestionDetailsSidebarProps) => {
    const [searchParams] = useSearchParams()
    const active = searchParams.get('keywords')?.split(',').filter(Boolean) ?? []

    const linkFor = (keyword: string) => {
        const params = new URLSearchParams(searchParams)
        const next = new Set(active)
        next.has(keyword) ? next.delete(keyword) : next.add(keyword)
        next.size ? params.set('keywords', [...next].join(',')) : params.delete('keywords')
        params.delete('page')
        return { pathname: ROUTES_CONFIG.QUESTIONS.BASE, search: params.toString() }
    }

    return (
        <Container className={cn('question-details-sidebar', className)}>
            {onClose && (
                <button className='question-details-sidebar__close' type='button' aria-label='Закрыть информацию' onClick={onClose}>
                    <Close />
                </button>
            )}
            <Category categoryTitle='Уровень:'>
                <Badge type='complexity' score={complexity} />
                <Badge type='rate' score={rate} />
            </Category>
            <Category categoryTitle='Навыки:' categoryData={questionSkills} readonly />
            <Category categoryTitle='Ключевые слова:'>
                {keywords.map((keyword, index) => (
                    <Link to={linkFor(keyword)} className='question-details-sidebar__keyword' key={index}>
                        {`#${keyword}`}
                    </Link>
                ))}
            </Category>
            <div className='question-details-sidebar__author'>
                Автор: <span className='question-details-sidebar__author-username'>{authorUsername}</span>
            </div>
        </Container>
    )
}
