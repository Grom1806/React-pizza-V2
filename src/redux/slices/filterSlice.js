import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
	searchValue: '',
	limit: 4,
	totalPages: 1,
	currentPage: 1,
}
const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
		setTotalPages(state, action) {
			state.totalPages = action.payload
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.categoryId =
				action.payload.categoryId !== undefined
					? Number(action.payload.categoryId)
					: 0
			state.sort = action.payload.sort || initialState.sort
			state.searchValue = action.payload.searchValue || ''
			state.limit =
				action.payload.limit !== undefined
					? Number(action.payload.limit)
					: initialState.limit
			state.currentPage =
				action.payload.currentPage !== undefined
					? Number(action.payload.currentPage)
					: 1
			state.totalPages =
				action.payload.totalPages !== undefined
					? Number(action.payload.totalPages)
					: 1
		},
	},
})

export const {
	setCategoryId,
	setSort,
	setSearchValue,
	setCurrentPage,
	setTotalPages,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
