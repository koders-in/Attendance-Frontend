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
      return { ...state, user: payload };
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

    case "NEXT_PAGINATION": {
      const {
        table: { offset, totalRows },
      } = state;
      const { payload } = action;
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

    case "SET_ATTENDANCE": {
      const { attendance } = state;
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
      };
    }

    case "SET_LOADER": {
      return { ...state, isLoading: !state.isLoading };
    }
    default:
      return { ...state };
  }
}
