export function validatePassword(password: string) {
  const lengthRegex = /.{8,}/; // Ensures minimum length of 8 characters
  const uppercaseRegex = /[A-Z]/; // Ensures at least one uppercase letter
  const lowercaseRegex = /[a-z]/; // Ensures at least one lowercase letter
  // const numberRegex = /[0-9]/; // Ensures at least one number
  // const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // Ensures at least one special character

  if (
    lengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) // &&
    //numberRegex.test(password) &&
    //specialCharRegex.test(password)
  ) {
    return true; // Password meets all criteria
  } else {
    return false; // Password does not meet all criteria
  }
}

export function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
export enum localStoreEnum {
  exerciseItems = "exerciseItems",
  exerciseTypes = "exerciseTypes",
  currentWorkout = "currentWorkout",
  nextWorkout = "nextWorkout",
  latestWorkouts = "latestWorkouts",
}