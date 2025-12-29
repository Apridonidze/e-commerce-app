-- create & use database --

create database e_commerce_db;
use e_commerce_db;

-- create tables --

-- create users table --
create table users (id Int Primary key auto_increment , fullname varchar(55) unique , email varchar(55) unique , country_code varchar(5) , phone int(55)  , password varchar(255));
-- create products table --
create table products (id int, products_id int auto_increment primary key ,images JSON , title varchar(55), description varchar(5000),category varchar(55), subcategory varchar(55), price decimal(12,2), amount int, date varchar(55),foreign key (id) references users(id));
-- create saved products table --
create table saved_products (id int, product_id int, foreign key (id) references users(id) , foreign key (product_id) references products(products_id));
-- create table for admin users --
create table admin (id int , foreign key (id) references users(id));
-- create table for products that are in our carts--
create table cart (id int, product_id int , status enum("none" , "pending" , 'on way', "delivered") , date varchar(55),foreign key (id) references users(id) , foreign key (product_id) references products(products_id));
-- create table for bought items to display in users dashboard later---
create table bought_products (id int , product_id int , foreign key (id) references users(id) , foreign key (product_id) references products(products_id));
-- create table for reports  --
create table reports (id int , report_id int primary key, product_id int, type enum("product" , "delivery"), content varchar(255), foreign key reports(id) references users(id),  foreign key reports(product_id) references products(products_id));
-- create table for feedback --
create table feedback (id int , feedback_id int primary key auto_increment , content varchar(255), starts int(5) , foreign key (id) references users(id));
-- cretea table for support messages --
create table support_messages (message_id int primary key auto_increment, conversation_id int , sender_id int, content varchar(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (sender_id) references users(id));