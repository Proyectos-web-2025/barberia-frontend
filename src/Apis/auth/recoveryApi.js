/**
 * Archivo dedicado a la conexion entre cliente-servidor para restablecer contraseña de user
 */

import axios from "axios"; // importacion de la libreria para manejar las peticion https

import BASE_URL from "../../config";

// Usa la pública si estás en producción o compartiendo el backend
const API_URL = `${BASE_URL}/resetAuth/UserRecovery`;

const API_URL_METHOD = `${BASE_URL}/resetAuth/MethodRecovery`;

/**
 *  funcion para consumir ruta de la api del inicio de sesion,
 *  validar la existencia del usuario en la bd
 */
const recoveryUser = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

/**
 *  enviar emtodo de evrifiacion + token con expiracion
 */

const MethodRecovery = async (token, data) => {
  const response = await axios.post(API_URL_METHOD, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data
};

export { recoveryUser, MethodRecovery };
