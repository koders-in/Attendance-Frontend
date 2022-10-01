import moment from "moment";

const dateFormat = "YYYY/MM/DD HH:mm:ss A";

const convertToISOtime = (date, time) => {
  if (date === null && date === undefined) return "Invalid Date";
  if (time === null && time === undefined) return "Invalid Time";
  if (typeof date === "string" && time !== null) {
    date = date.replaceAll("-", "/");
    const ts = moment.utc(`${date} ${time}`, dateFormat).toDate();
    return moment(ts).format("hh:mm:ss A");
  } else return "Invalid Time";
};

const getTimeDifference = (date, time1, time2, precision = 2) => {
  if (date === null && time1 == null && time2 === null) return "Invalid Date";
  if (typeof date === "string" && time1 !== null && time2 !== null) {
    date = date.replaceAll("-", "/");
    // assuming t2 is always greater than t1
    // because t2 is clock out time and t1 is clock in time
    // ignoring any negative value mean user didnt punch his card
    const t1 = moment(`${date} ${time1}`, dateFormat);
    const t2 = moment(`${date} ${time2}`, dateFormat);
    const duration = t2.diff(t1);

    return Number(moment.duration(duration).asHours().toFixed(precision));
  }
  // if time1 is null then user didn't puch his morning card so marking absent of user
  // for that day
  return time2 === null ? 8 : 0;
};

const getUserPresenceCount = (attendanceObj) => {
  const { clock_in: time1, clock_out: time2, date } = attendanceObj;
  if ((time1 === null && time2 === null) || time1 === null) {
    return { ...attendanceObj, tag: "absent" };
  } else if (time2 === null) {
    return { ...attendanceObj, tag: "half" };
  } else {
    const t1 = moment(`${date} ${time1}`, dateFormat);
    const t2 = moment(`${date} ${time2}`, dateFormat);
    const duration = t2.diff(t1);
    const presenceTime = Number(moment.duration(duration).asHours().toFixed(2));
    if (presenceTime >= 8) {
      return { ...attendanceObj, tag: "present" };
    }
  }
};

const utils = { convertToISOtime, getTimeDifference, getUserPresenceCount };
export default utils;
