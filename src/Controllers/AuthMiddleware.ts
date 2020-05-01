import jwt, {VerifyErrors} from "jsonwebtoken";
import config from "config";
import AccessLevels from "../Model/Users/AccessLevels";
import {NextFunction, Request, Response} from "express";

import Config from "../Lib/Const";

export default function (req: Request, res: Response, next: NextFunction) {
    const token = (req.headers["authorization"] || '').slice(7);
    if (token.length === 0) {
        req.auth = {accessLevels: [AccessLevels.GUEST]}
        next()
    } else {
        jwt.verify(token, config.get(Config.PRIVATE_KEY), (err: VerifyErrors | null, decoded: object | undefined) => {
            if ( err) {
                res.status(400).json({errors: [{message: "Invalid token."}]});
            } else {
                req.auth = decoded as Auth
                next()
            }
        })
    }
};