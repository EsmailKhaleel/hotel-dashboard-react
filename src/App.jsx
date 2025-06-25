import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import StyledToaster from './ui/StyledToaster';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import ProtectedRoute from "./ui/ProtectedRoute";
import DarkModeProvider from "./context/DarkModeProvider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000,
        },
    },
});

export default function App() {

    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                            <Route index element={<Navigate replace to="dashboard" />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="bookings" element={<Bookings />} />
                            <Route path="cabins" element={<Cabins />} />
                            <Route path="users" element={<Users />} />
                            <Route path="account" element={<Account />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="bookings/:bookingId" element={<Booking />} />
                            <Route path="checkin/:bookingId" element={<Checkin />} />
                        </Route>
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
                <StyledToaster />
            </QueryClientProvider>
        </DarkModeProvider>
    );
}
