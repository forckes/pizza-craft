export interface IDataItem {
	id: string;
	imageUrl: string;
	title: string;
	price: number;
	size: number;
	type: string;
	count: number;
}
export interface IDataCartItem extends Omit<IDataItem, "count"> {}

export interface IDataDispatch
	extends Pick<IDataItem, "id" | "type" | "size"> {}
