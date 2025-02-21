import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	pizzas: [],
}


const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			const findItem = state.pizzas.find(obj => obj.id === action.payload.id)
			if (findItem) {
				findItem.count++
			} else {
				state.pizzas.push({...action.payload, count: 1})
			}
			state.totalPrice = state.pizzas.reduce((sum, obj) => {
				return sum + (obj.price * obj.count)
			}, 0)
		},
		minusItem(state, action) {
			const findItem = state.pizzas.find(obj => obj.id === action.payload)
			if (findItem) {
				findItem.count--
			}
			state.totalPrice = state.pizzas.reduce((sum, obj) =>  sum + (obj.price * obj.count), 0)	
		},
		removeFromCart(state, action) {
			state.pizzas = state.pizzas.filter(obj => obj.id !== action.payload)
			state.totalPrice = state.pizzas.reduce((sum, obj) =>  sum + (obj.price * obj.count), 0)
		},
		clearCart(state, action) {
			state.pizzas = []
			state.totalPrice = 0
		},
	},
})
export const cartSelector = (state) => state.cart

export const selectCartItemById = (id) => (state) =>
	state.cart.pizzas.find(obj => obj.id === id) 

export const { addToCart, removeFromCart, clearCart, minusItem } = cartSlice.actions

export default cartSlice.reducer
