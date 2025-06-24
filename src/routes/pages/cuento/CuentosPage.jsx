import { useState } from "react";
import ReusableTable from "@/components/Table";
import { Button, Card } from "flowbite-react";

export default function CuentosPage() {
    // Mock data de cuentos
    const [cuentos] = useState([
        {
            id: 1,
            cuento: "Caperucita Roja",
            duracion: "05:30",
            edadRecomendada: "4-6 años",
            preguntas: 5,
        },
        {
            id: 2,
            cuento: "Los Tres Cerditos",
            duracion: "07:45",
            edadRecomendada: "3-5 años",
            preguntas: 4,
        },
        {
            id: 3,
            cuento: "Hansel y Gretel",
            duracion: "06:20",
            edadRecomendada: "5-7 años",
            preguntas: 6,
        },
        {
            id: 4,
            cuento: "Blancanieves",
            duracion: "08:10",
            edadRecomendada: "4-8 años",
            preguntas: 7,
        },
    ]);

    // Columnas para la tabla
    const columns = [
        { key: "cuento", label: "Cuento", render: (c) => c.cuento },
        { key: "duracion", label: "Duración", render: (c) => c.duracion },
        { key: "edadRecomendada", label: "Edad Recomendada", render: (c) => c.edadRecomendada },
        { key: "preguntas", label: "Preguntas", render: (c) => c.preguntas },
        // Opcional: acciones CRUD mockup
        {
            key: "acciones",
            label: "Acciones",
            render: (c) => (
                <div className="flex items-center gap-x-2">
                    <Button size="xs" onClick={() => alert(`Ver detalles de ${c.cuento}`)}>
                        Ver
                    </Button>
                    <Button size="xs" color="yellow" onClick={() => alert(`Editar ${c.cuento}`)}>
                        Editar
                    </Button>
                    <Button size="xs" color="red" onClick={() => alert(`Eliminar ${c.cuento}`)}>
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Gestión de Cuentos
                </h1>
                <Button onClick={() => alert('Crear nuevo cuento')}>
                    Nuevo Cuento
                </Button>
            </div>

            <Card>
                <ReusableTable columns={columns} data={cuentos} />
            </Card>
        </div>
    );
}
