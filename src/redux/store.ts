import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

//slices
import { filterSlice } from "./filterSlice";
import { cartSlice } from "./cartSlice";

//api
import { pizzasApi } from "../services/pizzas";

//store
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
