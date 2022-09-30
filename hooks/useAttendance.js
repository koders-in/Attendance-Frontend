import API from "../api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAttendance = () => {
  const dispatch = useDispatch();
  const {
    table: { fetchDataFromServer, offset },
    user,
  } = useSelector((state) => state);

  useEffect(() => {
    const fetchAttendance = async (id) => {
      const data = await API.geMytAttendance(offset, id);
      if (data !== undefined && data !== null) {
        dispatch({ type: "SET_ATTENDANCE", payload: data });
      }
    };
    if (Object.keys(user).length > 0) {
      if (fetchDataFromServer) {
        const { profile } = user;
        if (profile.id === undefined)
          return console.log("User ID is not valid");
        fetchAttendance(profile.id);
      } else console.log("Don't fetch data from server");
    } else console.log("User not logged in Don't fetch attendance", user);
  }, [offset, fetchDataFromServer, user, dispatch]);
};
