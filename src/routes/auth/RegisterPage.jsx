import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Label, TextInput, Button, Alert, Select } from "flowbite-react";
import api from "@/api/axios";
import { getCargos, getDepartamentos } from "@/api/auth"; // Ajusta la ruta según tu estructura

// Componente reutilizable para campos con etiqueta y error
function FormGroup({ id, label, error, children }) {
    return (
        <div className="space-y-1">
            <Label
                htmlFor={id}
                className="text-gray-900 dark:text-gray-100"
            >
                {label}
            </Label>
            {children}
            {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
        </div>
    );
}

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        re_password: "",
        first_name: "",
        last_name: "",
        cedula_identidad: "",
        cargo: "",
        departamento: "",
        role: "", // nuevo campo para rol
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cargos, setCargos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const navigate = useNavigate();

    // Opciones estáticas para el select de roles
    const ROLE_OPTIONS = [
        { value: "viewer", label: "Viewer" },
        { value: "admin", label: "Admin" },
        { value: "contador", label: "Contador" },
        { value: "negocios", label: "Negocios" },
    ];

    useEffect(() => {
        getCargos().then((res) => setCargos(res.data));
        getDepartamentos().then((res) => setDepartamentos(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setServerError("");
        setErrors({});

        try {
            await api.post("auth/users/", form);
            navigate("/login", { state: { fromRegister: true } });
        } catch (err) {
            const data = err.response?.data;
            if (data?.detail) {
                setServerError(data.detail);
            } else if (Array.isArray(data)) {
                setServerError(data.join(" "));
            } else if (typeof data === "object") {
                const fieldErrors = {};
                Object.entries(data).forEach(([key, val]) => {
                    fieldErrors[key] = Array.isArray(val) ? val.join(" ") : val;
                });
                setErrors(fieldErrors);
            } else {
                setServerError("Error desconocido al registrar. Intenta de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-lg bg-white dark:bg-gray-800">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Crear Cuenta</h2>

                {serverError && (
                    <Alert
                        color="failure"
                        className="mb-4"
                    >
                        {serverError}
                    </Alert>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormGroup
                            id="first_name"
                            label="Nombre"
                            error={errors.first_name}
                        >
                            <TextInput
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Tu nombre"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                                className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </FormGroup>

                        <FormGroup
                            id="last_name"
                            label="Apellido"
                            error={errors.last_name}
                        >
                            <TextInput
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Tu apellido"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                                className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </FormGroup>
                    </div>

                    <FormGroup
                        id="username"
                        label="Usuario"
                        error={errors.username}
                    >
                        <TextInput
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Tu usuario"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </FormGroup>

                    <FormGroup
                        id="email"
                        label="Email"
                        error={errors.email}
                    >
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="tu@correo.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </FormGroup>

                    <FormGroup
                        id="cedula_identidad"
                        label="Cédula de Identidad"
                        error={errors.cedula_identidad}
                    >
                        <TextInput
                            id="cedula_identidad"
                            name="cedula_identidad"
                            type="text"
                            placeholder="1712345678"
                            value={form.cedula_identidad}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </FormGroup>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormGroup
                            id="cargo"
                            label="Cargo"
                            error={errors.cargo}
                        >
                            <Select
                                id="cargo"
                                name="cargo"
                                value={form.cargo}
                                onChange={handleChange}
                                required
                                className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    Selecciona un cargo
                                </option>
                                {cargos.map((c) => (
                                    <option
                                        key={c.id}
                                        value={c.id}
                                    >
                                        {c.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup
                            id="departamento"
                            label="Departamento"
                            error={errors.departamento}
                        >
                            <Select
                                id="departamento"
                                name="departamento"
                                value={form.departamento}
                                onChange={handleChange}
                                required
                                className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    Selecciona un departamento
                                </option>
                                {departamentos.map((d) => (
                                    <option
                                        key={d.id}
                                        value={d.id}
                                    >
                                        {d.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>
                    </div>

                    {/* Nuevo selector de rol */}
                    <FormGroup
                        id="role"
                        label="Rol"
                        error={errors.role}
                    >
                        <Select
                            id="role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option
                                value=""
                                disabled
                            >
                                Selecciona un rol
                            </option>
                            {ROLE_OPTIONS.map((opt) => (
                                <option
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormGroup
                            id="password"
                            label="Contraseña"
                            error={errors.password}
                        >
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </FormGroup>

                        <FormGroup
                            id="re_password"
                            label="Repite contraseña"
                            error={errors.re_password}
                        >
                            <TextInput
                                id="re_password"
                                name="re_password"
                                type="password"
                                placeholder="Repite contraseña"
                                value={form.re_password}
                                onChange={handleChange}
                                required
                                className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </FormGroup>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrarme"}
                    </Button>

                    <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
