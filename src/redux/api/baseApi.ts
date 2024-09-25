/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserInfo } from "../../utils/localStorageAuthManagemet";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getUserInfo();

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [
    "meta",
    "user",
    "doctor",
    "gallery",
    "machine",
    "department",
    "appointment",
    "schedule",
    "diagnosticDoctor",
    "diagnosticMachine",
    "diagnosticSchedule",
    "notice",
    "service",
    "banner",
    "photos",
  ],
  refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
});
