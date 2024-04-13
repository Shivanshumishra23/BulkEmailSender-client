import { Stack } from "@mui/material";
import React from "react";
import { Grid } from "react-loader-spinner";

const Loader = () => {
  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        visible={true}
        height="40"
        width="40"
        color="blue"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </Stack>
  );
};

export default Loader;
