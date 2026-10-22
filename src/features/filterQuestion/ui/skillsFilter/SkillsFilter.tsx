import { useFetchSkillsQuery } from "@/entities/skills/api/skillsApi"
import { useFilterList } from "@/shared/lib/useFilterParam"
import { getErrorMessage } from "@/shared/lib/getErrorMessage"
import { Category } from "@/shared/ui/category/Category"
import { ErrorView } from "@/shared/ui/errorView/ErrorView"
import { Loader } from "@/shared/ui/loader/Loader"


export const SkillsFilter = () => {
    const { data: skillsData, isLoading, error, refetch } = useFetchSkillsQuery()
    const { list, toggle } = useFilterList('skills')

    if (isLoading) return <Loader />
    if (error) return <ErrorView message={getErrorMessage(error)} onRetry={refetch} />

    return (
        <Category
            categoryData={skillsData?.data}
            categoryTitle="Навыки"
            limit={5}
            selected={list}
            onToggle={toggle}
            getValue={(item) => String(item.id)}
        />
    )
}