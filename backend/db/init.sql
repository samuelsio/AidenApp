CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender VARCHAR(10),
    last_logged_in TIMESTAMP
);

INSERT INTO users (email, password, first_name, last_name, gender) 
VALUES 
('testuser@example.com', 'passwordhash', 'Test', 'User', 'Male'),
('admin@example.com', 'adminhash', 'Admin', 'User', 'Female');