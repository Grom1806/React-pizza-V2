
function Categories({value, onChangeCategory}) {
	const categories = [
		'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',  
	]

	return (
		<div className='categories'>
			<ul>
			{categories.map((category, i) => {
			 return	<li key={i} className={value === i ? 'active' : ''} onClick={() => onChangeCategory(i)}>{category}</li>
			})}
			</ul>
		</div>
	)
}
export default Categories;