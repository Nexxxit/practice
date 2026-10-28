import { useFetchSpecializationsQuery } from "@/entities/specialization/api/specializationApi"
import { useFilterParam } from "@/shared/lib/useFilterParam"
import { getErrorMessage } from "@/shared/lib/getErrorMessage"
import { Category } from "@/shared/ui/category/Category"
import { CategorySkeleton } from "@/shared/ui/category/CategorySkeleton"
import { ErrorView } from "@/shared/ui/errorView/ErrorView"
import { useEffect, useState } from "react"

export const SpecializationFilter = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data: specializationsData, isLoading, isFetching, error, refetch } = useFetchSpecializationsQuery({ page: currentPage })
    const [slug, setSlug] = useFilterParam('specializationSlug', '')
    const [specializationList, setSpecializationList] = useState(specializationsData?.data || [])

    useEffect(() => {
        setSpecializationList(prev => {
            const prevDataId = prev.map(data => data.id)
            return [...prev, ...specializationsData?.data.filter(data => !prevDataId.includes(data.id)) || []]
        })
    }, [specializationsData])

    const handleShowMore = () => {
        setCurrentPage((prev) => prev + 1)
    }

    const showHasMore = !isLoading && specializationsData && specializationList.length < specializationsData?.total

    if (specializationList.length === 0 && isLoading) return <CategorySkeleton titleWidth={96} />
    if (error) return <ErrorView message={getErrorMessage(error)} onRetry={refetch} />

    return (
        <Category
            categoryData={specializationList}
            categoryTitle="Специализация"
            hasMore={showHasMore}
            isFetching={isFetching}
            showMore={handleShowMore}
            selected={slug ? [slug] : []}
            onToggle={(value) => setSlug(value === slug ? null : value)}
            getValue={(item) => item.slug}
        />
    )
}
