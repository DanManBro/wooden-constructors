const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt'); // Шифрование паролей
const jwt = require('jsonwebtoken'); // Токены

const app = express();
const PORT = 5000;
const SECRET_KEY = "super-secret-key-robowood"; // Секретный ключ для токенов

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'robowood'
});

// --- API ТОВАРОВ ---
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

// --- УПРАВЛЕНИЕ ТОВАРАМИ ---

// Добавление нового товара
app.post('/api/products', async (req, res) => {
    try {
        // Получаем данные, которые прислал сайт
        const { name, price, imageUrl } = req.body;
        
        // Вставляем их в базу
        const newProduct = await pool.query(
            'INSERT INTO products (name, price, image_url) VALUES ($1, $2, $3) RETURNING *',
            [name, price, imageUrl]
        );

        // Отправляем обратно созданный товар
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера при добавлении товара');
    }
});

// Удаление товара
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params; // Получаем номер товара из адреса
        
        // Удаляем из базы
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        
        res.json({ message: "Товар удален" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера при удалении');
    }
});
// --- API АВТОРИЗАЦИИ ---

// 1. РЕГИСТРАЦИЯ
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Проверяем, есть ли такой юзер
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует" });
        }

        // Шифруем пароль
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Сохраняем в базу
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        // Создаем токен (автоматический вход после регистрации)
        const token = jwt.sign({ id: newUser.rows[0].id, role: 'user' }, SECRET_KEY);

        res.json({ token, user: { id: newUser.rows[0].id, username: username, role: 'user' } });

    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера при регистрации');
    }
});

// 2. ВХОД (LOGIN)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Ищем пользователя
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Неверный email или пароль" });
        }

        // Проверяем пароль
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(400).json({ message: "Неверный email или пароль" });
        }

        // Всё ок — выдаем токен
        const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, SECRET_KEY);
        
        res.json({ 
            token, 
            user: { 
                id: user.rows[0].id, 
                username: user.rows[0].username, 
                role: user.rows[0].role 
            } 
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера при входе');
    }
});

// --- ЗАКАЗЫ ---

// Создание заказа
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, contactInfo, totalPrice, items } = req.body;
        
        await pool.query(
            'INSERT INTO orders (user_id, contact_info, total_price, items_json) VALUES ($1, $2, $3, $4)',
            [userId, contactInfo, totalPrice, items]
        );
        
        res.json({ message: "Заказ создан" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера при заказе');
    }
});

// --- ОТЗЫВЫ ---

// Получить все отзывы
app.get('/api/reviews', async (req, res) => {
    try {
        // Берем последние 3 отзыва (новые сверху)
        const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 3');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка');
    }
});

// Добавить отзыв
app.post('/api/reviews', async (req, res) => {
    try {
        const { username, rating, comment } = req.body;
        
        // Сохраняем в базу
        const newReview = await pool.query(
            'INSERT INTO reviews (username, rating, comment) VALUES ($1, $2, $3) RETURNING *',
            [username, rating, comment]
        );
        
        res.json(newReview.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});