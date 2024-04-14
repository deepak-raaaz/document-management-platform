import { apiSlice } from "../apiSlice";
import { allUsers } from "./adminSlice";

export const adminApi = apiSlice.injectEndpoints({
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
      activateAccount: builder.mutation({
        query: ({id,email}) => ({
          url: `account-verify/${id}`,
          method: "PUT",
          body:{
            email
          },
          credentials: "include" as const,
        }),
      }),
      deactivateAccount: builder.mutation({
        query: ({id,email}) => ({
          url: `account-verify/${id}`,
          method: "PUT",
          body:{
            email
          },
          credentials: "include" as const,
        }),
      })
  }),
});

export const { useAllUsersQuery, useActivateAccountMutation, useDeactivateAccountMutation } = adminApi;
