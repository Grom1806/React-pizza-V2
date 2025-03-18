import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setTotalPages } from './filterSlice'
import { RootState } from '../store.js'


type FetchPizzasArgs = {
	category: string
	sortBy: string
	order: string
	search: string
	page: string
	limit: number
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params: FetchPizzasArgs, { rejectWithValue, dispatch }) => {
    try {
      const { category, sortBy, order, search, page, limit} = params
      const { data } = await axios.get(
        `https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}&sortBy=${sortBy}&order=${order}${search}${page}`
      )
      const { data: totalData } = await axios.get(
        `https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}${search}`
      )
			dispatch(setTotalPages(Math.ceil(totalData.length / limit)))
      return { pizzas: data as Pizza[], totalPizzas: totalData.length as number }
    } catch (error) {
      console.error('Error fetching pizzas:', error)
			return rejectWithValue(error)
    }
  }
)

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export interface PizzaSliceState {
	pizzas: Pizza[]
	totalPizzas: number
	status: 'loading' | 'success' | 'error'
}

const initialState: PizzaSliceState = {
	pizzas: [],
	totalPizzas: 0,
	status: 'loading', // 'loading' | 'success' | 'error'
}


const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas(state, action) {
			state.pizzas = action.payload.pizzas
			state.totalPizzas = action.payload.totalPizzas
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading'
				state.pizzas = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.pizzas = action.payload.pizzas
				state.totalPizzas = action.payload.totalPizzas
				state.status = 'success'
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error'
				state.pizzas = []
			})
	},
})

export const selectPizzaData = (state: RootState) => state.pizzas

export default pizzasSlice.reducer
