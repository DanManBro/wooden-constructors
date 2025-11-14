import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Импортируем роутер
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Оборачиваем App в BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);