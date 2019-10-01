CREATE DATABASE IF NOT EXISTS shop DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE shop;

CREATE TABLE IF NOT EXISTS products_desc (
    id SERIAL,
    prod_brand VARCHAR(255),
    prod_name VARCHAR(255),
    prod_desc TEXT,
    prod_price DECIMAL(20,2),
    prod_hurl VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS products_pics (
    id SERIAL,
    prod_id BIGINT(20) UNSIGNED,
    file_name VARCHAR(255) NOT NULL,
    image_name VARCHAR(255),
    FOREIGN KEY (prod_id) REFERENCES products_desc (id) ON DELETE CASCADE
                                                        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS users_table (
    id SERIAL,
    email VARCHAR(255),
    login VARCHAR(64),
    prod_id INT(20),
    name VARCHAR(32),
    password VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS user_carts (
    shopping_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    login VARCHAR(64),
    prod_name VARCHAR(255),
    prod_id INT(20),
    quantity INT(10)
);

INSERT INTO products_desc (prod_brand, prod_name, prod_desc, prod_price, prod_hurl)
    VALUES  ('Туполев',
             'Ту-22М3',
             '{ "Длина": "42,5 метра", "Размах крыла": "34,3 метра", "Высота": "11,1 метра", "Максимальная взлетная масса": "126 тонн", "Максимальная скорость": "2300 км/ч", "Дальность": "6800 км" }',
             12800000000,
             'tu22m3'),
            ('Туполев',
             'Ту-95МС',
             '{ "Длина": "49,1 метра", "Размах крыла": "50 метров", "Высота": "12,1 метра", "Максимальная взлетная масса": "188 тонн", "Максимальная скорость": "830 км/ч", "Дальность": "15000 км" }',
             14000000000,
             'tu95ms'),
            ('Туполев',
             'Ту-160М',
             '{ "Длина": "54,1 метра", "Размах крыла": "55,7 метра", "Высота": "13,1 метра", "Максимальная взлетная масса": "275 тонн", "Максимальная скорость": "2220 км/ч", "Дальность": "12300 км" }',
             16000000000,
             'tu160m');

INSERT INTO products_pics (id, prod_id, file_name, image_name)
    VALUES
        (1, 1, 'tu22m3.jpg', 'Ту-22М3'),
        (2, 2, 'tu95ms.jpg', 'Ту-95МС'),
        (3, 3, 'tu160m.jpg', 'Ту-160М');