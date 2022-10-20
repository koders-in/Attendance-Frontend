import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Tooltip,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import classes from "./Table.module.css";
import DataLoadingSpinner from "../spinner/Spinner";
import AttendanceTableRow from "./AttendanceTableRow";
import { useDispatch, useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Stack } from "@mui/system";

function AttendanceTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (key) => {
    if (FilterByDateOptions.map((d) => d.key).includes(key)) {
      dispatch({ type: "SET_DATE_FILTER", payload: key });
    }
    setAnchorEl(null);
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
                <Toolbar>
                  <Tooltip onClick={handleMenu} title="Filter by date">
                    <FilterListIcon className="white-color" />
                  </Tooltip>
                </Toolbar>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => handleClose("no-key")}
                >
                  {FilterByDateOptions.map(({ label, key }) => (
                    <MenuItem onClick={() => handleClose(key)}>
                      {label}
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
            );
          })}
          {displayTable?.length > 0 ? (
            <TableBody>
              {displayTable?.map((row, i) => (
                <AttendanceTableRow
                  row={row}
                  key={row?.id || `attendance-table-row-${i}`}
                />
              ))}
            </TableBody>
          ) : (
            <Stack flex={10}>
              <Typography>No entry</Typography>
            </Stack>
          )}
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
    label: "Work time",
  },
];

const FilterByDateOptions = [
  {
    label: "this week",
    key: "this-week",
  },
  {
    label: "this month",
    key: "this-month",
  },
  {
    label: "last month",
    key: "last-month",
  },
  {
    label: "this year",
    key: "this-year",
  },
];
