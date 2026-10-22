import { useNavigate } from "react-router"
import { Button } from "../button/Button"
import { AltArrowLeft } from "@/shared/icons/AltArrowLeft"

interface BackButtonProps {
    className: string
}


export const BackButton = ({ className }: BackButtonProps) => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Button className={className} variant="link" onClick={goBack} iconleft={<AltArrowLeft />}>
            Назад
        </Button>
    )
}