import { createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_DASHBOARD_DATA } from "../../../components/common/constant/url_helpers";
import { axiosAPI } from "../../../services/api";

export const fetchDashboardData = createAsyncThunk(
    "dashboard/fetchDashboardData",
    async (payload, thunk) => {
      try {
        const res = await axiosAPI.get(FETCH_DASHBOARD_DATA, {
          params: {
            ...payload,
          },
        });
        let json = await res.data;
        return json;
      } catch (e) {
        return thunk.rejectWithValue(e?.response?.data);
      }
    }
  );