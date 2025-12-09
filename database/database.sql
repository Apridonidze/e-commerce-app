/*create database and use it*/

create database e_commerce_db
use e_commerce_db

/*create user tables*/

create table users (id Int Primary key auto_increment , fullname varchar(55) unique , email varchar(55) unique , country_code varchar(5) , phone int(55)  , password varchar(255))


/* creates product table */


create table products (id int , product_id int primary key auto_increment  , images JSON, title varchar(55), description varchar(500) , category varchar(55) , subcategory varchar(55))


/* creates saved products table */
create table saved_products (id int , product_id int)