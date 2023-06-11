import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
	name: "filter",
	initialState: {
		categoryId: 0,
		sort: {
			name: "",
			sortProperty: ""
		}
	},
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		}
	}
});

export const getCategoryId = state => state.filter.categoryId;

export const { setCategoryId } = filterSlice.actions;
