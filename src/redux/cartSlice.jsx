import { createSlice } from "@reduxjs/toolkit";

//functions
const calculateTotalPrice = items => {
	if (items.length === 0) {
		return 0;
	} else {
		return items.reduce((sum, obj) => {
			return obj.price * obj.count + sum;
		}, 0);
	}
};
const findExistingItem = (items, payload) => {
	return items.find(item => {
		return (
			item.id === payload.id &&
			item.type === payload.type &&
			item.size === payload.size
		);
	});
};
const onRemoveItem = (items, payload) => {
	return items.filter(item => {
		return (
			item.id !== payload.id ||
			item.type !== payload.type ||
			item.size !== payload.size
		);
	});
};

//initial state
const initialState = {
	items: [],
	totalPrice: 0
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const existingItem = findExistingItem(state.items, action.payload);

			if (existingItem) {
				existingItem.count += 1;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = calculateTotalPrice(state.items);
		},

		minusItem(state, action) {
			const existingItem = findExistingItem(state.items, action.payload);

			if (existingItem && existingItem.count !== 1) {
				existingItem.count -= 1;
			} else if (existingItem && existingItem.count === 1) {
				state.items = onRemoveItem(state.items, action.payload);
			}
			state.totalPrice = calculateTotalPrice(state.items);
		},
		plusItem(state, action) {
			const existingItem = findExistingItem(state.items, action.payload);

			if (existingItem) {
				existingItem.count++;
			}
			state.totalPrice = calculateTotalPrice(state.items);
		},

		removeItem(state, action) {
			state.items = onRemoveItem(state.items, action.payload);
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
