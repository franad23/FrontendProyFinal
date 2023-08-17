import axios from "axios";

const urlBackend = 'https://backendproyfinalrc.onrender.com/api';

export const verifyToken = () => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')).split('=')[1];

  const config = {
    withCredentials: true,
    headers: {
      Cookie: `token=${token}`
    }
  };

  return axios.get(`${urlBackend}/verify`, config);
};
