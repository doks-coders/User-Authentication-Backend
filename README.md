# Nestjs User Authentication API

The utilization of different application models to create a seamless authentication sequence that encompasses events, error handling standards and unit and component testing
## Documentation

[Swagger Documentation](https://user-authentication-backend-zuim.onrender.com/api)


## Run Locally

To clone this project run

```bash
  git clone https://github.com/doks-coders/User-Authentication-Backend.git
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

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/procurement-app-10bdf.appspot.com/o/Screenshot_20230425-101614~2.png?alt=media&token=c6507bb9-ac9a-4f1d-86a9-3540020f8892)


## Usage/Examples

### Register User
```javascript
[POST] http://localhost:3000/users/register-user 

headers => {
           Content-Type: application/json
           }

body => {
          "name": "Daniel Odokuma",
          "email": "david@gmail.com",
          "password": "Password1234&",
          "passwordVerify": "Password1234&",
          "role": "admin",
          "frontend_verify_emailLink": "https://mywebsite.com/    verify-email"
}

```


Body Properties | Type |Description
--- | --- |---
 `name` | `string`   | **Required**
 `email` | `string`   | **Required**
`password` | `string`   | **Required**
`passwordVerify` | `string`   | **Required**
`role` | `string`   | **Required**
`frontend_verify_emailLink` | `string`   | **Required**
 
 



### Success Codes
Name | Code |Description
--- | --- |----
Created | `201`   | A user is created

### Error Codes

Name | Code |Description
--- | --- |---
Forbidden | `403`   | A smiliar email has been registered
Unauthorised | `401` | Your passwords do not match 
Unprocessable entity | `422`  | You have an invalid email, invalid password or invalid front-end verify email link






### Authenticate New User
```javascript
[GET] http://localhost:3000/authentication/verify-email/{emailJWT} 


```
Parameter | Type |Description
--- | --- |---
`emailJWT` | `string`   | **Required**


### Success Codes
Name | Code |Description
--- | --- |----
Created | `200`   | Your account has been verified

### Error Codes

Name | Code |Description
--- | --- |---
Forbidden | `403`   | Your link has expired
Not Found | `404` | Your email cannot be found
Internal Server Error | `500` | Verified account did not save


### Log In User
```javascript
[POST] http://localhost:3000/users/login-user 

headers => {
           Content-Type: application/json
           }

body => {
          "email": "david@gmail.com",
          "password": "Password1234&"
}

```
Body Properties | Type |Description
--- | --- |---
`email` | `string`   | **Required**
`password` | `string`   | **Required**


### Success Codes
Name | Code |Description
--- | --- |----
Created | `200`   | User has logged in successfully

### Error Codes

Name | Code |Description
--- | --- |---
Unauthorised | `401` | Your account has not been verified
Forbidden | `404`   | Your email cannot be found
Unprocessable entity | `422`  | Your password is incorrect




```javascript
[POST] http://localhost:3000/users/forgot-password

headers => {
           Content-Type: application/json
           }

body => {
          "email": "david@gmail.com",
          "frontend_verify_emailLink": "https://mywebsite.com/forgot-password"
}

```

Body Properties | Type |Description
--- | --- |---
`email` | `string`   | **Required**
`frontend_verify_emailLink` | `string`   | **Required**


### Success Codes
Name | Code |Description
--- | --- |----
Created | `200`   | The email has been sent successfully to the user

### Error Codes

Name | Code |Description
--- | --- |---
Forbidden | `403` | Your front end verify email link ends with a '/'
Not Found | `404`   | Your email cannot be found
Unprocessable Entity | `422`  | Your front end verify email link is incorrect
Internal Server Error | `500` | Your verification configuration failed to save



### Forgot Password Authorisation
```javascript
[GET] http://localhost:3000/authentication/forgot-password/{emailJWT} 


```
Parameter | Type |Description
--- | --- |---
 `emailJWT` | `string`   | **Required**


### Success Codes
Name | Code |Description
--- | --- |----
Created | `200`   | You are authorised to change your password

### Error Codes

Name | Code |Description
--- | --- |---
Forbidden | `403`   | Your link has expired
Not Found | `404` | Your email cannot be found
Internal Server Error | `500` | Your authorisation configuration did not save





### Forgot Password Set
```javascript
[POST] http://localhost:3000/users/forgot-password-set/{emailJWT}

headers => {
           Content-Type: application/json
           }

body => {
          "password": "Password1234&",
          "passwordVerify": "Password1234&"
}

```

Body Properties | Type |Description
--- | --- |---
 `emailJWT` | `string`   | **Required**


### Success Codes
Name | Code |Description
--- | --- |----
Created | `200`   | Your password has been changed successfully

### Error Codes

Name | Code |Description
--- | --- |---
Unauthorized | `401` | You are not authorised to make this request because 'authentication/forgot-password/{emailJWT}'   has not been successful 
Forbidden | `403`   | Your email link has expired
Not found | `404`  | Your email is not found
Unprocessable Entity | `422` | Your passwords do not match








## Feedback

If you have any feedback, please reach out to us at guonnie@gmail.com

