CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INT,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
);
