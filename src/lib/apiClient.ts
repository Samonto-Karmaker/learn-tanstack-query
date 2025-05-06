/* eslint-disable @typescript-eslint/no-explicit-any */
type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
};

const BASE_URL = "/api/todos"; 

class ApiClient {
    private async sendRequest<T>(
        url: string,
        options: FetchOptions = { method: "GET" }
    ): Promise<T> {
        const { method, body, headers } = options;
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };

        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            method: method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });

        const result = await response.json();
        return result;
    }

    public async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
        return this.sendRequest<T>(url, { method: "GET", headers });
    }

    public async post<T>(url: string, body: any, headers?: Record<string, string>): Promise<T> {
        return this.sendRequest<T>(url, { method: "POST", body, headers });
    }

    public async put<T>(url: string, body: any, headers?: Record<string, string>): Promise<T> {
        return this.sendRequest<T>(url, { method: "PUT", body, headers });
    }

    public async patch<T>(url: string, body: any, headers?: Record<string, string>): Promise<T> {
        return this.sendRequest<T>(url, { method: "PATCH", body, headers });
    }

    public async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
        return this.sendRequest<T>(url, { method: "DELETE", headers });
    }
}

const apiClient = new ApiClient();
export default apiClient;