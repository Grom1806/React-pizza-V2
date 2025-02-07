import React from 'react';
import { ShoppingCart } from 'lucide-react';
import * as styles from './EmptyCart.module.scss';
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <ShoppingCart />
        </div>
        
        <div className={styles.textContent}>
          <h3 className={styles.title}>
            Ваша корзина пуста
          </h3>
          <p className={styles.description}>
            Похоже, вы еще не добавили товары в корзину
          </p>
          <div className={`cart__bottom-buttons ${styles.button}`}>
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
				</div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
