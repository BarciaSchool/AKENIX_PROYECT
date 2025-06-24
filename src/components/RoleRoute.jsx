// src/components/RoleRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { Spinner } from "flowbite-react";

export default function RoleRoute({ children, allowedRoles = [] }) {
    const { user, roles, isLoading } = useContext(AuthContext);

    if (isLoading) return <Spinner />; // espera a cargar

    if (!user)
        // no autenticado
        return (
            <Navigate
                to="/login"
                replace
            />
        );

    // si hay lista de roles y no coincide ninguno → 403
    if (allowedRoles.length && !allowedRoles.some((r) => roles.includes(r))) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return children;
}
