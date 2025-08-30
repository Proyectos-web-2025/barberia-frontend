/**
 * Archivo dedicado a la conexion entre cliente-servidor para restablecer contraseña de user
 */

import axios from "axios"; // importacion de la libreria para manejar las peticion https

import BASE_URL from "../../config";
import { data } from "react-router";

// Usa la pública si estás en producción o compartiendo el backend
const API_URL = `${BASE_URL}/resetAuth/UserRecovery`;

const API_URL_METHOD = `${BASE_URL}/resetAuth/MethodRecovery`;

const API_URL_CODE = `${BASE_URL}/resetAuth/CodeRecovery`;

const API_URL_CHANGEPASSWORD = `${BASE_URL}/resetAuth/ChangePassword`;

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

const MethodRecovery = async (data) => {
  const token = data.token;
  const response = await axios.post(API_URL_METHOD, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * enviar codigo  OTP para que este sea validado por el servidor
 */
const codeRecovery = async (data) => {
  const token = data.token;

  const response = await axios.post(API_URL_CODE, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
/**
 * enviar nueva contraseña al servidor + token con expiracion
 */

const changePassword = async (data) => {
  const token = data.token;

  const response = await axios.post(API_URL_CHANGEPASSWORD, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { recoveryUser, MethodRecovery, codeRecovery, changePassword };
