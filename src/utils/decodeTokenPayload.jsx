// utils/decodeTokenPayload.ts

/**
 * archivo utilizado para dedodificar token jwt recibio con informacion desde el servidor
 */
import { jwtDecode } from "jwt-decode";

export const decodeTokenPayload = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded; // contiene correo, teléfono, etc.
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};