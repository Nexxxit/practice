import type { ButtonHTMLAttributes } from "react"
import './button.css'

type ButtonSize = 'L' | 'M'
type ButtonVariant = 'link' | 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    icon_left?: React.ReactNode
    icon_right?: React.ReactNode

}

export const Button = ({ children, variant = 'primary', size = 'M', icon_left, icon_right, className = '', ...rest }: ButtonProps) => {
    const classes = [
        'button',
        `button--${variant}`,
        `button--${size.toLowerCase()}`,
        className
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button className={classes} {...rest}>
            {icon_left && <span className="button__icon">{icon_left}</span>}
            {children}
            {icon_right && <span className="button__icon">{icon_right}</span>}
        </button>
    )
}