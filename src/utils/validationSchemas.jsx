
/**
 * passwordSchema.jsx
 * Este archivo sera una utilidad para validaciones estrictas  de campos en formularios
 * su principal funcion es validar un imput de acuerdo a lo que se necesite 
 * se utilizara la libreria yup 
 */

import * as Yup from "yup";


//  Esquema de validación para contraseñas y confirmarla 
// especialemente para la recuperacion de contraseña
export const passwordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required") // mensaje
    .min(9, "Must be at least 9 characters") // minimo de caracteres 
    .matches(/[A-Z]/, "Must include at least one uppercase letter") // incluye 1 mayuscula
    .matches(/[!@#$%^&*(),.?\":{}|<>]/, "Must include at least one special character"), // caracter especial
  confirmPassword: Yup.string()  
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"), // que sea la misma que la anterior
});