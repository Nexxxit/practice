import { Layout } from "@/shared/ui/layout/Layout";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./AppStore";
import '@/index.css'
import { ROUTES_CONFIG } from "@/shared/config/routes/routesConfig";
import { NotFound } from "@/pages/notFound/ui/NotFound";
import { ErrorBoundary } from "@/shared/ui/errorBoundary/ErrorBoundary";
import { QuestionDetailsRoute } from "./QuestionDetailsRoute";
import { Questions } from "@/pages/questions/ui/Questions";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path={ROUTES_CONFIG.QUESTIONS.BASE} element={<Questions />} />
                            <Route path={ROUTES_CONFIG.QUESTIONS.DETAILS} element={<QuestionDetailsRoute />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    </StrictMode>,
)
