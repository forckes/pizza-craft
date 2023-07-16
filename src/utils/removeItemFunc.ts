import { IDataItem } from "../types/dataItem.interface";

export interface IRemoveItemPayload {
	id: string;
	type: string;
	size: number;
}

interface IOnRemoveItemFunction {
	(items: IDataItem[], payload: IRemoveItemPayload): IDataItem[];
}

export const onRemoveItem: IOnRemoveItemFunction = (items, payload) => {
	return items.filter(item => {
		return (
			item.id !== payload.id ||
			item.type !== payload.type ||
			item.size !== payload.size
		);
	});
};
