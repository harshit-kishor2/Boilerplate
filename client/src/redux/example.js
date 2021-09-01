import {
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import request from '../helper/api/api';
import {
  AdminUserType,
  StaffType,
  CSRFAPIResponseType,
} from '@aitriage/api-interfaces';
import { generateSuccessNotification } from '../helper/notification/notification';
import {
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  STAFF_UPDATE_PASSWORD_SUCCESS,
} from '@aitriage/api/messages/messages';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState extends EntityState<AdminUserType> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  csrfLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  hospitalForgotPasswordLoadingStatus:
  | 'not loaded'
  | 'loading'
  | 'loaded'
  | 'error';
  forgotPasswordLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  hospitalResetPasswordLoadingStatus:
  | 'not loaded'
  | 'loading'
  | 'loaded'
  | 'error';
  resetPasswordLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  adminChangePasswordLoadingStatus:
  | 'not loaded'
  | 'loading'
  | 'loaded'
  | 'error';
  error: string;
  csrfToken: string;
  userDetails: AdminUserType | StaffType; //admin user
  hospitalLoginLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  hospitalError: string;
  hospitalForgotPasswordError: string;
  forgotPasswordError: string;
  hospitalResetPasswordError: string;
  resetPasswordError: string;
  adminChangePasswordError: string;
  redirectTo: string;
}

export const authAdapter = createEntityAdapter<AdminUserType>();

/**
 * Get CSRF Token
 */
export const getCsrfToken = createAsyncThunk(
  'auth/getCsrfToken',
  async (_, thunkAPI) => {
    const response = await request({
      url: '/api/web/csrf-token',
    });
    return response;
  }
);

/**
 * Super Admin Login Api
 */
export const superAdminLogin = createAsyncThunk(
  'auth/superAdminLogin',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/admin-login',
        method: 'POST',
        data: params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/**
 * Hospital Admin Login Api
 */
export const hospitalAdminLogin = createAsyncThunk(
  'auth/hospitalAdminLogin',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/staff-login',
        method: 'POST',
        data: params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/**
 * Get User Data from Local Storage and update in state
 */
export const getUserDataFromLocalStorage = createAsyncThunk(
  'auth/getUserDataFromLocalStorage',
  async (_, thunkAPI) => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails == null) {
      return thunkAPI.rejectWithValue(null);
    }
    return userDetails;
  }
);

/**
 * logout hospital user
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/logout',
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

/**
 * logout admin
 */
