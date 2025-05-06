import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { worker } from "./api/browser.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

if (import.meta.env.DEV) {
    // Enable the mocking in development mode
    worker.start({
        onUnhandledRequest: "bypass",
    })
}

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
)
