import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ButtonElement from "../../../common/ButtonElement";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTemplate, getAllTemplate } from "../../../axios/template";

import { apiError, apiSuccess } from "../../../utils/apiError";
import Loader from "../../Loader";
import EditModel from "../../../models/EditModel";
import Chip from "@mui/material/Chip";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

function Template() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [tempObj, setTempObj] = useState({});

  const [show, setShow] = useState(false);

  const { data, isLoading, isSuccess, isError, error } = useQuery(
    "template",
    getAllTemplate
  );

  // delete template
  const mutation = useMutation((id) => deleteTemplate(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("template");
    },
  });

  if (mutation.isError) {
    apiError(mutation.error);
  }
  if (isError) {
    apiError(error);
  }
  useEffect(() => {
    if (mutation.isSuccess) {
      apiSuccess("Template deleted successfully");
    }
  }, [mutation.isSuccess]);

  const handleClose = () => setShow(false);
  const handleShow = (template) => {
    setTempObj(template);
    setShow(true);
  };

  return (
    <>
      {show && tempObj && (
        <EditModel open={show} handleClose={handleClose} template={tempObj} />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Stack direction={"row"} mb={3} justifyContent={"start"}>
            <ButtonElement
              variant="contained"
              size="small"
              onClick={() => navigate("/dashboard/template/create")}
            >
              CREATE NEW TEMPLATE
            </ButtonElement>
          </Stack>
          <Grid
            container
            my={3}
            columnGap={2}
            rowGap={2}
            flexWrap={"wrap"}
            // justifyContent={"center"}
            // alignContent={"center"}
          >
            {isSuccess &&
              data?.data?.data?.map((temp, index) => {
                return (
                  <>
                    <Grid item xs={12} sm={5.5} key={index}>
                      <Box border={"1px solid lightgray"} borderRadius={1}>
                        <Stack
                          direction={"row"}
                          justifyContent="space-between"
                          p={2}
                        >
                          <ButtonElement
                            sx={{
                              width: "130px", // Set button width
                              whiteSpace: "nowrap", // Prevent text wrapping
                            }}
                            width="130"
                            variant="contained"
                            size="small"
                            onClick={() =>
                              navigate(
                                `/dashboard/send-email/${temp?._id}?ref=${temp?.emailType}`
                              )
                            }
                          >
                            Select
                          </ButtonElement>
                          {/* <Typography variant="h5">Title</Typography> */}
                          <Box>
                            <Button
                              size="small"
                              onClick={() => handleShow(temp)}
                            >
                              <CreateIcon />
                            </Button>

                            <Button
                              size="small"
                              onClick={() => mutation.mutate(temp?._id)}
                              disabled={mutation.isLoading}
                            >
                              <DeleteOutlineIcon />
                            </Button>

                            {temp?.isFollowUp ? (
                              <Chip
                                sx={{ marginLeft: 1 }}
                                label={temp?.emailType}
                                size="small"
                                // color="primary"\
                                variant="outlined"
                              />
                            ) : (
                              <Chip
                                sx={{ marginLeft: 1 }}
                                label={"FirstEmail"}
                                size="small"
                                // color="primary"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </Stack>
                        <Divider orientation="horizontal" />

                        <Box
                          p={2.5}
                          sx={{
                            height: 400,
                            overflow: "auto",
                            position: "relative",
                            inset: 0,
                          }}
                        >
                          <Typography variant="h5" pb={1}>
                            subject: {temp?.subject}
                          </Typography>
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: temp?.template,
                            }}
                          />

                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              margin: "0 auto",
                              textAlign: "center",
                              // position: "sticky",
                              // bottom: 0,
                              // margin: "0 auto", // Center horizontally
                              // textAlign: "center", // Center the content
                              // minHeight: "100vh",
                              // overflow: "hidden", // Hide overflow
                              // textOverflow: "ellipsis",
                            }}
                          >
                            {/* <ButtonElement
                              sx={{
                                width: "130px", // Set button width
                                whiteSpace: "nowrap", // Prevent text wrapping
                              }}
                              width="130"
                              variant="contained"
                              size="small"
                              onClick={() =>
                                navigate(`/dashboard/emailer/${temp?._id}`)
                              }
                            >
                              Select
                            </ButtonElement> */}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Template;
