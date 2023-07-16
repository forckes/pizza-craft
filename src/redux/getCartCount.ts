import { createSelector } from "@reduxjs/toolkit";
import { getItemsList, getTotalPrice } from "../redux/cartSlice";

export const getCartCountAndTotalPrice = createSelector(
	getItemsList,
	getTotalPrice,
	(items, totalPrice) => ({
		count: items.reduce((acc, item) => acc + item.count, 0),
		totalPrice
	})
);
