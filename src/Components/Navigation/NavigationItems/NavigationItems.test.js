/* First Test! */

/* Enyzme is cool because we can test components BY ITSELF, and isolate testings */

/* shallow() is the most popular, renders without having to render the whole tree */

/*
beforeEach() OR afterEach() 
Testing methods to do before OR after EACH indivdual tests, 
it is cleaning up each tests and all tests will be independant from each other 
*/

/* 
Jest + Enzyme
decribe("component name", () => {

	// before each | after each
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Component />)
	})

	it("should do this", () => {
		expect()
	})

	it("should do this", () => {
		wrapper.setProps({ btnToggle: true})
		expect()
	})
})

beforeEach(() => {
	clean up code for next test
})

it("what should the component do", () => {})

expect() -- this is the test
*/

import React from "react";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() }); // setting up the adapter

describe("<NavigationItems />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it("should render two <NavigationItem /> elements IF NOT authenticated...", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should render three <NavigationItem /> elements IF authenticated...", () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it("should show Authenticate", () => {
		wrapper.setProps({ isAuthenticated: false });
		expect(
			wrapper.contains(
				<NavigationItem link="/auth">Sign In / Register</NavigationItem>
			)
		);
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
