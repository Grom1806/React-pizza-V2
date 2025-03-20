import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store.js'
import { setTotalPages } from './filterSlice'


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
      const { data } = await axios.get<Pizza[]>(
        `https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}&sortBy=${sortBy}&order=${order}${search}${page}`
      )
      const { data: totalData } = await axios.get<number[]>(
        `https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}${search}`
      )
			dispatch(setTotalPages(Math.ceil(totalData.length / limit)))
      return { pizzas: data, totalPizzas: totalData.length}
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

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
	pizzas: Pizza[]
	totalPizzas: number
	status: Status
}

const initialState: PizzaSliceState = {
	pizzas: [],
	totalPizzas: 0,
	status: Status.LOADING // 'loading' | 'success' | 'error'
}


const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas(state, action: PayloadAction<PizzaSliceState>) {
			state.pizzas = action.payload.pizzas
			state.totalPizzas = action.payload.totalPizzas
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING
				state.pizzas = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.pizzas = action.payload.pizzas
				state.totalPizzas = action.payload.totalPizzas
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR
				state.pizzas = []
			})
	},
})

export const selectPizzaData = (state: RootState) => state.pizzas

export default pizzasSlice.reducer
