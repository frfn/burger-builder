// utility file that helps keep actions all in one place

export {
	addIngredient,
	removeIngredient,
	initIngredient,
} from "./burgerBuilder"; // initIngrdient is a thunk method
export { purchaseBurger, purchaseInit, fetchOrders } from "./order"; // purchaseBurger + fetchOrders is async
