import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./filterSlice";
import { cartSlice } from "./cartSlice";

export const store = configureStore({
	reducer: {
		filter: filterSlice,
		cart: cartSlice
	}
});
