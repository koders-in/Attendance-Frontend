import API from "../api";
import { useEffect } from "react";
import { useStore } from "../redux/Provider";

export const useAttendance = () => {
  const {
    dispatch,
    state: {
      table: { fetchDataFromServer, offset },
    },
  } = useStore();
  useEffect(() => {
    const fetchAttendance = async () => {
      const data = await API.geMytAttendance(offset);
      if (data !== undefined && data !== null) {
        dispatch({ type: "SET_ATTENDANCE", payload: data });
      }
    };
    if (fetchDataFromServer) {
      fetchAttendance();
    } else console.log("Don't fetch data from server");
  }, [offset, fetchDataFromServer, dispatch]);
};
