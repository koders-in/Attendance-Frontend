const attendanceQuery = (userID, offset) => `
      query MyQuery @cached {
        attendance(where: {user_id:{_eq:${userID}}},limit: 10,offset: ${offset},order_by: {date: desc} )  {
            id
            date
            clock_in
            clock_out
            comment
        }
      }
    `;

const attendanceCountQuery = (
  userID
) => `query  MyQuery  @cached{ attendance_aggregate(where:{ user_id : {_eq : ${userID} } }) {aggregate {count}}}
 `;

const attendanceFilterQuery = (userID, offset, limit, dateFilterQuery) => {
  if (dateFilterQuery.length > 0) {
    return `query MyQuery @cached {
   attendance(where: {user_id:{_eq:${userID}},date:${dateFilterQuery}},limit: ${limit},offset: ${offset},order_by: {date: desc} )  {
       id
       date
       clock_in
       clock_out
       comment
   }
 }
`;
  } else {
    return `query MyQuery @cached {
   attendance(where: {user_id:{_eq:${userID}}},limit: 10,offset: ${offset},order_by: {date: desc} )  {
       id
       date
       clock_in
       clock_out
       comment
   }
 }
`;
  }
};

const filterAttendanceCountQuery = (
  userID,
  dateQuery
) => `query  MyQuery  @cached{attendance_aggregate(where:{ user_id : {_eq : ${userID},date: ${dateQuery} }){aggregate {count}}}
 `;

const GQL = {
  attendanceCountQuery,
  attendanceQuery,
  attendanceFilterQuery,
  filterAttendanceCountQuery,
};
export default GQL;
