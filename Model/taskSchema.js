const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        required: [true, "Title to be provided"],
        type: String,
        maxLength: 35
    },
    description: {
        required: [true, "description to be provided"],
        type: String,
        maxLength: 200
    },
    createdAt: {
        default: Date.now(),
        type: Date
    },
    teacherRating: {

        max: 10,
        min: 0,
        type: Number,
        default: 0
    },
    hodRating: {

        max: 10,
        min: 0,
        type: Number,
        default: 0
    },
    adminRating: {

        max: 10,
        min: 0,
        type: Number,
        default: 0
    },
    teacherId: {
        required: [true, "must have a corr... teacher"],
        type: mongoose.mongo.ObjectId,
        ref: 'cuser'

    }





})


const Task = mongoose.model("task", taskSchema);

module.exports = Task;












