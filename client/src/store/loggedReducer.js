const defaultState = {
  bg: "#02C755",
  logged: false
}

export const loggedReducer = (state = defaultState, action) => {
  switch(action.type){
    case "LOG_IN":
      return { ...state, bg: "#000", logged: true }
    case "LOG_OUT":
      return { ...state, bg: "#02C755", logged: false }
    default:
      return state
  }
}