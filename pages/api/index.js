import axios from "axios";
import moment from "moment";
import crypto from "crypto";

const koders = axios.create({
  baseURL: "https://kore.koders.in",
});

export default async function handler(req, res) {
  const todayDate = moment();
  const lastWeekDate = todayDate.subtract(7, "days");
  const lastWeekDay = lastWeekDate.format("DD");

  try {
    const { body } = req;
    if (req.method !== "POST")
      return res.status(400).json({ msg: ErrorMessage.INVALID, result: null });
    if (body["username"] !== undefined && body["password"] !== undefined) {
      const { username, password } = body;
      const authKey = Buffer.from(`${username}:${password}`).toString("base64");
      const { status, data } = await koders.get("/my/account.json", {
        headers: {
          authorization: "Basic " + authKey,
        },
      });

      if (status === 200) {
        const { user } = data;
        const allIssues = await getTotalIssues(user.api_key);
        const myIssues = await getMyIssues(allIssues, user.id);
        const logtime = await getSpentTime(
          user.api_key,
          lastWeekDate.format("DD-MM-YYYY"),
          lastWeekDay
        );
        const obj = {
          profile: getUser(user),
          issues: myIssues,
          spentTime: { logtime, requiredLogTime: 40 },
        };

        res.setHeader("isSuccess", true);
        res.status(200).json({ msg: "Redmine user", result: obj });
      } else {
        res
          .status(status)
          .json({ msg: ErrorMessage.SOMETHINGWRONG, result: null });
      }
    } else
      res.status(400).json({ msg: ErrorMessage.AUTHORIZATION, result: null });
  } catch (error) {
    res.status(400).json({ msg: error.message, result: null });
  }
}

const ErrorMessage = {
  AUTHORIZATION: "Authorization key is missing in header",
  SOMETHINGWRONG: "Something went wrong",
  INVALID: "Invalid request",
};

const findValueFromArray = (arr = [], key = "") => {
  if (arr.length === 0) return null;
  if (key.length === 0) return "Invalid Key";
  for (let item of arr) {
    if (item.name === key) return item.value;
  }
  return "Invalid Key";
};

const createHashFromEmail = (email) =>
  crypto
    .createHash("md5")
    .update(`${email}`.trim().toLowerCase())
    .digest("hex");

const getUser = (user) => {
  const userObj = {};
  userObj["firstname"] = user.firstname;
  userObj["id"] = user.id;
  userObj["position"] = findValueFromArray(user.custom_fields, "Position");
  userObj["lastname"] = user.lastname;
  userObj["login"] = user.login;
  userObj["avatar"] = `https://www.gravatar.com/avatar/${createHashFromEmail(
    user.mail
  )}?rating=PG&size=50&default=identicon`;
  return userObj;
};

const getTotalIssues = async (apiKey) => {
  if (apiKey.length === 0) return "Missing API key";
  try {
    const { data, status } = await koders.get("/issues.json", {
      headers: {
        "X-Redmine-API-Key": apiKey,
      },
    });
    if (status === 200) return data["issues"];
    else return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const getMyIssues = async (issuesList = [], id) => {
  if (issuesList.length === 0) return null;
  let currentIssues = 0;
  let resolvedIssues = 0;
  for (let issue of issuesList) {
    //  just for the sake of safety
    if (issue["assigned_to"] !== undefined) {
      if (issue["assigned_to"]["id"] === id) {
        currentIssues++;
        if (issue["status"]["id"] === 3) resolvedIssues++;
      }
    }
  }

  return { currentIssues, resolvedIssues };
};

const getSpentTime = async (apiKey, preDate, preDay) => {
  if (apiKey.length === 0) return "Missing API key";
  let logTime = 0;
  try {
    const { data, status } = await koders.get(
      `/time_entries.json?user_id=me&spen_on%3E=${preDate}`,
      {
        headers: {
          "X-Redmine-API-Key": apiKey,
        },
      }
    );
    if (status === 200) {
      const timeEntries = data["time_entries"];
      for (let entry of timeEntries) {
        if (entry["spent_on"] !== null && entry["spent_on"] !== undefined) {
          const spenTime = moment(entry["spent_on"]).date();
          if (preDay <= spenTime) {
            logTime += Number(entry["hours"]);
          }
        }
      }
    }
    return logTime;
  } catch (error) {
    console.log(error);
  }
};
