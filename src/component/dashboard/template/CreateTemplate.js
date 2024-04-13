import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import FollowUp from "../../../models/FollowUp";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiError, apiSuccess, customError } from "../../../utils/apiError";
import { addTemplate } from "../../../axios/template";
import { useMutation, useQueryClient } from "react-query";

import QuilEditor from "../../editor/Editor";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ButtonElement from "../../../common/ButtonElement";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
// import { FormControl } from "@mui/base";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CreateTemplate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [emailFollowUp, setEmailFollowUp] = useState("");
  const [singleTemplate, setSingleTemplate] = useState("");
  const [show, setShow] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [multipleFile, setMultipleFile] = useState([]);

  // QUERY
  const { mutate, isLoading, isError, error, data, isSuccess } = useMutation(
    (data) => addTemplate(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("template");
      },
    }
  );
  const handleClose = () => {
    setShow(false);
  };

  //   addTemplateHandler
  const addTemplateHandler = async () => {
    try {
      if (!subject || !content) {
        customError("Subject and content field are required");
        return;
      }

      // if (acceptedFiles.length === 0 || !acceptedFiles) {
      //   customError("Select files");
      //   return;
      // }

      //  call api
      if (acceptedFiles) {
        mutate({
          subject,
          template: content,
          emailType: emailFollowUp,
          templateId: singleTemplate?._id,
          files: acceptedFiles?.map((file) => file),
        });
      } else {
        customError("Select files");
        return;
      }
    } catch (error) {
      apiError(error);
    }
  };

  if (isError) {
    apiError(error);
  }

  const handleProcedureContentChange = useCallback(
    (content) => {
      setContent(content);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const selectedFile = acceptedFiles?.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const handleTemplateIdGet = (props) => {
    setSingleTemplate(props);
    setSubject(`Re: ${props?.subject}`);
  };

  useEffect(() => {
    if (isSuccess) {
      apiSuccess("Template created successfully");
      navigate("/dashboard/template");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  useEffect(() => {
    if (emailFollowUp === "followUp") {
      setShow(true);
    } else {
      setSubject("");
      setContent("");
    }
  }, [emailFollowUp]);
  return (
    <Box>
      {show && (
        <FollowUp
          open={show}
          handleClose={handleClose}
          handleTemplateIdGet={handleTemplateIdGet}
        />
      )}
      <Box
        sx={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 4,
          width: "50%",
        }}
      >
        <Box>
          <Typography variant="h4">Title of template</Typography>
        </Box>
        <Box>
          {/* <Typography>drop down</Typography> */}
          <FormControl fullWidth>
            <InputLabel id="demo-select-large-label ">Email Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={emailFollowUp}
              onChange={(e) => setEmailFollowUp(e.target.value)}
              label={emailFollowUp}
            >
              <MenuItem value="choose" disabled>
                Choose
              </MenuItem>

              <MenuItem value={"firstEmail"}>First Email</MenuItem>

              <MenuItem value={"followUp"}>Follow up</MenuItem>
            </Select>
          </FormControl>
          {emailFollowUp === "followUp" && (
            <Box py={2}>
              <Typography variant="span" color="gray">
                First Email
              </Typography>

              <Box
                mt={0.4}
                border={"1px solid gray"}
                p={1}
                height={300}
                sx={{
                  overflow: "auto",
                }}
              >
                <Typography
                  py={1}
                  dangerouslySetInnerHTML={{
                    __html: singleTemplate?.template,
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Box>
          <TextField
            required
            id="outlined-required"
            label="subject"
            placeholder="subject"
            fullWidth
            name="subject"
            disabled={emailFollowUp === "followUp"}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Box>
        <Box>
          <QuilEditor
            value={content}
            handleProcedureContentChange={handleProcedureContentChange}
          />
        </Box>

        <Box mt={8} border="1px dashed" p={4} borderRadius={1}>
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
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
            {acceptedFiles.length > 0 && (
              <aside>
                <h4>Files</h4>
                <ul>{selectedFile}</ul>
              </aside>
            )}
          </Stack>
        </Box>
        {/* ------------ */}
        {/* <Box>
          <Typography>drop down</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-select-large-label ">Email Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={emailFollowUp}
              onChange={(e) => setEmailFollowUp(e.target.value)}
              label={emailFollowUp}
            >
              <MenuItem value="choose" disabled>
                Choose
              </MenuItem>

              <MenuItem value={"new"}>new</MenuItem>

              <MenuItem value={"followUp"}>Follow up</MenuItem>
            </Select>
          </FormControl>
        </Box> */}

        {/* ---------- */}
        <Box>
          <ButtonElement
            variant={"contained"}
            size="medium"
            onClick={() => addTemplateHandler()}
            // disabled={isLoading}
            loading={isLoading}
          >
            SAVE
            {/* {isLoading ? "saving" : "SAVE"} */}
          </ButtonElement>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateTemplate;
