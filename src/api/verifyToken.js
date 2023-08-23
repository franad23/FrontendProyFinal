import axios from "axios";

const urlBackend = 'https://backendproyfinalrc.onrender.com/api';

export const verifyToken = () => {
  return axios.get(`${urlBackend}/verify`, {
    withCredentials: true // Habilitar el envío de cookies
  });
}
