/**
 * Archivo dedicado para el restablecimieno de contraseña
 *
 */

import { useState } from "react"; // libreria de react para el manejo de visivilidad
import { useForm, Controller } from "react-hook-form"; // libreria para el manejo del formulario
import { PiWarningCircle } from "react-icons/pi"; // importacion de libreria para iconos
import toast, { Toaster } from "react-hot-toast"; // libreria para el estlilo de alertas
import OtpInput from "react-otp-input"; // libreria para hacer input de codigo OTP

import { useRecovery, useMethodRecovery , useCodeRecovery } from "../../hooks/auth/useRecovery";
import HelpIconModal from "../../components/HelpIconModal";
import { MaskedEmail, MaskedPhone } from "../../components/MaskedSensitive";
import { data } from "react-router";

function Recovery() {
  const [currentStep, setCurrentStep] = useState(1); // controla visibilidad de los formularios

  // Inicializa formularios separados para cada paso del flujo de recuperación.
  const forms = {
    username: useForm(),
    method: useForm(),
    code: useForm(),
  };
  /**
   * Se extraen las funciones necesarias para registrar campos, manejar errores , manejar el envío
   * para cada formulario
   */
  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: errorUsername },
  } = forms.username;

  const {
    register: registerMethod,
    handleSubmit: handleSubmitMethod,
    formState: { errors: errorsMethod },
  } = forms.method;

  const { handleSubmit: handleSubmitCode } = forms.code;

  // almacena los datos obtenidos del bakend para darle visual al usuario (email,tell, token)
  const [infoUser, setInfoUser] = useState(null);
  // almacena el codigo OPT ingresado por el usuario
  const [code, setCode] = useState("");
  // manejar manualmente el mensaje de error en el formulario de OPT
  const [codeError, setCodeError] = useState("");

  //  Callback , obtenemos los datos dodificados del  form 1
  const userRecoveryData = (correo, telefono, token) => {
    // agregamos data a la variable
    setInfoUser({ correo, telefono, token });
    // pasamos al siguiente formualrio
    setCurrentStep(2);
    forms.username.reset(); // limpia el formulario anterior
  };

  // Mutación para enviar el nombre de usuario y obtener datos decodificados del backend
  const { mutate: mutateUsername } = useRecovery(userRecoveryData);
  // Mutación para enviar el método de verificación seleccionado (email o teléfono)
  const { mutate: mutateSendMethod } = useMethodRecovery();
  // mutacion para enviar el codigo OTP ingresado al usaurio 
  const { mutate: mutateSendCode } = useCodeRecovery();

  /*
   * Funcion que recoge los datos del formulario para darle manejo
   * // Maneja el envío de datos en cada paso del flujo de recuperación
   */
  const onSubmitUsername = (data) => {
    // validamos que el usuario no sea admin
    const username = data.username?.toLowerCase();
    if (username.includes("admin")) {
      toast.error("Password reset is not allowed for administrator accounts.");
      return;
    }
    mutateUsername(data); // enviamos los datos del formulario
  };

  const onSubmitMethod = (data) => {
    // nos salimos por ahora para prueba
    // metodo no implementado por el momento ( se hace verificacion para evitar errores)
    if (data.method === "phone") {
      toast.error("This R method is not available at the moment");
      return;
    }
    // agregamos el token al data
    data.token = infoUser.token;
    mutateSendMethod(data);
    setCurrentStep(3);
  };

  const onSubmitCode = (data) => {
    if (code.length !== 6) {
      setCodeError("You must enter all 6 digits of the code"); // o cualquier alerta visual
      return;
    }
    data.token = infoUser.token; // se agrega el token
    data.code = code; // agregamos el codigo
    mutateSendCode(data);
    setCodeError("");
    setCurrentStep(4);

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
          {currentStep === 1 && (
            <>
              <div className="text-center mt-2 mb-2">
                {/* icono con modal informativo */}
                <HelpIconModal
                  title="Enter Your Username"
                  message="To begin password R, provide the username linked to your account credentials."
                />
              </div>
              <form onSubmit={handleSubmitUsername(onSubmitUsername)}>
                {/* Campo username */}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-amber-50 text-base mb-1 tracking-wide"
                  >
                    Username
                  </label>
                  <input
                    {...registerUsername("username", {
                      required: "This field is required",
                    })}
                    aria-invalid={errorUsername.username ? "true" : "false"}
                    type="text"
                    id="username"
                    className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  {/* Mensaje de error */}
                  {errorUsername.username && (
                    <p
                      role="alert"
                      className="text-red-500 flex items-center gap-1 font-mono"
                    >
                      <PiWarningCircle /> {/* icono */}
                      {errorUsername.username.message}
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
          {currentStep === 2 && (
            <>
              {/* icono con modal informativo */}
              <div className="text-center mt-2 mb-2">
                <HelpIconModal
                  title="Verification Method"
                  message="Choose how you would like to receive your verification code."
                />
              </div>

              <form onSubmit={handleSubmitMethod(onSubmitMethod)}>
                {/* Opciones de selección */}
                <div className="mt-6 space-y-4">
                  {/* Opción correo */}
                  <label className="flex items-center gap-3 p-3 rounded-2xl border border-gray-600 hover:border-yellow-600 cursor-pointer transition bg-gray-800/60">
                    <input
                      {...registerMethod("method", {
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
                      {...registerMethod("method", {
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
                  {errorsMethod.method && (
                    <p
                      role="alert"
                      className="text-red-500 flex items-center gap-1 mt-1 font-mono "
                    >
                      <PiWarningCircle />
                      {errorsMethod.method.message}
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
          {/*Formulario 3 paso - confirmacion de codigo */}
          {currentStep === 3 && (
            <>
              <div className="text-center mt--3 mb-5">
                <HelpIconModal
                  title="Enter Verification Code"
                  message="Enter the 6-digit code sent to your email."
                />
              </div>

              <form onSubmit={handleSubmitCode(onSubmitCode)}>
                <div className="flex justify-center gap-3 mb-6">
                  {/* input para el codigo utiliando la libreria */}
                  <OtpInput
                    value={code}
                    onChange={setCode}
                    inputType="number"
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className={`${props.className} border border-gray-300 text-white focus:outline-none focus:border-yellow-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                      />
                    )}
                    inputStyle={{
                      width: "100%",
                      margin: "0 0.5rem",
                      fontSize: "1.5rem",
                      borderRadius: "8px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                {codeError && (
                  <p
                    role="alert"
                    className="text-red-500 flex items-center gap-1 mt-1 mb-3 font-mono"
                  >
                    <PiWarningCircle />
                    {codeError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded cursor-pointer"
                >
                  VERIFY CODE
                </button>
              </form>
            </>
          )}
          {currentStep === 4 && (
            <>
              <div className="text-center mt--3 mb-5">
                <HelpIconModal
                  title="Enter Verification Code"
                  message="repita la contraseña."
                />
              </div>

              <form onSubmit={handleSubmitCode(onSubmitCode)}>

                <h1>hola , quede por aqui </h1>
            

                <button
                  type="submit"
                  className="w-full py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded cursor-pointer"
                >
                  VERIFY CODE
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Recovery;
