import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function CustomerAnalysis({ data }) {
  return (
    <TableContainer
      sx={{
        height: 300,
        overflow: "auto",
        // border: "2px solid black",
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="caption table"
        // border="2px solid black"
      >
        <TableHead
          sx={{
            background: "rgba(6, 90, 216, 0.10)",
          }}
          disabledpadding
        >
          <TableRow>
            <TableCell>Sl no.</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">sent</TableCell>
            <TableCell align="left">Failed</TableCell>
            <TableCell align="left">Follow up</TableCell>
            <TableCell align="left">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">
                {row?.email || `user-${index + 1}`}
              </TableCell>
              <TableCell align="left">{row?.sent}</TableCell>
              <TableCell align="left">{row?.failed}</TableCell>
              <TableCell align="left">
                {row?.followUpTemplate?.length}
              </TableCell>
              <TableCell align="left">
                <Link>
                  <IconButton>
                    <VisibilityIcon
                      sx={{
                        color: "gray",
                      }}
                    />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
