// importacion de libreria para el manejo de respuestas para los formularios
import {
  recoveryUser,
  MethodRecovery,
  codeRecovery,
  changePassword,
} from "@/Apis/auth/recoveryApi";
import { decodeTokenPayload } from "../../utils/decodeTokenPayload";

import toast from "react-hot-toast"; // alertas
import { useMutation } from "@tanstack/react-query"; // libreria pra usar hook
import { useNavigate } from "react-router-dom"; // para navegar en mis rutas de paginas

// hook para el formualrio del paso 1 - que es la verificacion del usuario y recibir sus datos
export const useRecovery = (onSuccessCallback) => {
  return useMutation({
    mutationFn: recoveryUser, // enviamos los datos a la api
    onSuccess: (data) => {
      console.log(data.message);
      const { token } = data; // obtenemos el token
      const userData = decodeTokenPayload(token); // dodificamos el token para obtener los dqatps
      // validamos que exitan los datos dofificados
      if (!userData) {
        toast.error("Invalid or unreadable token");
        return;
      }
      // retornamos los datos del servidor a nustra pagina
      if (onSuccessCallback) {
        onSuccessCallback(userData.correo, userData.telefono, token);
      }
    },
    onError: (error) => {
      const backendMessage = error.response?.data?.detail || "Error inesperado";
      toast.error(backendMessage);
    },
  });
};

// funion para el envio del metodo de verificacion
export const useMethodRecovery = (onSuccessCallback) => {
  return useMutation({
    mutationFn: MethodRecovery,
    onSuccess: (data) => {
      console.log(data.message);
      onSuccessCallback(true); // devolvemos true
    },
    onError: (error) => {
      const statusCode = error.response?.status; // obtenemos el estado del error
      const backendMessage = error.response?.data?.detail || "Error inesperado";
      toast.error(backendMessage);

      if (statusCode === 501) return; // retornamos si es este error y no pasamos el callback
      onSuccessCallback(false);
    },
  });
};

// funcion para enviar el  codigo ingresado por el usuario
// se hace un callback para devolver una respuesta en boleano a mi pagina
export const useCodeRecovery = (onSuccessCallback) => {
  return useMutation({
    mutationFn: codeRecovery,
    onSuccess: (data) => {
      console.log(data.message);
      toast.success(data.message);
      onSuccessCallback(true);
    },
    onError: (error) => {
      const statusCode = error.response?.status; // se obteiene el estado del error , para manejar la visivilidad de los formualrios segun el tipo de error
      const backendMessage = error.response?.data?.detail || "Error inesperado";
      toast.error(backendMessage);
      if (statusCode === 400) return;
      onSuccessCallback(false);
    },
  });
};

// funcion para restablecer la contraseña
export const useChangePassword = (onSuccessCallback) => {
  const navigate = useNavigate(); // ← inicializas el hook
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      console.log(data.message);
      toast.success(data.message);
      // aqui retornamos a la pagina de login
      toast.loading("Redirecting to login page...", {
        duration: 3000,
      });
      // Redirección con pequeño delay para que el usuario vea el mensaje
      setTimeout(() => navigate("/"), 3000);
    },
    onError: (error) => {
      const details = error.response?.data?.detail;

      // Mostrar en consola
      if (Array.isArray(details)) {
        const messages = details.map((err) => err.msg).join(" | ");
        toast.error(messages);
      } else {
        toast.error(details || "Error inesperado");
      }
      // cualquier error de servidro retornamos al inicio
      onSuccessCallback(false);
    },
  });
};
