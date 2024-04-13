import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

import { menu } from "./Menu";
import { NavLink } from "react-router-dom";

const hideRoutes = ["/dashboard/ai-template", "/dashboard/analytics"];

function Sidebar() {
  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          minHeight: "100vh",
        }}
      >
        <Stack direction={"column"} spacing={2} pl={1.5}>
          <List className="listMenu">
            {menu?.map((element, index) => {
              const isRouteDisabled = hideRoutes.includes(element?.link);
              console.log(element?.link + "=>" + isRouteDisabled);
              return (
                <Box
                  key={index}
                  sx={{
                    background: isRouteDisabled ? "lightgray" : "",
                    pointerEvents: isRouteDisabled ? "none" : "auto",
                  }}
                >
                  <NavLink to={element?.link} key={index}>
                    <ListItem disablePadding key={index}>
                      <ListItemButton>
                        <ListItemIcon className="icon">
                          {element?.icon}
                        </ListItemIcon>
                        <ListItemText primary={element?.title} />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                </Box>
              );
            })}
          </List>
        </Stack>
      </Box>
    </Box>
  );
}

export default Sidebar;
