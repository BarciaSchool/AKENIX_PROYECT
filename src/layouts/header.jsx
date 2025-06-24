import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ← importa useNavigate
import { useTheme } from "@/hooks/use-theme";
import { Bell, ChevronsLeft, Moon, Search, Sun, User as UserIcon, LogOut } from "lucide-react";
import { Label, Select, Button, Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { AuthContext } from "@/contexts/AuthContext";
import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate(); // ← inicializa el hook
    const { theme, setTheme } = useTheme();
    const { user, logout } = useContext(AuthContext);



    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            {/* … tu bloque de collapse y search … */}
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
                <div className="input">
                    <Search
                        size={20}
                        className="text-slate-300"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>

            {/* Tema, notificaciones y usuario */}
            <div className="flex items-center gap-x-3">
                {/* toggle tema */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button>

                {/* notificaciones */}
                <button className="btn-ghost size-10">
                    <Bell size={20} />
                </button>

                {/* menú de usuario */}
                <Dropdown
                    inline
                    dismissOnClick={false}
                    label={
                        <UserIcon
                            size={24}
                            className="text-slate-600 dark:text-slate-300"
                        />
                    }
                >
                    {/* Cabecera personalizada */}
                    <div className="px-4 py-2">
                        <p className="truncate text-sm font-medium">
                            {user?.first_name} {user?.last_name}
                        </p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>

                    {/* Separador */}
                    <DropdownDivider />

                    {/* Item de logout */}
                    <DropdownItem
                        onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-x-2"
                    >
                        <LogOut size={16} /> Cerrar sesión
                    </DropdownItem>
                </Dropdown>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
