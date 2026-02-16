import { apiClient } from "./apiClient";

export interface User{
    email: string;
}

interface BackendRegisterResponse {
  Message: string;
  user: {
    id: number;
    email: string;
    created_at: string;
    };
}

interface CleanRegisterResponse {
  user: User;
}

export const register = async (
    email: string,
    password: string
): Promise<CleanRegisterResponse> => {
    const response = await apiClient.post<BackendRegisterResponse>(
        "/auth/register", 
        {email, password}
    )

    const data = response.data

    return {
        user: {
            email: data.user.email,
        },
    }
}
