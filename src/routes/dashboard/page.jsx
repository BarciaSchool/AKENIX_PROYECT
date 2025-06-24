import { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import {
    Card,
    Progress,
    Badge,
    DarkThemeToggle,
} from "flowbite-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

export default function DashboardPage() {
    // Datos de ejemplo
    const summary = {
        totalQuestions: 50,
        correctAnswers: 40,
        incorrectAnswers: 10,
    };

    const perStoryStats = [
        { name: "Cuento 1", correct: 12, incorrect: 3 },
        { name: "Cuento 2", correct: 10, incorrect: 2 },
        { name: "Cuento 3", correct: 8, incorrect: 1 },
        { name: "Cuento 4", correct: 10, incorrect: 4 },
    ];

    const accuracyRate = Math.round(
        (summary.correctAnswers / summary.totalQuestions) * 100
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard de Aprendizaje</h1>
            </header>

            {/* Resumen de respuestas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { icon: <Eye size={24} className="text-blue-500" />, label: "Total Preguntas", value: summary.totalQuestions },
                    { icon: <CheckCircle size={24} className="text-green-500" />, label: "Aciertos", value: summary.correctAnswers },
                    { icon: <XCircle size={24} className="text-red-500" />, label: "Errores", value: summary.incorrectAnswers },
                ].map((item, idx) => (
                    <Card
                        key={idx}
                        className="bg-white dark:bg-gray-800 border dark:border-gray-700"
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Tasa de acierto */}
            <Card className="max-w-md bg-white dark:bg-gray-800 border dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tasa de Acierto</p>
                    <Badge color={accuracyRate >= 80 ? "success" : "failure"}>
                        {accuracyRate}%
                    </Badge>
                </div>
                <Progress progress={accuracyRate} size="lg" />
            </Card>

            {/* Gráfico por cuento */}
            <Card className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 border dark:border-gray-700">
                <p className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Aciertos vs Errores por Cuento
                </p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={perStoryStats}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                        <YAxis tick={{ fill: '#9CA3AF' }} />
                        <Tooltip
                            wrapperStyle={{
                                backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : '#FFFFFF',
                                color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#000000',
                            }}
                        />
                        <Legend verticalAlign="top" height={36} wrapperStyle={{ color: document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#000000' }} />
                        <Bar dataKey="correct" name="Aciertos" fill="#34D399" />
                        <Bar dataKey="incorrect" name="Errores" fill="#EF4444" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
