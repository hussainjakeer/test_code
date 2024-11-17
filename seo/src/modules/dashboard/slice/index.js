import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardData } from "../thunk";

const dashboardState = {
  loading: false,
  dashboardData:[]
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardData.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        dashboardData: payload?.result || [],
      };
    });
    builder.addCase(fetchDashboardData.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
  }
});

export const { setLoading } = dashboardSlice.actions;

export default dashboardSlice.reducer;
