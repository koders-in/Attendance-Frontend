import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";
import React from "react";
//   import { useStyles } from "./styles";
import { useStore } from "../../redux/Provider";
import DataLoadingSpinner from "../spinner/Spinner";
import AttendanceTableRow from "./AttendanceTableRow";
import classes from "./Table.module.css";
function AttendanceTable() {
  // const classes = useStyles();

  const {
    state: {
      displayTable,
      table: { totalRows, page: prevPage },
    },
    dispatch,
  } = useStore();

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
          {/* <TableHead> */}
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
          {/* </TableHead> */}
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
