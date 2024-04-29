const express = require('express');
const {userRegister, userLogin} = require("../contoller/userController");

const userRouter = express.Router();


/*
* @swagger
* components:
*   schemas:
*       User:
*           type : string
*           properties:
*           id:
*               type: string
*               description : The auto-generated id of the user
*           email:
*               type: string
*               description : The email of the user
*           password:
*               type: string
*               description : The passowrd of the user
*           username:
*               type: string
*               description : The priority of the username
*
*
* */


/*
* @swagger
* /users:
*   get:
*       summery: This will get all the users data from the database
*       tags: [User]
*       responses:
*           200:
*               description: The list of all the users
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */
userRouter.get('/', (req, res) => {
    res.send("this is user router")
})


/*
* @swagger
* /users:
*   post:
*       summery: This will post the user data from the database
*       tags: [User]
*       responses:
*           200:
*               description: The register of the user
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */
userRouter.post('/register', userRegister)


/*
* @swagger
* /users:
*   post:
*       summery: This will post the user data from the database
*       tags: [User]
*       responses:
*           200:
*               description: The login the users
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */

userRouter.post('/login', userLogin)


module.exports = {
    userRouter
}