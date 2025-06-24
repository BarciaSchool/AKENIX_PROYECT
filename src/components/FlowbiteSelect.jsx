import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { useThemeMode } from "flowbite-react";

export default function FlowbiteReactSelect({ options, placeholder, value, onChange, error, isClearable = false, isMulti = false }) {
    const { mode } = useThemeMode(); // "light" o "dark"

    const customStyles = {
        // ... estilos personalizados
    };

    return (
        <div>
            <ReactSelect
                options={options}
                placeholder={placeholder}
                value={isMulti ? options.filter((opt) => value?.includes(opt.value)) : options.find((opt) => opt.value === value) || null}
                onChange={(selected) => {
                    if (isMulti) {
                        onChange(selected ? selected.map((opt) => opt.value) : []);
                    } else {
                        onChange(selected?.value);
                    }
                }}
                styles={customStyles}
                isClearable={isClearable}
                isMulti={isMulti}
                className="react-select-container"
                classNamePrefix="react-select"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
