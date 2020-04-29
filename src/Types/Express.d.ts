declare namespace Express {
    export interface Request {
        auth: {
            id?: String,
            accessLevels: String[]
        }
    }
}
