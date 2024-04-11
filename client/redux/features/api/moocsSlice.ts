import { apiSlice } from "../api/apiSlice";


export const moocsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadMoocs: builder.mutation({
       query: ({ title, startDate, endDate, year, verificationUrl, file }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("year", year);
        formData.append("verificationUrl", verificationUrl);
        formData.append("file", file); // Append the file to FormData

        return {
          url: "upload-moocs",
          method: "POST",
          body: formData,
          credentials: "include" as const,
        };
      },
    }),
  }),
});


export const { useUploadMoocsMutation } = moocsApi;
