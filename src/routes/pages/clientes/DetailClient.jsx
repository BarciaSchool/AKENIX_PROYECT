import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClienteById } from "@/api/clientes";
import useClienteFormOptions from "@/hooks/useClienteFormOptions";
import { Card, Button } from "flowbite-react";

export default function DetalleClientePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState(null);

    const { tiposIdentificacion, empresas, actividadesEconomicas, fideicomisos } = useClienteFormOptions();

    useEffect(() => {
        if (id) {
            getClienteById(id).then((res) => setCliente(res.data));
        }
    }, [id]);

    const getNombre = (lista, id) => lista.find((item) => item.id === id)?.nombre || "NA";
    const getRazonSocial = (lista, id) => lista.find((item) => item.id === id)?.razon_social || "NA";
    const display = (valor) => valor || "NA";

    if (!cliente) return <p className="mt-4 text-center text-gray-800 dark:text-white">Cargando cliente...</p>;

    const InfoItem = ({ label, value }) => (
        <div>
            <p className="font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{value}</p>
        </div>
    );

    return (
        <div className="mx-auto mt-8 max-w-3xl">
            <Card>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Detalle del Cliente</h2>
                    <Button
                        color="gray"
                        onClick={() => navigate("/clientes")}
                    >
                        Volver
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem
                        label="Identificación"
                        value={display(cliente.identificacion)}
                    />
                    <InfoItem
                        label="Nombre"
                        value={display(cliente.nombre)}
                    />
                    <InfoItem
                        label="Apellido"
                        value={display(cliente.apellido)}
                    />
                    <InfoItem
                        label="Correo electrónico"
                        value={display(cliente.correo_electronico)}
                    />
                    <InfoItem
                        label="Teléfono"
                        value={display(cliente.numero_celular)}
                    />
                    <InfoItem
                        label="Dirección"
                        value={display(cliente.direccion)}
                    />
                    <InfoItem
                        label="Empresa"
                        value={getRazonSocial(empresas, cliente.empresa)}
                    />
                    <InfoItem
                        label="Actividad Económica"
                        value={getNombre(actividadesEconomicas, cliente.actividad_economica)}
                    />
                    <InfoItem
                        label="Fideicomiso"
                        value={display(cliente.fideicomiso?.razon_social)}
                    />
                    <InfoItem
                        label="Tipo de Identificación"
                        value={getNombre(tiposIdentificacion, cliente.tipo_identificacion)}
                    />
                </div>
            </Card>
        </div>
    );
}
