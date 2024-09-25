// Store user information in local storage
export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("okoAccessToken", accessToken);
  }
};

// Retrieve user information from local storage
export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("okoAccessToken");
  }
  return null;
};

// Remove user information from local storage
export const removeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("okoAccessToken");
  }
};

// Check if the user is logged in
export const isLoggedIn = () => {
  const authToken = getUserInfo();
  return !!authToken;
};
