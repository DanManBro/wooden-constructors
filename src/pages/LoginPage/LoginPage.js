import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Button from '../../components/Button/button'; // Твой путь

const LoginPage = () => {
  const navigate = useNavigate();
  
  // 1. Состояние для текущего пользователя
  const [currentUser, setCurrentUser] = useState(null);

  // 2. Проверяем при загрузке, вошел ли юзер
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // 3. Функция Выхода (Logout)
  const handleLogout = () => {
    // Чистим память
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart'); // Корзину тоже можно очистить
    
    // Перезагружаем страницу, чтобы обновилась шапка и сбросилось состояние
    window.location.href = '/'; 
  };

  // --- ЛОГИКА ВХОДА (старая) ---
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Сразу перенаправляем на главную с перезагрузкой
        window.location.href = '/'; 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения с сервером');
    }
  };

  // 4. ЕСЛИ ПОЛЬЗОВАТЕЛЬ УЖЕ ВОШЕЛ -> ПОКАЗЫВАЕМ ПРОФИЛЬ
  if (currentUser) {
    return (
      <div className="container">
        <div className={styles.authWrapper} style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>Личный кабинет</h1>
          
          <div style={{ marginBottom: '30px', fontSize: '18px' }}>
            <p>👋 Привет, <strong>{currentUser.username}</strong>!</p>
            <p style={{ color: '#666', fontSize: '14px' }}>{currentUser.email}</p>
            {currentUser.role === 'admin' && (
               <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>Вы Администратор</p>
            )}
          </div>

          <Button onClick={handleLogout}>Выйти из аккаунта</Button>
        </div>
      </div>
    );
  }

  // 5. ЕСЛИ НЕ ВОШЕЛ -> ПОКАЗЫВАЕМ ФОРМУ (как было раньше)
  return (
    <div className="container">
      <div className={styles.authWrapper}>
        <h1 className={styles.title}>Вход в аккаунт</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="example@mail.ru" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Введите пароль" 
              onChange={handleChange} 
              required 
            />
          </div>

          <Button>Войти</Button>
        </form>
        
        <p className={styles.footerText}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;