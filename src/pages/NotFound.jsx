import React from 'react'
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
	return (
		<div className='not-found'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<NotFoundBlock />
			</motion.div>

			<motion.div
				className='cart__bottom-buttons'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				<Link
					to='/'
					className='button button--outline button--add go-back-btn'
				>
					<motion.svg
						width={8}
						height={14}
						viewBox='0 0 8 14'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						whileHover={{ scale: 1.2 }}
						transition={{ duration: 0.3 }}
					>
						<path
							d='M7 13L1 6.93015L6.86175 1'
							stroke='#D3D3D3'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</motion.svg>
					<span>Вернуться назад</span>
				</Link>
			</motion.div>
		</div>
	)
}
