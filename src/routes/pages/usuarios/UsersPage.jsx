import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "@/api/users";
import ReusableTable from "@/components/Table";
import { Pencil, Trash } from "lucide-react";
import { Spinner, Tooltip, Pagination, Button, Toast } from "flowbite-react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const navigate = useNavigate();
    const perPage = 10;

    const showToast = (msg, type = "success") => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (err) {
            showToast("Error cargando usuarios.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este usuario?")) return;
        try {
            await deleteUser(id);
            showToast("Usuario eliminado.", "success");
            fetchUsers();
        } catch (err) {
            const data = err.response?.data;
            // si viene detail, úsalo, si no, usa genérico
            const msg = data?.detail || "Error eliminando usuario.";
            showToast(msg, "error");
            console.error("Error deleteUser:", err);
        }
    };

    const paged = users.slice((page - 1) * perPage, page * perPage);

    const columns = [
        { key: "id", label: "#" },
        { key: "username", label: "Usuario" },
        { key: "email", label: "Email" },
        { key: "first_name", label: "Nombre" },
        { key: "last_name", label: "Apellido" },
        { key: "role", label: "Rol" },
        {
            key: "actions",
            label: "Acciones",
            render: (item) => (
                <div className="flex justify-center gap-3">
                    <Tooltip content="Editar">
                        <button
                            onClick={() => navigate(`/usuarios/edit/${item.id}`)}
                            className="text-yellow-600"
                        >
                            <Pencil size={18} />
                        </button>
                    </Tooltip>
                    <Tooltip content="Eliminar">
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600"
                        >
                            <Trash size={18} />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold dark:text-white">Listado de Usuarios</h1>

            {toast.show && (
                <div className="fixed right-5 top-5 z-50">
                    <Toast>
                        <div
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${toast.type === "success" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                                }`}
                        >
                            {toast.type === "success" ? (
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0...z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0...z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.message}</div>
                    </Toast>
                </div>
            )}

            {loading ? (
                <div className="mt-10 flex justify-center">
                    <Spinner size="xl" />
                </div>
            ) : (
                <>
                    <div className="flex justify-end">
                        <Button onClick={() => navigate("/usuarios/create")}>Nuevo Usuario</Button>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
                        <ReusableTable
                            columns={columns}
                            data={paged}
                        />
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(users.length / perPage)}
                            onPageChange={setPage}
                            showIcons
                        />
                    </div>
                </>
            )}
        </div>
    );
}
