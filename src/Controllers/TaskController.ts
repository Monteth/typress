import express, {NextFunction, Request, Response} from 'express';
import TaskService, {TaskModel} from "../Model/Tasks/TaskService";
import AccessLevels from "../Model/Users/AccessLevels";
import Validated from "../Lib/Validated";
import {TaskType} from "../Model/Tasks/Task";
import Either from "../Lib/Either";
const TaskController = express.Router();

const handleData = <T>({data, res, next}: {data: Validated<T>, res: Response, next: NextFunction}) => res.json(data.value)

const getUser = (req: Request) => req.auth
const getAccessLevels = (req: Request) => req.auth.accessLevels
const generateHasAccessLvl = (lvl: string) => (req: Request) => getAccessLevels(req).includes(lvl)
const accessError = () => ({error: true, errors: [{message: "You don't have access to this resource"}]})


TaskController.get('/', async (req, res, next) => {
    const data = await TaskService.listTasks()

    handleData<TaskModel[]>({data, next, res})
});

TaskController.get('/:id', async (req, res, next) => {
    const data = await TaskService.getTask(req.params.id)

    handleData({data, next, res})
});

TaskController.post('/', async (req: Request, res, next) => {
    const data = await TaskService.createTask(req.body)

    handleData({data, next, res})
});

TaskController.put('/:id', async (req, res, next) => {
    const data = await TaskService.editTask({model: req.body, id: req.params.id})

    handleData({data, next, res})
});

TaskController.delete('/:id', async (req, res, next) => {
    const hasAccessLvl = generateHasAccessLvl(AccessLevels.CLIENT)

    const success = async () => await TaskService.removeTask(req.params.id)

    const data = hasAccessLvl(req)
        ? await success()
        : Validated.error<TaskModel>({message: "Not found`"})

    handleData<TaskModel>({data, res, next})
});

export default TaskController;
