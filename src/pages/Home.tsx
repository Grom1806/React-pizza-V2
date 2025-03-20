import Categories from '@/components/Categories'
import PaginationComponent from '@/components/Pagination/Pagination'
import PizzaBlock from '@/components/PizzaBlock/PizzaBlock'
import Skeleton from '@/components/PizzaBlock/Skeleton'
import Sort from '@/components/Sort'
import { selectFilter, } from '@/redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '@/redux/slices/pizzasSlice'
import { useAppDispatch } from '@/redux/store'
import qs from 'qs'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
 const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const { limit, searchValue, sort, categoryId, currentPage, totalPages } =
        useSelector(selectFilter)
    const sortType = sort.sortProperty
    const { pizzas, status } = useSelector(selectPizzaData)

    const isMounted = useRef(false)
    const isSearch = useRef(false)

    const fetchData = async () => {
        const order: string = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy: string = sortType.replace('-', '')
        const category: string = categoryId > 0 ? `&category=${categoryId}` : ''
        const search: string = searchValue ? `&search=${searchValue}` : ''
        const page: string = `&page=${currentPage}&limit=${limit}`

        dispatch(
            
            fetchPizzas({ category, sortBy, order, search, page, limit })
        )
    }

    useEffect(() => {
        fetchData()
    }, [])



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

   
    useEffect(() => {
        if (isSearch.current) {
            fetchData()
        }
        isSearch.current = true
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
                    pizzas.map((pizza:  any) => <PizzaBlock key={pizza.id} {...pizza} />)
                )}
            </div>
            {totalPages > 1 && <PaginationComponent />}
        </div>
    )
}
export default Home