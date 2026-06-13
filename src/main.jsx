import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './context/ToastContext.jsx'
import { StateStoreProvider } from './context/StateStoreContext.jsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <ToastProvider>
            <UserProvider>
                <StateStoreProvider>
                    <App />
                </StateStoreProvider>
            </UserProvider>
        </ToastProvider>
    </QueryClientProvider>
)
