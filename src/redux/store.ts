import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

//slices
import { filterSlice } from "./filterSlice";

//api
import { pizzasApi } from "../services/pizzas";

//persist
import {
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from "redux-persist";

import { persistedCartReducer } from "./cartSlice";

//store
export const store = configureStore({
	reducer: {
		filter: filterSlice.reducer,
		cart: persistedCartReducer,
		[pizzasApi.reducerPath]: pizzasApi.reducer
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}),
		pizzasApi.middleware
	]
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export let persistor = persistStore(store);
