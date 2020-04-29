import mongoose from 'mongoose';
import AccessLevels from "./AccessLevels";

type UserType = {_id: String, name: String; email: String, password: String, accessLevels: String[]}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    //give different access rights if admin or not
    accessLevels: {
        type: [String],
        required: true,
        default: [AccessLevels.CLIENT]
    }
});

const User = mongoose.model('User', UserSchema);

export {User, UserType}