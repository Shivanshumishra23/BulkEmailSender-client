export const api = "http://localhost:5000/api";
// export const api = "http://localhost:4000/api";
// export const api = "http://3.6.115.159:4000/api";

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
