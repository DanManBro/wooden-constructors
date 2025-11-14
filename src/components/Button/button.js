import React from 'react';
import styles from './Button.module.css';

// Меняем 'text' на 'children', чтобы можно было вставлять текст и иконки
const Button = ({ children, onClick, variant = 'primary' }) => {
  const buttonClass = variant === 'secondary' ? styles.secondary : styles.primary;
  
  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;