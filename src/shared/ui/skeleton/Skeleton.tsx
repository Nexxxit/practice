import type { CSSProperties } from 'react'
import { cn } from '@/shared/lib/cn'
import './skeleton.css'

interface SkeletonProps {
    width?: number | string
    height?: number | string
    borderRadius?: number | string
    className?: string
    style?: CSSProperties
}

const withUnit = (value?: number | string) =>
    typeof value === 'number' ? `${value}px` : value

export const Skeleton = ({ width, height, borderRadius = 4, className, style }: SkeletonProps) => {
    return (
        <span
            aria-hidden="true"
            className={cn('skeleton', className)}
            style={{
                width: withUnit(width) ?? '100%',
                height: withUnit(height) ?? '16px',
                borderRadius: withUnit(borderRadius),
                ...style,
            }}
        />
    )
}
