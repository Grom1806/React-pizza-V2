import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice.js'

export const store = configureStore({
	reducer: {
		filter: filterReducer,
	},
})
 