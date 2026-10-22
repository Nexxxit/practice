import { Outlet, useLocation } from "react-router"
import { Header } from "../header/Header"
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary"
import './layout.css'


export const Layout = () => {
    const { pathname } = useLocation()
    return (
        <div className="layout">
            <Header />
            <main className="layout__main">
                <ErrorBoundary key={pathname}>
                    <Outlet />
                </ErrorBoundary>
            </main>
        </div>
    )
}