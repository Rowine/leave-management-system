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

export const getUser = createAsyncThunk(
  'admin/getUser',
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

      const { data } = await axios.get(`/api/users/${id}`, config)

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

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (user, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },

        withCredentials: true,
      }

      const { data } = await axios.post('/api/users', user, config)

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
  'admin/deleteUser',
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

      return id
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }
)

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (user, { rejectWithValue, getState }) => {
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

      const { data } = await axios.put(`/api/users/${user._id}`, user, config)

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
    user: {},
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
      state.user = {}
      state.categories = []
      state.leaves = []
    },
    resetUser: (state) => {
      state.loading = 'idle'
      state.error = null
      state.user = {}
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
      })
      .addCase(getUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
      .addCase(createUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.users = [...state.users, action.payload]
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.users = state.users.filter((user) => user._id !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        )
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload
      }),
})

export const { reset, resetUser } = adminSlice.actions

export default adminSlice.reducer
