// src/routes/pages/usuarios/EditUsuarioPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Label, TextInput, Select, Button, Spinner } from "flowbite-react";
import api from "@/api/axios";
import { getCargos, getDepartamentos } from "@/api/auth"; // endpoints para selects
import { useToast } from "@/contexts/ToastContext";
import { AuthContext } from "@/contexts/AuthContext";

const ROLE_OPTIONS = [
    { value: "viewer", label: "Viewer" },
    { value: "admin", label: "Admin" },
    { value: "contador", label: "Contador" },
    { value: "negocios", label: "Negocios" },
];

export default function EditUsuarioPage() {
    const { showToast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [form, setForm] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        cedula_identidad: "",
        cargo: "",
        departamento: "",
        role: "",
    });
    const [cargos, setCargos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga de selects + datos del usuario
    useEffect(() => {
        setLoading(true);
        // Disparamos en paralelo
        Promise.all([
            getCargos().then((res) => setCargos(res.data)),
            getDepartamentos().then((res) => setDepartamentos(res.data)),
            api.get(`/api/users/${id}/`),
        ])
            .then(([, , userRes]) => {
                const data = userRes.data;
                setForm({
                    username: data.username || "",
                    email: data.email || "",
                    first_name: data.first_name || "",
                    last_name: data.last_name || "",
                    cedula_identidad: data.cedula_identidad || "",
                    cargo: data.cargo || "",
                    departamento: data.departamento || "",
                    role: data.role || "",
                });
            })
            .catch((err) => {
                console.error(err);
                showToast("Error cargando datos de usuario", "error");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/users/${id}/`, form);
            showToast("Usuario actualizado", "success");
            navigate("/usuarios");
        } catch (err) {
            console.error(err);
            showToast("Error al actualizar usuario", "error");
        }
    };

    if (loading) {
        return (
            <div className="mt-10 flex justify-center">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-lg p-4">
            <Card>
                <h2 className="mb-4 text-xl font-semibold">Editar Usuario</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Campos de texto */}
                    {["username", "email", "first_name", "last_name", "cedula_identidad"].map((field) => (
                        <div
                            key={field}
                            className="space-y-1"
                        >
                            <Label htmlFor={field}>{field.replace("_", " ")}</Label>
                            <TextInput
                                id={field}
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}

                    {/* Select de Cargo */}
                    <div className="space-y-1">
                        <Label htmlFor="cargo">Cargo</Label>
                        <Select
                            id="cargo"
                            name="cargo"
                            value={form.cargo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Seleccionar Cargo --</option>
                            {cargos.map((c) => (
                                <option
                                    key={c.id}
                                    value={c.id}
                                >
                                    {c.nombre}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Select de Departamento */}
                    <div className="space-y-1">
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select
                            id="departamento"
                            name="departamento"
                            value={form.departamento}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Seleccionar Departamento --</option>
                            {departamentos.map((d) => (
                                <option
                                    key={d.id}
                                    value={d.id}
                                >
                                    {d.nombre}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Select de Rol */}
                    <div className="space-y-1">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                            id="role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Seleccionar Rol --</option>
                            {ROLE_OPTIONS.map((o) => (
                                <option
                                    key={o.value}
                                    value={o.value}
                                >
                                    {o.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Guardar cambios
                    </Button>
                </form>
            </Card>
        </div>
    );
}
