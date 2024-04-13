import { Axios } from "./axios";

export const loginUser = async (data) => {
  return Axios.post("/user/login", data);
};

// forgot password
export const forgotPasswordUser = async (data) => {
  return Axios.post("/user/forgot", data);
};

export const verifyOTP = async (...data) => {
  return Axios.post("/user/verify-otp", data);
};

// create new password
export const createNewPassword = async (...data) => {
  return Axios.post("/user/create-password", data);
};

// create new password
export const resetPassword = async (...data) => {
  return Axios.post("/user/reset-password", data);
};
