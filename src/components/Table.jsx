import { useState, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { TextInput, Pagination } from "flowbite-react";

// eslint-disable-next-line react/prop-types
const ReusableTable = ({ columns, data, onEdit, onDelete }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Filtrado global por texto (revisa todas las columnas visibles)
    const filteredData = useMemo(() => {
        if (!search) return data;

        // eslint-disable-next-line react/prop-types
        return data.filter((item) =>
            // eslint-disable-next-line react/prop-types
            columns.some((col) => {
                const value = col.render ? col.render(item) : item[col.key];
                return String(value).toLowerCase().includes(search.toLowerCase());
            }),
        );
    }, [search, data, columns]);

    // Paginación sobre data filtrada
    const paginatedData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, page]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="space-y-4">
            <TextInput
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1); // resetear a la primera página al buscar
                }}
            />

            <div className="overflow-x-auto">
                <table className="table-hover table w-full rounded-md border">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            {/* eslint-disable-next-line react/prop-types */}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-4 py-2 text-center justify-start text-sm font-semibold text-gray-700 dark:text-gray-300"
                                >
                                    {col.label}
                                </th>
                            ))}
                            {(onEdit || onDelete) && (
                                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr
                                key={item.id || index}
                                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                {/* eslint-disable-next-line react/prop-types */}
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-4 py-2"
                                    >
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                                {(onEdit || onDelete) && (
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex justify-start gap-3">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(item)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        showIcons
                    />
                </div>
            )}
        </div>
    );
};

export default ReusableTable;