export const logoutAdmin = createAsyncThunk(
  'auth/logoutAdmin',
  async (_, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/admin-logout',
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

/**
 * admin forgot password
 */
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/forgot-password',
        method: 'POST',
        data: params,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(error.response);
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/**
 * hospital admin forgot password
 */
export const hospitalForgotPassword = createAsyncThunk(
  'auth/hospitalForgotPassword',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/staff-forgot-password',
        method: 'POST',
        data: params,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(error.response);
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/**
 * admin Reset password
 */
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/reset-password',
        method: 'POST',
        data: params,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(error.response);
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/**
 * hospital admin Reset password
 */
export const hospitalResetPassword = createAsyncThunk(
  'auth/hospitalResetPassword',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/staff-reset-password',
        method: 'POST',
        data: params,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(error.response);
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/**
 * Change Super Admin Password
 */
export const adminChangePassword = createAsyncThunk(
  'auth/adminChangePassword',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: '/api/web/change-password',
        method: 'POST',
        data: params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const initialAuthState: AuthState = authAdapter.getInitialState({
  loadingStatus: 'not loaded',
  csrfLoadingStatus: 'not loaded',
  hospitalForgotPasswordLoadingStatus: 'not loaded',
  forgotPasswordLoadingStatus: 'not loaded',
  hospitalResetPasswordLoadingStatus: 'not loaded',
  resetPasswordLoadingStatus: 'not loaded',
  adminChangePasswordLoadingStatus: 'not loaded',
  adminChangePasswordError: null,
  hospitalForgotPasswordError: null,
  forgotPasswordError: null,
  hospitalResetPasswordError: null,
  resetPasswordError: null,
  error: null,
  csrfToken: null,
  userDetails: null,
  hospitalLoginLoadingStatus: 'not loaded',
  hospitalError: null,
  redirectTo: null,
});

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    add: authAdapter.addOne,
    remove: authAdapter.removeOne,
    updateCsrfToken: (state, action: PayloadAction<string>) => {
      return { ...state, appVersion: action.payload };
    },
    clearUserData: (state, action: PayloadAction<string>) => {
      localStorage.clear();
      return { ...initialAuthState };
    },
    resetAuthState: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        hospitalForgotPasswordLoadingStatus: 'not loaded',
        forgotPasswordLoadingStatus: 'not loaded',
        hospitalResetPasswordLoadingStatus: 'not loaded',
        resetPasswordLoadingStatus: 'not loaded',
        adminChangePasswordLoadingStatus: 'not loaded',
        hospitalLoginLoadingStatus: 'not loaded',
        adminChangePasswordError: null,
        hospitalForgotPasswordError: null,
        forgotPasswordError: null,
        hospitalResetPasswordError: null,
        resetPasswordError: null,
        hospitalError: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(superAdminLogin.pending, (state: AuthState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        superAdminLogin.fulfilled,
        (state: AuthState, action: PayloadAction<AdminUserType>) => {
          state.userDetails = action.payload;
          localStorage.setItem('userDetails', JSON.stringify(action.payload));
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(superAdminLogin.rejected, (state: AuthState, action) => {
        state.loadingStatus = 'error';
        state.error = action.payload as string;
      })
      .addCase(
        getCsrfToken.fulfilled,
        (state: AuthState, action: PayloadAction<unknown>) => {
          const response = action.payload as CSRFAPIResponseType;
          request.defaults.headers.post['X-CSRF-Token'] = response.csrfToken;
          state.csrfLoadingStatus = 'loaded';
        }
      )
      .addCase(hospitalAdminLogin.pending, (state: AuthState) => {
        state.hospitalLoginLoadingStatus = 'loading';
      })
      .addCase(
        hospitalAdminLogin.fulfilled,
        (state: AuthState, action: PayloadAction<StaffType>) => {
          state.userDetails = action.payload;
          state.hospitalLoginLoadingStatus = 'loaded';
          localStorage.setItem('userDetails', JSON.stringify(action.payload));
        }
      )
      .addCase(hospitalAdminLogin.rejected, (state: AuthState, action) => {
        state.hospitalLoginLoadingStatus = 'error';
        state.hospitalError = action.payload as string;
      })
      //Get data from local storage
      .addCase(
        getUserDataFromLocalStorage.fulfilled,
        (state: AuthState, action: PayloadAction<string>) => {
          state.userDetails = JSON.parse(action.payload);
        }
      )
      //Clear user's data on logout
      .addCase(
        logoutUser.fulfilled,
        (state: AuthState, action: PayloadAction<string>) => {
          localStorage.clear();
          state.userDetails = null;
          state.redirectTo = 'login';
          state.loadingStatus = 'not loaded';
        }
      )
      //Clear admin's data on logout
      .addCase(
        logoutAdmin.fulfilled,
        (state: AuthState, action: PayloadAction<string>) => {
          localStorage.clear();
          state.userDetails = null;
          state.redirectTo = 'admin-login';
          state.loadingStatus = 'not loaded';
        }
      )
      .addCase(hospitalForgotPassword.pending, (state: AuthState) => {
        state.hospitalForgotPasswordLoadingStatus = 'loading';
      })
      .addCase(
        hospitalForgotPassword.fulfilled,
        (state: AuthState, action: PayloadAction<StaffType>) => {
          generateSuccessNotification(FORGOT_PASSWORD_SUCCESS);
          state.hospitalForgotPasswordLoadingStatus = 'loaded';
        }
      )
      .addCase(hospitalForgotPassword.rejected, (state: AuthState, action) => {
        state.hospitalForgotPasswordLoadingStatus = 'error';
        state.hospitalForgotPasswordError = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state: AuthState) => {
        state.forgotPasswordLoadingStatus = 'loading';
      })
      .addCase(
        forgotPassword.fulfilled,
        (state: AuthState, action: PayloadAction<StaffType>) => {
          generateSuccessNotification(FORGOT_PASSWORD_SUCCESS);
          state.forgotPasswordLoadingStatus = 'loaded';
        }
      )
      .addCase(forgotPassword.rejected, (state: AuthState, action) => {
        state.forgotPasswordLoadingStatus = 'error';
        state.forgotPasswordError = action.payload as string;
      })

      .addCase(hospitalResetPassword.pending, (state: AuthState) => {
        state.hospitalResetPasswordLoadingStatus = 'loading';
      })
      .addCase(
        hospitalResetPassword.fulfilled,
        (state: AuthState, action: PayloadAction<StaffType>) => {
          generateSuccessNotification(RESET_PASSWORD_SUCCESS);
          state.hospitalResetPasswordLoadingStatus = 'loaded';
        }
      )
      .addCase(hospitalResetPassword.rejected, (state: AuthState, action) => {
        state.hospitalResetPasswordLoadingStatus = 'error';
        state.hospitalResetPasswordError = action.payload as string;
      })
      .addCase(resetPassword.pending, (state: AuthState) => {
        state.resetPasswordLoadingStatus = 'loading';
      })
      .addCase(
        resetPassword.fulfilled,
        (state: AuthState, action: PayloadAction<StaffType>) => {
          generateSuccessNotification(RESET_PASSWORD_SUCCESS);
          state.resetPasswordLoadingStatus = 'loaded';
        }
      )
      .addCase(resetPassword.rejected, (state: AuthState, action) => {
        state.resetPasswordLoadingStatus = 'error';
        state.resetPasswordError = action.payload as string;
      })
      .addCase(adminChangePassword.pending, (state: AuthState) => {
        state.adminChangePasswordLoadingStatus = 'loading';
      })
      .addCase(adminChangePassword.fulfilled, (state: AuthState, action) => {
        generateSuccessNotification(STAFF_UPDATE_PASSWORD_SUCCESS);
        state.adminChangePasswordLoadingStatus = 'loaded';
      })
      .addCase(adminChangePassword.rejected, (state: AuthState, action) => {
        state.adminChangePasswordLoadingStatus = 'error';
        state.adminChangePasswordError = action.payload as string;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const authReducer = authSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(authActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const authActions = authSlice.actions;
