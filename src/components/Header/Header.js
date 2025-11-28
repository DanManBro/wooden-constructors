import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  // 1. Проверяем, кто сейчас на сайте
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <Link to="/" className={styles.logo}>
          <span>RoboWood</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/about">О нас</Link>
          <Link to="/contacts">Контакты</Link>
          
          {/* 2. Показываем ссылку ТОЛЬКО если это админ */}
          {isAdmin && (
            <Link to="/admin" style={{ color: 'red' }}>Админ</Link>
          )}
        </nav>
        <div className={styles.icons}>
          <span>🔍</span>
          <Link to="/cart" className={styles.iconLink}>🛒</Link>
          <Link to="/login" className={styles.iconLink}>👤</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;