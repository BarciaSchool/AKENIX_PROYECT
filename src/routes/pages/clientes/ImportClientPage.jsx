import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label, FileInput, Button, Card, Spinner, Toast } from "flowbite-react";
import { Upload, ArrowLeft } from "lucide-react";
import { importClients } from "@/api/clientes";

export default function ImportarClientes() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            showToast("Por favor selecciona un archivo CSV.", "error");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("archivo", file);
            await importClients(formData);
            showToast("Importación realizada con éxito.", "success");
            setTimeout(() => navigate("/clientes"), 1500); // después de éxito, redirige
        } catch (err) {
            const res = err.response?.data;
            const mensajeError = res?.detail || "Error al importar el archivo.";
            showToast(mensajeError, "error");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "success" });
        }, 3000);
    };

    return (
        <div className="mx-auto mt-10 max-w-2xl space-y-6 px-4">
            {toast.show && (
                <div className="fixed right-5 top-5 z-50">
                    <Toast>
                        <div
                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                toast.type === "success" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
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
                                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
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
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 00-2 0v2a1 1 0 002 0zm-1 3a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.message}</div>
                    </Toast>
                </div>
            )}

            <Button
                color="gray"
                onClick={() => navigate("/clientes")}
            >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver
            </Button>

            <Card>
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Importar Clientes desde CSV</h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <Label htmlFor="archivo">Selecciona archivo CSV</Label>
                        <FileInput
                            id="archivo"
                            accept=".csv"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            color="green"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Spinner size="sm" /> Importando...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Upload size={18} />
                                    Importar
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
