export function validatePassword(password: string) {
  const lengthRegex = /.{8,}/; // Ensures minimum length of 8 characters
  const uppercaseRegex = /[A-Z]/; // Ensures at least one uppercase letter
  const lowercaseRegex = /[a-z]/; // Ensures at least one lowercase letter
  const numberRegex = /[0-9]/; // Ensures at least one number
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // Ensures at least one special character

  if (
    lengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password)
  ) {
    return true; // Password meets all criteria
  } else {
    return false; // Password does not meet all criteria
  }
}
