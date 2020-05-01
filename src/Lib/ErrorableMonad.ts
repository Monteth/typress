import Either from "./EitherMonad";
import {Err, Errs} from "./Err";

function success<T>(data: T) {
    return Either.right<Errs,T>(data)
}

function error<T>(error: Err) {
    return Either.left<Errs, T>([error])
}

function errors<T>(errors: Errs) {
    return Either.left<Errs, T>(errors)
}

const Errorable = {success, error, errors}

export default Errorable
