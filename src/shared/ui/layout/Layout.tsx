import { Outlet } from "react-router"
import { Header } from "../header/Header"
import './layout.css'


export const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main className="layout__main">
                <Outlet />
            </main>
        </div>
    )
}