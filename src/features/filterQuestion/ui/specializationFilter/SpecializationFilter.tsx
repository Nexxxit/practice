import { useFetchSpecializationsQuery } from "@/entities/specialization/api/specializationApi"
import { useFilterParam } from "@/shared/lib/useFilterParam"
import { getErrorMessage } from "@/shared/lib/getErrorMessage"
import { Category } from "@/shared/ui/category/Category"
import { CategorySkeleton } from "@/shared/ui/category/CategorySkeleton"
import { ErrorView } from "@/shared/ui/errorView/ErrorView"

export const SpecializationFilter = () => {
    const { data: specializationsData, isLoading, error, refetch } = useFetchSpecializationsQuery()
    const [slug, setSlug] = useFilterParam('specializationSlug', '')

    if (isLoading) return <CategorySkeleton titleWidth={96} />
    if (error) return <ErrorView message={getErrorMessage(error)} onRetry={refetch} />

    return (
        <Category
            categoryData={specializationsData?.data}
            categoryTitle="Специализация"
            limit={5}
            selected={slug ? [slug] : []}
            onToggle={(value) => setSlug(value === slug ? null : value)}
            getValue={(item) => item.slug}
        />
    )
}
