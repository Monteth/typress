import Either from "./EitherMonad";
import {Err, Errs} from "./Err";

type Errorable<T> = Either<Errs, T>

const success = <T>(data: T) => Either.right<Errs, T>(data);

const error = <T>(error: Err) => Either.left<Errs, T>([error]);

const errors = <T>(errors: Errs) => Either.left<Errs, T>(errors);

const addErrors = <T>(m: Errorable<T>, e: Errs): Errorable<T> => Either.mapLeft(m, (ers) => errors(ers.concat(e)));

const Errorable = {success, error, errors, addErrors}

export default Errorable
