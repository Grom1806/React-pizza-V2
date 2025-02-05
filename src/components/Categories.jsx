import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice';

function Categories() {
	const dispatch = useDispatch()
	const categoryId = useSelector(state => state.filter.categoryId)
	const categories = [
		'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',  
	]

	return (
		<div className='categories'>
			<ul>
			{categories.map((category, i) => {
			 return	<li key={i} className={categoryId === i ? 'active' : ''} onClick={() => dispatch(setCategoryId(i))}>{category}</li>
			})}
			</ul>
		</div>
	)
}
export default Categories;