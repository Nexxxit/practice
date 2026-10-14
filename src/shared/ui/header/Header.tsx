import { Link, NavLink } from "react-router"
import logo from '@/assets/logo.svg'
import logo_text from '@/assets/logo_text.svg'
import './header.css'
import { Button } from "../button/Button"

export const Header = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__nav-wrapper">
                    <div className="header__logo">
                        <img src={logo} alt="logo" width={33} height={33} />
                        <img src={logo_text} alt="logo text" width={99} height={32} />
                    </div>

                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-item">
                                < NavLink to={''} className="header__nav-link">База вопросов</NavLink>
                            </li>
                            <li className="header__nav-item">
                                <NavLink to={''} className="header__nav-link">Тренажер</NavLink>
                            </li>
                            <li className="header__nav-item">
                                <NavLink to={''} className="header__nav-link">Материалы</NavLink>
                            </li>
                            <li className="header__nav-item">
                                <NavLink to={''} className="header__nav-link">Навыки (hh)</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="header__auth">
                    <Link to={''} className="header__auth-link">
                        <Button variant="link" size="L">
                            Вход
                        </Button>
                    </Link>
                    <Link to={''} className="header__auth-link">
                        <Button variant="primary" size="M">
                            Регистрация
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}