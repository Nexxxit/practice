import { cn } from '@/shared/lib/cn'
import { Skeleton } from '../skeleton/Skeleton'
import './category.css'

const CHIP_WIDTHS = [96, 128, 84, 140, 112, 104]

interface CategorySkeletonProps {
    items?: number
    titleWidth?: number
    chipHeight?: number
    className?: string
}

export const CategorySkeleton = ({ items = 5, titleWidth = 88, chipHeight = 42, className }: CategorySkeletonProps) => {
    return (
        <div className={cn('category', className)}>
            <Skeleton height={17} width={titleWidth} />
            <div className='category__content'>
                {Array.from({ length: items }, (_, index) => (
                    <Skeleton
                        key={index}
                        height={chipHeight}
                        width={CHIP_WIDTHS[index % CHIP_WIDTHS.length]}
                        borderRadius={12}
                    />
                ))}
            </div>
        </div>
    )
}
