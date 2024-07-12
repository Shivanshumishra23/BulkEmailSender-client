import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../utils/api";
import CustomToolkit from "../../common/CustomToolkit";

function DashHeader({ handleDrawerToggle }) {
  const theme = useTheme();
  const { token, user } = isAuthenticated();
  const navigate = useNavigate();

  return (
    <Paper>
      <Box>
        <Grid container alignItems={"center"} py={1} px={3} bgcolor={"white"}>
          <Grid item xs={9}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: 'block', md: 'none' } }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <CustomToolkit title="You">
                <Avatar
                  sizes="small"
                  sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
                >
                  {user?.roles.slice(0, 3)}
                </Avatar>
              </CustomToolkit>
              <Link to="/dashboard/home">
                <Typography
                  color={theme.color}
                  sx={{
                    fontWeight: "700",
                    fontSize: "25px",
                    color: "#1976D2",
                  }}
                >
                  MailBlast
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
    </Paper>
  );
}

export default DashHeader;
