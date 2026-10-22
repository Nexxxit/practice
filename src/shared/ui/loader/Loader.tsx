import './loader.css'

export const Loader = () => {
    return (
        <div className="loader" role="status" aria-label="Загрузка">
            <svg className="loader__spinner" viewBox="22 22 44 44">
                <circle className="loader__circle" cx="44" cy="44" r="20" fill="none" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <p className="loader__label">Идет загрузка...</p>
        </div>
    )
}
