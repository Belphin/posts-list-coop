const defaultState = {
  logged: false
}

export const loggedReducer = (state = defaultState, action) => {
  switch(action.type){
    case "LOG_IN":
      return { ...state, logged: true }
    case "LOG_OUT":
      return { ...state, logged: false }
    default:
      return state
  }
}