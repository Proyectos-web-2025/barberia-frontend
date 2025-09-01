/**
 * Archivo dedicado a la conexion entre cliente-servidor del login
 */

import axios from "axios";  // importacion de la libreria para manejar las peticion https

import BASE_URL from "../../config"; // importacion de la ruta hacia el servidor 
const API_URL = `${BASE_URL}/auth/login`;


/* funcion para consumir ruta de la api del inicio de sesion */
const loginUser = async (data) => {
  const response = await axios.post(API_URL,data,{
     withCredentials: true // permite enviar y recibir co
  });
  return response.data;
};

export {loginUser};