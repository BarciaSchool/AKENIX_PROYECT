import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getClienteById, updateCliente } from "@/api/clientes";
import useClienteFormOptions from "@/hooks/useClienteFormOptions";
import { Label, Select, TextInput, Button, Card } from "flowbite-react";

function FormGroup({ label, error, children }) {
    return (
        <div className="space-y-1">
            <Label>{label}</Label>
            {children}
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}

export default function EditClientePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tiposIdentificacion, empresas, actividadesEconomicas, fideicomisos } = useClienteFormOptions();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (id) {
            getClienteById(id).then((res) => {
                const data = res.data;
                setValue("identificacion", data.identificacion);
                setValue("nombre", data.nombre);
                setValue("apellido", data.apellido);
                setValue("correo_electronico", data.correo_electronico);
                setValue("numero_celular", data.numero_celular);
                setValue("tipo_identificacion", data.tipo_identificacion?.id || data.tipo_identificacion);
                setValue("empresa", data.empresa?.id || data.empresa);
                setValue("actividad_economica", data.actividad_economica?.id || data.actividad_economica);
                setValue("fideicomiso", data.fideicomiso?.id || data.fideicomiso);
            });
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        // Adaptar claves foráneas
        data.tipo_identificacion = data.tipo_identificacion ? parseInt(data.tipo_identificacion) : null;
        data.empresa = data.empresa ? parseInt(data.empresa) : null;
        data.actividad_economica = data.actividad_economica ? parseInt(data.actividad_economica) : null;
        data.fideicomiso_id = data.fideicomiso ? parseInt(data.fideicomiso) : null;
        delete data.fideicomiso;

        try {
            await updateCliente(id, data);
            navigate("/clientes");
        } catch (err) {
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
        <div className="mx-auto mt-8 max-w-xl">
            <Card>
                <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">Editar Cliente</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormGroup
                        label="Identificación"
                        error={errors.identificacion}
                    >
                        <TextInput
                            id="identificacion"
                            {...register("identificacion", { required: "Campo requerido" })}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Nombre"
                        error={errors.nombre}
                    >
                        <TextInput
                            id="nombre"
                            {...register("nombre", { required: "Campo requerido" })}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Apellido"
                        error={errors.apellido}
                    >
                        <TextInput
                            id="apellido"
                            {...register("apellido", { required: "Campo requerido" })}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Correo electrónico"
                        error={errors.correo_electronico}
                    >
                        <TextInput
                            type="email"
                            id="correo_electronico"
                            {...register("correo_electronico", { required: "Campo requerido" })}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Teléfono"
                        error={errors.numero_celular}
                    >
                        <TextInput
                            id="numero_celular"
                            {...register("numero_celular")}
                        />
                    </FormGroup>

                    <FormGroup
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

                    <Button type="submit">Guardar Cambios</Button>
                </form>
            </Card>
        </div>
    );
}
