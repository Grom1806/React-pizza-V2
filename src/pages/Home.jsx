import qs from 'qs'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import PaginationComponent from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { sortList } from '../components/Sort'
import { setFilters, setTotalPages } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'

export default function Home() {
	const navigate = useNavigate()
	const dispatch = useDispatch()


	const { limit, searchValue, sort, categoryId, currentPage, totalPages } =
		useSelector(state => state.filter)
	const sortType = sort.sortProperty
	const { pizzas, totalPizzas, status } = useSelector(state => state.pizzas)

	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const fetchData = async () => {
		const order = sortType.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.replace('-', '')
		const category = categoryId ? `&category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''
		const page = `&page=${currentPage}&limit=${limit}`

		dispatch(fetchPizzas({ category, sortBy, order, search, page, limit }))
	}
	useEffect(() => {
		dispatch(setTotalPages(Math.ceil(totalPizzas / limit)))
	}, [totalPizzas, limit])
	
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(location.search.substring(1))
			const sort = sortList.find(
				obj => obj.sortProperty === params.sortProperty
			)
			if (sort) {
				params.sort = sort
			}

			dispatch(setFilters(params))
			isSearch.current = true
		}
	}, [])
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue])

	useEffect(() => {
		if (!isSearch.current) {
			fetchData()
		}
		isSearch.current = false
	}, [categoryId, sortType, searchValue, currentPage])

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				sortProperty: sort.sortProperty,
				categoryId: categoryId > 0 ? categoryId : null,
				currentPage,
			}
			const queryString = qs.stringify(params, { skipNulls: true })

			navigate(`/?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === 'loading' ? (
					[...new Array(limit)].map((_, index) => <Skeleton key={index} />)
				) : status === 'error' ? (
					<h2>🚫 Пиццы не найдены</h2>
				) : (
					pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
				)}
			</div>
			{totalPages > 1 && <PaginationComponent />}
		</div>
	)
}
