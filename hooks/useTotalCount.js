import API from "../api";
import { useEffect } from "react";
import { useStore } from "../redux/Provider";

export const useToatalAttendanceCount = () => {
  const { dispatch } = useStore();
  useEffect(() => {
    const fetch = async () => {
      const data = await API.getTotalAttendanceCount();
      if (typeof data === "number") {
        dispatch({ type: "SET_TOTAL_ROWS", payload: data });
      }
    };
    fetch();
  }, [dispatch]);
};
