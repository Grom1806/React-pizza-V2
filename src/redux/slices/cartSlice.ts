import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}
export interface CartSliceStates {
	totalPrice: number,
  pizzas: CartItem[]
}

const initialState: CartSliceStates = {
	totalPrice: 0,
	pizzas: [],
}


const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<CartItem>) {
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
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.pizzas.find(obj => obj.id === action.payload)
			if (findItem) {
				findItem.count--
			}
			state.totalPrice = state.pizzas.reduce((sum, obj) =>  sum + (obj.price * obj.count), 0)	
		},
	removeFromCart(state, action: PayloadAction<string>) {
			state.pizzas = state.pizzas.filter(obj => obj.id !== action.payload)
			state.totalPrice = state.pizzas.reduce((sum, obj) =>  sum + (obj.price * obj.count), 0)
		},
		clearCart(state) {
			state.pizzas = []
			state.totalPrice = 0	
		},
	},
})
export const cartSelector = (state: RootState) => state.cart

export const selectCartItemById = (id: string) => (state: RootState) =>
	state.cart.pizzas.find(obj => obj.id === id) 

export const { addToCart, removeFromCart, clearCart, minusItem } = cartSlice.actions

export default cartSlice.reducer
