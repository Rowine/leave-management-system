import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import categoryReducer from '../features/category/categorySlice'
import leaveReducer from '../features/leave/leaveSlice'
import userReducer from '../features/user/userSlice'

const rootReducer = combineReducers({
  user: userReducer,
  leave: leaveReducer,
  category: categoryReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)
