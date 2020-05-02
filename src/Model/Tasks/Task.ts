import mongoose from "mongoose"

type TaskType = {_id: string, title: string, done: boolean} & mongoose.Document

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

const Task = mongoose.model<TaskType>("Task", taskSchema)
export {Task, TaskType}