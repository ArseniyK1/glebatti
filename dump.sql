--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: gleb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE gleb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


ALTER DATABASE gleb OWNER TO postgres;

\connect gleb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status_enum AS ENUM (
    'CREATED',
    'SUCCESS',
    'CANCELED'
);


ALTER TYPE public.order_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: dict_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dict_product (
    id integer NOT NULL,
    name character varying,
    model character varying,
    photo character varying,
    "manufactureId" integer,
    "categoryId" integer,
    "adminId" integer,
    quantity integer
);


ALTER TABLE public.dict_product OWNER TO postgres;

--
-- Name: dict_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dict_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dict_product_id_seq OWNER TO postgres;

--
-- Name: dict_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dict_product_id_seq OWNED BY public.dict_product.id;


--
-- Name: mail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mail (
    id integer NOT NULL,
    email character varying,
    code integer
);


ALTER TABLE public.mail OWNER TO postgres;

--
-- Name: mail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mail_id_seq OWNER TO postgres;

--
-- Name: mail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mail_id_seq OWNED BY public.mail.id;


--
-- Name: manufacture; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manufacture (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public.manufacture OWNER TO postgres;

--
-- Name: manufacture_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.manufacture_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.manufacture_id_seq OWNER TO postgres;

--
-- Name: manufacture_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.manufacture_id_seq OWNED BY public.manufacture.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    order_sum integer,
    created_at timestamp without time zone DEFAULT ('now'::text)::timestamp(6) with time zone NOT NULL,
    "shopId" integer,
    status public.order_status_enum DEFAULT 'CREATED'::public.order_status_enum NOT NULL,
    "buyerId" integer,
    "sellerId" integer,
    amount integer
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    value character varying,
    description character varying
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: shop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop (
    id integer NOT NULL,
    address character varying,
    phonenumber character varying,
    name character varying
);


ALTER TABLE public.shop OWNER TO postgres;

--
-- Name: shop_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shop_id_seq OWNER TO postgres;

--
-- Name: shop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shop_id_seq OWNED BY public.shop.id;


--
-- Name: shop_storage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_storage (
    id integer NOT NULL,
    quantity integer,
    cost_product integer,
    "productId" integer,
    "shopId" integer,
    "orderId" integer
);


ALTER TABLE public.shop_storage OWNER TO postgres;

--
-- Name: shop_storage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_storage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shop_storage_id_seq OWNER TO postgres;

--
-- Name: shop_storage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shop_storage_id_seq OWNED BY public.shop_storage.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    middle_name character varying,
    login character varying,
    password character varying,
    email character varying,
    "roleId" integer,
    "shopId" integer,
    verified boolean DEFAULT false NOT NULL,
    confirmation_code integer
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: dict_product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dict_product ALTER COLUMN id SET DEFAULT nextval('public.dict_product_id_seq'::regclass);


--
-- Name: mail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mail ALTER COLUMN id SET DEFAULT nextval('public.mail_id_seq'::regclass);


--
-- Name: manufacture id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manufacture ALTER COLUMN id SET DEFAULT nextval('public.manufacture_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: shop id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop ALTER COLUMN id SET DEFAULT nextval('public.shop_id_seq'::regclass);


--
-- Name: shop_storage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_storage ALTER COLUMN id SET DEFAULT nextval('public.shop_storage_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
1	Гитары
2	Пианино и клавишные
3	Синтезаторы
4	Ударные установки
5	Скрипки и струнные
6	Духовые инструменты
7	Электрогитары
8	Акустические системы
9	Микрофоны
10	Аксессуары для инструментов
24	фыв
25	Аксессуары для скрипок
\.


--
-- Data for Name: dict_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dict_product (id, name, model, photo, "manufactureId", "categoryId", "adminId", quantity) FROM stdin;
51	Труба "Золотой звук"	test	photo-1723047993793-948955507.jpg	6	6	\N	70
53	Электрогитара "Рок"	test	photo-1723048053390-869812107.jpg	1	7	\N	10
59	Микрофон "Концертный"	test	photo-1723048137171-146538648.jpg	7	9	\N	10
43	Пианино "Элегия"	test	photo-1723047681629-474871056.jpg	7	2	\N	10
58	Микрофон "Студийный"	test	photo-1723048126487-491676289.jpg	2	9	\N	10
54	Электрогитара "Блюз"	test	photo-1723048064269-774264094.jpg	10	7	\N	10
56	Акустическая система "Стерео"	test	photo-1723048109264-771065014.jpg	9	8	\N	10
50	Скрипка "Скрипучая"	test	photo-1723047960791-907221803.jpg	8	5	\N	10
48	Ударная установка "Перкуссия"	test	photo-1723047818417-140093035.jpg	10	4	\N	10
42	Акустическая гитара "Ритм"	test	photo-1723047650889-981284222.jpg	2	1	\N	10
41	Акустическая гитара "Лирика"	test	photo-1723047624849-626777434.jpg	1	1	\N	10
46	Синтезатор "Фантазия"	test	photo-1723047790876-570864490.jpg	3	3	\N	10
44	Пианино "Соната"	test	photo-1723047697171-294155215.jpg	6	2	\N	10
45	Синтезатор "Этюд"	test	photo-1723047774732-715011421.jpg	5	3	\N	10
1	Гитара "Вау"	test	photo-1723888873521-123843184.PNG	3	3	\N	10
61	Чехол для гитары "Защита"	test	photo-1723048170107-526337793.jpg	5	10	\N	5
52	Труба "Золотой"	test	photo-1723048025796-877232668.jpg	6	6	\N	78
55	Колонки "Чистый звук"	test	photo-1723048095297-146280556.jpg	8	8	\N	103
47	Ударная установка "Ритм"	test	photo-1723047806283-247000826.jpg	9	4	\N	2
60	Кабель для гитары "Чистый звук"	test	photo-1723048153221-781627841.jpg	5	10	\N	7
49	Скрипка "Мелодия"	test	photo-1723047895578-844642016.jpg	1	5	\N	6
\.


--
-- Data for Name: mail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mail (id, email, code) FROM stdin;
\.


--
-- Data for Name: manufacture; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.manufacture (id, name) FROM stdin;
1	Этюд
2	Соната
3	Гармония
4	Виртуоз
5	Музыкант
6	Акустика
7	Орфей
8	Звуковая Лаборатория
9	Струна
10	Мелодика
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, order_sum, created_at, "shopId", status, "buyerId", "sellerId", amount) FROM stdin;
24	41444	2024-08-18 21:05:04.09536	1	CANCELED	2	\N	\N
23	150000	2024-08-18 19:27:05.284865	1	SUCCESS	2	73	\N
25	56000	2024-08-18 21:27:32.044827	1	SUCCESS	2	73	\N
26	13000	2024-08-18 21:28:01.36676	2	CANCELED	2	\N	\N
27	15555	2024-08-18 23:13:14.36317	1	CANCELED	2	\N	\N
28	35698	2024-08-18 23:13:57.222405	1	CANCELED	2	\N	\N
29	556000	2024-08-18 23:22:43.601152	1	SUCCESS	2	73	\N
30	12	2024-08-18 23:51:56.199069	4	SUCCESS	2	77	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, value, description) FROM stdin;
1	USER	Покупатель
2	ADMIN	Администратор
3	SELLER	Продавец
\.


--
-- Data for Name: shop; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop (id, address, phonenumber, name) FROM stdin;
1	г. Липецк, ул. Котовского, д. 25	+79261239087	МузИнструмент
2	г. Липецк, ул. Советская, д. 20	+79269012345	Инструменты Музыки
3	г. Липецк, ул. Гагарина, д. 15	+79267890123	Ритм
4	г. Липецк, ул. Ленина, д. 5	+79263456789	Мелодия
5	г. Липецк, ул. Пушкина, д. 10	+79261234567	Музыкальный Мир
8	г. Липецк, ул. Путина, д. 12	+79126780212	Симфония
9	г. Липецк, ул. Сметанова, д. 51	+79172909288	Колизей музыки
7	г. Липецк, ул. Бунина, д. 112	+79215001152	Инструментарий
6	г. Липецк, ул. Стаханова, д. 57	+79123251256	МузШоп
14	Липецк улица стаханова 57	1241241414	МузФон
\.


--
-- Data for Name: shop_storage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_storage (id, quantity, cost_product, "productId", "shopId", "orderId") FROM stdin;
27	10	50000	47	2	\N
41	9	14000	51	2	\N
32	8	19000	52	1	\N
61	2	19000	52	1	23
36	9	41444	56	1	\N
62	1	41444	56	1	24
63	1	56000	51	1	25
28	9	13000	48	2	\N
64	1	13000	48	2	26
68	1	15090	58	1	\N
69	2	14000	42	2	\N
70	3	129000	44	2	\N
71	1	15555	60	1	27
66	1	15555	60	1	\N
65	1	4144	61	1	\N
67	0	15999	59	1	\N
72	1	15555	60	1	28
73	1	15999	59	1	28
74	1	4144	61	1	28
31	6	56000	51	1	\N
23	9	500000	43	2	\N
75	1	56000	51	1	29
76	1	500000	43	2	29
77	12	44422	51	8	\N
78	5	13000	61	4	\N
80	1	4	49	4	\N
81	3	4	49	4	30
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, last_name, middle_name, login, password, email, "roleId", "shopId", verified, confirmation_code) FROM stdin;
2	Глеб	Глебов	Глебович	user	$2b$10$BLIE4DBAnEN0YS/qCO9wue51jR9nTe3PdmkQZ2m0B5kksDOE2onge	test@test.ru	1	\N	f	\N
3	Глеб	Глебов	Глебович	admin	$2b$10$qgW5ypRwZ4DF7Vjqnw1U/O7e95/.KG6ziac/g2G3NUmaXl8l.0PDa	test@test.ru	2	\N	f	\N
1	Арсений	Киселев	Александрович	test	$2b$10$N9wcBTlyVe4WtMCRg5XLb..6a9Ve7/w7Pcw9SaXOaZuOCfQfa46ia	test@test.ru	3	2	f	\N
73	Глеб	Поленников	Александрович	seller	$2b$10$./pmn15KPv3aMjouL9V3cu2vx3UkqBROK.jwbsbWZlUdsFkgx9A2a	qwer.tototo.2018@yandex.ru	3	1	t	\N
77	Арсений	Киселев	Александрович	arseniy	$2b$10$vdoY8j/oAGsdEhPnmzvmKeTb6dXyL/QGYDYWz9cx3u9kno74eGfqW	kiselev-ars02@yandex.ru	3	4	t	\N
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 25, true);


