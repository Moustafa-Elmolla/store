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
### -Create two database one for development and one for testing
### -Create .env file and add variables below:
- Unordered Lists:
- PORT=3000
- NODE_ENV=dev
- POSTGRES_HOST=localhost
- POSTGRES_PORT=5432
- POSTGRES_DB=store_dev
- POSTGRES_DB_TEST=store_test
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=moustafa@91
- BCRYPT_PASSWORD=your-secret-password
- SALT_ROUNDS=10
- TOKEN_SECRET=your-secret-token

## Run and test

#### -for creating database table use: `db-migrate up`
#### -for run the server use: `npm run dev`
#### -for test use: `npm run test`
