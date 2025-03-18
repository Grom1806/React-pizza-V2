import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '@/redux/slices/filterSlice';
import { motion } from 'framer-motion';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);

  const categories: string[] = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => (
          <motion.li
            key={i}
            className={categoryId === i ? 'active' : ''}
            onClick={() => dispatch(setCategoryId(i))}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: categoryId === i ? 1 : 0.7,
              y: categoryId === i ? -5 : 0, 
              transition: {
                duration: 0.4,
                ease: 'easeOut',
              },
            }}
            exit={{
              opacity: 0,
              y: 10,
              transition: { duration: 0.3, ease: 'easeIn' },
            }}
            whileHover={{
              scale: 1.05, // Подсветка при наведении
              opacity: 1, // При наведении, возвращаем яркость
              transition: { duration: 0.2 },
            }}
            style={{
              cursor: 'pointer',
              padding: '10px 15px',
              fontWeight: categoryId === i ? 'bold' : 'normal',
              backgroundColor: categoryId === i ? '#FE5F1E' : 'transparent',
              scale: 1.05, // Highlight on hover
              opacity: 1, // Restore brightness on hover
              color: categoryId === i ? '#fff' : '#000',
            }}
          >
            {category}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
