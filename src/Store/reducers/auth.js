import * as actionTypes from "../actions/actionTypes";
import { udpateObject } from "../utility";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: "/",
};

// action isnt used
const authStart = (state, action) => {
	return udpateObject(state, { error: null, loading: true });
	// return {
	// 	...state,
	// 	error: null,
	// 	loading: true,
	// }; // error: null to reset error
};

const authSuccess = (state, action) => {
	const newState = {
		token: action.idToken,
		userId: action.userId,
		error: null,
		loading: false,
	};

	// console.log(newState);
	return udpateObject(state, newState);
	// return { ...state, ...newState };
};

const authFail = (state, action) => {
	return udpateObject(state, { loading: false, error: action.error });
	// return { ...state, loading: false, error: action.error };
};

const authLogout = (state, action) => {
	return udpateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
	return udpateObject(state, {
		authRedirectPath: action.path,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		default:
			return state;
	}
};

export default reducer;
