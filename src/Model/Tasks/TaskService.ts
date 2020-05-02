import {Task, TaskType} from "./Task";
import Validated from "../../Lib/Validated";
import Either from "../../Lib/Either";

const validate = <T>(promise: Promise<T>): Promise<Validated<T>> => promise
    .then((d: T) => Validated.success<T>(d))
    .catch(() => Validated.error({message: "Query error"}))

const createTask = (taskInput: any) => {
    return validate(Task.create(taskInput))
        .then((v: Validated<TaskType>) => Validated.fromEither(Either.map(v, dbModelToLogic)));
}

const listTasks = (): Promise<Validated<TaskModel[]>> => {
    return validate(Task.find().exec())
        .then(v => Validated.fromEither(Either.map(v, dbModelsToLogic)));
}

const getTask = (id: String) => {
    return validate(Task.findOne({_id: id}).exec())
        .then((v: Validated<TaskType | null>) =>
            v.value === null
                ? Validated.error({message: "Not found."})
                : Validated.success(dbModelToLogic(v.value as TaskType)));
}

const editTask = ({model, id}: {model: any, id: String}) => {
    return validate(Task.findOneAndUpdate({_id: id}, model, {new: true}).exec())
        .then((v: Validated<TaskType | null>) =>
            v.value === null
                ? Validated.error({message: "Not found."})
                : Validated.success(dbModelToLogic(v.value as TaskType)));
}

const removeTask = (id: String): Promise<Validated<TaskModel>> => {
    return validate(Task.findOneAndRemove({_id: id}).exec())
        .then((v: Validated<TaskType | null>) =>
            v.value === null
                ? Validated.error({message: "Not found."})
                : Validated.success(dbModelToLogic(v.value as TaskType)));
};

export type TaskModel = {
    title: string;
    id: string;
    done: boolean;
}

const dbModelToLogic = ({title, done, _id}: TaskType): TaskModel => ({id: _id, title: title, done: done})
const dbModelsToLogic = (tasks: TaskType[]) => tasks.map((t: TaskType) => dbModelToLogic(t))

export default {listTasks, createTask, editTask, getTask, removeTask}