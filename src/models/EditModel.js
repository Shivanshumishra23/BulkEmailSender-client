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
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, Paper, Stack, TextField } from "@mui/material";
import QuilEditor from "../component/editor/Editor";
import { apiError, apiSuccess, customError } from "../utils/apiError";
import { editTemplateWithId } from "../axios/template";
import { useMutation, useQueryClient } from "react-query";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
// import { useMutation, useQuery } from "react-query";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const VisuallyHiddenInput = (props) => (
  <input type="file" accept="image/*" style={{ display: "none" }} {...props} />
);

export default function EditModel({ open, handleClose, template }) {
  const queryClient = useQueryClient();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [content, setContent] = React.useState(template?.template);
  const [subject, setSubject] = React.useState(template?.subject);

  const [uploadedFile, setUploadedFile] = useState();

  const handleProcedureContentChange = React.useCallback((value) => {
    setContent(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (data) => editTemplateWithId(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("template");
      },
    }
  );

  // handleSaveTemplate
  const handleSaveTemplate = async () => {
    try {
      if (!subject || !content) {
        customError("Subject and content field are required");
        return;
      }
      mutate({ ...template, subject: subject, template: content });
    } catch (error) {
      apiError(error);
    }
  };

  if (isError) {
    apiError(error);
  }
  React.useEffect(() => {
    if (isSuccess) {
      apiSuccess("Template updated successfully");
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setUploadedFile(e.target.files[0]);
  };

  const selectedFile = acceptedFiles?.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  return (
    <React.Fragment>
      <BootstrapDialog
        // fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Template
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
          <Stack spacing={2}>
            <Box>
              <TextField
                required
                id="outlined-required"
                label="subject"
                placeholder="subject"
                fullWidth
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={template?.emailType === "followUp" ? true : false}
              />
            </Box>
            <Box>
              <QuilEditor
                gutterBottom
                value={content}
                handleProcedureContentChange={handleProcedureContentChange}
              />
            </Box>
          </Stack>

          <Box mt={10}>
            {[...new Array(4)]?.map((file, index) => {
              return (
                <Box mb={1} key={index}>
                  <Paper elevation={1}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        width={40}
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                      >
                        <InsertDriveFileIcon
                          sx={{
                            width: 40,
                            height: 40,
                            color: "primary.main",
                            fontSize: "10px",
                          }}
                        />
                        <Box>
                          <Typography fontSize={"12px"}>name</Typography>
                          <Typography fontSize={"12px"}>12MB</Typography>
                        </Box>
                      </Box>
                      <Box>
                        <IconButton>
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              );
            })}

            <Box mt={2} border="1px dashed" p={4} borderRadius={1}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={2}
              >
                <FileUploadIcon
                  sx={{
                    color: "gray",
                    width: 32,
                    height: 32,
                  }}
                />

                <Typography variant="span" sx={{ fontWeight: "500" }}>
                  Select a file or drag and drop here
                </Typography>
                <Typography variant="span">
                  JPG, PNG, PDF or XLSX, file size no more than 10MB
                </Typography>

                <Button
                  component="label"
                  variant="outlined"
                  size="medium"
                  name="file"
                >
                  Choose file
                  <VisuallyHiddenInput
                    type="file"
                    name="files"
                    multiple
                    {...getInputProps()}
                  />
                </Button>
                <aside>
                  <h4>Files</h4>
                  <ul>{selectedFile}</ul>
                </aside>
              </Stack>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            disabled={isLoading}
            onClick={() => handleSaveTemplate()}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
