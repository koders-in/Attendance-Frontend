import React from "react";
import utils from "../../utils";
import { TableCell, TableRow } from "@mui/material";

function AttendanceTableRow({ row }) {
  const workingHours = utils.getTimeDifference(
    row.date,
    row.clock_in,
    row.clock_out
  );
  return (
    <TableRow hover tabIndex={-1} key={row.id}>
      <TableCell component="th" scope="row">
        {row.date}
      </TableCell>
      <TableCell align="left">
        {utils.convertToISOtime(row.date, row.clock_in)}
      </TableCell>
      <TableCell align="left">
        {utils.convertToISOtime(row.date, row.clock_out)}
      </TableCell>
      <TableCell align="left">
        {typeof workingHours === "number" ? `${workingHours} Hrs` : ""}
      </TableCell>
    </TableRow>
  );
}

export default AttendanceTableRow;
