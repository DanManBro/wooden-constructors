import React from 'react';
import styles from './Reviews.module.css';
import Button from '../Button/button';

// Временные данные для отзывов
const reviewsData = [
  {
    name: 'Анна Петрова',
    initials: 'АП',
    rating: '★★★★★',
    text: 'Отличный подарок! Дочке очень понравилось собирать робота. Качество материалов на высоте.'
  },
  {
    name: 'Дмитрий Соколов',
    initials: 'ДС',
    rating: '★★★★★',
    text: 'Купил себе в офис органайзер. Выглядит стильно, все коллеги спрашивают где взял.'
  },
  {
    name: 'Елена Волкова',
    initials: 'ЕВ',
    rating: '★★★★★',
    text: 'Понятная инструкция, качество дерева. Собирается легко и быстро.'
  }
];

const Reviews = () => {
  return (
    <section className={`${styles.reviewsSection} container`}>
      <h2>Отзывы покупателей</h2>
      <p className={styles.subtitle}>Что говорят наши клиенты</p>
      <div className={styles.reviewsList}>
        {reviewsData.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>{review.initials}</div>
              <div className={styles.userInfo}>
                <span className={styles.name}>{review.name}</span>
                <span className={styles.rating}>{review.rating}</span>
              </div>
            </div>
            <p className={styles.text}>{review.text}</p>
          </div>
        ))}
      </div>
      <Button variant="secondary">Оставить отзыв</Button>
    </section>
  );
};

export default Reviews;