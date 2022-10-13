# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index `localhost:3000/products` [GET]
-   Show `localhost:3000/products/:id` [GET]
-   Create [token required] `localhost:3000/products` [POST]
-   [OPTIONAL] Top 5 most popular products
-   [OPTIONAL] Products by category (args: product category)

#### Users

-   Index [token required] `localhost:3000/users` [GET]
-   Show [token required] `localhost:3000/users/:id` [GET]
-   Create N[token required] `localhost:3000/users/` [POST]
-   [EXTRA] Delete : `localhost:3000/users/:id` [DELETE]

#### Orders

-   Current Order by user (args: user id)[token required] `localhost:3000/orders/:UserId` [GET]
-   [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Users

-   id (SERIAL)
-   email
-   userName
-   firstName
-   lastName
-   password

#### Products

-   id (SERIAL)
-   name
-   price

#### Orders

-   id (SERIAL)
-   status of order (active or complete)
-   user_id

#### Order_products

-   id (SERIAL)
-   quantity
-   order_id
-   product_id

## Database Schemas

#### Users

CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(100) UNIQUE,
user_name VARCHAR(100) NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL
);

#### Products

CREATE TABLE products(
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price integer NOT NULL
);

#### Orders

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id INT REFERENCES users(id)
);

#### Order_products

CREATE TABLE order_products (
id SERIAL PRIMARY KEY,
quantity INT,
order_id INT REFERENCES orders(id),
product_id INT REFERENCES products(id)
);
