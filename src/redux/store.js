import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice.js'
import cartReducer from './slices/cartSlice.js'
import pizzasReducer from './slices/pizzasSlice.js'



export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
		pizzas: pizzasReducer
	},
})
