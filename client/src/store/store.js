import { configureStore } from '@reduxjs/toolkit'
// reducers
import userReducer from '@/store/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})