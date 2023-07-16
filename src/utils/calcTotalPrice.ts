import { IDataItem } from "../types/dataItem.interface";

interface ICalculateTotalPriceFunction {
	(items: IDataItem[]): number;
}

export const calculateTotalPrice: ICalculateTotalPriceFunction = items => {
	if (items.length === 0) {
		return 0;
	} else {
		return items.reduce((sum, obj) => {
			return obj.price * obj.count + sum;
		}, 0);
	}
};
