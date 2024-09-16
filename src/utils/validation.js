export const validation = (email, password, name, setErrors) => {
  let isValid = true;
  let newError = { email: "", password: "", name: "" };

  if (!name) {
    newError.name = "please put a name";
    isValid = false;
  }
  if (name.length < 2) {
    newError.name = "name must not be less than 6";
  }
  return isValid;
};
