import React, { useState, useEffect } from 'react';
import styles from './CartPage.module.css';
import Button from '../../components/Button/button';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [contactInfo, setContactInfo] = useState('');

  // При загрузке страницы достаем корзину из памяти
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  // Функция для удаления товара из корзины
  const removeFromCart = (indexToRemove) => {
    const newCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Подсчет общей суммы
  const totalPrice = cartItems.reduce((sum, item) => {
    // Убираем пробелы и знак рубля, чтобы превратить "1 980 ₽" в число 1980
    const priceNumber = parseInt(item.price.replace(/\D/g, ''));
    return sum + priceNumber;
  }, 0);

  // Отправка заказа на сервер
  const handleOrder = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Корзина пуста!');
      return;
    }

    // Достаем ID пользователя (если он вошел)
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null; // Если не вошел, будет null

    const orderData = {
      userId: userId,
      contactInfo: contactInfo,
      totalPrice: totalPrice,
      items: JSON.stringify(cartItems) // Превращаем массив товаров в строку
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert('Заказ успешно оформлен! Менеджер свяжется с вами.');
        localStorage.removeItem('cart'); // Очищаем корзину
        setCartItems([]);
        setContactInfo('');
      } else {
        alert('Ошибка при оформлении заказа');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения');
    }
  };

  return (
    <div className="container">
      <div className={styles.cartWrapper}>
        <h1>Ваша корзина</h1>

        {cartItems.length === 0 ? (
          <p>В корзине пока пусто...</p>
        ) : (
          <div className={styles.content}>
            {/* Список товаров */}
            <div className={styles.itemsList}>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <img src={item.imageSrc} alt={item.name} />
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(index)}>❌</button>
                </div>
              ))}
            </div>

            {/* Форма оформления */}
            <div className={styles.checkout}>
              <h2>Итого: {totalPrice.toLocaleString()} ₽</h2>
              <form onSubmit={handleOrder}>
                <label>Ваш телефон и адрес доставки:</label>
                <textarea 
                  placeholder="Например: +79000000000, г. Москва, ул. Ленина 1..." 
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                />
                <Button>Оформить заказ</Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;