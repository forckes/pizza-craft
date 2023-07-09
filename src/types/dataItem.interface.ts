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
