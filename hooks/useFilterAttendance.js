import API from "../api";
import utils from "../utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFilteredAttendanceHook = () => {
  const {
    table: { offset, fetchDataFromServer },
    user,
    dateFilteredBy,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    const filterQuery = async (key, id) => {
      try {
        let query = "",
          limit = 10,
          itemOffset;
        if (key === "this-month") {
          const {
            monthStart: ms,
            monthEnd: me,
            monthDays: d,
          } = utils.getThisMonthBoundDate();
          query = `{_gte:"${ms}",_lte:"${me}"}`;
          limit = d;
          itemOffset = 0;
        } else if (key === "this-year") {
          const { yearStart: ys } = utils.getThisYearBoundDate();
          query = `{_gte:"${ys}"}`;
          limit = 10;
          itemOffset = offset;
        } else if (key === "last-month") {
          const {
            monthEnd: me,
            monthStart: ms,
            monthDays: d,
          } = utils.getLastMonthBoundDate();
          query = `{_gte:"${ms}",_lte:"${me}"}`;
          limit = d;
          itemOffset = 0;
        } else if (key === "this-week") {
          const { weekStart: ws, weekEnd: we } = utils.getThisWeekBoundDate();
          query = `{_gte:"${ws}",_lte:"${we}"}`;
          limit = 10;
          itemOffset = 0;
        } else {
          itemOffset = offset;
        }

        if (key === "this-year") {
          const data = API.getFilterTotalAttendanceCount(id, query);
          if (typeof data === "number") {
            dispatch({ type: "SET_TOTAL_ROWS", payload: data });
          }
        }
        const data = await API.fetchFilteredAttendance(
          itemOffset,
          id,
          limit,
          query
        );
        if (data !== undefined && data !== null) {
          if (query.length === 0) {
            dispatch({ type: "SET_ATTENDANCE", payload: data });
          } else {
            dispatch({ type: "FILTER_ATTENDANCE", payload: data });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (fetchDataFromServer) {
      const { profile } = user;
      if (profile?.id === undefined) return console.log("User ID is not valid");
      filterQuery(dateFilteredBy, profile.id);
    } else console.log("Don't fetch data from server");
  }, [user, dateFilteredBy, fetchDataFromServer, offset, dispatch]);
};
