// importacion de libreria para el manejo de respuestas para los formularios
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/Apis/auth/loginApi"; // importacion de nuestra funcion que consume Api
import { useNavigate } from "react-router";

import toast, { Toaster } from "react-hot-toast"; // libreria para el estlilo de alertas

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) =>
      toast.promise(loginUser(formData), {
        loading: "Checking credentials...",
        success: "Login successful. Redirecting to dashboard...",
        error: (error) => {
          const backendMessage = error.response?.data?.detail;
          return backendMessage || "Unexpected error during login";
        },
      }),
    onSuccess: () => {
      setTimeout(() => {
        navigate("/admin");
      }, 3000); // ⏳ gives time for the toast to be read
    },
    onError: () => {
      // Error toast already handled by toast.promise
    },
  });
};
