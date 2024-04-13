import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { apiError } from "../../../utils/apiError";
import { getAllFilesBasedOnRoles } from "../../../axios/template";
import { useQuery } from "react-query";
import Loader from "../../Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import png from "../../../assets/files/png.png";
import jpg from "../../../assets/files/jpg.png";
import jpeg from "../../../assets/files/jpeg.png";
import pdf from "../../../assets/files/pdf.png";
import csv from "../../../assets/files/csv.png";
import xlsx from "../../../assets/files/xlsx.png";
import { downloadFile } from "../../../utils/downloadFile";

function FIle() {
  const fileExt = [
    {
      ext: "png",
      icon: png,
    },
    {
      ext: "pdf",
      icon: pdf,
    },
    {
      ext: "jpeg",
      icon: jpeg,
    },
    {
      ext: "jpg",
      icon: jpg,
    },
    {
      ext: "xlsx",
      icon: xlsx,
    },
    {
      ext: "csv",
      icon: csv,
    },
  ];

  const { data, isSuccess, isLoading, isError, error } = useQuery(
    "",
    getAllFilesBasedOnRoles
  );

  if (isError) {
    apiError(error);
  }

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ color: "" }}>
          File
        </Typography>
        {isLoading ? (
          <Loader loader={isLoading} />
        ) : (
          isSuccess && (
            <Stack direction={"row"} flexWrap="wrap" gap={2}>
              {data?.data?.data?.map((file, index) => {
                const fileName = file?.name
                  ?.substring(0, file?.name?.lastIndexOf("."))
                  .replace(/\s/g, "");

                // Extract text after the last dot (.) including the dot
                const fileExtension = file?.name?.substring(
                  file?.name?.lastIndexOf(".") + 1
                );

                const fileExtIcon = fileExt.filter(
                  (ext) => ext?.ext === fileExtension
                );

                return (
                  <Card sx={{ minWidth: 145 }}>
                    <CardContent>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 40,
                        }}
                        image={fileExtIcon[0]?.icon}
                        alt="Paella dish"
                      />

                      <Typography variant="body1" mt={1} component="div">
                        {fileName}
                      </Typography>
                      <Typography color="text.secondary">
                        {(file?.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Stack direction={"row"} gap={1} alignItems={"center"}>
                        <IconButton
                          onClick={() => {
                            window.open(file?.file);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <IconButton>
                          <DownloadIcon
                            onClick={() => downloadFile(file?.file, fileName)}
                          />
                        </IconButton>
                      </Stack>
                    </CardActions>
                  </Card>
                );
              })}
            </Stack>
          )
        )}
      </Box>
    </>
  );
}

export default FIle;
