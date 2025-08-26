// importacion de libreria para el manejo de respuestas para los formularios
import { recoveryUser, MethodRecovery } from "@/Apis/auth/recoveryApi";
import { decodeTokenPayload } from "../../utils/decodeTokenPayload";

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// hook para el formualrio del paso 1 - que es la verificacion del usuario y recibir sus datos
export const useRecovery = (onSuccessCallback) => {
  return useMutation({
    mutationFn: recoveryUser,
    onSuccess: (data) => {
      console.log(data.message);
      const { token } = data;
      const userData = decodeTokenPayload(token);

      if (!userData) {
        toast.error("Invalid or unreadable token");
        return;
      }

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

export const useMethodRecovery = () => {
  return useMutation({
    mutationFn: MethodRecovery,
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => {
      const backendMessage = error.response?.data?.detail || "Error inesperado";
      toast.error(backendMessage);
    },
  });
};
