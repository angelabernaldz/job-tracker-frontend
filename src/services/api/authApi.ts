import { apiClient } from "./apiClient"

export interface User {
  id: string;
  email: string;
}

interface BackendLoginResponse {
  Message: string;
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    created_at: string;
    };
}

interface CleanLoginResponse {
  user: User;
  access_token: string;
}

export const login = async(
    email: string, 
    password: string
): Promise<CleanLoginResponse> => {
    const response = await apiClient.post<BackendLoginResponse>(
        "/auth/login", 
        {email, password}
    )

    const data = response.data

    return {
        user: {
            id: String(data.user.id),
            email: data.user.email,
        },
        access_token: data.access_token,
    }
}

