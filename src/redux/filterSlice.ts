import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

//interface
interface IFilter {
	categoryId: number;
	currentPage: number;
	searchValue: string;
	sort: {
		name: string;
		sortProperty: string;
	};
}

//initial state
export const initialState: IFilter = {
	categoryId: 0,
	currentPage: 1,
	searchValue: "",
	sort: {
		name: "популярності ↓",
		sortProperty: "rating"
	}
};

//slice
export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.categoryId = Number(action.payload.categoryId);
			state.currentPage = Number(action.payload.currentPage);
			state.sort = action.payload.sort;
			state.searchValue = action.payload.searchValue;
		}
	}
});

//selectors
export const getCategoryId = (state: RootState) => state.filter.categoryId;
export const getSort = (state: RootState) => state.filter.sort;
export const getCurrentPage = (state: RootState) => state.filter.currentPage;

//actions
export const { setCategoryId, setSort, setCurrentPage, setFilters } =
	filterSlice.actions;
