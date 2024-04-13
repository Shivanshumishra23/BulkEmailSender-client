import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Item } from "../../theme/Material";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { isAuthenticated, logout } from "../../utils/api";
import CustomToolkit from "../../common/CustomToolkit";
import { deepOrange, deepPurple } from "@mui/material/colors";

function DashHeader() {
  const theme = useTheme();

  const { token, user } = isAuthenticated();

  const navigate = useNavigate();
  return (
    <>
      <Paper>
        <Box>
          <Box>
            <Grid
              container
              alignItems={"center"}
              // borderBottom={1}
              py={1}
              px={3}
              bgcolor={"white"}
              // sx={{ borderBottom: "1px solid lightgray" }}
            >
              <Grid item xs={9}>
                <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
                  <CustomToolkit title="You">
                    <Avatar
                      sizes="small"
                      sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
                    >
                      {user?.roles.slice(0, 3)}
                    </Avatar>
                  </CustomToolkit>
                  {/* <IconButton>
                  <HomeIcon
                    sx={{
                      cursor: "pointer",
                      width: 25,
                      height: 25,
                    }}
                    onClick={() => navigate("/")}
                  />
                </IconButton> */}
                  <Link to="/dashboard/home">
                    <Typography
                      color={theme.color}
                      sx={{
                        fontWeight: "700",
                        fontSize: "25px",
                        color: "#1976D2",
                      }}
                    >
                      DigiDart
                    </Typography>
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    maxWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <TextField
                    required
                    id="outlined"
                    label="Search"
                    placeholder="Search"
                    fullWidth
                    size="small"
                  />

                  {token && (
                    <CustomToolkit title="Logout">
                      <IconButton
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        <LogoutIcon />
                      </IconButton>
                    </CustomToolkit>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default DashHeader;
