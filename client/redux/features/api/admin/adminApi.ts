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
      query: ({ id, email }) => ({
        url: `account-verify/${id}`,
        method: "PUT",
        body: {
          email,
        },
        credentials: "include" as const,
      }),
    }),
    deactivateAccount: builder.mutation({
      query: ({ id, email, reason }) => ({
        url: `account-reject/${id}`,
        method: "PUT",
        body: {
          email,
          reason,
        },
        credentials: "include" as const,
      }),
    }),
    studentDetails: builder.query({
      query: ({ id }) => ({
        url: `single-student-details/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    adminMoocsCourseList: builder.query({
      query: ({}) => ({
        url: "moocs-course-list",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    adminMarCategoryList: builder.query({
      query: ({}) => ({
        url: "mar-category",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    uploadMoocsCourse: builder.mutation({
      query: ({ title,platform,credit }) => ({
        url: "create-moocs-course",
        method: "POST",
        body: {
          title,
          platform,
          credit
        },
        credentials: "include" as const,
      }),
    }),
    uploadMarCategory: builder.mutation({
      query: ({ category,perMarPoints,maximumMarPoints }) => ({
        url: "add-mar-category",
        method: "POST",
        body: {
          category,
          perMarPoints,
          maximumMarPoints
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAllUsersQuery,
  useActivateAccountMutation,
  useDeactivateAccountMutation,
  useStudentDetailsQuery,
  useAdminMoocsCourseListQuery,
  useAdminMarCategoryListQuery,
  useUploadMoocsCourseMutation,
  useUploadMarCategoryMutation
} = adminApi;
