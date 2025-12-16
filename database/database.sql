-- create database and use it --

create database e_commerce_db;
use e_commerce_db;

-- create tables --

-- create users table --
create table users (id Int Primary key auto_increment , fullname varchar(55) unique , email varchar(55) unique , country_code varchar(5) , phone int(55)  , password varchar(255));
-- create products table --
create table products (id int, products_id int auto_increment primary key ,images JSON , title varchar(55), description varchar(5000),category varchar(55), subcategory varchar(55), price decimal(12,2), amount int, foreign key (id) references users(id));
-- create saved products table --
create table saved_products (id int, product_id int, foreign key (id) references users(id) , foreign key (product_id) references products(products_id));
-- create table for admin users --
create table admin (id int , foreign key (id) references users(id));
-- create table for products that are in our carts--
create table cart (id int, product_id int , status enum("none" , "pending" , 'on way', "delivered") ,foreign key (id) references users(id) , foreign key (product_id) references products(products_id));
-- create table for bought items to display in users dashboard later---
create table bought_products (id int , product_id int , foreign key (id) references users(id) , foreign key (product_id) references products(products_id));