CREATE DATABASE justGoUsers;

USE justGoUsers;

CREATE TABLE user (
	id int NOT NULL AUTO_INCREMENT,
    username VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    created DATETIME,
    last_updated DATETIME,
    PRIMARY KEY (id)
)