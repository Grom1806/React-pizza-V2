import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, { rejectWithValue }) => {
    try {
      const { category, sortBy, order, search, page } = params
      const { data } = await axios.get(
        `https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}&sortBy=${sortBy}&order=${order}${search}${page}`
      )
      const { data: totalData } = await axios.get(
        `https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}${search}`
      )

      return { pizzas: data, totalPizzas: totalData.length }
    } catch (error) {
      console.error('Error fetching pizzas:', error)
			return rejectWithValue(error)
    }
  }
)


const initialState = {
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

export default pizzasSlice.reducer
