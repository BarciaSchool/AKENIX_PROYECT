import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastProvider } from "@/contexts/ToastContext";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import CuentosPage from "./routes/pages/cuento/CuentosPage";
import PlayCuentoPage from "./routes/pages/cuento/PlayCuentoPage";

import LoginPage from "./routes/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./routes/auth/RegisterPage";
import { AuthProvider } from "@/contexts/AuthContext";
import RoleRoute from "@/components/RoleRoute";
import Unauthorized from "@/routes/Unauthorized";
import UsersPage from "./routes/pages/usuarios/UsersPage";
import EditUsuarioPage from "./routes/pages/usuarios/EditUsuarioPage";
const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },

    {
        path: "/",
        element: (
            <Layout />
        ),
        children: [
            { index: true, element: <DashboardPage /> },

            // Usuarios
            {
                path: "usuarios",
                element: (
                    <UsersPage />
                ),
            },
            {
                path: "usuarios/create",
                element: (
                    <RegisterPage />
                ),
            },
            {
                path: "usuarios/edit/:id",
                element: (
                    <EditUsuarioPage />
                ),
            },

            // Clientes
            {
                path: "cuento",
                element: (
                    <CuentosPage />
                ),
            },
            {
                path: "cuento/play",
                element: (
                    <PlayCuentoPage />
                ),
            },



            { path: "unauthorized", element: <Unauthorized /> },
        ],
    },
]);

function App() {
    return (
        <AuthProvider>
            <ThemeProvider storageKey="theme">
                <ToastProvider>
                    <RouterProvider router={router} />
                </ToastProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
