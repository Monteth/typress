import mongoose from "mongoose"

type TaskType = {_id: String, title: String, done: boolean}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true
    }
})

const Task = mongoose.model("Task", taskSchema)
export {Task, TaskType}