/*create database and use it*/

create database e_commerce_db
use e_commerce_db

/*create user tables*/

create table users (id Int Primary key auto_increment , fullname varchar(55) unique , email varchar(55) unique , country_code varchar(5) , phone int(55) unique , password varchar(255))