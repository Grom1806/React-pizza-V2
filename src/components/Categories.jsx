import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex } from '../redux/slices/filterSlice';
function Categories() {
	const categoryIndex = useSelector(state => state.filter.categoryIndex)
	const dispatch = useDispatch()
	const categories = [
		'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',  
	]

	return (
		<div className='categories'>
			<ul>
			{categories.map((category, i) => {
			 return	<li key={i} className={categoryIndex === i ? 'active' : ''} onClick={() => dispatch(setCategoryIndex(i))}>{category}</li>
			})}
			</ul>
		</div>
	)
}
export default Categories;