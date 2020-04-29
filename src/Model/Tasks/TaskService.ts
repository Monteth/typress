import {Task, TaskType} from "./Task";

const prepareResponse = (promise: any) => promise
        .then((e: TaskType[]) => ({error: false, data: Array.isArray(e) ? dbModelsToLogic(e) : dbModelToLogic(e)}))
        .catch((e: any) => ({error: true, errors: e}))

const createTask = (taskInput: any) => prepareResponse(Task.create(taskInput))

const listTasks = () => prepareResponse(Task.find())

const getTask = (id: String) => prepareResponse(Task.findOne({_id: id}))

const editTask = ({model, id}: {model: any, id: String}) => prepareResponse(Task.findOneAndUpdate({_id: id}, model, {new: true}))

const removeTask = (id: String) => prepareResponse(Task.findOneAndRemove({_id: id}))

const dbModelToLogic = ({title, done, _id}: TaskType) => ({id: _id, title: title, done: done})
const dbModelsToLogic = (tasks: TaskType[]) => tasks.map((t: TaskType) => dbModelToLogic(t))

export default {listTasks, createTask, editTask, getTask, removeTask}