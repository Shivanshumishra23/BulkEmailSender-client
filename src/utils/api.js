export const api = "https://bulk-email-sender-server.vercel.app/api";
// export const api = "http://localhost:8000/api";

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return true;
  }
  if (localStorage.getItem("userAuth")) {
    return JSON.parse(localStorage.getItem("userAuth"));
  } else {
    return false;
  }
};

// signout
export const logout = () => {
  if (localStorage.getItem("userAuth")) {
    localStorage.removeItem("userAuth");
    window.location.reload();
    return true;
  }
};
