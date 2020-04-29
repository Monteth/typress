import express from 'express';
import UserService from "../Model/Users/UserService";
const AuthController = express.Router();

// @ts-ignore
const handleData = (data, next, res) => data.error
    ? next(data.errors)
    : res.json(data.data);

AuthController.post('/register', async function(req, res, next) {
    const data = await UserService.register(req.body)
    handleData(data, next, res)
});

AuthController.post('/login', async function(req, res, next) {
    const data = await UserService.login(req.body)
    handleData(data, next, res)
});

export default AuthController;