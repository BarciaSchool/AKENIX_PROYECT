// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "@/api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState(() => localStorage.getItem("access_token"));

    useEffect(() => {
        if (!token) return setLoading(false);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        api.get("auth/users/me/") // Djoser “me”
            .then((res) => {
                setUser(res.data);
                setRoles(res.data.role ? [res.data.role] : []);
            })
            .catch(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setUser(null);
                setRoles([]);
                setToken(null);
            })
            .finally(() => setLoading(false));
    }, [token]);

    const login = ({ access, refresh }) => {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        setToken(access);
        setLoading(true);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setRoles([]);
        setToken(null);
    };

    return <AuthContext.Provider value={{ user, roles, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}
