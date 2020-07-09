import React, { Component } from "react";
import Layout from "../../Components/Layout/Layout";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Checkout from "../Checkout/Checkout";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
	render() {
		return (
			<Layout>
				{/* you can also use 'exact', though it is not required for this setup | Last Route for URL catching */}
				<Switch>
					<Route path='/checkout' component={Checkout} />
					<Route path='/' component={BurgerBuilder} />
					<Route component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}
