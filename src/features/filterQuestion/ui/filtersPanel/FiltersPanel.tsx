import { cn } from "@/shared/lib/cn"
import { SearchInput } from "../searchInput/SearchInput"
import { Search } from "@/shared/icons/Search"
import { RatingFilter } from "../ratingFilter/RatingFilter"
import { ComplexityFilter } from "../complexityFilter/ComplexityFilter"
import { SkillsFilter } from "../skillsFilter/SkillsFilter"
import { SpecializationFilter } from "../specializationFilter/SpecializationFilter"
import { Close } from "@/shared/icons/Close"
import './filtersPanel.css'
import type { HTMLAttributes, Ref } from "react"

interface FiltersPanelProps {
    className?: string
    onClose?: () => void
    ref?: Ref<HTMLElement>
}


export const FiltersPanel = ({ className, onClose, ref, onKeyDown }: FiltersPanelProps & HTMLAttributes<HTMLElement>) => {

    return (
        <section className={cn("filters-panel", className)} ref={ref} onKeyDown={onKeyDown}>
            {onClose && (
                <button className="filters-panel__close" type="button" aria-label="Закрыть фильтры" onClick={onClose}>
                    <Close />
                </button>
            )}
            <SearchInput searchIcon={<Search />} />
            <SpecializationFilter />
            <SkillsFilter />
            <ComplexityFilter />
            <RatingFilter />
        </section>
    )
}
