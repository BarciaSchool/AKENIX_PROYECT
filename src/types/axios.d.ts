// src/types/axios.d.ts
import 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        /** Marca interna para reintentos de refresh-token */
        _retry?: boolean;
    }
}
