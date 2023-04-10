import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (_, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get('/api/categories', config)
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
  categories: [],
  error: null,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryReset: (state) => {
      state.loading = 'idle'
      state.categories = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
  },
})

export const { categoryReset } = categorySlice.actions

export default categorySlice.reducer
