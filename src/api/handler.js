// handlers.js
import { http, HttpResponse } from "msw";
import { todos, paginate } from "./db";

export const handlers = [
    // 1. Get all todos (with pagination)
    http.get("/api/todos", ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const limit = Number(url.searchParams.get("limit")) || 3;

        const paginatedTodos = paginate(todos, page, limit);
        return HttpResponse.json({ data: paginatedTodos, total: todos.length });
    }),

    // 2. Add a todo
    http.post("/api/todos", async ({ request }) => {
        const { title } = await request.json();
        const newTodo = {
            id: todos.length,
            title,
            done: false,
        };
        todos.push(newTodo);
        return HttpResponse.json(newTodo, { status: 201 });
    }),

    // 3. Toggle todo status (done/not done)
    http.patch("/api/todos/:id", async ({ params }) => {
        const id = Number(params.id);
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            return HttpResponse.json(todo);
        } else {
            return new HttpResponse("Todo not found", { status: 404 });
        }
    }),

    // 4. Delete a todo
    http.delete("/api/todos/:id", ({ params }) => {
        const id = Number(params.id);
        const index = todos.findIndex((t) => t.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            return HttpResponse.json({ message: "Deleted" });
        } else {
            return new HttpResponse("Todo not found", { status: 404 });
        }
    }),
];
