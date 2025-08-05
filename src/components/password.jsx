/**
 * este archivo se usarqa para el componenet paswsword , el cual tendra como funcion la opcion de visibilidad
 * de la contraseña
 */

import { useState } from "react";
import { PiEyeLight, PiEyeSlashLight, PiWarningCircle } from "react-icons/pi"; // Íconos de visibilidad y advertencia

const PasswordInput = ({
  id = "password",
  labelText = "Password",
  placeholder = "Enter your password",
  register,
  errors,
  name = "password",
  requiredMessage = "This field is required",
}) => {
  // Estado local para alternar visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-8">
      {/* Etiqueta descriptiva */}
      <label
        htmlFor={id}
        className="block text-amber-50 text-base mb-1 tracking-wide"
      >
        {labelText}
      </label>

      {/* Wrapper para input y botón de visibilidad */}
      <div className="relative">
        {/* Campo de texto con visibilidad controlada */}
        <input
          {...register(name, {
            required: requiredMessage,
          })}
          aria-invalid={errors?.[name] ? "true" : "false"}
          type={showPassword ? "text" : "password"}
          id={id}
          className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 pr-10"
          placeholder={placeholder}
          autoComplete="current-password"
        />

        {/* Botón para mostrar/ocultar contraseña */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white px-2 focus:outline-none cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <PiEyeSlashLight /> : <PiEyeLight />}
        </button>
      </div>

      {/* Mensaje de error */}
      {errors?.[name] && (
        <p role="alert" className="text-red-500 flex items-center gap-1 mt-1">
          <PiWarningCircle />
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
