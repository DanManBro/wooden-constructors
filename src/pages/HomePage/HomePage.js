import React from 'react';
import styles from './HomePage.module.css';
import Button from '../../components/Button/button';
import robotImage from '../../assets/images/robot-organizer.png';
import Features from '../../components/Features/Features';
import ProductList from '../../components/ProductList/ProductList';
import Reviews from '../../components/Reviews/Reviews'; // 1. Импортируем компонент отзывов

const HomePage = () => {
  return (
    <div>
      <div className="container">
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Собери своего деревянного помощника!</h1>
            <p>
              Уникальные деревянные конструкторы для творчества и организации. Экологично, красиво и функционально.
            </p>
            <div className={styles.heroButtons}>
              <Button>Крутить сейчас</Button>
              <Button variant="secondary">В каталог</Button>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <img src={robotImage} alt="Деревянный робот-органайзер" />
          </div>
        </section>
      </div>

      <Features />
      <ProductList />
      <Reviews /> {/* 2. Добавляем компонент на страницу */}
    </div>
  );
};

export default HomePage;