// import { createSlice } from "@reduxjs/toolkit";
// import reduxApis from "redux/api";


// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     user: null,
//     error: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     logout: (state, action) => {
//       state.user = null;
//     },
//     setUserType: (state, action) => {
//       state.user.type = action.payload;
//     },
//   },
//   extraReducers: {
//     [reduxApis.userLogin.pending]: (state) => {
//       state.loading = true;
//     },
//     [reduxApis.userLogin.fulfilled]: (state, action) => {
//       const message = action.payload.data.message;

//       state.loading = false;
//       state.user = action.payload.data.user;
//     },
//     [reduxApis.userLogin.rejected]: (state, action) => {
//       //   toast.error(action.error.message);
//       state.loading = false;
//       state.error = action.error.message;
//     },
//   },
// });

// export const { logout, setUser, setUserType } = userSlice.actions;

// export default userSlice.reducer;
