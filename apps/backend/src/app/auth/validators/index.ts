export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/;

export const passwordValidationErrorMessage =
  'Minimum eight characters, Maximum of 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character:';
