export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}