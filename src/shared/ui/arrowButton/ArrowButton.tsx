import { ArrowLeft } from '@/shared/icons/ArrowLeft'
import './arrowButton.css'
import { cn } from '@/shared/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type ArrowButtonVariant = 'left' | 'right'

type ArrowButtonProps = {
    variant: ArrowButtonVariant
    className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ArrowButton = ({ variant, className, ...rest }: ArrowButtonProps) => {

    return (
        <button className={cn(`arrow-button arrow-button--${variant}`, className)} {...rest}>
            {variant === 'left' ? <ArrowLeft /> : <ArrowLeft className='arrow-button__icon-rotated' />}
        </button>

    )
}