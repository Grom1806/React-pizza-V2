import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Categories from '../components/Categories';
import PaginationComponent from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { setFilters, setTotalPages } from '../redux/slices/filterSlice';

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation(); // 🌍 Получаем текущий URL
	const dispatch = useDispatch();

	// 🎛 Извлекаем состояние фильтров из Redux
	const { limit, searchValue, sort, categoryId, currentPage, totalPages } = useSelector(state => state.filter);
	const sortType = sort.sortProperty;

	const [pizzas, setPizzas] = useState([]); // 🍕 Список пицц
	const [isLoading, setIsLoading] = useState(true); // ⏳ Состояние загрузки

	const isSearch = useRef(false); // 🔍 Флаг для проверки URL
	const isMounted = useRef(false); // 🚀 Флаг первого рендера

	// 📡 Функция загрузки данных
	const fetchData = async () => {
		const order = sortType.includes('-') ? 'asc' : 'desc'; // 🔄 Определяем порядок сортировки
		const sortBy = sortType.replace('-', ''); // 🔤 Форматируем параметр сортировки
		const category = categoryId ? `&category=${categoryId}` : ''; // 🍕 Фильтр по категории
		const search = searchValue ? `&search=${searchValue}` : ''; // 🔎 Фильтр по поиску
		const page = `&page=${currentPage}&limit=${limit}`; // 📜 Пагинация

		setIsLoading(true); // ⏳ Устанавливаем состояние загрузки

		try {
			// 📡 Запрос на получение списка пицц
			const { data } = await axios.get(
				`https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}&sortBy=${sortBy}&order=${order}${search}${page}`
			);
			setPizzas(data);

			// 🔢 Запрос на получение общего количества товаров для пагинации
			const { data: totalData } = await axios.get(
				`https://67366061aafa2ef222305c73.mockapi.io/pizza-block?${category}${search}`
			);
			dispatch(setTotalPages(Math.ceil(totalData.length / limit)));
		} catch (error) {
			console.error('❌ Ошибка при загрузке данных:', error);
		} finally {
			setIsLoading(false); // ✅ Выключаем состояние загрузки
		}
	};

	// 🔄 Читаем параметры из URL при первом рендере
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(location.search.substring(1)); // 🗺 Разбираем параметры
			const sort = sortList.find(obj => obj.sortProperty === obj.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true; // ✅ Указываем, что параметры загружены
		}
	}, []);

	// 📡 Запрос данных после изменения фильтров
	useEffect(() => {
		window.scrollTo(0, 0); // ⬆️ Скроллим наверх
		if (!isSearch.current) {
			fetchData(); // 📡 Вызываем загрузку данных
		}
		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage, limit]);

	// 🔗 Обновление URL при изменении фильтров
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`); // 🔗 Обновляем строку запроса
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage, navigate]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? (
					[...new Array(limit)].map((_, index) => <Skeleton key={index} />) // ⏳ Отображаем скелетоны во время загрузки
				) : pizzas.length === 0 ? (
					<p>🚫 Пиццы не найдены</p>
				) : (
					pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />) // 🍕 Отображаем карточки пицц
				)}
			</div>

			{totalPages > 1 && <PaginationComponent />} {/* 📄 Показываем пагинацию если страниц больше одной */}
		</div>
	);
}
