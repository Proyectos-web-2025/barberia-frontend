/**
 * Archivo dedicado para el restablecimieno de contraseña
 *
 */

import { useState } from "react"; // libreria de react para el manejo de visivilidad
import { useForm } from "react-hook-form"; // libreria para el manejo del formulario
import { PiWarningCircle } from "react-icons/pi"; // importacion de libreria para iconos
import toast, { Toaster } from "react-hot-toast"; // libreria para el estlilo de alertas

import { useRecovery, useMethodRecovery } from "../../hooks/auth/useRecovery";
import HelpIconModal from "../../components/HelpIconModal";
import { MaskedEmail, MaskedPhone } from "../../components/MaskedSensitive";
import { data } from "react-router";

function Recovery() {
  // Controla la visibilidad del segundo paso del formulario (selección de método de verificación)

  const [showStep2, setShowStep2] = useState(false);
  //  Almacena los datos decodificados del usuario (correo, teléfono, token) recibidos desde el backend
  const [infoUser, setInfoUser] = useState(null);

  //manejo de Formulario paso 1: username
  const formStep1 = useForm();
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
  } = formStep1;

  // manejo Formulario paso 2: método de verificación
  const formStep2 = useForm();
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
  } = formStep2;

  //  Callback cuando el backend responde con token decodificado
  const handleSuccess = (correo, telefono, token) => {
    setInfoUser({ correo, telefono, token });
    setShowStep2(true);
    formStep1.reset(); // limpia el formulario anterior
  };

  const { mutate: mutateStep1 } = useRecovery(handleSuccess);
  const { mutate: mutateStep2 } = useMethodRecovery(infoUser?.token);

  /*
   * Funcion que recoge los datos del formulario para darle manejo
   * para el formualrio del paso 1
   */
  const onSubmitStep1 = (data) => {
    const username = data.username?.toLowerCase();
    if (username.includes("admin")) {
      toast.error("Password reset is not allowed for administrator accounts.");
      return;
    }
    mutateStep1(data);
  };
   // vamos por aca
  const onSubmitStep2 = (data) => {
    const method = data.verificationMethod;
    // metodo no implementado por el momento ( se hace verificacion para evitar errores)
    if (method === "phone") {
      toast.error("This R method is not available at the moment");
      return;
    }
    mutateStep2(data)
  };

  return (
    <>
      <Toaster position="top-center" /> {/* alerta */}
      <div className="h-screen flex items-center justify-center">
        {/* fromualrio de restablecer contraseña */}
        <div className="w-full  max-w-xs">
          {/* Titulo del formulario */}
          <h1 className="text-5xl text-white font-bold text-center mb-10 font-mono">
            Forgot Your Password?
          </h1>

          {/*Formulario 1 paso - username */}
          {!showStep2 && (
            <>
              <div className="text-center mt-2 mb-2">
                {/* icono con modal informativo */}
                <HelpIconModal
                  title="Enter Your Username"
                  message="To begin password R, provide the username linked to your account credentials."
                />
              </div>
              <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
                {/* Campo username */}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-amber-50 text-base mb-1 tracking-wide"
                  >
                    Username
                  </label>
                  <input
                    {...registerStep1("username", {
                      required: "This field is required",
                    })}
                    aria-invalid={errorsStep1.username ? "true" : "false"}
                    type="text"
                    id="username"
                    className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  {/* Mensaje de error */}
                  {errorsStep1.username && (
                    <p
                      role="alert"
                      className="text-red-500 flex items-center gap-1 font-mono"
                    >
                      <PiWarningCircle /> {/* icono */}
                      {errorsStep1.username.message}
                    </p>
                  )}
                </div>
                {/* botton siguiente - paso 1 */}
                <button
                  type="submit"
                  className="w-full py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded cursor-pointer"
                >
                  NEXT...
                </button>
              </form>
            </>
          )}

          {/*Formulario 2 paso - metodo de verificacion */}
          {showStep2 && (
            <>
              {/* icono con modal informativo */}
              <div className="text-center mt-2 mb-2">
                <HelpIconModal
                  title="Verification Method"
                  message="Choose how you would like to receive your verification code."
                />
              </div>

              <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
                {/* Opciones de selección */}
                <div className="mt-6 space-y-4">
                  {/* Opción correo */}
                  <label className="flex items-center gap-3 p-3 rounded-2xl border border-gray-600 hover:border-yellow-600 cursor-pointer transition bg-gray-800/60">
                    <input
                      {...registerStep2("verificationMethod", {
                        required: "Select a method",
                      })}
                      type="radio"
                      value="email"
                      id="optionEmail"
                      className="mt-1 accent-yellow-600 text-yellow-600 focus:ring-yellow-500"
                    />
                    <div>
                      <span className="block text-white font-mono">
                        Send code via Email
                        {/* correo regsitrado en bd deñl usuario */}
                      </span>
                      <MaskedEmail email={infoUser.correo} />
                    </div>
                  </label>

                  {/* Opción teléfono */}
                  <label className="flex items-center gap-3 p-3 rounded-2xl border border-gray-600  bg-gray-700/40 cursor-not-allowed opacity-50">
                    <input
                      {...registerStep2("verificationMethod", {
                        required: "Select a method",
                      })}
                      type="radio"
                      value="phone"
                      id="optionTell"
                      className=" accent-yellow-600 text-yellow-600 focus:ring-yellow-500"
                      disabled
                    />
                    <div className="">
                      <span className="block text-white font-mono">
                        Send code via Phone
                      </span>
                      <MaskedPhone phone={infoUser.telefono} />
                    </div>
                  </label>

                  {/* Error si no selecciona */}
                  {errorsStep2.verificationMethod && (
                    <p
                      role="alert"
                      className="text-red-500 flex items-center gap-1 mt-1 font-mono "
                    >
                      <PiWarningCircle />
                      {errorsStep2.verificationMethod.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-3 py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded cursor-pointer"
                  >
                    NEXT...
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Recovery;
