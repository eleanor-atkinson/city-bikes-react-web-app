// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as client from "./client";

// export const fetchCities = createAsyncThunk("search/fetchCities", async (searchValue) => {
//   const allCities = await client.findCities(searchValue);
//   const filteredCities = allCities.filter((city) =>
//     city.location.city.toLowerCase().includes(searchValue.toLowerCase())
//   );
//   return filteredCities;
// });

// const searchSlice = createSlice({
//   name: "search",
//   initialState: {
//     searchTerm: "",
//     results: [],
//     loading: false,
//   },
//   reducers: {
//     updateSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCities.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCities.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload;
//       });
//   },
// });

// export const { updateSearchTerm } = searchSlice.actions;
// export default searchSlice.reducer;
