import type { Paginated } from '@/shared/api/types'

export interface Skill {
    id: number
    title: string
    description: string
    imageSrc: string
}

export type Skills = Paginated<Skill>
