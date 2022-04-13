import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userInfo: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isVerified: false,
  authError: "",
  message: "",
};

export const userRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const accountVerification = createAsyncThunk(
  "auth/verification",
  async (verifyToken, thunkAPI) => {
    try {
      return await authService.verfication(verifyToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isVerified = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = null;
        state.message = action.payload;
        state.authError = "";
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.authError = action.payload;
        state.userInfo = null;
        state.isSuccess = false;
      })
      .addCase(accountVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accountVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isVerified = true;
        state.userInfo = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(accountVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isVerified = false;
        state.isSuccess = false;
        state.userInfo = null;
        state.message = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isVerified = true;
        state.userInfo = action.payload.user;
        state.message = action.payload.message;
        state.authError = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.authError = action.payload;
        state.isVerified = false;
        state.isSuccess = false;
        state.userInfo = null;
        state.message = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isVerified = true;
        state.userInfo = null;
        state.message = action.payload.data;
        state.authError = "";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.authError = action.payload;
        state.isVerified = false;
        state.isSuccess = false;
        state.userInfo = null;
        state.message = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isVerified = true;
        state.userInfo = null;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isVerified = false;
        state.isSuccess = false;
        state.userInfo = null;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isVerified = true;
        state.userInfo = null;
        state.message = action.payload;
        state.authError = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.authError = null;
        state.isVerified = false;
        state.isSuccess = false;
        state.userInfo = null;
        state.message = action.payload;
      });
  },
});

export const { authReset } = authSlice.actions;
export default authSlice.reducer;
