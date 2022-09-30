import API from "../api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useToatalAttendanceCount = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async (id) => {
      const data = await API.getTotalAttendanceCount(id);
      if (typeof data === "number") {
        dispatch({ type: "SET_TOTAL_ROWS", payload: data });
      }
    };
    if (Object.keys(user).length > 0) {
      const { profile } = user;
      if (profile.id === undefined) return console.log("User ID is not valid");
      fetch(profile.id);
    } else console.log("User not logged in Don't fetch attendance count");
  }, [dispatch, user]);
};
