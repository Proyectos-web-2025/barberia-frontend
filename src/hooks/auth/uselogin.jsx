// importacion de libreria para el manejo de respuestas para los formularios
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/Apis/auth/loginApi"; // importacion de nuestra funcion que consume Api
import { useNavigate } from "react-router";

import toast from "react-hot-toast"; // libreria para el estlilo de alertas

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) =>
      toast.promise(loginUser(formData), {
        id: "login-toast",
        loading: "Checking credentials...",
        success: "Login successful. Redirecting to dashboard...",
        error: (error) => {
          const backendMessage = error.response?.data?.detail;
          return backendMessage || "Unexpected error during login";
        },
      }),
    onSuccess: (data) => {
      const roleRedirectMap = {
        1: "/admin",
        2: "/barbero",
      };

      const role = data.role;
      const redirectPath = roleRedirectMap[role] || "/dashboard"; // fallback por si el rol no está mapeado

      setTimeout(() => {
        navigate(redirectPath);
      }, 2000); // ⏳ da tiempo para que el usuario lea el toast
    },
    onError: () => {
      // El toast ya se encargó del mensaje
    },
  });
};
