/* we're not testing react components! */

/* 
We do not have to render a component so this will be more simple,
we are ONLY testing a FUNCTION,
a Reducer is just a JavaScript function at the end of the day!
*/

/* 
how does it work?
well you know how the reducer works, so test it.
you give the reducer an action,
the action should give it a .type,
test if the reducer actually works.
*/

import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
	it("should return initial state", () => {
		/* why undefined? this is in the form of (state, action)! */

		// state will be the initialState if undefined is passed!

		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: "/",
		});
	});

	it("should store the token upon login", () => {
		expect(
			/* reducer( {state is initial state}, {action passes auth success} ) */
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					authRedirectPath: "/",
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: "some-token",
					userId: "some-user-id",
				}
			)
			/* reducer should NOW equal some token, some user id, etc */
			// take note of the keys and values, they must be EXACTLY the same from the actual reducer
		).toEqual({
			token: "some-token",
			userId: "some-user-id",
			error: null,
			loading: false,
			authRedirectPath: "/",
		});
	});
});
