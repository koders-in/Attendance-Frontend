import { gqlClient } from "./base";
import axios from "axios";
import GQL from "./gqlQuery";

const logInUser = async (username, password) => {
  try {
    const { status, data } = await axios.post("/api/", { username, password });
    return status === 200 ? data.result : null;
  } catch (e) {
    console.log("Error occur while logging user", e.message);
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
  } catch (e) {
    console.log("Total Attendance count error", e.message);
  }
};

const geMytAttendance = async (offset = 0, userID = 17) => {
  try {
    const { status, data } = await gqlClient.post("/", {
      query: GQL.attendanceQuery(userID, offset),
      variables: {},
    });

    return status === 200 ? data?.data?.attendance : null;
  } catch (e) {
    console.log("Error occur while fetching attendance ", e.message);
  }
};

const fetchFilteredAttendance = async (
  offset = 0,
  userID = 17,
  limit = 10,
  query
) => {
  try {
    const { status, data } = await gqlClient.post("/", {
      query: GQL.attendanceFilterQuery(userID, offset, limit, query),
      variables: {},
    });
    return status === 200 ? data?.data?.attendance : null;
  } catch (e) {
    console.log("Error occur while fetching filter attendance ", e.message);
  }
};
const API = {
  geMytAttendance,
  logInUser,
  getTotalAttendanceCount,
  fetchFilteredAttendance,
};
export default API;
