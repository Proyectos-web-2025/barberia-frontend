// importacion de libreria para el manejo de respuestas para los formularios
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/Apis/auth/loginApi"; // importacion de nuestra funcion que consume Api
import { useNavigate } from "react-router";

import toast, { Toaster } from "react-hot-toast"; // libreria para el estlilo de alertas

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.loading("Inicio de sesion exitoso");

      navigate("/admin")
    },
    onError: (error) => {
      const backendMessage = error.response?.data?.detail || "Error inesperado";
      console.log("Mensaje del servidor:", backendMessage);
      toast.error(backendMessage);
    },
  });
};
