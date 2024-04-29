const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : String,
    description : String,
    priority : String,
    deadline : Date,
    dependencies : [{type: mongoose.Schema.Types.ObjectId, ref : 'Task'}],
    recurring : Boolean,
    pattern : String,
    status : {type : String, enum : ["pending", "approved", "rejected"], default : "pending"},
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    deletedBy : {type : mongoose.Schema.Types.ObjectId, ref : "User"}
}, {
    timestamps : false,
    versionKey : false
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = {
    taskModel
}