import React, { Component } from "react";
import Layout from "../../Components/Layout/Layout";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Checkout from "../Checkout/Checkout";
import Orders from "../../Containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
	render() {
		// created /404 for a quick render that there is an error!

		return (
			<Layout>
				{/* you can also use 'exact', though it is not required for this setup | Last Route for URL catching */}
				<Switch>
					<Route path="/404" render={() => <div>404 ERROR</div>} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/" component={BurgerBuilder} />
					<Route component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}
