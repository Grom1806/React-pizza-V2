import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

function Sort({ value, onChangeSort }) {
	const [isVisible, setIsVisible] = useState(false)
	const sortList = [
		{
			name: 'популярности по возрастанию',
			sortProperty: '-rating',
			
		},
		{
			name: 'популярности по убыванию',
			sortProperty: 'ating',
			
		},
		{ name: 'цене по возрастанию', sortProperty: '-price',  },
		{ name: 'цене по убыванию', sortProperty: 'price', order: 'desc' },
		{ name: 'алфавиту по возрастанию', sortProperty: '-title',  },
		{ name: 'алфавиту по убыванию', sortProperty: 'title',  },
	]
	const nodeRef = useRef(null)

	const handleClickListItem = index => {
		onChangeSort(index)
		setIsVisible(false)
	}

	return (
		<div className='sort'>
			<div className='sort__label'>
				<svg
					className={isVisible ? 'arrow rotate' : 'arrow'}
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
			</div>

			<CSSTransition
				in={isVisible}
				timeout={350}
				classNames='fade'
				nodeRef={nodeRef}
				unmountOnExit
			>
				<div className='sort__popup' ref={nodeRef}>
					<ul>
						{sortList.map((obj, index) => (
							<li
								key={index}
								className={
									value.sortProperty === obj.sortProperty ? 'active' : ''
								}
								onClick={() => handleClickListItem(obj)}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			</CSSTransition>
		</div>
	)
}

export default Sort
