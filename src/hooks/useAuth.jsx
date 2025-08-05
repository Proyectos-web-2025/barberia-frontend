// importacion de libreria para el manejo de respuestas para los formularios
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/Apis/auth"; // importacion de nuestra funcion que consume Api

import toast, { Toaster } from "react-hot-toast"; // libreria para el estlilo de alertas

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data.message);
      localStorage.setItem("token", data.access_token);
      toast.success("Inicio de sesion exitoso");
    },
    onError: (error) => {
      const backendMessage = error.response?.data?.detail || "Error inesperado";
      console.log("Mensaje del servidor:", backendMessage);
      toast.error(backendMessage)
    },
  });
};
