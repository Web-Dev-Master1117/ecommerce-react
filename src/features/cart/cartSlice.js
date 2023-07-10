import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId, updateItem } from './cartAPI';

const initialState = {
  status: 'idle',
  items: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// this is thunk action creator

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async(userId) => {
    const response = await fetchItemsByUserId(userId)
    return response.data;
  }
)

// createAsyncThunk creates three action types
// 1. pending 
// 2. fulfilled
// 3. rejected


export const updateItemAsync = createAsyncThunk(
  'cart/updateCart',
  async(update) => {
    const response = await updateItem(update)
    return response.data;
  }
)

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })  // addToCartAsync.pending is action type 
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })   // addToCartAsync.fulfilled is action type
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })  // async operation create action.payload
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload)
        state.items[index] = action.payload;
      })
  },
});

export const { increment } = counterSlice.actions;


export const selectItems = (state) => state.cart.items;


export default counterSlice.reducer;


// we create extra reducer for async thunk actions