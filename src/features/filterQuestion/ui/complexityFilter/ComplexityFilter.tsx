import { useFilterList } from "@/shared/lib/useFilterParam"
import { Category } from "@/shared/ui/category/Category"
import type { ComplexityRange } from "../../model/types"

export const ComplexityFilter = () => {
    const complexityData: ComplexityRange[] = [
        { id: 1, title: '1-3', data: [1, 2, 3] },
        { id: 2, title: '4-6', data: [4, 5, 6] },
        { id: 3, title: '7-8', data: [7, 8] },
        { id: 4, title: '9-10', data: [9, 10] },
    ]

    const { list, setList } = useFilterList('complexity')

    const isRangeActive = (range: ComplexityRange) =>
        range.data.every(v => list.includes(String(v)))

    const toggleRange = (title: string) => {
        const range = complexityData.find(r => r.title === title)
        if (!range) return
        const values = range.data.map(String)
        setList(isRangeActive(range)
            ? list.filter(v => !values.includes(v))
            : [...new Set([...list, ...values])])
    }

    return (
        <Category
            categoryData={complexityData}
            categoryTitle="Уровень сложности"
            selected={complexityData.filter(isRangeActive).map(r => r.title)}
            onToggle={toggleRange}
        />
    )
}
