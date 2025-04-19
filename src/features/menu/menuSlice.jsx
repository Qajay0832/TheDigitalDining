import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MenuService from "./MenuService";

export const fetchMenu = createAsyncThunk("menu/fetch", MenuService.getMenu);
export const addMenuItem = createAsyncThunk(
  "menu/add",
  MenuService.addMenuItem
);

const menuSlice = createSlice({
  name: "menu",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default menuSlice.reducer;
