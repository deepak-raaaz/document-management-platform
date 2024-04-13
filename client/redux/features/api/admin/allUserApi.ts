import { apiSlice } from "../apiSlice";
import { allUsers } from "./adminSlice";

export const moocsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      allUsers: builder.query({
        query: (data) => ({
          url: "all-student-details",
          method: "GET",
          credentials: "include" as const,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              allUsers({
                allUsers: result.data.allStudentDetails,
              })
            );
          } catch (error: any) {
            console.log(error);
          }
        },
      }),
  }),
});

export const { useAllUsersQuery } = moocsApi;
