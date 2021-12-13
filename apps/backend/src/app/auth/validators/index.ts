export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const passwordValidationErrorMessage =
  'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:';
