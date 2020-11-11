/* First Test! */

import React from "react";
import NavigationItems from "../NavigationItems";
import NavigationItem from "../NavigationItem/NavigationItem";

/* Enyzme is cool because we can test components BY ITSELF, and do isolate testing.
looking into the component and isolating it, Enzyme gives us another helper, 'shallow'. */

/* shallow is the most popular, renders the component with ALL it's content */
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Just setting up the adapter, this is it. You're done.
configure({ adapter: new Adapter() });

// describe() comes from Jest, made available by create-react-app
describe("<NavigationItems />", () => {
	// it() allows you write a test!, comes automatically
	it("should render two <NavigationItem /> elements if not authenticated...", () => {
		// create an instance of NavigationItems to test
		const wrapper = shallow(<NavigationItems />);

		// Expectation, this can be flexible, find two NavItem components, or one, or three!
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
});

// '<NavigationItems /> is the description of the Test Bundle, the naming is like this but not needed, this is conventional way
// second argument is the test
