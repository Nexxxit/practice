import { cn } from "@/shared/lib/cn"
import { SearchInput } from "../searchInput/SearchInput"
import { Search } from "@/shared/icons/Search"
import { RatingFilter } from "../ratingFilter/RatingFilter"
import { ComplexityFilter } from "../complexityFilter/ComplexityFilter"
import { SkillsFilter } from "../skillsFilter/SkillsFilter"
import { SpecializationFilter } from "../specializationFilter/SpecializationFilter"
import { Close } from "@/shared/icons/Close"
import './filtersPanel.css'

interface FiltersPanelProps {
    className?: string
    onClose?: () => void
}


export const FiltersPanel = ({ className, onClose }: FiltersPanelProps) => {

    return (
        <section className={cn("filters-panel", className)}>
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
