import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { mockProducts } from '../../data/mockProducts';
import styles from './ProductList.module.css';

const ProductList = () => {
  return (
    <section className={`${styles.productListSection} container`}>
      <h2>Каталог товаров</h2>
      <p className={styles.subtitle}>Выберите свой идеальный деревянный набор для творчества</p>
      <div className={styles.list}>
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;