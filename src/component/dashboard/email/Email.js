import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import ButtonElement from "../../../common/ButtonElement";

import FileTemplate from "./Files";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getSingleTemplate,
  uplaodFileAndSendMail,
} from "../../../axios/template";
import { apiError, apiSuccess, customError } from "../../../utils/apiError";
import Loader from "../../Loader";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
// import ClearIcon from "@mui/icons-material/Clear";

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

function Email() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const refValue = urlSearchParams.get("ref");

  const { acceptedFiles, getInputProps } = useDropzone();
  const { templateId } = useParams();

  const [files, setFiles] = useState({
    subject: "",
    template: "",
    file: "",
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFiles({
      ...files,
      file: file,
    });
  };

  // mutate
  const mutation = useMutation((file) => uplaodFileAndSendMail(file));

  // QUERY ON ID
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    ["template", templateId, refValue], // Use an array for the query key to include the templateId
    () => getSingleTemplate(templateId, refValue)
  );

  if (isError) {
    apiError(error);
  }

  // send email
  const sendEmailWithAttachment = async () => {
    try {
      if (files?.file) {
        mutation.mutate(files);
      } else {
        customError("select file with extension .csv or xlsx");
        return;
      }
    } catch (error) {
      apiError(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFiles({
        subject: data?.data?.data?.subject,
        template: data?.data?.data?.template,
        templateId: templateId,
        emailType: data?.data?.data?.emailType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (mutation.isSuccess) {
      apiSuccess("email sent successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <Box>
      {" "}
      {isLoading && <Loader />}
      <Box
        sx={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 4,
          width: "60%",
        }}
      >
        <Box
          sx={{
            border: "1px solid Lightgray",
            borderRadius: 1,
          }}
        >
          <Box p={5}>
            <Typography variant="h4">Title of template</Typography>
          </Box>
          <Box px={5} py={1}>
            <TextField
              required
              id="outlined-multiline-static"
              label="subject"
              placeholder="subject"
              multiline
              rows={1}
              value={files?.subject}
              fullWidth
            />
          </Box>
          <Box px={5} py={1}>
            <Typography variant="span" color="gray">
              Body
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
                dangerouslySetInnerHTML={{
                  __html: data?.data?.data?.template,
                }}
              />
            </Box>
          </Box>

          <Stack px={5} py={2}>
            <Stack direction={"column"} spacing={2}>
              {data?.data?.data?.files?.map((files, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <a href={files?.file} target="_blank" rel="noreferrer">
                      <Box width={40}>
                        <InsertDriveFileIcon
                          sx={{
                            width: 40,
                            height: 40,
                            color: "primary.main",
                          }}
                        />
                      </Box>
                    </a>
                    <Box>
                      <Typography>{files?.name}</Typography>
                      <Typography variant="span">
                        {(files?.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            border: "1px solid lightgray",
            borderRadius: 1,
          }}
        >
          <Box px={5} py={2}>
            <Typography variant="h5">Files (csv/xlsx)</Typography>
            <Typography variant="body2">
              lorem ipsum the great of MuiDialogActions
            </Typography>
          </Box>
          <Box>
            <Box px={5} pb={5}>
              <Box
                sx={{
                  border: "1px solid lightgray",
                  borderRadius: 1,
                }}
              >
                <Box px={3} py={2}>
                  <Button
                    component="label"
                    variant="outlined"
                    size="medium"
                    name="file"
                  >
                    {/* type="file" */}
                    Choose file
                    <VisuallyHiddenInput
                      type="file"
                      name="files"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      // {...getInputProps()}
                      onInput={(e) => handleFile(e)}
                    />
                  </Button>
                  {files?.file && (
                    <Box my={1}>
                      <h4>Files</h4>
                      <ul>{files?.file?.name}</ul>
                    </Box>
                  )}
                </Box>
                {/** <Box>
                  <FileTemplate />
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <ButtonElement
            variant={"contained"}
            size="medium"
            onClick={() => sendEmailWithAttachment()}
            loading={mutation.isLoading}
          >
            SEND EMAIL
          </ButtonElement>
        </Box>
      </Box>
    </Box>
  );
}

export default Email;
