import api from "./axios";



export const getUsers = () => api.get("/api/users/");
export const deleteUser = (id) => api.delete(`/api/users/${id}/`);
