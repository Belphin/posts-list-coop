// redux
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: "Redux",
  logged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload
      state.logged = true
    },
    logout: (state) => {
      state.username = null
      state.logged = false
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer