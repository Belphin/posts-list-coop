// redux
import { createStore, combineReducers } from "redux"
// reducers
import { loggedReducer } from "./loggedReducer"

const rootReducer = combineReducers({
  loggedReducer: loggedReducer
})

export const store = createStore(rootReducer)