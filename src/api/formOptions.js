import axios from "axios";

const urlBackend = 'https://backendproyfinalrc.onrender.com/api';

export const addFormApi = (form) => {


  return axios.post(`${urlBackend}/postForm`, form, {
    withCredentials: true
  });
};

export const gettingForm = async (idform) => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')).split('=')[1];

  const headers = new Headers({
    'Cookie': `token=${token}`
  });

  const config = {
    method: 'GET',
    headers: headers,
    credentials: 'include'
  };

  const response = await fetch(`${urlBackend}/getFormuserform/${idform}`, config);
  const data = await response.json();

  return data;
};


export const gettingForm = (idform) => {
  return axios.get(`${urlBackend}/getFormuserform/${idform}`, {
    withCredentials: true 
  });
};

export const gettingFormToResp = (idform) => {
  return axios.get(`${urlBackend}/getFormtoresp/${idform}`);
};

export const deleteForm = (idform) => {
  return axios.delete(`${urlBackend}/deleteform/${idform}`, {
    withCredentials: true 
  });
};

export const updateForm = (idform, form) => {
  return axios.patch(`${urlBackend}/modifyform/${idform}`, form, {
    withCredentials: true 
  });
};

export const gettingResponses = (idform) => {
  return axios.get(`${urlBackend}/gettingResponses/${idform}`, {
    withCredentials: true 
  });
}

export const postUserForm = (idform, form) => {
  return axios.post(`${urlBackend}/postFormToResp/${idform}`, form, {
    withCredentials: true 
  });
}

export const loginUser = (user) => {
  return axios.post(`${urlBackend}/login`, user, {
    withCredentials: true 
  });
}

export const registerUser = (user) => {
  return axios.post(`${urlBackend}/register`, user, {
    withCredentials: true 
  });
}

export const logoutuser = () => {
  return axios.post(`${urlBackend}/logout`, {
    withCredentials: true 
  });
}

export const getUserToVerify = (id) => {
  return axios.get(`${urlBackend}/toverifyemail/${id}`, {
    withCredentials: true 
  });
}
export const verifyUser = (id) => {
  return axios.patch(`${urlBackend}/toverifyemail/${id}`, {
    withCredentials: true 
  });
}
export const changePassword = (id, password) => {
  return axios.post(`${urlBackend}/recoverypasswordPage/${id}`, password, {
    withCredentials: true 
  });
}
export const sendMailTorecoveryPass = (email) => {
  return axios.post(`${urlBackend}/recoverypassword`, email, {
    withCredentials: true 
  });
}
