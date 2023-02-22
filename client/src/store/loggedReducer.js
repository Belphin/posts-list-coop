const defaultState = {
	logged: false,
	username: null,
	password: null,
};

export const loggedReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "LOG_IN":
			return {
				logged: true,
				username: localStorage.getItem("username"),
			};
		case "LOG_OUT":
			return { logged: false };
		default:
			return state;
	}
};
