
import React, { memo, useEffect } from "react";
import { useState } from "react";
import Microsoft from "../../assets/Microsoft.png";
import { Typography, Box, TextField, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { emailRIcon } from "../../assets";
import { useAuth } from "../../context/Auth";
import ForgotModel from "../../models/ForgotModel";
import { useMutation } from "react-query";
import { loginUser } from "../../axios/auth";
import { useNavigate } from "react-router-dom";
import { apiError, apiSuccess, customError } from "../../utils/apiError";

const Login = () => {
  const navigate = useNavigate();
  const { handleClickOpen } = useAuth();
  // QUERY
  const mutation = useMutation((data) => loginUser(data));
  const [user, setUser] = useState({
    email: "himmatsir23@gmail.com",
    password: "12345",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    apiSuccess(`${text} copied to clipboard`);
  };

  // Login
  const handleLogin = async () => {
    try {
      const { email, password } = user;
      if (!email || !password) {
        customError("Credential is required");
        return;
      }

      // POST
      mutation.mutate(user);
    } catch (error) {
      apiError(error);
    }
  };

  useEffect(() => {
    if (mutation.isError) {
      apiError(mutation.error);
    }
  }, [mutation.isError]);

  useEffect(() => {
    if (mutation.isSuccess) {
      apiSuccess("Login success");
      const { data } = mutation.data;
      // save to local storage
      setTimeout(() => {
        localStorage.setItem("userAuth", JSON.stringify(data));
        navigate("/dashboard/home");
        window.location.reload();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <>
      <ForgotModel title="Enter your Email - ID to reset your password" />
      <Grid container height="100vh">
        <Grid item xs={12} md={6} p={3} height="100%" display="flex" alignItems="center" justifyContent="center">
          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: "100%", sm: "80%", md: "60%" }}
            mx="auto"
            px={{ xs: 2, md: 12 }}
            rowGap={4}
          >
            <Typography
              textAlign="center"
              variant="h4"
              gutterBottom
              mt={6}
              mb={6}
              fontSize={{ xs: 30, md: 50 }}
              fontWeight={800}
            >
              MailBlast 
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              mb={9}
              name="email"
              value={user.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              value={user.password}
              onChange={handleChange}
              fullWidth
              sx={{ "& .MuiInputBase-input": { padding: "20px" } }}
            />

            <Typography
              textAlign="left"
              color="primary"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => handleClickOpen()}
            >
              Forgot Password?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              mt={7}
              sx={{ height: "40px" }}
              disabled={mutation.isLoading}
              onClick={() => handleLogin()}
            >
              {mutation.isLoading ? "Loading..." : "Login"}
            </Button>
            <Typography
              color="primary"
              border={2}
              p={1}
              sx={{
                cursor: "pointer",
              }}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <img
                src={Microsoft}
                alt="SignIn"
                style={{ width: "20px", marginRight: "5px" }}
              />
              <Typography variant="body1" color="textPrimary">
                <a href="">Sign In</a>
              </Typography>
            </Typography>
          </Box>
        </Grid>

        {/* Demo Credentials and Blue Screen */}
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, height: "100vh" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="primary.main"
            width="100%"
            height="100%"
            px={4}
          >
            <Box
              display="flex"
              flexDirection="column"
              rowGap={2}
              mb={4}
              p={2}
              border={1}
              borderRadius={2}
              borderColor="white"
              bgcolor="white"
              color="primary.main"
            >
              <Typography variant="h6" textAlign="center">
                <p> Here is Demo Login Detail  <br/>you can use it</p>
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Email: himmatsir23@gmail.com</Typography>
                <Tooltip title="Copy Email">
                  <IconButton onClick={() => handleCopy("himmatsir23@gmail.com")}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Password:12345</Typography>
                <Tooltip title="Copy Password">
                  <IconButton onClick={() => handleCopy("12345")}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={emailRIcon}
                alt="emailR-icon-alt"
                style={{ width: "80px", height:"80px", objectFit: "cover" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Login);
