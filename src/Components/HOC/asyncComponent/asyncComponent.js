import React, { Component } from "react";

// different from any other class based component, it returns a class based component
const asyncComponent = (importComponent) => {
	return class extends Component {
		state = {
			component: null,
		};

		componentDidMount() {
			importComponent().then((cmpnt) => {
				console.log(cmpnt);
				this.setState({
					component: cmpnt.default,
				});
			});
		}

		render() {
			const C = this.state.component;

			return C ? <C {...this.props} /> : null;
		}
	};
};

export default asyncComponent;
