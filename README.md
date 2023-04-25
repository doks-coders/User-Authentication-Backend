# Nestjs User Authentication API

The utilization of different application models to create a seamless authentication sequence that encompasses events, error handling standards and unit and component testing
## Documentation

[Documentation](https://linktodocumentation)


## Run Locally

To clone this project run

```bash
  git clone @doks-coder.github.com
```


## Deployment

To deploy this project run

```bash
  npm run start:dev
```


## User Flow

In order to supply the front-end with the required data, a good system is needed to be put in place. 
An efficient system that understands what users will require in order to give them access to the application. 

Backend Engineers need to deliver standard endpoints that give front-end developers the proper respones which would enable them to design better and more efficient user interfaces


## Data Flow Design

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Usage/Examples

```javascript
[POST] http://localhost:3000/auth/loginjwt 

headers => {
           Content-Type: application/json
           }

body => {
        "email" :"guonnie@gmail.com",
        "password":"Password1234&"
        }

```


## Error Codes Used


Error Code | #1 
--- | --- 
Error | 301  | 
Auth | 401   |
Uncaught | 301 |
Good | 500
