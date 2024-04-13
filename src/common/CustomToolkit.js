import { Tooltip } from "@mui/material";
import React from "react";

function CustomToolkit({ title, children }) {
  return <Tooltip title={title}>{children}</Tooltip>;
}

export default CustomToolkit;
