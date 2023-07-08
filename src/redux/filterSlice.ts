import { createSlice } from "@reduxjs/toolkit";

interface IFilter {
	categoryId: number;
	currentPage: number;
	sort: {
		name: string;
		sortProperty: string;
	};
}

export const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: "популярності ↓",
		sortProperty: "rating"
	}
};

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

export const getCategoryId = state => state.filter.categoryId;
export const getSort = state => state.filter.sort;
export const getCurrentPage = state => state.filter.currentPage;

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
	filterSlice.actions;
