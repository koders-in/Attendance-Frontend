import Axios from "axios";

export const gqlClient = Axios.create({
  baseURL: "https://on-piglet-23.hasura.app/v1/graphql",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImJvdCIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYm90Il19fQ.Fo4nwUcy_DATDbFxPjbdAUG1oeAdzy1xuMjy8vSwDaZ0BLXq6tqhiQHNTYAS5nTXtFOEzJ0DzTi9n6tchhDIn7ryFSXPgr0iF4AzLsWDN0nxJf5WLV1EzStaUA_cldUVnG0cpU9D-DpUcLgTGPSmbKHYqtHdRdALjgh-ErGn7po",
  },
});
