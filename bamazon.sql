DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT(6) AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL (10,2) NOT NULL, 
    stock_quantity INT(6) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Washi Masking Tapes", "Office Supplies", 13.50, 300), ("Komono Sunglasses", "Fashion", 68.91, 100), 
("Novelty Cartoon Avocado Pin", "Accessories", 7.99, 10), ("Wood Pet Home - Room With a View", "Pet Supplies", 67.23, 8), 
("Vintage Fan", "Appliances", 179.99, 2), ("Laboratory Beaker Wine Glass", "Home", 19.99, 6),
("Hard Case iPhone 7", "Cell Phone Accessories", 13.98, 8), ("Fujifilm Instax Mini 8+", "Camera & Photo", 59.49, 20),
("Rainbow Color Wheel Umbrella", "Home", 26.30, 10), ("Pokemon Large Plush Snorlax", "Toys & Games", 28.36, 50);

-- DELETE FROM products WHERE stock_quantity = 300;
-- WHERE id IN (1,2);

-- UPDATE favorite_movies
-- SET score = 100
-- WHERE id = 1

-- SELECT * FROM favorite_db.favorite_movies
-- WHERE id = 4;