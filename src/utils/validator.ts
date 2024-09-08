export const validator = (name: string, email: string, password: string) => {
  const errors = [];
  if (name === undefined || name.trim() === "")
    errors.push("El nombre no debe estar vacío");
  if (email === undefined || email.trim() === "")
    errors.push("El email no debe estar vacío");
  if (password === undefined || password.trim() === "" || password.length < 8)
    errors.push(
      "La contraseña no debe estar vacío y debe tener mas de 8 caracteres"
    );

  return errors;
};
