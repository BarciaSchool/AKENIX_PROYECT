// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { Spinner } from "flowbite-react";

export default function PrivateRoute({ children }) {
    const { user, isLoading } = useContext(AuthContext);

    // Si todavía estamos comprobando el token, no redirijas, muestra un spinner
    if (isLoading) {
        return <Spinner />;
    }

    // Una vez que ha terminado de cargar:
    // – Si hay un usuario => dejo pasar a las rutas protegidas
    // – Si no => devuelvo <Navigate> para que Router me lleve a /login
    return user ? (
        children
    ) : (
        <Navigate
            to="/login"
            replace
        />
    );
}
