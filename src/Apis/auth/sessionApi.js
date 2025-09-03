/**
 * archivo dedicado para la conexion hacia al servidor , para proteger rutas 
 */

import axios, { Axios } from "axios";
import BASE_URL from "../../config";

const API_URL = `${BASE_URL}/session/check`;

const sessionUser = async () => {
    const response = await axios.get(API_URL,{
        withCredentials: true
    });
    return response.data;
};

export {sessionUser}