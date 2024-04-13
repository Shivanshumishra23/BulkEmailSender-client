import DashboardIcon from "@mui/icons-material/Dashboard";

import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";

import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AdbIcon from "@mui/icons-material/Adb";
export const menu = [
  {
    title: "Dashboard",
    link: "/dashboard/home",
    icon: <DashboardIcon />,
  },
  {
    title: "Template Management",
    link: "/dashboard/template",
    icon: <MoveToInboxIcon />,
  },

  {
    title: "Email List",
    link: "/dashboard/email-list",
    icon: <AttachEmailIcon />,
  },
  {
    title: "File Management ",
    link: "/dashboard/file-managment",
    icon: <PermMediaIcon />,
  },
  {
    title: "AI template",
    link: "/dashboard/ai-template",
    icon: <AdbIcon />,
  },
  // {
  //   title: "Send Email",
  //   link: "/dashboard/send-email",
  //   icon: <AttachEmailIcon />,
  // },

  {
    title: "Analytics",
    link: "/dashboard/analytics",
    icon: <LeaderboardIcon />,
  },
];
