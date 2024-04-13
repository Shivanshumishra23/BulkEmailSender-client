import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonElement from "../../../common/ButtonElement";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import CustomerAnalysis from "./CustomerAnalysis";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardData } from "../../../axios/template";
import { useQuery } from "react-query";
import { apiError } from "../../../utils/apiError";

function Dashboard() {
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState([]);

  const { data, isSuccess, isError, error } = useQuery("", getDashboardData);

  if (isError) {
    apiError(error);
  }

  useEffect(() => {
    // if (isSuccess) {
    const emailAnalytics = [
      {
        name: "Total",
        count:
          data?.data?.data[0]?.totalFailed + data?.data?.data[0]?.totalSent,
      },
      {
        name: "Successfull",
        count: data?.data?.data[0]?.totalSent,
      },
      {
        name: "Failed",
        count: data?.data?.data[0]?.totalFailed,
      },
    ];
    setEmailData(emailAnalytics);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Box>
      <Stack spacing={2} direction={"row"}>
        <ButtonElement
          variant="contained"
          size="small"
          width={200}
          onClick={() => navigate("/dashboard/template")}
        >
          VIEW TEMPLATE
        </ButtonElement>

        <ButtonElement
          variant="outlined"
          size="small"
          width={200}
          onClick={() => navigate("/dashboard/file-managment")}
        >
          VIEW FILES
        </ButtonElement>
      </Stack>

      <Box my={3}>
        <Grid gap={2} container>
          <Grid item xs={7}>
            <Typography variant="h6">Email Analysis</Typography>

            <Stack spacing={3} mt={1.5} direction={"row"}>
              {emailData?.map((item, index) => {
                return (
                  <Box
                    item
                    sx={{
                      p: 3,
                      border: "1px solid lightgray",
                      borderRadius: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    flex={1}
                  >
                    <Box
                      sx={{
                        background: "rgba(6, 90, 216, 0.10)",
                        borderRadius: 1,
                        p: 2,
                      }}
                    >
                      <StoreMallDirectoryIcon
                        sx={{
                          color: "primary.main",
                        }}
                      />
                    </Box>
                    <Typography mt={2} variant="h6">
                      {item?.name}
                    </Typography>
                    <Typography variant="span" color="gray">
                      {item?.count || 0}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>

            <Box my={3} border={"1px solid lightgray"} borderRadius={1}>
              <Stack
                spacing={2}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={2}
              >
                <Typography variant="h6">Customer Analysis </Typography>

                <box>
                  <Typography variant="span" color="gray">
                    Total Customer
                  </Typography>
                  <Typography variant="h6">
                    {data?.data?.data[0]?.data?.length || 0}
                  </Typography>
                </box>
              </Stack>

              <CustomerAnalysis data={data?.data?.data[0]?.data} />
            </Box>
          </Grid>
          <Grid my={5.5} item xs={4}>
            <Box
              border={"1px solid lightgray"}
              borderRadius={1}
              sx={{
                height: 550,
                overflow: "auto",
              }}
            >
              <Stack
                spacing={2}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={2}
              >
                <Typography variant="h6">Template Analysis </Typography>

                <box>
                  <Typography variant="span" color="gray">
                    Total Template:
                  </Typography>
                  <Typography variant="span">
                    {" "}
                    &nbsp;{data?.data?.template?.length}{" "}
                  </Typography>
                </box>
              </Stack>

              <Box p={2}>
                <Stack direction={"column"} spacing={3}>
                  {data?.data?.template?.map((template, index) => {
                    return (
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={4}
                        sx={{
                          backgroundColor: "primary.main",
                          p: 1,
                          color: "white",
                        }}
                      >
                        <Typography>{template?.subject}</Typography>
                        <Typography>{template?.count}</Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
