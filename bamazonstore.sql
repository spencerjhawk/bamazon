CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Old Spice Deodorant', 'Cosmetics', 5.75, 500),
		('Aftershave', 'Cosmetics', 6.25, 627),
		('Hefty 12 Gal Trash Bags', 'Grocery', 5.99, 300),
		('Paper Towels', 'Grocery', 4.25, 400),
		('Pink Lady Apples', 'Produce', 0.35, 800),
		('Lil Cuties Oranges', 'Produce', 0.20, 10000),
		('Granola Bars', 'Grocery', 4.45, 267),
		('Whole Milk', 'Grocery', 4.50, 200),
		('Huggies Diapers', 'Children', 2.75, 476),
		('Charmin Toilet Paper', 'Grocery', 12.99, 575),
		('Baby Wipes', 'Children', 1.50, 423),
		('Yoga Mat', 'Sports', 12.75, 150),
		('Basketball', 'Sports', 7.99, 89),
		('Adidas T-Shirt', 'Clothing', 5.55, 120),
		('Nike Shorts', 'Clothing', 17.88, 250),
		('Kibbles & Bits', 'Pet', 7.25, 157),
		('Fancy Feast', 'Pet', 12.50, 163),
		('Advil', 'Pharmacy', 4.95, 389),
		('Bandages', 'Pharmacy', 3.25, 550),
		('Halo Top Ice Cream', 'Grocery', 6.25, 432);