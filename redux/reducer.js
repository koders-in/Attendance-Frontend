const whiltelistPagination = ["this-month", "last-month", "this-week"];

export const initialState = {
  app: {
    mode: "light",
  },
  user: {},
  attendance: [],
  table: {
    page: 0,
    offset: 0,
    totalRows: 0,
    fetchDataFromServer: true,
  },
  displayTable: [],
  isLoading: false,
  isAuthenticate: false,
  isDisplayTablePagination: false,
  dateFilteredBy: "default",
  isFetchedAllEntry: false,
  isFilterQueryInUse: false,
};
export default function attendanceReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MODE": {
      const { app } = state;
      return {
        ...state,
        app: { ...app, mode: app.mode === "light" ? "dark" : "light" },
      };
    }

    case "SET_USER": {
      const { payload } = action;
      if (Object.keys(payload).length > 0) {
        return { ...state, user: payload, isAuthenticate: true };
      } else return { ...state, user: payload, isAuthenticate: false };
    }
    case "SET_TOTAL_ROWS": {
      const { table } = state;
      const { payload } = action;
      return {
        ...state,
        table: {
          ...table,
          totalRows: payload,
        },
      };
    }

    case "SET_DATE_FILTER": {
      const { table } = state;
      const { payload } = action;
      return {
        ...state,
        dateFilteredBy: payload,
        isDisplayTablePagination: whiltelistPagination.includes(payload),
        table: { ...table, fetchDataFromServer: true },
      };
    }

    case "NEXT_PAGINATION": {
      const {
        table: { offset, totalRows },
        isFetchedAllEntry,
        attendance,
      } = state;
      const { payload } = action;
      if (isFetchedAllEntry) {
        console.log("Rendering cached table data");
        const arr = [...attendance].slice(
          (payload - 1) * 10,
          (payload - 1) * 10 + 10
        );
        return {
          ...state,
          table: {
            totalRows,
            page: payload,
            offset: offset + 10,
            fetchDataFromServer: false,
          },
          isLoading: false,
          displayTable: [...arr],
        };
      }
      return {
        ...state,
        table: {
          totalRows,
          page: payload,
          offset: offset + 10,
          fetchDataFromServer: true,
        },
        isLoading: true,
      };
    }

    case "PRE_PAGINATION": {
      const {
        table: { offset, totalRows },
        attendance,
      } = state;
      const { payload } = action;
      const arr = [...attendance].slice(payload * 10, payload * 10 + 10);
      return {
        ...state,
        table: {
          totalRows,
          page: payload,
          offset: offset - 10,
          fetchDataFromServer: false,
        },
        displayTable: [...arr],
      };
    }

    case "FILTER_ATTENDANCE": {
      const { payload } = action;
      const { displayTable } = state;
      const objAttendance = {};
      const combinerArray = [...payload];
      const tempArr = [];
      for (const item of combinerArray) {
        objAttendance[item.date] = { ...item };
      }
      for (const key in objAttendance) {
        tempArr.push({ ...objAttendance[key] });
      }
      console.log(tempArr);
      return {
        ...state,
        isLoading: false,
        displayTable: [...tempArr],
        // isFetchedAllEntry: page + 1 >= Math.ceil(totalRows / 10),
      };
    }

    case "SET_ATTENDANCE": {
      const {
        attendance,
        table: { totalRows, page },
      } = state;
      const { payload } = action;
      const objAttendance = {};
      const tempArr = [];
      const combinerArray = [...attendance, ...payload];
      for (const item of combinerArray) {
        objAttendance[item.date] = { ...item };
      }
      for (const key in objAttendance) {
        tempArr.push({ ...objAttendance[key] });
      }
      return {
        ...state,
        attendance: [...tempArr],
        isLoading: false,
        displayTable: [...tempArr],
        isFetchedAllEntry: page + 1 >= Math.ceil(totalRows / 10),
      };
    }

    case "SET_LOADER": {
      return { ...state, isLoading: !state.isLoading };
    }
    case "persist/REHYDRATE": {
      const { payload } = action;
      if (payload !== undefined) {
        return { ...state, ...payload };
      } else return { ...state };
    }

    case "SET_AUTHENTICATE": {
      const { payload } = action;
      return { ...state, isAuthenticate: payload };
    }
    default:
      return { ...state };
  }
}

const whiteListFilter = [];
