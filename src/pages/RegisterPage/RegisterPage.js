import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../LoginPage/LoginPage.module.css';
import Button from '../../components/Button/button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Регистрация успешна! Добро пожаловать, ' + data.user.username);
        // Сохраняем данные в браузере (упрощенный вариант)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/'); // Перекидываем на главную
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения с сервером');
    }
  };

  return (
    <div className="container">
      <div className={styles.authWrapper}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Имя</label>
            <input type="text" id="username" placeholder="Иван" onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="example@mail.ru" onChange={handleChange} required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" placeholder="Придумайте пароль" onChange={handleChange} required />
          </div>

          <Button>Создать аккаунт</Button>
        </form>
        
        <p className={styles.footerText}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;