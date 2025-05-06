import { FormEvent, useState } from "react"
import {
    keepPreviousData,
    useQueryClient,
    useMutation,
    useQuery,
} from "@tanstack/react-query"
import { addTodo, fetchTodos } from "../lib/apiClient"

export default function Todo() {
    const [page, setPage] = useState(1)
    const [newTodo, setNewTodo] = useState("")

    const LIMIT = 5
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["todos", page],
        queryFn: () => fetchTodos(page, LIMIT),
        placeholderData: keepPreviousData,
    })

    const addTodoQuery = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            // Here the order of the queries is important
            // We need to update the current page first, then invalidate all queries
            // to re-fetch the data
            // This is because the current page data is already in the cache
            // and we want to update it with the new todo
            // If we invalidate the queries first, the current page data will be re-fetched
            // and the new todo will not be added to the current page
            // This technique is called optimistic update
            setNewTodo("")
            queryClient.setQueryData(
                ["todos", page],
                (oldData: typeof data) => {
                    if (!oldData) return
                    const lastPage = Math.ceil((oldData?.total || 1) / LIMIT)
                    if (page === lastPage) {
                        return {
                            ...oldData,
                            data: [
                                ...oldData.data,
                                {
                                    id: oldData.total + 1,
                                    title: newTodo,
                                    done: false,
                                },
                            ],
                            total: oldData.total + 1,
                        }
                    } else {
                        return oldData
                    }
                }
            )
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
        onError: (error) => {
            console.error("Error adding todo:", error)
        },
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const trimmedTodo = newTodo.trim()
        if (trimmedTodo === "") return
        addTodoQuery.mutate(trimmedTodo)
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading todos</div>

    return (
        <div className="Todo">
            <h1>Todos</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
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
