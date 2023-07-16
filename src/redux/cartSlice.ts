import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//interface
import { IDataDispatch, IDataItem } from "../types/dataItem.interface";
//rootState
import { RootState } from "./store";
//utils
import { getItemsFromLS } from "../utils/getItemsFromLS";
import { calculateTotalPrice } from "../utils/calcTotalPrice";
import { IRemoveItemPayload, onRemoveItem } from "../utils/removeItemFunc";
import { findExistingItem } from "../utils/findExistingItem";

//interface for initial state
export interface CartSliceState {
	totalPrice: number;
	items: IDataItem[];
}

//
const { items, totalPrice } = getItemsFromLS();

//initial state
const initialState: CartSliceState = {
	items: items,
	totalPrice: totalPrice
};

//slice
export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<IDataItem>) {
			const existingItem = findExistingItem(state.items, {
				id: action.payload.id,
				type: action.payload.type,
				size: action.payload.size
			});

			if (existingItem) {
				existingItem.count += 1;
			} else {
				state.items.push({
					...action.payload,
					count: 1
				});
			}
			state.totalPrice = calculateTotalPrice(state.items);
			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		minusItem(state, action: PayloadAction<IDataDispatch>) {
			const existingItem = findExistingItem(state.items, {
				id: action.payload.id,
				type: action.payload.type,
				size: action.payload.size
			});

			if (existingItem && existingItem.count !== 1) {
				existingItem.count -= 1;
			}
			state.totalPrice = calculateTotalPrice(state.items);
			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		plusItem(state, action: PayloadAction<IDataDispatch>) {
			const existingItem = findExistingItem(state.items, {
				id: action.payload.id,
				type: action.payload.type,
				size: action.payload.size
			});

			if (existingItem) {
				existingItem.count++;
			}
			state.totalPrice = calculateTotalPrice(state.items);
			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		removeItem(state, action: PayloadAction<IRemoveItemPayload>) {
			state.items = onRemoveItem(state.items, action.payload);
			state.totalPrice = calculateTotalPrice(state.items);
			localStorage.setItem("cart", JSON.stringify(state.items));
		},

		clearItems(state) {
			state.items = [];
			state.totalPrice = calculateTotalPrice(state.items);
			localStorage.setItem("cart", JSON.stringify(state.items));
		}
	}
});

//selectors
export const getItemsList = (state: RootState) => state.cart.items;
export const getTotalPrice = (state: RootState) => state.cart.totalPrice;

//actions
export const { addItem, removeItem, clearItems, minusItem, plusItem } =
	cartSlice.actions;
