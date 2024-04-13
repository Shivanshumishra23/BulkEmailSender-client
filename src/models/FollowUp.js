import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getAllTemplate } from "../axios/template";
import { apiError } from "../utils/apiError";
import { Box, Grid } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function FollowUp({ open, handleClose, handleTemplateIdGet }) {
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    "template",
    getAllTemplate
  );

  const [selectedTemplates, setSelectedTemplates] = React.useState([]);

  const handleTemplateClick = (templateId) => {
    setSelectedTemplates(templateId);
  };
  

  if (isError) {
    apiError(error);
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "bold", color: "primary.main" }}
          id="customized-dialog-title"
        >
          Select Template
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
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
                const isSelected = selectedTemplates === temp._id;

                return (
                  <>
                    {temp?.emailType === "firstEmail" && (
                      <Grid
                        item
                        xs={12}
                        sm={3.8}
                        key={index}
                        sx={{
                          cursor: "pointer",
                          border: isSelected
                            ? "3px solid #1976D2"
                            : "1px solid lightgray",
                          borderRadius: 1,
                        }}
                        onClick={() => {
                          handleTemplateClick(temp._id);
                          handleTemplateIdGet(temp);
                        }}
                      >
                        <Box border={"1px solid lightgray"} borderRadius={1}>
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
                              }}
                            ></Box>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                  </>
                );
              })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={() => {
              handleClose();
            }}
          >
            select
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
