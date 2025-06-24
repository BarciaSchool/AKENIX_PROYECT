import { useState } from "react";
import { Card, Button, Select } from "flowbite-react";

export default function PlayCuentoPage() {
    // Lista mock de cuentos
    const cuentos = [

        "La Cigarra y la Hormiga",
    ];

    const [selectedCuento, setSelectedCuento] = useState("");
    const [showPlayer, setShowPlayer] = useState(false);

    const handlePlayClick = () => {
        if (selectedCuento) {
            setShowPlayer(true);
        }
    };

    return (
        <div className="space-y-4 p-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Reproductor de Cuentos
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Select
                    value={selectedCuento}
                    onChange={(e) => {
                        setSelectedCuento(e.target.value);
                        setShowPlayer(false);
                    }}
                    className="max-w-xs"
                >
                    <option value="">-- Seleccionar un cuento --</option>
                    {cuentos.map((c, idx) => (
                        <option key={idx} value={c}>
                            {c}
                        </option>
                    ))}
                </Select>

                <Button
                    onClick={handlePlayClick}
                    disabled={!selectedCuento}
                >
                    Play
                </Button>
            </div>

            {showPlayer && (
                <Card className="max-w-md bg-white dark:bg-gray-800 border dark:border-gray-700">
                    <Card>
                        <img
                            src="/img/cuento.jpg"
                            alt={selectedCuento}
                            className="rounded-t-lg"
                        />
                        <div className="p-4">
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                {selectedCuento}
                            </p>
                            <audio
                                controls
                                src="/audio/audio.mp3"
                                className="w-full"
                            ></audio>
                        </div>
                    </Card>
                </Card>
            )}
        </div>
    );
}
