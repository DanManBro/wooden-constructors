--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-11-29 00:37:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 24629)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    contact_info text,
    total_price integer,
    status character varying(50) DEFAULT 'Новый'::character varying,
    items_json text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24628)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 4837 (class 0 OID 0)
-- Dependencies: 223
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 218 (class 1259 OID 24588)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    image_url text,
    category character varying(50) DEFAULT 'Конструкторы'::character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24587)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 4838 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 222 (class 1259 OID 24608)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    product_id integer,
    user_id integer,
    username character varying(100),
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24607)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 4839 (class 0 OID 0)
-- Dependencies: 221
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 220 (class 1259 OID 24598)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100),
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24597)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4840 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4662 (class 2604 OID 24632)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4656 (class 2604 OID 24591)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4660 (class 2604 OID 24611)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4658 (class 2604 OID 24601)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4831 (class 0 OID 24629)
-- Dependencies: 224
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, contact_info, total_price, status, items_json, created_at) FROM stdin;
1	2	Тестовый заказ	2670	Новый	[{"id":1,"name":"Робот-органайзер","price":"1 980 ₽","image_url":"/images/product1.jpg","category":"Конструкторы","imageSrc":"/images/product1.jpg"},{"id":2,"name":"Мини-пазл «Машинка»","price":"690 ₽","image_url":"/images/product2.jpg","category":"Конструкторы","imageSrc":"/images/product2.jpg"}]	2025-11-28 23:47:21.108288
2	1	Владик йоу	2470	Новый	[{"id":1,"name":"Робот-органайзер","price":"1 980 ₽","image_url":"/images/product1.jpg","category":"Конструкторы","imageSrc":"/images/product1.jpg"},{"id":4,"name":"Подставка под телефон","price":"490 ₽","image_url":"/images/product4.jpg","category":"Конструкторы","imageSrc":"/images/product4.jpg"}]	2025-11-29 00:01:34.435212
\.


--
-- TOC entry 4825 (class 0 OID 24588)
-- Dependencies: 218
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, image_url, category) FROM stdin;
1	Робот-органайзер	1980	/images/product1.jpg	Конструкторы
2	Мини-пазл «Машинка»	690	/images/product2.jpg	Конструкторы
3	Шкатулка «DIY»	1290	/images/product3.jpg	Конструкторы
4	Подставка под телефон	490	/images/product4.jpg	Конструкторы
\.


--
-- TOC entry 4829 (class 0 OID 24608)
-- Dependencies: 222
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, product_id, user_id, username, rating, comment, created_at) FROM stdin;
1	\N	\N	Владик	5	Сайт просто бомба это говорит Владислав Пчелинцев	2025-11-29 00:12:51.058492
2	\N	\N	Владик	5	неупокоенная душа владика навожусь глазами и редачу я смог это сделать а Макару помочь не смог потому что я говорил пофиг го дальше и так весь день	2025-11-29 00:14:52.462837
3	\N	\N	Макар любит 1С	5	Да блин я весь день пытался сделать свой сайт, как у тебя так получилось почему я сразу не послушал тебя денменбро и лудик я хотел быть таким крутым как владик но его неупокоенная душа не смогла навестись глазами и отредачить	2025-11-29 00:18:13.750392
\.


--
-- TOC entry 4827 (class 0 OID 24598)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password_hash, role) FROM stdin;
1	Даня	topsdaf@gmail.com	$2b$10$.7KAf1nlNxXB5GliMVJRNeFoqBR4PN/VW8RR8fjgGcxdOgz7vqDNC	user
2	admin	daniilkorovnikovmarket@gmail.com	$2b$10$5Q3CLS2I6QfW4qKL9KvlnOgVTcC98vkcT4LOsQQriX1h7aBhu4QQy	admin
3	Владик	hello@gmail.com	$2b$10$hKwqf/o4CfhtlJPXKJv5eekuJ0veZYTPcL7mtZUvGyYaadcGrRe3K	user
4	Макар любит 1С	makar@gmail.com	$2b$10$FcLeVq/WPqlI8FHaLlFW6.QCwD41uXrcDFZu9k8JPlv6TgwgbW.Ve	user
\.


--
-- TOC entry 4841 (class 0 OID 0)
-- Dependencies: 223
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 2, true);


--
-- TOC entry 4842 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 6, true);


--
-- TOC entry 4843 (class 0 OID 0)
-- Dependencies: 221
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 3, true);


--
-- TOC entry 4844 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4675 (class 2606 OID 24638)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4667 (class 2606 OID 24595)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4673 (class 2606 OID 24617)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4669 (class 2606 OID 24606)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4671 (class 2606 OID 24604)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4678 (class 2606 OID 24639)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4676 (class 2606 OID 24618)
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4677 (class 2606 OID 24623)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-11-29 00:37:21

--
-- PostgreSQL database dump complete
--

