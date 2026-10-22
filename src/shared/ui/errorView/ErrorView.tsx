import { cn } from '@/shared/lib/cn'
import { Button } from '../button/Button'
import './errorView.css'

interface ErrorViewProps {
    title?: string
    message?: string
    onRetry?: () => void
    retryLabel?: string
    className?: string
}

export const ErrorView = ({ title = 'Что-то пошло не так', message, onRetry, retryLabel = 'Повторить попытку', className }: ErrorViewProps) => {
    return (
        <div className={cn('error-view', className)} role='alert'>
            <h2 className='error-view__title'>{title}</h2>
            {message && <p className='error-view__message'>{message}</p>}
            {onRetry && (
                <Button
                    className='error-view__retry'
                    variant='primary'
                    size='M'
                    onClick={onRetry}
                >
                    {retryLabel}
                </Button>
            )}
        </div>
    )
}
