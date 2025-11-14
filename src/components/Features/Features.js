import React from 'react';
import styles from './Features.module.css';

// Данные для наших преимуществ
const featuresData = [
  {
    icon: '🌿',
    title: 'Экологичные материалы',
    description: 'Полностью безопасно для детей и взрослых.'
  },
  {
    icon: '🛠️',
    title: 'Собирается без клея',
    description: 'Все детали идеально подогнаны друг к другу.'
  },
  {
    icon: '🎁',
    title: 'Идеально для подарка',
    description: 'Удивите близких оригинальным и полезным подарком.'
  },
  {
    icon: '🇷🇺',
    title: 'Сделано в России',
    description: 'Поддержите отечественного производителя.'
  }
];

const Features = () => {
  return (
    <section className={`${styles.features} container`}>
      {featuresData.map((feature, index) => (
        <div key={index} className={styles.featureItem}>
          <div className={styles.icon}>{feature.icon}</div>
          <h3 className={styles.title}>{feature.title}</h3>
          <p className={styles.description}>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;