import { useState, type ReactNode } from 'react'
import { Button } from '../button/Button'
import { SkillButton } from '../skillButton/SkillButton'
import './category.css'

export interface CategoryItem {
    id: number
    title: string
    imageSrc?: string
}

interface CategoryProps<T> {
    categoryTitle: string
    onToggle?: (value: string) => void
    selected?: string[]
    categoryData?: T[]
    limit?: number
    getValue?: (item: T) => string
    children?: ReactNode
    readonly?: boolean

}

export const Category = <T extends CategoryItem>({ categoryTitle, categoryData = [], limit = 5, selected = [], onToggle, getValue = (item: T) => item.title, children, readonly = false }: CategoryProps<T>) => {

    const [visibleCount, setVisibleCount] = useState(limit)

    const visibleItems = categoryData.slice(0, visibleCount)
    const hasMore = visibleCount < categoryData.length

    const handleShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + limit, categoryData.length))
    }

    return (
        <div className='category'>
            <h3 className='category__title'>{categoryTitle}</h3>
            <div className='category__content'>
                {visibleItems.map((item) => (
                    <SkillButton
                        key={item.id}
                        size={"S"}
                        iconLeft={item.imageSrc}
                        checked={!readonly && selected.includes(getValue(item))}
                        disabled={readonly}
                        onChange={readonly ? undefined : () => onToggle?.(getValue(item))}
                    >
                        {item.title}
                    </SkillButton>
                ))}
                {children}
            </div>
            {hasMore && (<Button
                className='category__watch-all-button'
                variant='link'
                size='M'
                onClick={handleShowMore}
            >
                Посмотреть все
            </Button>
            )}
        </div>
    )
}