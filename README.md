<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 
## Description

```
This is a NodeJs backend implemented with Express embedded in NestJS. It's a backend that sets up a Postgres database in Docker. It already includes a complete CRUD operations (Create, Read, Update, Delete) with authentication and authorization implemented using Passport and JWT strategies. The JWT token has a validity of 2 hours, but you can easily change it to whatever time you need. With this backend, you have a skeleton to start any application easily, having avoided the most challenging part of environment configuration and user authentication. Validations are being handled using TypeORM and Class-Validator.

```

## To start the database in Docker:

```bash
$ docker compose up -d
```


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ nest start --watch


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoint

```bash

create user:POST http://localhost:3000/api/auth/create
{
    "name":"ernesto",
    "surname": "Vivas",
    "email": "tes6@test.com",
    "password": "password",
    "telefono": 12345
    
}


```

```bash

login user:GET http://localhost:3000/api/auth/login

{
    "email": "tes6@test.com",
    "password": "pass"
}


```
```bash

login user:PATCH http://localhost:3000/api/auth/7f5a1e8b-7c20-4780-bb6b-e36e625d20e5

For protected routes, you need to send a Bearer Token in the Authorization header. This token is the JWT that you receive in the response from the login endpoint.



{
    ANY VALUE THAT YOU WANT TO UPDATE
    "email": "tes6@test.com",
    "password": "pass"
}


```
```bash

login user:DELETE http://localhost:3000/api/auth/7f5a1e8b-7c20-4780-bb6b-e36e625d20e5

For protected routes, you need to send a Bearer Token in the Authorization header. This token is the JWT that you receive in the response from the login endpoint.



{
    EMPTY
}


```


## Stay in touch

- Author - [ERNESTO VIVAS]
- +57-301-698-51-06
## License

Nest is [MIT licensed](LICENSE).
