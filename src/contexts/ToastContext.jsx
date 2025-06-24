import React, { createContext, useContext, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast(null), 4000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast?.visible && (
                <div className="fixed right-4 top-4 z-50">
                    <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        {toast.type === "success" ? (
                            <CheckCircle size={20} className="text-green-500" />
                        ) : (
                            <XCircle size={20} className="text-red-500" />
                        )}
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            {toast.message}
                        </p>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
