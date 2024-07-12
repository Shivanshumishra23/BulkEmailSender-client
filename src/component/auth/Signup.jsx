import React, { memo, useEffect } from "react";
import { useState } from "react";
import Microsoft from "../../assets/Microsoft.png";
import { Typography, Box, TextField, Button, Grid, Link } from "@mui/material";
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
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Login
  const handleLogin = async () => {
    try {
      const { email, password } = user;
      if (!email || !password) {
        customError("crendtial is required");
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
      // save to localstorgae
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
        <Grid item sm={12} md={6} p={3} height="100%" alignItems="center">
          <Box
            display="flex"
            flexDirection="column"
            mx="auto"
            px={12}
            rowGap={4}
          >
            <Typography
              textAlign="center"
              variant="h4"
              gutterBottom
              mt={6}
              mb={6}
              fontSize={50}
              fontWeight={800}
            >
              DigiDart
            </Typography>

            <TextField
              label="email"
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
                Having account <Link to="/" color="textPrimary">Login</Link>
              </Typography>
            </Typography>
          </Box>
        </Grid>

        {/* Blue Screen */}
        <Grid
          item
          md={6}
          sx={{
            height: {
              xs: 0,
              md: "100%",
            },
          }}
        >
          <Box
            display="flex"
            bgcolor="primary.main"
            height="inherit"
            alignItems="center"
            justifyContent="center"
            sx={{ fontSize: "50px" }}
          >
            <img
              src={emailRIcon}
              alt="emailR-icon-alt"
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ width: "20%", height: "20%", objectFit: "cover" }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Login);
