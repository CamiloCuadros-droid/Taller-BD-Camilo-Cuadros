CREATE DATABASE IF NOT EXISTS logindatabase2;
USE logindatabase2;

CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) ,
  password VARCHAR(255)
);
USE logindatabase2;
SELECT * FROM user;


