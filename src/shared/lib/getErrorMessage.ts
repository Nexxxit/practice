import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

type QueryError = FetchBaseQueryError | SerializedError

export const getErrorMessage = (error: QueryError): string => {
    if ('status' in error) {
        if (typeof error.status === 'number') {
            const body = error.data as { message?: string } | undefined
            return body?.message || `Ошибка сервера (${error.status})`
        }
        if (error.status === 'FETCH_ERROR') {
            return 'Сервер недоступен. Проверьте подключение к сети или убедитесь, что API запущен'
        }
        if (error.status === 'TIMEOUT_ERROR') {
            return 'Превышено время ожидания ответа от сервера'
        }
        if ('error' in error && error.error) {
            return String(error.error)
        }
        return `Ошибка (${error.status})`
    }
    return error.message || 'Неизвестная ошибка'
}
