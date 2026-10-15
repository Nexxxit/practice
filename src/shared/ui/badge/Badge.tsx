import './badge.css'

type BadgeTypes = 'rate' | 'complexity'

type BadgeProps = {
    type: BadgeTypes
    score: number
}

export const Badge = ({ type, score }: BadgeProps) => {
    return (
        <div className="badge">
            {type === 'rate' && 'Рейтинг:'}
            {type === 'complexity' && 'Сложность:'}
            <span className="badge__score">{score}</span>
        </div>
    )
}