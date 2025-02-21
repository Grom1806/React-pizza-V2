import React from 'react';
import { ShoppingCart } from 'lucide-react';
import * as styles from './EmptyCart.module.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyCart = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <motion.div
          className={styles.iconWrapper}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCart />
        </motion.div>

        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className={styles.title}>
            Ваша корзина пуста
          </h3>
          <p className={styles.description}>
            Похоже, вы еще не добавили товары в корзину
          </p>
          <motion.div
            className={`cart__bottom-buttons ${styles.button}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'
            >
              <svg
                width={8}
                height={14}
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7 13L1 6.93015L6.86175 1'
                  stroke='#D3D3D3'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>Вернуться назад</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyCart;
