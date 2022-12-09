import apis from "services/_api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ==================User-Redux-api=======================
// const userLogin = createAsyncThunk("Users Login", async (body) =>
//   apis.authLogin(body)
// );

const getUniqueTrack = createAsyncThunk("GET All Track data", async () => await apis.getUniqueTrack());

const reduxApis = { getUniqueTrack };

export default reduxApis;
