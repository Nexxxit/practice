import type { ButtonHTMLAttributes } from "react"
import './button.css'

type ButtonSize = 'L' | 'M'
type ButtonVariant = 'link' | 'primary' | 'secondary' | 'tertiary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    iconleft?: React.ReactNode
    iconRight?: React.ReactNode

}

export const Button = ({ children, variant = 'primary', size = 'M', iconleft, iconRight, className = '', ...rest }: ButtonProps) => {
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
            {iconleft && <span className="button__icon">{iconleft}</span>}
            {children}
            {iconRight && <span className="button__icon">{iconRight}</span>}
        </button>
    )
}