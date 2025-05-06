import { Todo } from "../types/Todo"

const API_URL = "/api/todos"

export async function fetchTodos(page: number, limit: number = 3) {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`)
    if (!response.ok) {
        throw new Error("Failed to fetch todos")
    }
    return response.json() as Promise<{ data: Todo[]; total: number }>
}

export async function addTodo(title: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    })
    if (!response.ok) {
        throw new Error("Failed to add todo")
    }
    return response.json() as Promise<Todo>
}

export async function toggleTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
    })
    if (!response.ok) {
        throw new Error("Failed to toggle todo")
    }
    return response.json() as Promise<Todo>
}

export async function deleteTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error("Failed to delete todo")
    }
    return response.json() as Promise<{ message: string }>
}
