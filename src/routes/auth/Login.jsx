// LoginPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Label, TextInput, Button, Checkbox } from "flowbite-react";
import api from "@/api/axios";
import { AuthContext } from "@/contexts/AuthContext";
// Componente reutilizable para campos con etiqueta y error
function FormGroup({ id, label, children }) {
    return (
        <div className="space-y-1">
            <Label
                htmlFor={id}
                className="text-gray-900 dark:text-gray-100"
            >
                {label}
            </Label>
            {children}
        </div>
    );
}

export default function LoginPage() {
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // si ya estoy logeado, voy al dashboard
    useEffect(() => {
        if (user) navigate("/", { replace: true });
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post("api/token/", { username, password });
            // utilizo el login del contexto
            login(data);
            // no necesito navigate aquí: el useEffect de user→navigate se encargará
        } catch {
            alert("Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md bg-white dark:bg-gray-800">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Iniciar Sesión</h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <FormGroup
                        id="usuario"
                        label="Usuario"
                    >
                        <TextInput
                            id="usuario"
                            type="text"
                            placeholder="Tu usuario"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </FormGroup>

                    <FormGroup
                        id="password"
                        label="Contraseña"
                    >
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Tu contraseña"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </FormGroup>

                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label
                            htmlFor="remember"
                            className="text-gray-900 dark:text-gray-100"
                        >
                            Recuérdame
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Entrar"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
