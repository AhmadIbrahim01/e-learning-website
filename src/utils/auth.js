import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getUserType = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userType;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};




export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    window.location.href = "/login";
  };
  