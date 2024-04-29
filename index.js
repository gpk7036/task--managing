const express = require('express');
const {ConnectToDB} = require('./config/db')
const {userRouter} = require("./routes/userRoutes");
const {taskRouter} = require("./routes/taskRoutes");
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Managing',
            version: '1.0.0',
        },
        servers : [
            {
                url : "http://localhost:3000/user"
            }
        ]
    },
    apis: ['./rotes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use('/user', userRouter);
app.use('/task', taskRouter);

app.get('/', (req, res) => {
    res.send("this is home page")
})

app.listen(port, async (req, res) => {
    await ConnectToDB()
    console.log(`server is running at ${port}`)
})