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

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ name, email, password }, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/users/profile',
        { name, email, password },
        config
      )

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

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.delete(`/api/users/${id}`, config)
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
    reset: (state) => {
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.userInfo = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = 'succeeded'
        state.userInfo = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      }),
})

export const { logout, reset } = userSlice.actions

export default userSlice.reducer
