/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    user_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
    );
