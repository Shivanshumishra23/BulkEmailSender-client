// import React from "react";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Stack,
// } from "@mui/material";

// import { menu } from "./Menu";
// import { NavLink } from "react-router-dom";

// const hideRoutes = ["/dashboard/ai-template", "/dashboard/analytics"];

// function Sidebar() {
//   return (
//     <Box>
//       <Box
//         sx={{
//           position: "fixed",
//           minHeight: "100vh",
//         }}
//       >
//         <Stack direction={"column"} spacing={2} pl={1.5}>
//           <List className="listMenu">
//             {menu?.map((element, index) => {
//               const isRouteDisabled = hideRoutes.includes(element?.link);
//               console.log(element?.link + "=>" + isRouteDisabled);
//               return (
//                 <Box
//                   key={index}
//                   sx={{
//                     background: isRouteDisabled ? "lightgray" : "",
//                     pointerEvents: isRouteDisabled ? "none" : "auto",
//                   }}
//                 >
//                   <NavLink to={element?.link} key={index}>
//                     <ListItem disablePadding key={index}>
//                       <ListItemButton>
//                         <ListItemIcon className="icon">
//                           {element?.icon}
//                         </ListItemIcon>
//                         <ListItemText primary={element?.title} />
//                       </ListItemButton>
//                     </ListItem>
//                   </NavLink>
//                 </Box>
//               );
//             })}
//           </List>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }

// export default Sidebar;

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Drawer,
} from "@mui/material";
import { menu } from "./Menu";
import { NavLink } from "react-router-dom";

const hideRoutes = ["/dashboard/ai-template", "/dashboard/analytics"];

function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const drawerContent = (
    <List className="listMenu">
      {menu?.map((element, index) => {
        const isRouteDisabled = hideRoutes.includes(element?.link);
        return (
          <Box
            key={index}
            sx={{
              background: isRouteDisabled ? "lightgray" : "",
              pointerEvents: isRouteDisabled ? "none" : "auto",
            }}
          >
            <NavLink to={element?.link} key={index} onClick={handleDrawerToggle} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
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
  );

  return (
    <Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          minHeight: "100vh",
          width: "240px",
          borderRight: "1px solid lightgray",
        }}
      >
        <Stack direction={"column"} spacing={2} pl={1.5}>
          {drawerContent}
        </Stack>
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
