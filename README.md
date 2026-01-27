# symvapp-backend -- Node.js (Express + ts)
Symv App Project backend deployment

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   Express
-   Typescript
-   JWT Authentication
-   Zod (validation)
-   Swagger (swagger-jsdoc + swagger-ui-express)
-   dotenv

------------------------------------------------------------------------

## Install Dependencies

``` bash
npm install
```

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create  `.env` file:

``` env
DBCONN_URI="mongodb+srv://<username>:<password>@<mongodb_url_path>?retryWrites=true&w=majority"
PORT=3000
SALT_ROUNDS = <choose salt-rounds>
JWT_SECRET=super_secret_key

```

------------------------------------------------------------------------
##  Run the Application (Development)

``` bash
npm run dev
```

App runs locally at:

    http://localhost:3000

------------------------------------------------------------------------

##  Swagger API Documentation

    http://localhost:3000/api-docs

 JWT Bearer Authentication.

------------------------------------------------------------------------

##  Authentication

Header:

    Authorization: Bearer <token>

------------------------------------------------------------------------

##  Build (Production)



``` bash
npm run build
```

------------------------------------------------------------------------

##  Deploy (Production)

``` bash
npm run start
```


------------------------------------------------------------------------