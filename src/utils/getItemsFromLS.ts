import { IDataItem } from "../types/dataItem.interface";
import { calculateTotalPrice } from "./calcTotalPrice";

export const getItemsFromLS = () => {
	const data = localStorage.getItem("cart");
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calculateTotalPrice(items);

	return {
		items: items as IDataItem[],
		totalPrice
	};
};
