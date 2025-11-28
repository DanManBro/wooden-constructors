import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import Button from '../Button/button'; // Твой путь

// Запасные отзывы, если база пустая
const defaultReviews = [
  { username: 'Анна Петрова', rating: 5, comment: 'Отличный подарок! Дочке очень понравилось.' },
  { username: 'Дмитрий Соколов', rating: 5, comment: 'Купил себе в офис. Выглядит стильно.' },
  { username: 'Елена Волкова', rating: 5, comment: 'Качество дерева на высоте.' }
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  // Загрузка отзывов и проверка юзера
  useEffect(() => {
    // 1. Кто зашел?
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setUser(currentUser);

    // 2. Тянем отзывы с сервера
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => {
        // Если в базе пусто, оставим дефолтные, чтобы было красиво
        if (data.length > 0) {
          setReviews(data);
        } else {
          setReviews(defaultReviews);
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Отправка отзыва
  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    const reviewData = {
      username: user.username, // Имя берем из профиля
      rating: 5, // По дефолту ставим 5 звезд (можно усложнить, но зачем?)
      comment: newComment
    };

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        const savedReview = await response.json();
        // Добавляем новый отзыв в начало списка сразу
        setReviews([savedReview, ...reviews].slice(0, 3)); 
        setNewComment('');
        alert('Спасибо за отзыв!');
      }
    } catch (err) {
      alert('Ошибка отправки');
    }
  };

  return (
    <section className={`${styles.reviewsSection} container`}>
      <h2>Отзывы покупателей</h2>
      <p className={styles.subtitle}>Что говорят наши клиенты</p>
      
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                {review.username.charAt(0)} {/* Первая буква имени */}
              </div>
              <div className={styles.userInfo}>
                <span className={styles.name}>{review.username}</span>
                <span className={styles.rating}>{'★'.repeat(review.rating)}</span>
              </div>
            </div>
            <p className={styles.text}>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Форма только для тех, кто вошел */}
      {user ? (
        <div className={styles.addReview}>
          <h3>Оставить отзыв</h3>
          <textarea 
            placeholder="Напишите ваше мнение..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.textarea}
          />
          <div style={{ marginTop: '10px' }}>
             <Button onClick={handleSubmit}>Отправить</Button>
          </div>
        </div>
      ) : (
        <p style={{ color: '#888' }}>Войдите, чтобы оставить отзыв</p>
      )}
    </section>
  );
};

export default Reviews;