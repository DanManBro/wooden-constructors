import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
// import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg'; // Мы добавим иконки позже

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <Link to="/" className={styles.logo}>
          {/* <LogoIcon /> */}
          <span>RoboWood</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/about">О нас</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
        <div className={styles.icons}>
          {/* Пока что иконки-заглушки */}
          <span>🔍</span>
          <span>🛒</span>
          <span>👤</span>
        </div>
      </div>
    </header>
  );
};

export default Header;