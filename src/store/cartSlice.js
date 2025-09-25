import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/cart/${userId}`);
//       console.log(res);

//       return res.data.cart;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.BACKEND_URL}/cart/${userId}`);
      console.log("response after fetching cart", res);

      return res.data.cart; // make sure backend returns items
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ cart, userId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/cart/add`, {
        cart,
        userId,
      });
      console.log("response after adding card", res);

      return res.data.cart; // the updated cart
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add to cart");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ itemId, userId }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${process.env.BACKEND_URL}/cart/remove/${itemId}`,
        { userId }
      );
      console.log("res after removing cart item", res);

      return res.data.cart; // updated cart items
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to remove from cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  // reducers: {
  // showCart: (state, action) => {
  //   state.items.push(action.payload.map((val) => val));
  // },
  // addToCart: (state, action) => {
  //   state.items.push(action.payload);
  // },
  // removeFromCart: (state, action) => {
  //   state.items = state.items.filter((item) => item.id !== action.payload);
  // },
  // },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items; // set items from backend
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addCartItem
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items; // depends on backend response
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // removeCartItem
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
