/**
 * Archivo dedicado para el restablecimieno de contraseña
 *
 */
import { useState } from "react"; // libreria de react para el manejo de visivilidad
import { useForm } from "react-hook-form"; // libreria para el manejo del formulario
import { yupResolver } from "@hookform/resolvers/yup"; // libreria para integrar yup con react-hook-form
import { PiWarningCircle } from "react-icons/pi"; // importacion de libreria para iconos
import { AiOutlineWarning } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast"; // libreria para el estlilo de alertas
import OtpInput from "react-otp-input"; // libreria para hacer input de codigo OTP
import { useNavigate } from "react-router-dom";

// importaciones de hook para cada formualrio
import {
  useRecovery,
  useMethodRecovery,
  useCodeRecovery,
  useChangePassword,
} from "../../hooks/auth/useRecovery";

import HelpIconModal from "../../utils/HelpIconModal"; // utilidad de icono con modal
import PasswordInput from "../../utils/password"; // uilidad de contraseña con show
import { MaskedEmail, MaskedPhone } from "../../utils/MaskedSensitive"; // utilidad para enmascara datos del usuario (email - tell)
import { passwordSchema } from "../../utils/validationSchemas"; // utilidad para agregar validacion estricta al campo
import { data } from "react-router";

function Recovery() {
  const navigate = useNavigate(); // ← inicializas el hook
  const [currentStep, setCurrentStep] = useState(1); // controla visibilidad de los formularios

  // Inicializa formularios separados para cada paso del flujo de recuperación.
  const forms = {
    username: useForm(),
    method: useForm(),
    code: useForm(),
    confirmPassword: useForm({ resolver: yupResolver(passwordSchema) }), // se complemente hook form con yup
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

  const {
    register: registerConfirmPassword,
    handleSubmit: handleSubmitConfirmPassword,
    formState: { errors: errorsConfirmPassword },
  } = forms.confirmPassword;

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
  const { mutate: mutateSendMethod } = useMethodRecovery((success) => {
    if (success) {
      toast.success(
        `A verification code has been successfully sent to your registered email address ${infoUser.correo}.`,
        {
          duration: 5000,
          closeButton: true,
        }
      );
      setCurrentStep(3);
      forms.method.reset() // limpiamos el formulario anterior 
    } else {
      setCurrentStep(1);
    }
  });
  // mutacion para enviar el codigo OTP ingresado al usaurio
  const { mutate: mutateSendCode } = useCodeRecovery((success) => {
    if (success) {
      setCurrentStep(4);
      forms.code.reset();
    } else {
      setCurrentStep(1);
    }
  });
  // mutacion para el restablecimiento de contraseña
  const { mutate: mutateSendChangePassword } = useChangePassword((success) => {
    if (success) {
      forms.confirmPassword.reset()
    } else {
      setCurrentStep(1);
    }
  });

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
      toast.error("This method is not available at the moment");
      return;
    }
    // agregamos el token al data
    data.token = infoUser.token;
    mutateSendMethod(data);
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
  };

  const onSubmitConfirmPassword = (data) => {
    data.token = infoUser.token; // agregamos el token al objeto
    mutateSendChangePassword(data); // mutamos la informacion al hook
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          duration: 3000,
          removeDelay: 1000,
          // Default options for specific types
          success: {
            duration: 5000,
          },
        }}
      />
      {/* alerta */}
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

              {/* Sección adicional para reenviar código en una sola línea */}
              <div className="mt-6 text-center flex justify-center items-center gap-2 text-sm text-gray-400 font-mono">
                <AiOutlineWarning className="text-red-500 text-2xl " />
                <span>Didn’t get the code?</span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)} // ← redirige al segundo formulario
                  className="font-semibold text-red-800 hover:text-red-500 underline underline-offset-2 transition duration-200"
                >
                  Send it again
                </button>
              </div>
            </>
          )}
          {/* formulario 4 - actualizar contraseeña */}
          {currentStep === 4 && (
            <>
              <div className="text-center mt--3 mb-5">
                <HelpIconModal
                  title="Confirm New Password"
                  message="Please re-enter your new password to complete the change. Your password must be at least 9 characters long, include at least one uppercase letter, and contain at least one special character."
                />
              </div>

              <form
                onSubmit={handleSubmitConfirmPassword(onSubmitConfirmPassword)}
              >
                {/* nueva contraseña // se utiliza el componente reutilizable del password */}
                <PasswordInput
                  id="newPassword"
                  labelText="New password"
                  placeholder="Enter your new password"
                  register={registerConfirmPassword}
                  errors={errorsConfirmPassword}
                  name="newPassword"
                />
                {/* confirmar contraseña */}
                <PasswordInput
                  id="confirmPassword"
                  labelText="Confirm new password"
                  placeholder="Confirm your new password"
                  register={registerConfirmPassword}
                  errors={errorsConfirmPassword}
                  name="confirmPassword"
                />

                <button
                  type="submit"
                  className="w-full py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded cursor-pointer"
                >
                  CHANGE PASSWORD
                </button>
              </form>
            </>
          )}

          {/* Sección adicional para ir volver al login*/}
          <div className="mt-6 text-center flex justify-center items-center gap-2 text-sm text-gray-400 font-mono">
            <AiOutlineWarning className="text-red-500 " />
            <button
              type="button"
              onClick={() => navigate("//")} // ← redirige al login
              className="font-semibold text-red-800 hover:text-red-500 underline underline-offset-2 transition duration-200"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recovery;
