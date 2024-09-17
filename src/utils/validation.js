export const validation = (email, password, name, setErrors) => {
  let isValid = true;
  let newError = { email: "", password: "", name: "" };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length < 2) {
    newError.name = "please put a valid name";
    isValid = false;
  }

  if (!password || password.length < 6) {
    newError.password = "Password must be at least 8 characters";
    isValid = false;
  }

  if (!email || !emailRegex.test(email)) {
    newError.email = "incorrect email format";
    isValid = false;
  }

  setErrors(newError);
  return isValid;
};
