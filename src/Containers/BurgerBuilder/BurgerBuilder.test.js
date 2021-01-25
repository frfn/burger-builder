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
		/* 
		we need to pass a mock function to the BurgerBuilder component, 
		`oninitIngredients={ () => {} }`to make it work, 
		since it expects a function called onInitIngredients 
		because we used componentDidMount() to run that function!
		*/
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
	});

	// it() is how to TEST
	it("should render <BuildControls /> when receiving ings", () => {
		// wrapper.setProps({ ingredients: null }); FAILS
		wrapper.setProps({ ingredients: {} }); // PASSES, BurgerBuilder.js will show BuildControls
		expect(wrapper.find(BuildControls)).toHaveLength(1);

		/* 
		this says the Build Controls will show if we have ingredients! 
		( bc the `ingredients` prop comes from FIREBASE, 
		it may not render if we can't fetch the data ) 
		*/
	});
});
