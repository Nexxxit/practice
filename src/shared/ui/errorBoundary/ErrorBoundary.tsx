import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorView } from '../errorView/ErrorView'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, info: ErrorInfo) => void
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        this.props.onError?.(error, info)
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught an error:', error, info.componentStack)
        }
    }

    handleReset = () => {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback
            return (
                <ErrorView
                    title='Произошла непредвиденная ошибка'
                    message={this.state.error?.message}
                    onRetry={this.handleReset}
                    retryLabel='Попробовать снова'
                />
            )
        }

        return this.props.children
    }
}
