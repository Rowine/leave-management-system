import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get('/api/users', config)

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

export const getAllCategories = createAsyncThunk(
  'admin/getAllCategories',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get('/api/categories', config)

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

export const getAllLeaves = createAsyncThunk(
  'admin/getAllLeaves',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get('/api/leaves', config)

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

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    categories: [],
    leaves: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.loading = 'idle'
      state.error = null
      state.users = []
      state.categories = []
      state.leaves = []
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
      .addCase(getAllCategories.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.categories = action.payload
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
      .addCase(getAllLeaves.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getAllLeaves.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.leaves = action.payload
      })
      .addCase(getAllLeaves.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      }),
})

export const { reset } = adminSlice.actions

export default adminSlice.reducer
