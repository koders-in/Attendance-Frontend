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

const attendanceCountQuery = (userID) => `query  MyQuery  @cached{
  attendance_aggregate(where:{ user_id : {_eq : ${userID} } })  {
               aggregate {
                       count
                      }
           }
    }
 `;

const GQL = { attendanceCountQuery, attendanceQuery };
export default GQL;
