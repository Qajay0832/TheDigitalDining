import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from './OrderService';

export const placeOrder = createAsyncThunk('order/place', OrderService.placeOrder);
export const getOrders = createAsyncThunk('order/history', OrderService.getOrders);

const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], cart: [], loading: false },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase the quantity if item already exists
      } else {
        state.cart.push({ ...item, quantity: 1 }); // Add new item to the cart
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1; // Increment the quantity of the item
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((i) => i._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1; // Decrease the quantity if greater than 1
        } else {
          state.cart = state.cart.filter((i) => i._id !== action.payload); // Remove item from cart if quantity is 1
        }
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload); // Remove the item from cart
    },
    clearCart: (state) => {
      state.cart = []; // Clear the cart
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity
} = orderSlice.actions;

export default orderSlice.reducer;
