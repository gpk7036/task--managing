const {taskModel} = require("../model/taskModel");
const {generateRecurringTask} = require("./recurrring");

const createTask = async (req, res) => {
    try {
        const newTask = new taskModel(req.body);
        if(newTask.recurring) {
           await generateRecurringTask(newTask)
        }
        await newTask.save();
        return res.status(201).json({newTask});
    } catch (e) {
        return  res.status(500).json({message : e.message})
    }
}

const updateTask = async (req, res) => {
    const {id} = req.params;
    try {
        const task = await taskModel.findByIdAndUpdate({_id: id}, req.body);
        if(!task) return res.status(404).json({message : "task not found"})
        return res.status(200).json({task});
    } catch (e) {
        return  res.status(500).json({message : e.message})
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskModel.findById(taskId);
        if(!task) return res.status(404).json({message : "task not found"})
        if(task.status !== 'approved') {
            return res.status(403).json({message : "Task deletion requires manager approval."})
        }
        await task.remove();
        res.status(200).json({message : "task deleted succeessfully"})
    } catch (e) {
        return  res.status(500).json({message : e.message})
    }
}

// Admin Controller
const viewDailyTasks = async (req, res) => {
    try {
        const today = new Date();
        const tasks = await taskModel.find({deadline : {$gte : today, $lt : new Date(today.getTime() + 24 * 60 * 60 * 1000)}});
        res.join({tasks});
    } catch (e) {
        res.status(500).join({message : e.message})
    }
}

//Manger Controller
const viewMemberTask = async (req, res) => {
    try {
        const memberId = req.params.id;
        const today = new Date();
        const tasks = await taskModel.find({assignedTo : memberId, deadline : {$gte : today, $lt : new Date(today.getTime() + 24 * 60 * 60 * 1000)}});
        res.join({tasks});
    } catch (e) {
        res.status(500).join({message : e.message})
    }
}

const approveTaskDeletion = async (req, res) => {
    try {
        const taskId = req.params.id;
        await taskModel.findByIdAndUpdate(taskId, {status : "approved"});
        res.join({message : "Task deletion approved successfully"});
    } catch (e) {
        res.status(500).join({message : e.message})
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    viewDailyTasks,
    viewMemberTask,
    approveTaskDeletion
}