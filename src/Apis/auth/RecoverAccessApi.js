/**
 * Archivo dedicado a la conexion entre cliente-servidor para restablecer contraseña de user
 */

import axios from "axios";  // importacion de la libreria para manejar las peticion https

import BASE_URL from "../../config";

// Usa la pública si estás en producción o compartiendo el backend
const API_URL = `${BASE_URL}/resetAuth/UserRecovery`;


/**
 *  funcion para consumir ruta de la api del inicio de sesion,
 *  validar la existencia del usuario en la bd 
 */
const RecoveryAccessUser = async (data) => {
  const response = await axios.post(API_URL,data);
  return response.data;
};

export {RecoveryAccessUser};

