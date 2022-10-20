import moment from "moment";
import utils from "../utils";
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
      const { attendance } = state;
      const { payload } = action;
      let tempArray;
      if (payload === "this-week") {
        const { currentWeekDate: cd, lastWeekDate: ld } =
          utils.getThisAndLastWeekDate();
        tempArray = attendance.filter(
          ({ date: d }) => moment(d).isAfter(ld) && moment(d).isBefore(cd)
        );
        return { ...state, displayTable: tempArray };
      } else if (payload === "this-month") {
        const { monthStart: ms, monthEnd: me } = utils.getThisMonthBoundDate();
        tempArray = attendance.filter(
          ({ date: d }) => moment(d).isAfter(ms) && moment(d).isBefore(me)
        );
        return { ...state, displayTable: tempArray };
      } else if (payload === "this-year") {
        const { yearStart: ys } = utils.getThisYearBoundDate();
        tempArray = attendance.filter(({ date: d }) => moment(d).isAfter(ys));
        return { ...state, displayTable: tempArray };
      } else if (payload === "last-month") {
        const { monthEnd: me, monthStart: ms } = utils.getLastMonthBoundDate();
        tempArray = attendance.filter(
          ({ date: d }) => moment(d).isAfter(ms) && moment(d).isBefore(me)
        );
        return { ...state, displayTable: tempArray };
      }
      return { ...state };
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
