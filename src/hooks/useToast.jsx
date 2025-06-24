import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({ show: false, message: "", color: "success" });

  const showToast = (message, color = "success") => {
    setToast({ show: true, message, color });

    setTimeout(() => {
      setToast({ show: false, message: "", color });
    }, 3000); // 3 segundos
  };

  return { toast, showToast };
}
