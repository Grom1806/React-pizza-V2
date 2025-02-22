import NumberFlow from '@number-flow/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, selectCartItemById } from '@/redux/slices/cartSlice'

const typeNames = ['тонкое', 'традиционное']

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cartItem = useSelector(selectCartItemById(id))
	const [activeType, setActiveType] = useState(0)
	const [activeSize, setActiveSize] = useState(0)

	const addedCount = cartItem ? cartItem.count : 0
	const onClickAdd = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSize],
		}
		dispatch(addToCart(item))
	}
	const openFullPizza = () => {
		navigate(`/pizza/${id}`)
	}

	return (
		<div className='pizza-block-wrapper'>
			<motion.div
				className='pizza-block'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
			>
				<img
					className='pizza-block__image'
					src={imageUrl}
					alt='Pizza'
					onClick={openFullPizza}
				/>
				<h4 className='pizza-block__title'>{title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((type, index) => (
							<motion.li
								key={type}
								className={activeType === index ? 'active' : ''}
								onClick={() => setActiveType(index)}
								initial={{ scale: 1, opacity: 0.7 }}
								animate={{
									scale: activeType === index ? 1 : 0.9,
									opacity: activeType === index ? 1 : 0.7,
								}}
								transition={{
									duration: 0.3,
									type: 'spring',
									stiffness: 300,
								}}
							>
								{typeNames[type]}
							</motion.li>
						))}
					</ul>
					<ul>
						{sizes.map((size, index) => (
							<motion.li
								key={index}
								className={activeSize === index ? 'active' : ''}
								onClick={() => setActiveSize(index)}
								initial={{ scale: 1, opacity: 0.7 }}
								animate={{
									scale: activeSize === index ? 1.1 : 1,
									opacity: activeSize === index ? 1 : 0.7,
								}}
								transition={{
									duration: 0.3,
									type: 'spring',
									stiffness: 300,
								}}
							>
								{size} см.
							</motion.li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<motion.div
						className='pizza-block__price'
						initial={{ y: 10 }}
						animate={{ y: 0 }}
						transition={{ duration: 0.4, ease: 'easeOut' }}
					>
						от {price} ₽
					</motion.div>
					<motion.button
						onClick={onClickAdd}
						className='button button--outline button--add'
						initial={{ scale: 1 }}
						whileHover={{
							scale: 1.1,
							rotate: 10,
							transition: { duration: 0.2 },
						}}
						whileTap={{
							scale: 0.95,
							transition: { duration: 0.1 },
						}}
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && (
							<i>
								{' '}
								<NumberFlow trend={0} value={addedCount} />
							</i>
						)}
					</motion.button>
				</div>
			</motion.div>
		</div>
	)
}

export default PizzaBlock
