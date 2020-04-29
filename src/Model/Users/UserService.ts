import {User, UserType} from "./User";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import config from "config";

const prepareResponse = (promise: Promise<any>) => promise
    .then(e => ({error: false, data: dbModelToLogic(e)}))
    .catch(e => ({error: true, errors: e}))

const register = async ({name, email, password}: UserType) => prepareResponse(
    User.create({name, email, password: await bcrypt.hash(password, 10)}))

const login = async ({email, password}: UserType) => {
    const user = await User.findOne({email}).then(e => e).catch(() => ({password: ''}))
    // @ts-ignore
    const logged = bcrypt.compareSync(password, user.password)
    return logged
        // @ts-ignore
        ? {error: false, data: { token: generateAuthToken(user) } }
        : {error: true, errors: [{message: "invalid credentials"}]}
}

const generateAuthToken = (user: UserType) => {
    const {_id, accessLevels} = user;
    return jwt.sign({id: _id, accessLevels}, config.get('myprivatekey'));
}

const dbModelToLogic = ({name, email, _id}: UserType) => ({id: _id, name, email})



export default {register, login}