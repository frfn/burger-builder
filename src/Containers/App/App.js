import React, { Component } from "react";
import Layout from "../../Components/Layout/Layout";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Checkout from "../Checkout/Checkout";
import Orders from "../../Containers/Orders/Orders";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Auth from "../../Containers/Auth/Auth";
import Logout from "../Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignUp();
	}

	render() {
		// created /404 for a quick render that there is an error!

		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
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
					<Route path="/logout" component={Logout} />
					<Route path="/404" render={() => <div>404 ERROR</div>} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/" component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return (
			<Layout>
				{/* you can also use 'exact', though it is not required for this setup | Last Route for URL catching */}
				{routes}
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
