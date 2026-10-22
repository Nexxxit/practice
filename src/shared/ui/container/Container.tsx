import { cn } from '@/shared/lib/cn'
import './container.css'

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

export const Container = ({ className, children }: ContainerProps) => {
    return (
        <section className={cn('container', className)}>
            {children}
        </section>
    )
}