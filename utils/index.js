import moment from "moment";

const dateFormat = "YYYY/MM/DD HH:mm:ss A";
const dFormat = "YYYY-MM-DD";

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

const getThisAndLastWeekDate = () => {
  const currentWeekDate = moment(new Date(), "YYYY/MM/DD");
  return {
    currentWeekDate: currentWeekDate.format(dFormat),
    lastWeekDate: currentWeekDate.subtract(7, "days").format(dFormat),
  };
};

const getThisMonthBoundDate = () => {
  const month = moment("2022-08-30");
  return {
    monthStart: month.startOf("month").format(dFormat),
    monthEnd: month.endOf("month").format(dFormat),
  };
};
const getLastMonthBoundDate = () => {
  const month = moment("2022-08-30");
  return {
    monthStart: month.subtract(1, "months").startOf("month").format(dFormat),
    monthEnd: month.endOf("month").format(dFormat),
  };
};
const getThisYearBoundDate = () => {
  const year = moment(new Date());

  return {
    yearStart: year.startOf("year").format(dFormat),
    yearEnd: year.endOf("year").format(dFormat),
  };
};

const utils = {
  convertToISOtime,
  getTimeDifference,
  getUserPresenceCount,
  getThisAndLastWeekDate,
  getThisMonthBoundDate,
  getThisYearBoundDate,
  getLastMonthBoundDate,
};
export default utils;
