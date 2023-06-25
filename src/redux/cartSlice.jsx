import { createSlice } from "@reduxjs/toolkit";

const calculateTotalPrice = items => {
	if (items.length === 0) {
		return 0;
	} else {
		return items.reduce((sum, obj) => {
			return obj.price * obj.count + sum;
		}, 0);
	}
};
const initialState = {
	items: [],
	totalPrice: 0
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const existingItem = state.items.find(
				item => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.count += 1;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = calculateTotalPrice(state.items);
		},

		minusItem(state, action) {
			const existingItem = state.items.find(
				item => item.id === action.payload.id
			);
			if (existingItem && existingItem.count !== 1) {
				existingItem.count -= 1;
			} else if (existingItem && existingItem.count === 1) {
				state.items = state.items.filter(item => item.id !== action.payload.id);
			}
			state.totalPrice = calculateTotalPrice(state.items);
		},
		plusItem(state, action) {
			const existingItem = state.items.find(
				item => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.count++;
			}
			state.totalPrice = calculateTotalPrice(state.items);
		},

		removeItem(state, action) {
			state.items = state.items.filter(item => item.id !== action.payload.id);
			state.totalPrice = calculateTotalPrice(state.items);
		},

		clearItems(state) {
			state.items = [];
			state.totalPrice = calculateTotalPrice(state.items);
		}
	}
});

export const getItemsList = state => state.cart.items;
export const getTotalPrice = state => state.cart.totalPrice;

export const { addItem, removeItem, clearItems, minusItem, plusItem } =
	cartSlice.actions;
