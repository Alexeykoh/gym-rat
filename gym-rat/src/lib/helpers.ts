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
  let date = new Date();
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

interface iLocalStore {
  name: string;
  fetchData: () => Promise<any>;
  toState: any;
}

export async function localStore({ name, fetchData, toState }: iLocalStore) {
  let storedData = localStorage.getItem(name);
  //
  if (!storedData) {
    // Fetch data if local storage is empty
    const data = await fetchData();
    if (toState) {
      toState(data);
    }
    localStorage.setItem(name, JSON.stringify(data));
    console.log("Data fetched and stored in local storage:", data);
  } else {
    // Fetch data again if local storage is not empty
    console.log("Data already exists in local storage. Fetching again...");
    if (toState) {
      toState(JSON.parse(storedData));
    }
    const data = await fetchData();
    console.log("name", name, data);
    if (toState) {
      toState(data);
    }
    localStorage.setItem(name, JSON.stringify(data));
    console.log("Data re-fetched and updated in local storage:", data);
  }
}
