# Storefront Backend Project

## 1. Required Technologies

#### -Postgres for database

#### -Node/Express for app logic

#### -dotenv for managing enc variables

#### -db-migrate for migrations

#### -jsonwebtoken for JWTs

#### -jasmine for testing

## 2. Steps for setup project

### -Use npm/yarn command to install node modules

```
npm install
```

### -Create build folder

```
npm run build
```

### -Enter psql command

```
psql -U postgres
```

### -Create two database one for development and one for testing

```
CREATE DATABASE store_dev
```

```
CREATE DATABASE store_test
```

### -Connect to Database for development

```
\c store_dev
```

### -Connect to Database testing for test

```
\c store_test
```

### -Create .env file and add variables below:

-   PORT=3000
-   NODE_ENV=dev
-   POSTGRES_HOST=localhost
-   POSTGRES_PORT=5432
-   POSTGRES_DB=store_dev
-   POSTGRES_DB_TEST=store_test
-   POSTGRES_USER=postgres
-   POSTGRES_PASSWORD=6688
-   BCRYPT_PASSWORD=your-secret-password
-   SALT_ROUNDS=10
-   TOKEN_SECRET=your-secret-token

## -Create database.json at the root directory

```
{
  "defaultEnv": { "ENV": "NODE_ENV" },
  "dev": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  },
  "test": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB_TEST" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  }
}
```

## Run and test

#### -for creating database table use: `db-migrate up`

#### -for run the server use: `npm run dev`

#### -for test use: `npm run test`

## API Endpoint

-   User Model
    A. POST '/users' will enable to Create user.
    B. GET '/users' will enable to GetAll users.
    C. GET '/users/:id' will enable to GetOne user.
    D. PATCH '/users/:id' will enable to Update user.
    E. DELETE '/users/:id' will enable to Delete user.

-   Product Model
    A. POST '/products' will enable to Create product.
    B. GET '/products' will enable to GetAll products.
    C. GET '/products/:id' will enable to GetOne product.

-   Order Model
    A. POST '/orders' will enable to Create product.
    B. POST '/orders/:id/products' will enable to GetAll products.
