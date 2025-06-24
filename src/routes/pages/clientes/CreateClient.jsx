import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createCliente } from "@/api/clientes";
import useClienteFormOptions from "@/hooks/useClienteFormOptions";
import { Label, Select, TextInput, Button, Card, Spinner } from "flowbite-react";

// Componente reutilizable para campos con etiqueta y error
function FormGroup({ id, label, error, children }) {
    return (
        <div className="space-y-1">
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}

export default function CreateClientePage() {
    const navigate = useNavigate();
    const { tiposIdentificacion, empresas, actividadesEconomicas, fideicomisos, loading } = useClienteFormOptions();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // Convertir campos a enteros donde aplique
        data.fideicomiso_id = data.fideicomiso ? parseInt(data.fideicomiso) : null;
        data.tipo_identificacion = data.tipo_identificacion ? parseInt(data.tipo_identificacion) : null;
        data.empresa = data.empresa ? parseInt(data.empresa) : null;
        data.actividad_economica = data.actividad_economica ? parseInt(data.actividad_economica) : null;

        // Eliminar fideicomiso si solo vamos a mandar fideicomiso_id
        delete data.fideicomiso;

        try {
            console.log("Datos enviados en edición:", data);

            await createCliente(data);
            navigate("/clientes");
        } catch (err) {
            console.error("Error del servidor:", err.response?.data);

            const responseData = err.response?.data;
            if (responseData && typeof responseData === "object") {
                Object.entries(responseData).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: Array.isArray(messages) ? messages.join(" ") : String(messages),
                    });
                });
            }
        }
    };

    return (
        <div className="mx-auto mt-8 max-w-2xl px-4">
            <Card>
                <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white">Crear Cliente</h1>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <Spinner size="xl" />
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormGroup
                            id="identificacion"
                            label="Identificación"
                            error={errors.identificacion}
                        >
                            <TextInput
                                id="identificacion"
                                placeholder="Ingrese la identificación"
                                {...register("identificacion", { required: "Campo requerido" })}
                            />
                        </FormGroup>

                        <FormGroup
                            id="nombre"
                            label="Nombre"
                            error={errors.nombre}
                        >
                            <TextInput
                                id="nombre"
                                placeholder="Ingrese el nombre"
                                {...register("nombre", { required: "Campo requerido" })}
                            />
                        </FormGroup>

                        <FormGroup
                            id="apellido"
                            label="Apellido"
                            error={errors.apellido}
                        >
                            <TextInput
                                id="apellido"
                                placeholder="Ingrese el apellido"
                                {...register("apellido", { required: "Campo requerido" })}
                            />
                        </FormGroup>

                        <FormGroup
                            id="correo_electronico"
                            label="Correo electrónico"
                            error={errors.correo_electronico}
                        >
                            <TextInput
                                id="correo_electronico"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                {...register("correo_electronico", { required: "Campo requerido" })}
                            />
                        </FormGroup>

                        <FormGroup
                            id="numero_celular"
                            label="Teléfono"
                            error={errors.numero_celular}
                        >
                            <TextInput
                                id="numero_celular"
                                placeholder="Ingrese número de contacto"
                                {...register("numero_celular")}
                            />
                        </FormGroup>

                        <FormGroup
                            id="tipo_identificacion"
                            label="Tipo de Identificación"
                            error={errors.tipo_identificacion}
                        >
                            <Select
                                id="tipo_identificacion"
                                {...register("tipo_identificacion")}
                            >
                                <option value="">Seleccione tipo de identificación</option>
                                {tiposIdentificacion.map((t) => (
                                    <option
                                        key={t.id}
                                        value={t.id}
                                    >
                                        {t.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup
                            id="empresa"
                            label="Empresa"
                            error={errors.empresa}
                        >
                            <Select
                                id="empresa"
                                {...register("empresa")}
                            >
                                <option value="">Seleccione empresa</option>
                                {empresas.map((e) => (
                                    <option
                                        key={e.id}
                                        value={e.id}
                                    >
                                        {e.razon_social}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup
                            id="actividad_economica"
                            label="Actividad Económica"
                            error={errors.actividad_economica}
                        >
                            <Select
                                id="actividad_economica"
                                {...register("actividad_economica")}
                            >
                                <option value="">Seleccione actividad económica</option>
                                {actividadesEconomicas.map((a) => (
                                    <option
                                        key={a.id}
                                        value={a.id}
                                    >
                                        {a.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup
                            id="fideicomiso"
                            label="Fideicomiso"
                            error={errors.fideicomiso}
                        >
                            <Select
                                id="fideicomiso"
                                {...register("fideicomiso")}
                            >
                                <option value="">Seleccione fideicomiso</option>
                                {fideicomisos.map((f) => (
                                    <option
                                        key={f.id}
                                        value={f.id}
                                    >
                                        {f.razon_social}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        <div className="flex justify-end pt-2">
                            <Button type="submit">Guardar Cliente</Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
}
