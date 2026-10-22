import { useDebounce } from '@/shared/lib/useDebounce'
import './searchInput.css'
import { useFilterParam } from '@/shared/lib/useFilterParam'
import { useEffect, useState } from 'react'

interface SearchInputProps {
    searchIcon: React.ReactNode
}

export const SearchInput = ({ searchIcon }: SearchInputProps) => {
    const [urlValue, setUrlValue] = useFilterParam('titleOrDescription', '')
    const [value, setValue] = useState(urlValue)

    const debounced = useDebounce(value.trim())

    useEffect(() => {
        if (debounced === urlValue) return
        setUrlValue(debounced || null)
    }, [debounced])


    useEffect(() => {
        if (urlValue !== value.trim()) {
            setValue(urlValue)
        }

    }, [urlValue])

    return (
        <div className="search-input">
            {searchIcon && <span className="search-input__icon">{searchIcon}</span>}
            <input
                type="text"
                placeholder="Введите запрос..."
                className="search-input__field"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}