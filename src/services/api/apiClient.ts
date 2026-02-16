import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class ApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: { "Content-Type": "application/json"}
        })

        this.client.interceptors.request.use((config) => {
            const token = sessionStorage.getItem('token')

            if (token  && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        }) 
    }

    async get<T>(
        url: string, 
        config?: AxiosRequestConfig
    ) {
        const response = await this.client.get<T>(url, config)
        return {
            data: response.data,
            status: response.status
        }
    }
    
    async post<T>(
        url: string,
        body?: any,
        config?: AxiosRequestConfig
    ) {
        const response = await this.client.post<T>(url, body, config)
        return {
            data: response.data,
            status: response.status
        }
    }

    async put<T>(
        url: string,
        body?: any,
        config?: AxiosRequestConfig
    ) {
        const response = await this.client.put<T>(url, body, config)
        return {
            data: response.data,
            status: response.status
        }
    }

    async patch<T>(
        url: string,
        body?: any,
        config?: AxiosRequestConfig
    ) {
        const response = await this.client.patch<T>(url, body, config)
        return {
            data: response.data,
            status: response.status
        }
    }

    async delete<T>(
        url: string,
        config?: AxiosRequestConfig
    ) {
        const response = await this.client.delete(url, config)
        return {
            data: response.data,
            status: response.status
        }
    }

    setAuthToken(token: string): void {
        sessionStorage.setItem('token', token)
    }

    removeAuthToken() : void {
        sessionStorage.removeItem('token')
    }
}

export const apiClient = new ApiClient(`${import.meta.env.VITE_API_URL}`)