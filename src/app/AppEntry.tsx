import { Layout } from "@/shared/ui/layout/Layout";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./AppStore";
import '@/index.css'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<App />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
