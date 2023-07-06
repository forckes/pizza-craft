export interface IData {
	size: number;
	type: number;
	id: string; //`cause i use mockapi backend, so it hasn't some methods for picking only one item from data
	imageUrl: string;
	name: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
}
