import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cash: 0,
		pizzasAmount: 0
	},
	reducers: {
		addToCart(state, action) {
			state.cash += action.payload;
		}
	}
});

export const getCashAmount = state => state.cart.cash;
export const pizzasAmount = state => state.cart.pizzasAmount;

export const { addToCart } = cartSlice.actions;
