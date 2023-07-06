import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./filterSlice";
import { cartSlice } from "./cartSlice";
import { pizzasApi } from "../services/pizzas";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		filter: filterSlice.reducer,
		cart: cartSlice.reducer,
		[pizzasApi.reducerPath]: pizzasApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(pizzasApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
