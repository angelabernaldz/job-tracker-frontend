import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from "@/pages/public/LoginPage"
import { RegisterPage } from "@/pages/public/RegisterPage"
import { DashboardPage } from "@/pages/authenticated/DashboardPage"

export const ProtectedRoute = ({
    children,
    isAuthenticated
}: {
    children: React.ReactNode,
    isAuthenticated: boolean
}) => {
    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }

    return children
}

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/dashboard" element={<DashboardPage />}/>
            </Routes>
        </BrowserRouter>
    )
}