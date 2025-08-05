/**
 * Archivo dedicado a la conexion entre cliente-servidor del login
 */

import axios from "axios";  // importacion de la libreria para manejar las peticion https

const API_URL = "http://localhost:8000/auth/login"; // URL de tu endpoint en la Api


/* funcion para consumir ruta de la api del inicio de sesion */
const loginUser = async (data) => {
  const response = await axios.post(API_URL,data);
  return response.data;
};

export {loginUser};