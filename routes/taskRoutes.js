const express = require('express');
const {auth} = require("../middleware/authentication");
const {authorizeRole} = require("../middleware/accessMiddleware");
const {createTask, updateTask, deleteTask, viewDailyTasks, viewMemberTask, approveTaskDeletion} = require("../contoller/taskController");
const {taskModel} = require("../model/taskModel");

const taskRouter = express.Router();

/*
* @swagger
* components:
*   schemas:
*       Task:
*           type : string
*           properties:
*           id:
*               type: string
*               description : The auto-generated id of the task
*           title:
*               type: string
*               description : The title of the task
*           description:
*               type: string
*               description : The description of the task
*           priority:
*               type: string
*               description : The priority of the task
*           deadline:
*               type: string
*               description : The deadline of the task to complete
*           status:
*               type: string
*               description : The status of the task
*
*
* */


/*
* @swagger
* /tasks:
*   get:
*       summery: This will get all the tasks data from the database
*       tags: [Tasks]
*       responses:
*           200:
*               description: The list of all the tasks
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */


taskRouter.get('/', auth, (req, res) => {
    res.send("this is task router")
})

// taskRouter.get('/daily-tasks', auth)


/*
* @swagger
* /tasks:
*   post:
*       summery: This will post the task data from the database
*       tags: [Tasks]
*       responses:
*           201:
*               description: The list of all the tasks
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */

taskRouter.post('/', auth, authorizeRole("Member"), createTask);


/*
* @swagger
* /tasks:
*   patch:
*       summery: This will update the task data from the database
*       tags: [Tasks]
*       responses:
*           200:
*               description: The list of all the tasks
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */

taskRouter.patch('/:id', auth,authorizeRole("Member"), updateTask);


/*
* @swagger
* /tasks:
*   delete:
*       summery: This will delete the task data from the database
*       tags: [Tasks]
*       responses:
*           200:
*               description: The list of all the tasks
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */

taskRouter.delete('/:id', auth, authorizeRole( "Manager"), deleteTask);

// Admin Routes


/*
* @swagger
* /tasks:
*   get:
*       summery: This will get all the tasks of today data from the database
*       tags: [Tasks]
*       responses:
*           200:
*               description: The list of all the tasks
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */
taskRouter.get('/daily', auth, authorizeRole('Admin'), viewDailyTasks);

//Manager Routes

/*
* @swagger
* /tasks:
*   get:
*       summery: This will get all the tasks of today data from the database
*       tags: [Tasks]
*       responses:
*           200:
*               description: The list of all the tasks
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */
taskRouter.get('/daily', auth, authorizeRole("Manager"), viewMemberTask);

/*
* @swagger
* /tasks:
*   patch:
*       summery: This will approve deletion of the task data from the database
*       tags: [Tasks]
*       responses:
*           200:
*               description: The list of all the tasks
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           item:
*                               $ref: "#/components/schemas/Task"
*
* */
taskRouter.patch('/approve', auth, authorizeRole("Manager"), approveTaskDeletion)

module.exports = {
    taskRouter
}