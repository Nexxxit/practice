import { lazy, Suspense } from "react"
import { ErrorBoundary } from "@/shared/ui/errorBoundary/ErrorBoundary"
import { Loader } from "@/shared/ui/loader/Loader"

const QuestionDetailsLazy = lazy(() => import('@/pages/questionDetails/ui/QuestionDetails').then(m => ({ default: m.QuestionDetails })))

export const QuestionDetailsRoute = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
                <QuestionDetailsLazy />
            </Suspense>
        </ErrorBoundary>
    )
}
