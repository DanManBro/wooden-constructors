import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';
import Button from '../../components/Button/button'; // Твой путь

const AdminPage = () => {
  const navigate = useNavigate();
  
  // --- ОХРАНА (ЗАЩИТА СТРАНИЦЫ) ---
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Если пользователя нет ИЛИ он не админ
    if (!user || user.role !== 'admin') {
      // Выкидываем его на главную страницу
      navigate('/'); 
    }
  }, [navigate]);
  // --------------------------------

  const [product, setProduct] = useState({
    name: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      alert('Пожалуйста, заполните название и цену');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        alert('Товар успешно добавлен!');
        navigate('/catalog');
      } else {
        alert('Ошибка при добавлении');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения с сервером');
    }
  };

  return (
    <div className="container">
      <div className={styles.adminWrapper}>
        <h1 className={styles.title}>Добавить новый товар</h1>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Название товара</label>
            <input 
              type="text" 
              name="name"
              placeholder="Например: Робот-музыкант" 
              value={product.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Цена (руб)</label>
            <input 
              type="number" 
              name="price"
              placeholder="2500" 
              value={product.price}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Ссылка на картинку</label>
            <input 
              type="text" 
              name="imageUrl"
              placeholder="/images/product1.jpg" 
              value={product.imageUrl}
              onChange={handleChange}
            />
          </div>

          <Button>Добавить товар</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;