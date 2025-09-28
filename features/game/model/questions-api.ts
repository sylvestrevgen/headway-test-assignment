import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Question } from "./types";

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], void>({
      query: () => "questions",
    }),
  }),
});

export const { useGetQuestionsQuery } = questionsApi;
