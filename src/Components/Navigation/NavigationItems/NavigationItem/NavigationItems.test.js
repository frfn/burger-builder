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
	/* Testing methods to do before OR after EACH indivdual tests for clean up, it is a clean up and all tests will be independant */
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});
	// afterEach();

	// it() allows you write a test!, comes automatically installed with create-react-app
	it("should render two <NavigationItem /> elements IF NOT authenticated...", () => {
		// create an instance of NavigationItems to test
		// wrapper = shallow(<NavigationItems />);

		// Expectation, this can be flexible, find two NavItem components, or one, or three!
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should render three <NavigationItem /> elements IF authenticated...", () => {
		// wrapper = shallow(<NavigationItems isAuthenticated />); // isAuthenticated == truthy value
		// setProps! so you can get props passed in the wrapper! OR the NavigationItems
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it("should show Log Out", () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(
			wrapper.contains(
				<NavigationItem link="/logout">Logout</NavigationItem>
			)
		).toEqual(true);
	});
});

// '<NavigationItems /> is the description of the Test Bundle, the naming is like this but not needed, this is conventional way
// second argument is the test

// Official Docs will give you more knowledge FOR TESTING!
/* JEST DOC, it will give you a more in depth instruction and configuration, API References is important "Expect" and the chains you can do for it (.toHaveLength(3))  */
