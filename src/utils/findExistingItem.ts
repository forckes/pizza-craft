import { IDataItem } from "../types/dataItem.interface";

interface IFindExistingItemPayload {
	id: string;
	type: string;
	size: number;
}

interface IFindExistingItemFunction {
	(items: IDataItem[], payload: IFindExistingItemPayload):
		| IDataItem
		| undefined;
}

export const findExistingItem: IFindExistingItemFunction = (items, payload) => {
	return items.find(item => {
		return (
			item.id === payload.id &&
			item.type === payload.type &&
			item.size === payload.size
		);
	});
};
