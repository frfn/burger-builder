// Strings for constants when using with action creators and reducers
// a utility file that consists of strings that are constants so cases or types will not be misspelled

// add/remove action types
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS"; // fetching ingredients from database
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED"; // when fetching fails

// order action types
export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START";
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
export const PURCHASE_INIT = "PURCHASE_INIT";

// orders
export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";