--
-- Name: dict_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dict_product_id_seq', 4, true);


--
-- Name: mail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mail_id_seq', 1, false);


--
-- Name: manufacture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.manufacture_id_seq', 10, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 30, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: shop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_id_seq', 14, true);


--
-- Name: shop_storage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_storage_id_seq', 81, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 77, true);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: mail PK_5407da42b983ba54c6c62d462d3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mail
    ADD CONSTRAINT "PK_5407da42b983ba54c6c62d462d3" PRIMARY KEY (id);


--
-- Name: dict_product PK_70dfe3024cdd54a92a849548098; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dict_product
    ADD CONSTRAINT "PK_70dfe3024cdd54a92a849548098" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: shop PK_ad47b7c6121fe31cb4b05438e44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: manufacture PK_e64f4b5f015dee7d271482ba8f3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manufacture
    ADD CONSTRAINT "PK_e64f4b5f015dee7d271482ba8f3" PRIMARY KEY (id);


--
-- Name: shop_storage PK_f24d0d57c7225338d46802af894; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_storage
    ADD CONSTRAINT "PK_f24d0d57c7225338d46802af894" PRIMARY KEY (id);


--
-- Name: dict_product FK_09d903a6e76b82a4679a527976c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dict_product
    ADD CONSTRAINT "FK_09d903a6e76b82a4679a527976c" FOREIGN KEY ("manufactureId") REFERENCES public.manufacture(id);


