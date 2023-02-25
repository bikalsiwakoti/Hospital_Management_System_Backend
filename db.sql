CREATE DATABASE hopital_management_system;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL UNIQUE,  
    password VARCHAR(255),
    role VARCHAR(25),
    confirm_password VARCHAR(255) NOT NULL
    );
