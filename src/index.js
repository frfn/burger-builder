import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

// Redux Thunk
import thunk from "redux-thunk";

// Reducer
import burgerBuilderReducer from "./Store/reducers/burgerBuilder";
import orderReducer from "./Store/reducers/order";
import authReducer from "./Store/reducers/auth";

// Saga
import createSagaMiddleware from "redux-saga";
// import { logoutSaga } from "./Store/sagas/auth";
import { watchAuth } from "./Store/sagas/";

// You can put inside variable for more clean look
/* const app = (
  <BrowserRouter>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</BrowserRouter>
); */

// SAGA ****
const sagaMiddleware = createSagaMiddleware();

// composed middleware/enhancers
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// does not work for me, but Redux Tool is only for Development Side!
/* 
const composeEnhancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
*/

// combining reducer
const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename="flexers-app">
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
