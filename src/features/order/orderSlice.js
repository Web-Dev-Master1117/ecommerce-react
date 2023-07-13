import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchCount } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    }
    // resetOrder is reducer action creator ( regular action creator )

  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
// resetOrder is action creator

export const selectCurrentOrder = (state) => state.order.currentOrder;


export default orderSlice.reducer;
