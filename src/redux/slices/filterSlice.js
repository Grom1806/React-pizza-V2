import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
	currentPage: 1,
	searchValue: '',
};

const filterSlice = createSlice({
	name: 'filters',
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
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;