import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchTodos } from "../lib/apiClient"

export default function Todo() {
    const [page, setPage] = useState(1)
    const [newTodo, setNewTodo] = useState("")

    const LIMIT = 5;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["todos", page],
        queryFn: () => fetchTodos(page, LIMIT),
        placeholderData: keepPreviousData,
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading todos</div>

    return (
        <div className="Todo">
            <h1>Todos</h1>

            <form style={{ marginBottom: "1.5rem" }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new todo..."
                    style={{
                        padding: "0.5rem",
                        width: "80%",
                        marginRight: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
                <button type="submit">Add</button>
            </form>

            <ul>
                {data?.data.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>

            <div className="pagination">
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span style={{ alignSelf: "center", margin: "0 10px" }}>
                    Page {page}
                </span>
                <button
                    onClick={() => {
                        const maxPage = Math.ceil((data?.total || 1) / LIMIT)
                        setPage((old) => (old < maxPage ? old + 1 : old))
                    }}
                    disabled={page === Math.ceil((data?.total || 1) / LIMIT)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
