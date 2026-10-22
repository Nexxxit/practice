import { ROUTES_CONFIG } from "@/shared/config/routes/routesConfig"
import { Button } from "@/shared/ui/button/Button"
import { Link } from "react-router"
import "./notFound.css"

export const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
            <p className="not-found__description">
                Возможно, она была перемещена или удалена. Проверьте адрес страницы или вернитесь к списку вопросов.
            </p>
            <Link to={ROUTES_CONFIG.QUESTIONS.BASE}>
                <Button variant="primary" size="L">Вернуться</Button>
            </Link>
        </div>
    )
}