--
-- Name: order FK_20981b2b68bf03393c44dd1b9d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_20981b2b68bf03393c44dd1b9d7" FOREIGN KEY ("buyerId") REFERENCES public."user"(id);


--
-- Name: order FK_318cc4bdeb61d336e3a01f4b767; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_318cc4bdeb61d336e3a01f4b767" FOREIGN KEY ("shopId") REFERENCES public.shop(id);


--
-- Name: dict_product FK_4788375cd3090b7252d74cf5710; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dict_product
    ADD CONSTRAINT "FK_4788375cd3090b7252d74cf5710" FOREIGN KEY ("adminId") REFERENCES public."user"(id);


--
-- Name: order FK_8a583acc24e13bcf84b1b9d0d20; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_8a583acc24e13bcf84b1b9d0d20" FOREIGN KEY ("sellerId") REFERENCES public."user"(id);


--
-- Name: user FK_b3eecbc38c05d841d8ebc94ca0f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_b3eecbc38c05d841d8ebc94ca0f" FOREIGN KEY ("shopId") REFERENCES public.shop(id);


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.roles(id);


--
-- Name: shop_storage FK_c8130c1f640e23a3df662728a3a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_storage
    ADD CONSTRAINT "FK_c8130c1f640e23a3df662728a3a" FOREIGN KEY ("shopId") REFERENCES public.shop(id);


--
-- Name: shop_storage FK_ce281f56528ccc930edbe33f00b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_storage
    ADD CONSTRAINT "FK_ce281f56528ccc930edbe33f00b" FOREIGN KEY ("productId") REFERENCES public.dict_product(id);


--
-- Name: dict_product FK_e05402e63ef4ca50d684fd6dd49; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dict_product
    ADD CONSTRAINT "FK_e05402e63ef4ca50d684fd6dd49" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: shop_storage FK_ee8384ed7a6f06c9aa82247afcb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_storage
    ADD CONSTRAINT "FK_ee8384ed7a6f06c9aa82247afcb" FOREIGN KEY ("orderId") REFERENCES public."order"(id);


--
-- PostgreSQL database dump complete
--

