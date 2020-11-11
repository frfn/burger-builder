import axios from "axios";
import * as actionTypes from "./actionTypes";

// actions just return a js object
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData, // object of token AND userId
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000); // 3600? yeah 3.6 SECONDS! so multiple by 1000
	};
};

// thunk ... isSignup is just a boolean value passed from Auth.js in Containers
export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart()); // loading

		// This object MUST be in this form so that it can talk with server. IT MUST BE.
		// this comes from firebase, it's the setup you have to push to get a REST response back
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		// This the REST API structure that I have studied about, it will need certain information to COMMUNICATE with server,
		// server will then reply with a response, there we will USE that response as shown below.
		// response is the Token, expiresIn, user ID, the whole object that contains these props.

		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANsh8OCw61tWrHkYKuVyqRcKfAWfrgcR4";

		if (!isSignup) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANsh8OCw61tWrHkYKuVyqRcKfAWfrgcR4";
		}

		axios
			.post(url, authData)
			.then((res) => {
				// console.log(res);

				// Date().getTime() returns the time in milliseconds
				// the expiresIn is multiplied by 1000 to make 3600 to hour!
				// it is wrapped again in Date(Date()) so it becomes a date obj
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userId", res.data.localId);

				dispatch(authSuccess(res.data)); // will contain token PLUS userId
				dispatch(checkAuthTimeout(+res.data.expiresIn)); // expiry time
			})
			// axios wraps the error object! check the two console logs! The first log does not show the response data AT ALL.
			.catch((error) => {
				// console.log(error);
				// console.log(error.response);
				console.log(error);
				dispatch(authFail(error.response.data.error.message));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

// utility function that CHECKS.
export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			// console.log("FIRST ONE TRIGGERED");
			dispatch(logout());
		} else {
			// getItem() will return string, new Date makes it into an obj
			const expirationDate = new Date(
				localStorage.getItem("expirationDate")
			);

			//  12:01PM           11:01AM
			if (expirationDate <= new Date()) {
				// so logout when new Date() obj hits expirationDate time
				// console.log("SECOND ONE TRIGGERED");
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				const authData = {
					token: token,
					userId: userId,
				};
				dispatch(authSuccess(authData));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
