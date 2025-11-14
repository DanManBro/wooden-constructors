import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContent} container`}>
        <div className={styles.about}>
          <h3 className={styles.logo}>RoboWood</h3>
          <p>Деревянные конструкторы и органайзеры ручной работы</p>
        </div>

        <div className={styles.contacts}>
          <h4>Контакты</h4>
          <ul>
            <li>📞 +7 (495) 123-45-67</li>
            <li>✉️ info@robowood.ru</li>
            <li>📍 Москва, ул. Примерная, д. 1</li>
          </ul>
        </div>

        <div className={styles.navigation}>
          <h4>Навигация</h4>
          <ul>
            <li><Link to="/about">О компании</Link></li>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/delivery">Доставка и оплата</Link></li>
            <li><Link to="/warranty">Гарантии</Link></li>
          </ul>
        </div>

        <div className={styles.social}>
          <h4>Мы в соцсетях</h4>
          <div className={styles.socialIcons}>
            <span>VK</span>
            <span>IG</span>
            <span>FB</span>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>© 2025 RoboWood. Все права защищены.</p>
          <div className={styles.legalLinks}>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;