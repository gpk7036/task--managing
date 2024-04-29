const {taskModel}  = require("../model/taskModel");

async function generateRecurringTask(task) {
    const newTasks = [];
    const currentDate = new Date(task.deadline);
    const duration = 7;
    for(let i = 0; i < duration; i++) {
        const newTask = new taskModel({
            title : task.title,
            description : task.description,
            priority : task.priority,
            deadline : new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000),
            recurring : false,
            assignedTo : task.assignedTo
        });
        newTasks.push(newTask);
    }
    await task.insertMany(newTasks);
}

module.exports = {
    generateRecurringTask
}