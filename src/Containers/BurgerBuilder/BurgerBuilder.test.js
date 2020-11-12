import { BurgerBuilder } from "./BurgerBuilder";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// testing to see if build controls show or not
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
	});

	it("should render <BuildControls /> when receiving ings", () => {
		// wrapper.setProps({ ingredients: null }); FAILS
		wrapper.setProps({ ingredients: {} }); // PASSES, BurgerBuilder.js will show BuildControls
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
