import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
	name: string,
	sortProperty: 'rating' | 'title' | 'price'| '-rating' | '-title' | '-price',
}
export interface FiltersState {
	categoryId: number,
	sort: Sort,
	searchValue: string,
	limit: number,
	totalPages: number,
	currentPage: number,
}

const initialState: FiltersState = {
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
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setTotalPages(state, action: PayloadAction<number>) {
			state.totalPages = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FiltersState>) {
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

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state:RootState) => state.filter.sort

export const {
	setCategoryId,
	setSort,
	setSearchValue,
	setCurrentPage,
	setTotalPages,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
