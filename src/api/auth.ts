import api from './axios';

/**
 * Obtiene el listado de cargos
 * @returns Promise con data: Cargo[]
 */
export function getCargos() {
    return api.get('api/cargos/');
}

/**
 * Obtiene el listado de departamentos
 * @returns Promise con data: Departamento[]
 */
export function getDepartamentos() {
    return api.get('api/departamentos/');
}