import NumberFlow from '@number-flow/react'
import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCart, selectCartItemById } from '../redux/slices/cartSlice'

const typeNames = ['Тонкое', 'Традиционное']

const FullPizza: React.FC = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const [pizza, setPizza] = useState<{
		id: string
		title: string
		price: number
		imageUrl: string
		types: number[]
		sizes: number[]
	}>()
	const [activeType, setActiveType] = useState<number>(0)
	const [activeSize, setActiveSize] = useState<number>(0)
	const cartItem = useSelector(selectCartItemById(id))
	const addedCount = cartItem ? cartItem.count : 0

	useEffect(() => {
		window.scrollTo(0, 0)
		axios
			.get(`https://67366061aafa2ef222305c73.mockapi.io/pizza-block/${id}`)
			.then(({ data }) => setPizza(data))
			.catch(error => console.log(error))
	}, [id])

	if (!pizza) {
		return <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Загрузка...</motion.h2>
	}

	const addPizzaToCart = () => {
		const item = {
			id: pizza.id,
			title: pizza.title,
			price: pizza.price,
			imageUrl: pizza.imageUrl,
			type: typeNames[activeType],
			size: pizza.sizes ? pizza.sizes[activeSize] : '',
		}
		dispatch(addToCart(item))
	}

	return (
		<motion.div className='full-pizza-wrapper' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
			<div className='container'>
				<div className='full-pizza'>
					<motion.img
						src={pizza.imageUrl}
						alt='Пицца'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					/>
					<motion.div className='full-pizza__info' initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
						<motion.h2>{pizza.title}</motion.h2>
						<div className='pizza-block__selector'>
							<ul>
								{pizza.types?.map((type, index) => (
									<motion.li
										key={type}
										className={activeType === index ? 'active' : ''}
										onClick={() => setActiveType(index)}
										whileTap={{ scale: 0.9 }}
									>
										{typeNames[type]}
									</motion.li>
								)) || []}
							</ul>
							<ul>
								{pizza.sizes?.map((size, index) => (
									<motion.li
										key={index}
										className={activeSize === index ? 'active' : ''}
										onClick={() => setActiveSize(index)}
										whileTap={{ scale: 0.9 }}
									>
										{size} см.
									</motion.li>
								)) || []}
							</ul>
						</div>
						<motion.div className='full-pizza__price'>{pizza.price} ₽</motion.div>
						<motion.div className='cart__bottom-buttons full-pizza__buttons'>
							<Link to='/' className='button button--outline button--add go-back-btn'>
								<span>Вернуться назад</span>
							</Link>
							<motion.button
								className='button button--outline button--add'
								onClick={addPizzaToCart}
								whileHover={{ scale: 1.05 }}
							>
								<span>В корзину</span>
								{addedCount > 0 && <i>
									<NumberFlow trend={0} value={addedCount}/></i>}
							</motion.button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	)
}

export default FullPizza
