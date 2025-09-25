import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuth();
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveAuth({ user: state.user, isAuthenticated: true });
      }
    },
    presistedAuth: (state) => {
      const saved = loadAuth();
      if (saved) {
        state.user = saved.user;
        state.isAuthenticated = saved.isAuthenticated;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        saveAuth({ user: action.payload, isAuthenticated: true });
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        saveAuth({ user: action.payload, isAuthenticated: true });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, updateProfile, presistedAuth } = authSlice.actions;
export default authSlice.reducer;

// Async thunk for sign up
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/user/create`,
        formData
      );
      console.log("sign Up", res);

      return res.data;
    } catch (err) {
      console.error("Axios error:", err.response?.data.error || err.message);
      return rejectWithValue(err.response?.data || "Sign up failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.BACKEND_URL}/user/login`,
        formData
      );
      console.log("login", res);
      return res.data;
    } catch (err) {
      console.error("err", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

function loadAuth() {
  try {
    const savedUser = localStorage.getItem("auth");
    if (savedUser) return JSON.parse(savedUser);
  } catch (err) {
    console.error("failed to load from storage", err);
  }
}

function saveAuth(auth) {
  try {
    localStorage.setItem("auth", JSON.stringify(auth));
  } catch (err) {
    console.error("failed to save auth, err");
  }
}

function clearAuth() {
  try {
    localStorage.removeItem("auth");
  } catch (err) {
    console.error("failed to clear auth", err);
  }
}
