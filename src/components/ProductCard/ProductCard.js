import React from 'react';
import styles from './ProductCard.module.css';
import Button from '../Button/button';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>{product.price}</p>
      <Button>
        <span>🛒</span>
        <span>В корзину</span>
      </Button>
    </div>
  );
};

export default ProductCard;