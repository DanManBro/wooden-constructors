import React, { useState, useEffect } from 'react';
import styles from './CatalogPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  
  // 1. ПРОВЕРЯЕМ РЕАЛЬНЫЕ ПРАВА ПОЛЬЗОВАТЕЛЯ
  // Достаем данные из памяти браузера
  const user = JSON.parse(localStorage.getItem('user'));
  // Если пользователь есть И у него роль admin — тогда true
  const isAdmin = user && user.role === 'admin';

  // Загрузка товаров
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Ошибка:", err));
  }, []);

  // 2. ФУНКЦИЯ УДАЛЕНИЯ
  const handleDelete = async (id) => {
    // Спрашиваем подтверждение
    if (!window.confirm('Вы точно хотите удалить этот товар?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Если удалилось успешно, убираем товар с экрана без перезагрузки
        setProducts(products.filter(product => product.id !== id));
      } else {
        alert('Ошибка при удалении');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения');
    }
  };

  return (
    <div className="container">
      <div className={styles.catalogWrapper}>
        <h1 className={styles.title}>Каталог товаров</h1>
        
        <div className={styles.filters}>
          <button className={`${styles.filterBtn} ${styles.active}`}>Все</button>
          <button className={styles.filterBtn}>Конструкторы</button>
          <button className={styles.filterBtn}>Органайзеры</button>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                price: `${product.price.toLocaleString()} ₽`
              }} 
              isAdmin={isAdmin} 
              onDelete={handleDelete} // Передаем функцию удаления внутрь карточки
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;