/**
 * archivo dedicado al login
 */

import { useForm } from "react-hook-form"; // importacion de libreria para el manejo de los formularios
import { PiWarningCircle } from "react-icons/pi"; // importacion de libreria para iconos
import { AiOutlineWarning } from "react-icons/ai";
import { Toaster } from "react-hot-toast"; // libreria para el estlilo de alertas
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/auth/uselogin.jsx";
import PasswordInput from "../../utils/password.jsx";

function Login() {
  const navigate = useNavigate(); // ← inicializas el hook
  /**
   * Constantes proporcionadas por react-hook-form:
   * - register: registra los inputs para que el formulario los controle.
   * - handleSubmit: maneja el evento submit y entrega los datos del formulario.
   * - errors: contiene los errores de validación de cada campo (si existen).
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useLogin();
  /**
   * Funcion que recoge los datos del formulario para darle manejo
   */
  const onSubmit = (data) => {
    mutate(data);
     // Dispara el login con los datos del formulario
  };

  return (
    <>
      <Toaster position="top-center"   /> {/* alerta */}
      <div className="h-screen flex items-center justify-center ">
        {/* Formulario de login */}
        <div className="w-full max-w-xs">
          {/* Título del login */}
          <h1 className="text-5xl text-white font-bold text-center mb-14 font-mono">
            Login
          </h1>

          {/*Formulario de registro  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo de usuario */}
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-amber-50 text-base mb-1 tracking-wide font-mono"
              >
                Username
              </label>
              <input
                {...register("username", {
                  required: "This field is required",
                })}
                aria-invalid={errors.username ? "true" : "false"}
                type="text"
                id="username"
                className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                placeholder="Enter your username"
                autoComplete="username"
              />
              {/* Mensaje de error */}
              {errors.username && (
                <p
                  role="alert"
                  className="text-red-500 flex items-center gap-1 font-mono"
                >
                  <PiWarningCircle /> {/* icono */}
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Campo de contraseña */}
            <PasswordInput register={register} errors={errors} />

            {/* Botón de login */}
            <button
              
              type="submit"
              className="font-mono w-full py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded cursor-pointer"
            >
               ENTER...
            </button>
          </form>

          {/* Sección adicional para ir a la pagina de restablecimiento de contraseña */}
          <div className="mt-6 text-center flex justify-center items-center gap-2 text-sm text-gray-400 font-mono">
            <AiOutlineWarning className="text-red-500 " />
            <button
              type="button"
              onClick={() => navigate("/recovery")} // ← redirige al recovery
              className="font-semibold text-red-800 hover:text-red-500 underline underline-offset-2 transition duration-200"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
