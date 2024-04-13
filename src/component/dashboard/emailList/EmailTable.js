import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import CustomToolkit from "../../../common/CustomToolkit";
import { apiError, apiSuccess, customError } from "../../../utils/apiError";
import { Axios } from "../../../axios/axios";
import { Link } from "react-router-dom";
import { formattedDate } from "../../../utils/timeDate";
import ViewDetails from "../../../models/EmailViewModel";
import EmailViewModel from "../../../models/EmailViewModel";

export default function EmailTable({ emails }) {
  const [loader, setLoader] = useState(false);

  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState([]);

  const openViewDetailsModal = (data) => {
    setSelectedEmail(data);
    console.log("choose data", data);
    setViewDetailsOpen(true);
  };

  const closeViewDetailsModal = () => {
    setSelectedEmail([]);
    setViewDetailsOpen(false);
  };

  // FollowUp Handler - SINGLE
  const followUpEmailHandler = async (obj) => {
    setLoader(true);
    try {
      const resp = await Axios.post("/template/followUp/email", {
        email: obj?.email,
        templateId: obj?.templateId,
      });
      if (resp?.status == 200) {
        apiSuccess(resp?.data?.message);
        setLoader(false);
      } else {
        customError(resp?.data?.message);
        setLoader(false);
      }
    } catch (error) {
      apiError(error);
      setLoader(false);
    }
  };

  return (
    <>
      {viewDetailsOpen && selectedEmail && (
        <EmailViewModel
          show={viewDetailsOpen}
          handleClose={closeViewDetailsModal}
          data={selectedEmail}
          key={selectedEmail[0]?.email?._id}
        />
      )}

      <TableContainer
        sx={{
          height: 540,
          overflow: "auto",
          border: "1px solid lightgray",
          borderRadius: 1,
        }}
      >
        <Table aria-label="caption table">
          <TableHead
            sx={{
              background: "rgba(6, 90, 216, 0.10)",
            }}
            disabledpadding
          >
            <TableRow>
              <TableCell>Sl no.</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">View</TableCell>
              {/* <TableCell align="left">Follow up</TableCell> */}
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails?.map((row, index) => {
              return (
                <TableRow key={row?._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">
                    {"user" || row?.name || "user"}
                  </TableCell>
                  <TableCell align="left">{row?.email}</TableCell>

                  <TableCell align="left">
                    {row?.isEmailSend ? "Sent" : "Failed"}
                  </TableCell>

                  <TableCell align="left">
                    <CustomToolkit title={"View"}>
                      <IconButton onClick={() => openViewDetailsModal(row)}>
                        <VisibilityIcon
                          sx={{
                            color: "primary.main",
                          }}
                        />
                      </IconButton>
                    </CustomToolkit>
                  </TableCell>
                  {/* row?.followUp !== null || */}
                  {/* <TableCell align="left">
                    {row?.email?.followUpTemplate && (
                      <CustomToolkit title={"Follow Up"}>
                        <Link
                          to={`/dashboard/send-email/${
                            row?.followUp?.followUpTemplate ||
                            row?.email?.followUpTemplate
                          }?ref=followUp`}
                        >
                          <IconButton>
                            <ReplyAllIcon
                              sx={{
                                color: "primary.main",
                              }}
                            />
                          </IconButton>
                        </Link>
                      </CustomToolkit>
                      // ) : (
                      //   <>
                      //     {console.log(row?.email?.emailType)}
                      //     <Chip
                      //       label={row?.email?.emailType}
                      //       size="small"
                      //       color="primary"
                      //     />
                      //   </>
                    )}
                  </TableCell> */}
                  <TableCell align="left">
                    {formattedDate(row?.email?.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <ViewDetails
            open={viewDetailsOpen}
            onClose={closeViewDetailsModal}
            email={selectedEmail}
          />
        </Table>
      </TableContainer>
    </>
  );
}
