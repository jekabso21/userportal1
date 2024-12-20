export const validateAge = (age) => {
    const numAge = Number(age);
    return numAge >= 18;
  };
  
export const validatePassword = (password) => ({
  length: password.length >= 8,
  numbers: /\d.*\d/.test(password),
  symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
});