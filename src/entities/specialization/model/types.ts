import type { Paginated } from '@/shared/api/types'

interface Specialization {
    id: number
    title: string
    slug: string
    description: string
    imageSrc: string
}

export type Specializations = Paginated<Specialization>
