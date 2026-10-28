import { useFetchSkillsQuery } from "@/entities/skills/api/skillsApi"
import { useFilterList } from "@/shared/lib/useFilterParam"
import { getErrorMessage } from "@/shared/lib/getErrorMessage"
import { Category } from "@/shared/ui/category/Category"
import { ErrorView } from "@/shared/ui/errorView/ErrorView"
import { Loader } from "@/shared/ui/loader/Loader"
import { useEffect, useState } from "react"


export const SkillsFilter = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data: skillsData, isLoading, isFetching, error, refetch } = useFetchSkillsQuery({ page: currentPage })
    const { list, toggle } = useFilterList('skills')
    const [skillsList, setSkillsList] = useState(skillsData?.data || [])

    useEffect(() => {
        setSkillsList(prev => {
            const prevDataId = prev.map(data => data.id)
            return [...prev, ...skillsData?.data.filter(data => !prevDataId.includes(data.id)) || []]
        })
    }, [skillsData])

    const handleShowMore = () => {
        setCurrentPage((prev) => prev + 1)
    }

    const showHasMore = !isLoading && skillsData && skillsList.length < skillsData?.total

    if (skillsList.length === 0 && isLoading) return <Loader />
    if (error) return <ErrorView message={getErrorMessage(error)} onRetry={refetch} />

    return (
        <Category
            categoryData={skillsList}
            categoryTitle="Навыки"
            selected={list}
            showMore={handleShowMore}
            isFetching={isFetching}
            hasMore={showHasMore}
            onToggle={toggle}
            getValue={(item) => String(item.id)}
        />
    )
}