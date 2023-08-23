import axios from "axios";

const urlBackend = 'http://localhost:3000/api';

export const verifyToken = () => {
  return axios.get(`${urlBackend}/verify`, {
    withCredentials: true // Habilitar el envío de cookies
  });
}
