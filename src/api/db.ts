import { Todo } from "../types/Todo";

// Define the todos array with the Todo type
export const todos: Todo[] = [
    { id: 1, title: "Learn React", done: false },
    { id: 2, title: "Learn MSW", done: false },
    { id: 3, title: "Learn React Query", done: true },
    { id: 4, title: "Practice coding", done: false },
    { id: 5, title: "Review Redux Toolkit", done: true },
    { id: 6, title: "Learn Blockchain Basics", done: false },
    { id: 7, title: "Explore GraphQL", done: false },
    { id: 8, title: "Understand TypeScript", done: true },
    { id: 9, title: "Build a Full-Stack App", done: false },
    { id: 10, title: "Contribute to Open Source", done: false },
    { id: 11, title: "Read a Tech Book", done: true },
    { id: 12, title: "Attend a Tech Meetup", done: false },
    { id: 13, title: "Watch a Tech Conference", done: false },
    { id: 14, title: "Learn about Cloud Computing", done: true },
    { id: 15, title: "Explore DevOps Practices", done: false },
    { id: 16, title: "Understand Microservices", done: false },
    { id: 17, title: "Learn about CI/CD", done: true },
    { id: 18, title: "Practice Problem Solving", done: false },
    { id: 19, title: "Build a Portfolio Website", done: false },
    { id: 20, title: "Network with Professionals", done: true },
];

// Pagination helper with type annotations
export function paginate<T>(
    array: T[],
    page: number = 1,
    limit: number = 3
): T[] {
    const start = (page - 1) * limit;
    return array.slice(start, start + limit);
}
