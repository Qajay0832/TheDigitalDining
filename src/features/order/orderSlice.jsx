import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from './OrderService';

export const placeOrder = createAsyncThunk('order/place', OrderService.placeOrder);
export const getOrders = createAsyncThunk('order/history', OrderService.getOrders);

const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], cart: [], loading: false },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.name !== action.payload);
    },
    clearCart: state => {
      state.cart = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const { addToCart, removeFromCart, clearCart } = orderSlice.actions;
export default orderSlice.reducer;
