import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const createLeave = createAsyncThunk(
  'leave/create',
  async (leaveData, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post('/api/leaves', leaveData, config)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }
)

export const updateLeave = createAsyncThunk(
  'leave/update',
  async (leaveData, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/leaves/${leaveData._id}`,
        leaveData,
        config
      )

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }
)

export const getLeavesById = createAsyncThunk(
  'leave/getLeavesById',
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`/api/users/${user._id}/leaves`, config)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }
)

export const deleteLeave = createAsyncThunk(
  'leave/delete',
  async (leaveId, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.delete(`/api/leaves/${leaveId}`, config)

      return leaveId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }
)

export const getLeaveById = createAsyncThunk(
  'leave/getLeaveById',
  async (leaveId, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/api/leaves/${leaveId}`, config)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }
)

const initialState = {
  loading: 'idle',
  leave: {},
  leaves: [],
  error: null,
}

export const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    leavesReset: (state) => {
      state.loading = 'idle'
      state.leave = {}
      state.leaves = []
      state.error = null
    },
    leaveReset: (state) => {
      state.loading = 'idle'
      state.leave = {}
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeavesById.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getLeavesById.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.leaves = action.payload
      })
      .addCase(getLeavesById.rejected, (state, action) => {
        state.loading = 'rejected'
        state.error = action.payload
      })
      .addCase(getLeaveById.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getLeaveById.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.leave = action.payload
      })
      .addCase(getLeaveById.rejected, (state, action) => {
        state.loading = 'rejected'
        state.error = action.payload
      })
      .addCase(createLeave.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.leave = action.payload
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.loading = 'rejected'
        state.error = action.payload
      })
      .addCase(updateLeave.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(updateLeave.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.leave = action.payload
      })
      .addCase(updateLeave.rejected, (state, action) => {
        state.loading = 'rejected'
        state.error = action.payload
      })
      .addCase(deleteLeave.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.leaves = state.leaves.filter(
          (leave) => leave._id !== action.payload
        )
      })
      .addCase(deleteLeave.rejected, (state, action) => {
        state.loading = 'rejected'
        state.error = action.payload
      })
  },
})

export const { leavesReset, leaveReset } = leaveSlice.actions

export default leaveSlice.reducer
