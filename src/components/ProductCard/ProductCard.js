import React from 'react';
import styles from './ProductCard.module.css';
import Button from '../Button/button'; // Твой путь

const ProductCard = ({ product, isAdmin, onDelete }) => {
  const rawImage = product.image_url || product.imageUrl || '';
  const imageSrc = rawImage.startsWith('/') ? rawImage : '/' + rawImage;

  // --- ЛОГИКА КОРЗИНЫ ---
  const handleAddToCart = () => {
    // 1. Получаем текущую корзину из памяти (или пустой массив)
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 2. Добавляем туда текущий товар
    // Мы добавляем весь объект товара, чтобы на странице корзины были и картинка, и цена
    savedCart.push({ ...product, imageSrc }); // imageSrc сохраним сразу нормальный
    
    // 3. Сохраняем обратно в память
    localStorage.setItem('cart', JSON.stringify(savedCart));
    
    alert('Товар добавлен в корзину!');
  };
  // ----------------------

  return (
    <div className={styles.card}>
      {isAdmin && (
        <div className={styles.adminControls}>
          <button className={styles.editBtn} title="Редактировать">✏️</button>
          <button 
            className={styles.deleteBtn} 
            title="Удалить"
            onClick={() => onDelete(product.id)}
          >
            🗑️
          </button>
        </div>
      )}

      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={product.name} className={styles.image} />
      </div>
      
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>{product.price}</p>
      
      {/* Вешаем обработчик на кнопку */}
      <Button onClick={handleAddToCart}>
        <span>🛒</span>
        <span>В корзину</span>
      </Button>
    </div>
  );
};

export default ProductCard;