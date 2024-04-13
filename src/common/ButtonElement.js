import React from "react";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

function ButtonElement({
  size,
  width = 200,
  variant,
  children,
  onClick,
  loading = false,
}) {
  return (
    <LoadingButton
      variant={variant}
      size={size}
      sx={{ width: width }}
      disableElevation
      loading={loading}
      onClick={() => onClick()}
    >
      {children}
    </LoadingButton>
  );
}

export default ButtonElement;
