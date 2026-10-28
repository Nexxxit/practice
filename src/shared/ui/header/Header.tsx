import { useState } from "react"
import { Link, NavLink } from "react-router"
import logo from '@/assets/logo.svg'
import logo_text from '@/assets/logo_text.svg'
import './header.css'
import { Button } from "../button/Button"
import { BurgerMenu } from "@/shared/icons/BurgerMenu"
import { ChevroneDown } from "@/shared/icons/ChevroneDown"
import { cn } from "@/shared/lib/cn"

const NAV_ITEMS = ['База вопросов', 'Тренажер', 'Материалы', 'Навыки (hh)']

export const Header = () => {
    const [openMenu, setOpenMenu] = useState<'nav' | 'auth' | null>(null)

    const toggleMenu = (menu: 'nav' | 'auth') => {
        setOpenMenu((current) => current === menu ? null : menu)
    }

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__nav-wrapper">
                    <div className="header__logo">
                        <img src={logo} alt="logo" width={33} height={33} />
                        <img className="header__logo-text" src={logo_text} alt="logo text" width={99} height={32} />
                    </div>

                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {NAV_ITEMS.map((item) => (
                                <li className="header__nav-item" key={item}>
                                    <NavLink to={'/'} className="header__nav-link">{item}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="header__section">
                        <button
                            className={cn(
                                'header__section-button',
                                openMenu === 'nav' && 'header__section-button--open',
                            )}
                            type="button"
                            aria-expanded={openMenu === 'nav'}
                            onClick={() => toggleMenu('nav')}
                        >
                            Подготовка
                            <ChevroneDown />
                        </button>
                        {openMenu === 'nav' && (
                            <ul className="header__dropdown header__dropdown--nav">
                                {NAV_ITEMS.map((item) => (
                                    <li className="header__nav-item" key={item}>
                                        <NavLink to={'/'} className="header__nav-link" onClick={() => setOpenMenu(null)}>
                                            {item}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="header__auth">
                    <Link to={'/login'} className="header__auth-link">
                        <Button variant="link" size="L">
                            Вход
                        </Button>
                    </Link>
                    <Link to={'/register'} className="header__auth-link">
                        <Button variant="primary" size="M">
                            Регистрация
                        </Button>
                    </Link>
                </div>

                <div className="header__burger-wrap">
                    <button
                        className="header__burger"
                        type="button"
                        aria-label="Меню"
                        aria-expanded={openMenu === 'auth'}
                        onClick={() => toggleMenu('auth')}
                    >
                        <BurgerMenu />
                    </button>
                    {openMenu === 'auth' && (
                        <div className="header__dropdown header__dropdown--auth">
                            <Link to={''} className="header__auth-link" onClick={() => setOpenMenu(null)}>
                                <Button variant="link" size="L">
                                    Вход
                                </Button>
                            </Link>
                            <Link to={''} className="header__auth-link" onClick={() => setOpenMenu(null)}>
                                <Button variant="primary" size="M">
                                    Регистрация
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
