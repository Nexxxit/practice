import { useFilterList } from "@/shared/lib/useFilterParam"
import { Category } from "@/shared/ui/category/Category"

export const RatingFilter = () => {
    const ratingData = [
        { id: 1, title: '1' },
        { id: 2, title: '2' },
        { id: 3, title: '3' },
        { id: 4, title: '4' },
        { id: 5, title: '5' },
    ]

    const { list, toggle } = useFilterList('rate')

    return (
        <Category categoryData={ratingData} categoryTitle="Рейтинг" selected={list} onToggle={toggle} />
    )
}