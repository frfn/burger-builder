import React, { Component, lazy, Suspense } from "react";
import Layout from "../../Components/Layout/Layout";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";

// import Checkout from "../Checkout/Checkout";
// import Orders from "../../Containers/Orders/Orders";
// import Auth from "../../Containers/Auth/Auth";

import Spinner from "../../Components/UI/Spinner/Spinner";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Logout from "../Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";

// asyncComponent Way
import asyncComponent from "../../Components/HOC/asyncComponent/asyncComponent";

// React Suspense
const Checkout = lazy(() => import("../../Containers/Checkout/Checkout"));
const Auth = lazy(() => import("../../Containers/Auth/Auth"));
const Orders = lazy(() => import("../../Containers/Orders/Orders"));

// const asyncCheckout = asyncComponent(() => {
// 	return import("../../Containers/Checkout/Checkout");
// });

const asyncOrders = asyncComponent(() => {
	return import("../../Containers/Orders/Orders");
});

// const asyncAuth = asyncComponent(() => {
// 	return import("../../Containers/Auth/Auth");
// });

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignUp();
	}

	render() {
		// created /404 for a quick render that there is an error!

		let routes = (
			<Switch>
				<Route path="/auth" render={(props) => <Auth {...props} />} />
				<Route path="/404" render={() => <div>404 ERROR</div>} />
				<Route path="/" component={BurgerBuilder} />
				{/* <Route component={BurgerBuilder} /> */}
				<Redirect to="/" />
			</Switch>
		);

		// only if authenticated, THEN, give the routes!
		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route
						path="/auth"
						render={(props) => <Auth {...props} />}
					/>
					<Route path="/logout" component={Logout} />
					<Route path="/404" render={() => <div>404 ERROR</div>} />
					<Route
						path="/checkout"
						render={(props) => <Checkout {...props} />}
					/>
					<Route path="/orders" component={asyncOrders} />
					<Route path="/" component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return (
			<Layout>
				<Suspense fallback={<Spinner />}>
					{/* you can also use 'exact', though it is not required for this setup | Last Route for URL catching */}

					{routes}
				</Suspense>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
