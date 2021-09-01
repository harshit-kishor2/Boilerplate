import { createEntityAdapter, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//import { generateSuccessNotification } from '../helper/notification/notification';
import { request, generateSuccessNotification, generateFailureNotification } from '../helper'
export const AUTH_FEATURE_KEY = 'auth'

export const authAdapter = createEntityAdapter()

export const initialAuthState = authAdapter.getInitialState({
  loadingStatus: 'not loaded',
  loginLoadingStatus: 'not loaded',
  csrfLoadingStatus: 'not loaded',
  varifyEmailLoadingStatus: 'not loaded',
  userDetails: null,
  varifyEmailData: null,
  error: null,
  loginError: null,
  varifyEmailError: null,
})
/**
 * Get CSRF Token
 */
export const getCsrfToken = createAsyncThunk('auth/getCsrfToken', async (_, thunkAPI) => {
  const response = await request({
    url: `/api/csrf/csrf-token`,
  })
  return response
})

/**
 * Get User Data from Local Storage and update in state
 */
export const getUserDataFromLocalStorage = createAsyncThunk(
  'auth/getUserDataFromLocalStorage',
  async (_, thunkAPI) => {
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails == null) {
      return thunkAPI.rejectWithValue(null)
    }
    return userDetails
  },
)

/**
 * logout hospital user
 */
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    const response = await request({
      url: `/api/auth/logout`,
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response)
  }
})

/**
 * Login action
 */
export const loginAction = createAsyncThunk('auth/loginAction', async (params, thunkAPI) => {
  try {
    const response = await request({
      url: `/api/auth/login`,
      method: 'POST',
      data: params,
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

/**
 * Register action
 */
export const registrationAction = createAsyncThunk(
  'auth/registrationAction',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: `/api/auth/register`,
        method: 'POST',
        data: params,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

/**
 * Varify email action
 */
export const varifyEmailAction = createAsyncThunk(
  'auth/varifyEmailAction',
  async (params, thunkAPI) => {
    try {
      const response = await request({
        url: `/api/auth/varify-email`,
        method: 'POST',
        data: params,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

/**
 * Slice for all reducres
 */
export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    add: authAdapter.addOne,
    remove: authAdapter.removeOne,
    updateCsrfToken: (state, action) => {
      return { ...state, appVersion: action.payload }
    },
    clearUserData: (state, action) => {
      localStorage.clear()
      return { ...initialAuthState }
    },
    resetAuthState: (state, action) => {
      return {
        ...state,
        loadingStatus: 'not loaded',
        varifyEmailLoadingStatus: 'not loaded',
        // userDetails: null,
        varifyEmailData: null,
        error: null,
        varifyEmailError: null,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCsrfToken.fulfilled, (state, action) => {
        const response = action.payload
        request.defaults.headers.post['X-CSRF-Token'] = response.csrfToken
        state.csrfLoadingStatus = 'loaded'
      })
      //Get data from local storage
      .addCase(getUserDataFromLocalStorage.fulfilled, (state, action) => {
        state.userDetails = JSON.parse(action.payload)
      })
      //Clear user's data on logout
      .addCase(logoutUser.fulfilled, (state, action) => {
        localStorage.clear()
        state.userDetails = null
        state.redirectTo = 'login'
        state.loadingStatus = 'not loaded'
      })

      .addCase(registrationAction.pending, (state) => {
        state.loadingStatus = 'loading'
      })
      .addCase(registrationAction.fulfilled, (state, action) => {
        // state.userDetails = action.payload
        generateSuccessNotification('Register Success.')
        // localStorage.setItem('userDetails', JSON.stringify(action.payload))
        state.loadingStatus = 'loaded'
      })
      .addCase(registrationAction.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.error = action.payload
      })
      .addCase(varifyEmailAction.pending, (state) => {
        state.varifyEmailLoadingStatus = 'loading'
      })
      .addCase(varifyEmailAction.fulfilled, (state, action) => {
        state.varifyEmailData = action.payload
        generateSuccessNotification('Verification Success.')
        // localStorage.setItem('userDetails', JSON.stringify(action.payload))
        state.varifyEmailLoadingStatus = 'loaded'
      })
      .addCase(varifyEmailAction.rejected, (state, action) => {
        state.varifyEmailLoadingStatus = 'error'
        state.varifyEmailError = action.payload
        generateFailureNotification(action.payload)
      })
      .addCase(loginAction.pending, (state) => {
        state.loginLoadingStatus = 'loading'
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userDetails = action.payload
        generateSuccessNotification('Login Success.')
        localStorage.setItem('userDetails', JSON.stringify(action.payload))
        state.loginLoadingStatus = 'loaded'
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loginLoadingStatus = 'error'
        state.loginError = action.payload
        generateFailureNotification(action.payload)
      })
  },
})

/*
 * Export reducer for store configuration.
 */
export const authReducer = authSlice.reducer

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
export const authActions = authSlice.actions
//export const { resetAuthState } = authSlice.actions
