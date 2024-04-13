import { Box, Typography } from "@mui/material";
import React from "react";
import EmailTable from "./EmailTable";
import { useQuery } from "react-query";
import { getAllEmailBasedOnRoles } from "../../../axios/template";
import { apiError } from "../../../utils/apiError";
import Loader from "../../Loader";

function EmailList() {
  const { data, isLoading, isError, error } = useQuery(
    "",
    getAllEmailBasedOnRoles
  );

  if (isError) {
    apiError(error);
  }

  console.log("emails data", data?.data?.data);

  return (
    <Box>
      <Box p={3} border={"1px solid lightgray"} borderRadius={1}>
        <Typography variant="h5" sx={{ color: "" }}>
          Email List
        </Typography>
        <Box mt={1}>
          {isLoading ? <Loader /> : <EmailTable emails={data?.data?.data} />}
        </Box>
      </Box>
    </Box>
  );
}

export default EmailList;
