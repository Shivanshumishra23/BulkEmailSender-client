// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import DashHeader from "./DashHeader";
// import Sidebar from "./Sidebar";
// import { Box, Divider, Stack } from "@mui/material";
// import Dashboard from "./dashbaord/Dashboard";
// import Template from "./template/Template";
// import CreateTemplate from "./template/CreateTemplate";
// import Email from "./email/Email";
// import EmailList from "./emailList/EmailList";
// import FIle from "./files/FIle";
// import RichTextEditor from "../editor/custom/CustomEditor";

// function IndexDashboard() {
//   return (
//     <>
//       <Box>
//         <Box>
//           <Box
//             sx={{
//               position: "fixed",
//               width: "100%",
//               top: 0,
//               zIndex: 100,
//             }}
//           >
//             <DashHeader />
//           </Box>

//           <Stack
//             direction="row"
//             px={0}
//             sx={{
//               position: "relative",
//               top: "4em",
//               zIndex: 0,
//             }}
//             // divider={
//             //   <Divider
//             //     sx={{ height: "100vh" }}
//             //     orientation="vertical"
//             //     flexItem
//             //   />
//             // }
//           >
//             <Box
//               flex={3}
//               sx={{
//                 borderRight: "1px solid lightgray",
//               }}
//               py={1}
//             >
//               <Sidebar />
//             </Box>
//             <Box flex={10} px={4} py={3}>
//               <Routes>
//                 <Route exact path="/home" element={<Dashboard />} />
//                 <Route exact path="/template" element={<Template />} />
//                 <Route exact path="/email-list" element={<EmailList />} />
//                 <Route
//                   exact
//                   path="/send-email/:templateId"
//                   element={<Email />}
//                 />
//                 <Route
//                   exact
//                   path="/template/create"
//                   element={<CreateTemplate />}
//                 />
//                 <Route exact path="/file-managment" element={<FIle />} />
//                 <Route exact path="/editor" element={<RichTextEditor />} />
//               </Routes>
//             </Box>
//           </Stack>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default IndexDashboard;


import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashHeader from "./DashHeader";
import Sidebar from "./Sidebar";
import { Box, Stack } from "@mui/material";
import Dashboard from "./dashbaord/Dashboard";
import Template from "./template/Template";
import CreateTemplate from "./template/CreateTemplate";
import Email from "./email/Email";
import EmailList from "./emailList/EmailList";
import FIle from "./files/FIle";
import RichTextEditor from "../editor/custom/CustomEditor";

function IndexDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      <Box sx={{ position: "fixed", width: "100%", top: 0, zIndex: 100 }}>
        <DashHeader handleDrawerToggle={handleDrawerToggle} />
      </Box>

      <Stack
        direction="row"
        sx={{
          position: "relative",
          top: "64px",
          zIndex: 0,
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "240px" },
            flexShrink: 0,
          }}
        >
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Routes>
            <Route exact path="/home" element={<Dashboard />} />
            <Route exact path="/template" element={<Template />} />
            <Route exact path="/email-list" element={<EmailList />} />
            <Route exact path="/send-email/:templateId" element={<Email />} />
            <Route exact path="/template/create" element={<CreateTemplate />} />
            <Route exact path="/file-managment" element={<FIle />} />
            <Route exact path="/editor" element={<RichTextEditor />} />
          </Routes>
        </Box>
      </Stack>
    </Box>
  );
}

export default IndexDashboard;
