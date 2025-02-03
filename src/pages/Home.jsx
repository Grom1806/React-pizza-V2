import React, { use, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import PaginationComponent from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'

export default function Home() {
	const categoryIndex = useSelector(state => state.filter.categoryIndex)
	const { searchValue } = use(SearchContext)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const sortType = useSelector(state => state.filter.sort)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const limit = 4

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
			const sortBy = sortType.sortProperty.replace('-', '')
			const category = categoryIndex ? `&category=${categoryIndex}` : ''
			const search = searchValue ? `&search=${searchValue}` : ''
			const page = `&page=${currentPage}&limit=${limit}`

			try {
				const countResponse = await fetch(
					`https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}${search}`
				)
				if (!countResponse.ok)
					throw new Error('Ошибка загрузки количества пицц!')
				const countData = await countResponse.json()
				setTotalPages(Math.ceil(countData.length / limit))

				const response = await fetch(
					`https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}&sortBy=${sortBy}&order=${order}${search}${page}`
				)
				if (!response.ok) throw new Error('Ошибка загрузки данных!')

				const json = await response.json()
				setItems(json)
			} catch (error) {
				console.error('Ошибка загрузки данных:', error.message)
			} finally {
				setIsLoading(false)
				window.scrollTo(0, 0)
			}
		}

		fetchData()
	}, [categoryIndex, sortType, searchValue, currentPage])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(limit)].map((_, index) => <Skeleton key={index} />)
					: items.map(item => <PizzaBlock key={item.id} {...item} />)}
			</div>

			{totalPages > 1 && (
				<PaginationComponent
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					totalPages={totalPages}
				/>
			)}
		</div>
	)
}
