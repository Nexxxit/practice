import { cn } from '@/shared/lib/cn';
import './skillButton.css'

type SkillButtonSize = 'L' | 'S';

interface SkillButtonProps {
    children: React.ReactNode
    size: SkillButtonSize
    iconLeft?: string
    iconRight?: string
    className?: string
    checked: boolean
    onChange?: (checked: boolean) => void
    disabled?: boolean
}

export const SkillButton = ({ children, iconLeft, iconRight, className, size, checked = false, onChange, disabled = false }: SkillButtonProps) => {

    return (
        <label className={cn(`skillButton skillButton--${size.toLowerCase()}`, className)}>
            <input
                type="checkbox"
                className='skillButton__checkbox'
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            {iconLeft
                && <span className='skillButton__icon'>
                    <img src={iconLeft} loading='lazy' />
                </span>}
            {children}
            {iconRight
                && <span className='skillButton__icon'>
                    <img src={iconRight} loading='lazy' />
                </span>}
        </label>
    )
}

