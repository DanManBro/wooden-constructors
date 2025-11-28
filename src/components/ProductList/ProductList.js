import React, { useState, useEffect } from 'react'; // 1. Добавили хуки
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
// import { mockProducts } from '../../data/mockProducts'; <-- ЭТО БОЛЬШЕ НЕ НУЖНО

const ProductList = () => {
  // 2. Создаем состояние для хранения товаров
  const [products, setProducts] = useState([]);

  // 3. Делаем запрос на сервер при запуске
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json()) // Превращаем ответ в понятный JS
      .then(data => setProducts(data)) // Сохраняем данные в состояние
      .catch(err => console.error("Ошибка загрузки товаров:", err));
  }, []);

  return (
    <section className={`${styles.productListSection} container`}>
      <h2>Каталог товаров</h2>
      <p className={styles.subtitle}>Выберите свой идеальный деревянный набор для творчества</p>
      
      <div className={styles.list}>
        {/* 4. Проходимся по полученным данным */}
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              // 5. Небольшой трюк: добавляем знак рубля к цене, т.к. в базе просто число
              price: `${product.price.toLocaleString()} ₽` 
            }} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;