import { createContext, useContext, useEffect, useState } from 'react'
import { login as loginService} from '@/services/api/authApi'
import { apiClient } from '@/services/api/apiClient';

export interface User {
    id: string;
    email: string;
}

interface AuthContexType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContexType |undefined>(undefined)


export function AuthProvider ({ children }: { children: React.ReactNode}) {

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState<string | null>(() => {
        return sessionStorage.getItem("token");
    });

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const data = await loginService(email, password)

            const loggedUser: User = data.user
            const accessToken: string = data.access_token

            setUser(loggedUser);
            setToken(accessToken);

            sessionStorage.setItem("user", JSON.stringify(loggedUser));
            sessionStorage.setItem("token", accessToken);

            apiClient.setAuthToken(accessToken)
            return true
        } catch (error) {
            console.error("Login error:", error)
            return false
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)

        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")

        apiClient.removeAuthToken()
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}