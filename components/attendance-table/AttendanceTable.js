import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  MenuItem,
  Select,
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
    isDisplayTablePagination,
    dateFilteredBy,
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

  const handleSelectChange = async (e) => {
    const { value } = e.target;
    if (FilterByDateOptions.map((d) => d.key).includes(value)) {
      dispatch({ type: "SET_DATE_FILTER", payload: value });
    }
  };

  return (
    <React.Fragment>
      <TableContainer className={classes.tableContainer}>
        <Table aria-labelledby="tableTitle" size="medium" stickyHeader>
          {headCells.map(({ id, label }) => {
            return id !== "date" ? (
              <TableCell key={id}>{label}</TableCell>
            ) : (
              <TableCell className={classes.filterTableCell} key={id}>
                {label}
                <Select
                  placeholder="Filter by date"
                  onChange={handleSelectChange}
                  defaultValue="sdfsdfsdf"
                  value={dateFilteredBy}
                  className="date-filter-option"
                >
                  {FilterByDateOptions.map(({ label, key }) => (
                    <MenuItem
                      disabled={key === "default"}
                      value={key}
                      key={key}
                      divider
                    >
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            );
          })}

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
      {isDisplayTablePagination
        ? null
        : totalRows !== undefined &&
          prevPage >= 0 && (
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
    label: "Work time",
  },
];

const FilterByDateOptions = [
  {
    label: "Filter by date",
    key: "default",
  },
  {
    label: "This week",
    key: "this-week",
  },
  {
    label: "This month",
    key: "this-month",
  },
  {
    label: "Last month",
    key: "last-month",
  },
  {
    label: "This year",
    key: "this-year",
  },
];
