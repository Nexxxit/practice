import { type ReactNode } from 'react'
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
    showMore?: () => void;
    hasMore?: boolean;
    isFetching?: boolean;
    getValue?: (item: T) => string
    children?: ReactNode
    readonly?: boolean

}

export const Category = <T extends CategoryItem>({ categoryTitle, categoryData = [], hasMore, isFetching, showMore, selected = [], onToggle, getValue = (item: T) => item.title, children, readonly = false }: CategoryProps<T>) => {

    const visibleItems = categoryData

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
                onClick={showMore}
                disabled={isFetching}
            >
                Показать ещё
            </Button>
            )}
        </div>
    )
}