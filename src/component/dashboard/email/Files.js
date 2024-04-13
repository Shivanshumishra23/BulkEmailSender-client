import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PlayForWorkSharpIcon from "@mui/icons-material/PlayForWorkSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { Checkbox, IconButton } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs };
}

const rows = [createData("Eclair", 262, 16.0, 24)];
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function FileTemplate() {
  return (
    <TableContainer
      sx={{
        height: 300,
        overflow: "auto",
      }}
    >
      <Table sx={{ minWidth: 600 }} aria-label="caption table">
        <TableHead
          sx={{
            background: "rgba(6, 90, 216, 0.10)",
          }}
          disabledpadding
        >
          <TableRow>
            <TableCell>Sl no.</TableCell>
            <TableCell align="right">File Name</TableCell>
            <TableCell align="right">Extension</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <PlayForWorkSharpIcon
                    sx={{
                      color: "gray",
                    }}
                  />
                </IconButton>

                <Checkbox {...label} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
