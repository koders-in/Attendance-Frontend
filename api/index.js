import { gqlClient } from "./base";
import axios from "axios";
import GQL from "./gqlQuery";

const logInUser = async (username, password) => {
  try {
    const { status, data } = await axios.post("/api/", { username, password });
    return status === 200 ? data.result : null;
  } catch (error) {
    console.log("Error occur while logging user", error.message);
  }
};

const getTotalAttendanceCount = async (userID = 17) => {
  try {
    const { status, data } = await gqlClient.post("/", {
      query: GQL.attendanceCountQuery(userID),
      variables: {},
    });
    return status === 200
      ? data?.data?.attendance_aggregate?.aggregate?.count
      : null;
  } catch (error) {
    console.log("Total Attendance count error", error.message);
  }
};

const geMytAttendance = async (offset = 0, userID = 17) => {
  try {
    const { status, data } = await gqlClient.post("/", {
      query: GQL.attendanceQuery(userID, offset),
      variables: {},
    });
    return status === 200 ? data?.data?.attendance : null;
  } catch (error) {
    console.log("Error occur while fetching attendance ", error.message);
  }
};

const API = { geMytAttendance, logInUser, getTotalAttendanceCount };
export default API;
