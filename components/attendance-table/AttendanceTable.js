import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
import React from "react";
import classes from "./Table.module.css";
import DataLoadingSpinner from "../spinner/Spinner";
import AttendanceTableRow from "./AttendanceTableRow";
import { useDispatch, useSelector } from "react-redux";

function AttendanceTable() {
  const dispatch = useDispatch();
  const {
    displayTable,
    table: { totalRows, page: prevPage },
  } = useSelector((state) => state);

  const handleChangePage = (_, page) => {
    const currentPage = Math.ceil(page);
    if (currentPage > prevPage) {
      dispatch({ type: "NEXT_PAGINATION", payload: currentPage });
    } else {
      dispatch({ type: "PRE_PAGINATION", payload: currentPage });
    }
  };

  return (
    <React.Fragment>
      <TableContainer className={classes.tableContainer}>
        <Table aria-labelledby="tableTitle" size="medium" stickyHeader>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
          <TableBody>
            {displayTable?.map((row, i) => (
              <AttendanceTableRow
                row={row}
                key={row?.id || `attendance-table-row-${i}`}
              />
            ))}
          </TableBody>
        </Table>
        <DataLoadingSpinner />
      </TableContainer>
      {totalRows !== undefined && prevPage >= 0 && (
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalRows || 0}
          rowsPerPage={10}
          page={prevPage}
          onPageChange={handleChangePage}
        />
      )}
    </React.Fragment>
  );
}

export default AttendanceTable;

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "clock_in",
    numeric: false,
    disablePadding: false,
    label: "Clock In",
  },
  {
    id: "clock_out",
    numeric: false,
    disablePadding: false,
    label: "Clock Out",
  },
  {
    id: "comment",
    numeric: false,
    disablePadding: false,
    label: "Remarks",
  },
];
