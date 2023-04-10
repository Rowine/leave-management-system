import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )

      localStorage.setItem('userInfo', JSON.stringify(data))

      return data
    } catch (err) {
      return rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    }
  }
)

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      )

      dispatch(login({ email, password }))

      localStorage.setItem('userInfo', JSON.stringify(data))

      return data
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: 'idle',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo')
      state.userInfo = null
      state.loading = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.userInfo = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(register.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.userInfo = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      }),
})

export const { logout, reset } = userSlice.actions

export default userSlice.reducer
