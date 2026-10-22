import { startTransition } from "react"
import { useSearchParams } from "react-router"

export const useFilterParam = (key: string, defaultValue = 'all') => {
    const [searchParams, setSearchParams] = useSearchParams()
    const raw = searchParams.get(key)
    const value = raw ?? defaultValue

    const setValue = (next: string | string[] | null) => {
        const params = new URLSearchParams(searchParams)
        const isEmpty =
            next == null ||
            next === defaultValue ||
            (Array.isArray(next) && next.length === 0)

        if (isEmpty) {
            params.delete(key)
        } else {
            params.set(key, Array.isArray(next) ? next.join(',') : next)
        }

        if (key !== 'page') {
            params.delete('page')
        }

        if (params.toString() === searchParams.toString()) return

        startTransition(() => setSearchParams(params, { replace: true }))
    }

    return [value, setValue] as const
}


export const useFilterList = (key: string) => {
    const [raw, setRaw] = useFilterParam(key)
    const list = raw === 'all' ? [] : raw.split(',').filter(Boolean)

    const setList = (next: string[]) => setRaw(next)
    const toggle = (v: string) => {
        setList(list.includes(v) ? list.filter(x => x !== v) : [...list, v])
    }

    return { list, toggle, setList }
}