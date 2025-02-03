import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
	categoryIndex: 0,
	searchValue: '',
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryIndex: (state, action) => {
			state.categoryIndex = action.payload
		},
		setSort: (state, action) => {
			state.sort = action.payload
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload
		},
	},
})

export const { setCategoryIndex, setSort, setSearchValue } = filterSlice.actions

export default filterSlice.reducer