import React, { useContext, createContext, useState, useEffect } from "react";
import { isAuthenticated, logout } from "../utils/api";
import { apiError } from "../utils/apiError";
import { Axios } from "../axios/axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({
  toggle: false,
});

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //   For forgot
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setOpenOtp(false);
    setOpenCreate(false);
  };
  const handleClose = () => {
    setOpenOtp(false);
    setOpen(false);
    setOpenCreate(false);
  };

  // for OTP
  const [openOtp, setOpenOtp] = React.useState(false);

  const handleClickOpenOtp = () => {
    setOpenOtp(true);
    setOpen(false);
    setOpenCreate(false);
  };
  const handleCloseOtp = () => {
    setOpenOtp(false);
    setOpen(false);
    setOpenCreate(false);
  };

  // for Create Password
  const [openCreate, setOpenCreate] = React.useState(false);
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
    setOpenOtp(false);
    setOpen(false);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
    setOpenOtp(false);
    setOpen(false);
  };

  // check wheater toke is expired
  const { token } = isAuthenticated();

  useEffect(() => {
    // check
    const verifyTokenUser = async () => {
      try {
        const veritoken = await Axios.get("/user/verify-token", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (veritoken?.status !== 200) {
          navigate("/");
          logout();
        }
      } catch (error) {
        navigate("/");
      }
    };
    verifyTokenUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // Otp
        openOtp,
        handleClickOpenOtp,
        handleCloseOtp,

        // create
        openCreate,
        handleCloseCreate,
        handleClickOpenCreate,

        // forgot password
        open,
        handleClickOpen,
        handleClose,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return auth;
};

export { AuthContextProvider, useAuth };
