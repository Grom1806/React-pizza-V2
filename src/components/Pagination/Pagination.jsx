import Pagination from '@mui/material/Pagination'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/filterSlice'

const theme = createTheme({
	palette: {
		primary: {
			main: '#FE5F1E',
		},
	},
})

const PaginationComponent = () => {
	const { currentPage, totalPages } = useSelector(state => state.filter)
	const dispatch = useDispatch()

	return (
		<ThemeProvider theme={theme}>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={(_, num) => dispatch(setCurrentPage(num))}
				color='primary'
				size='large'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mt: 3,
					'& .MuiPaginationItem-root': {
						fontWeight: 'bold',
					},
				}}
			/>
		</ThemeProvider>
	)
}

export default PaginationComponent
