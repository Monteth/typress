import Either, {Left, Right} from "./Either";
import {Err, Errs} from "./Err";

type Validated<T> = Left<Errs> & {succeed: false} | Right<T> & {succeed: true}
/**
 *  Creates succeed Validated monad.
 *  Takes data and returns Validated<T> with given value.
 *  @param { T } data - Succeed monad value
 *  @return {Validated<T>} - Succeed monad with given value.
 */
const success = <T>(data: T): Validated<T> => ({
    left: false,
    value: data,
    succeed: true
});

/**
 *  Creates errored Validated monad.
 *  Takes data and returns Validated<T> with given value.
 *  @param { Err } error - Error monad value
 *  @return {Validated<T>} - Errored monad with given value.
 */
const error = <T>(error: Err): Validated<T> => ({
    left: true,
    value: [error],
    succeed: false
});

/**
 *  Creates errored Validated monad.
 *  Takes data and returns Validated<T> with given value.
 *  @param { Errs } errors - Error monad value
 *  @return {Validated<T>} - Errored monad with given value.
 */
const errors = <T>(errors: Errs): Validated<T> => ({
    left: true,
    value: errors,
    succeed: false
});

/**
 *  Adds errors to Validated monad.
 *  Takes errors and returns Validated<T> with old and new errors.
 *  @param { Validated<T> } m - Validated monad
 *  @param { Errs } newErrors - New errors
 *  @return { Validated<T> } - Errored monad with newErrors attached.
 */
const addErrors = <T>(m: Validated<T>, newErrors: Errs): Validated<T> => {
    return fromEither(Either.mapLeft<Errs, T, Errs>(m, (ers) => ers.concat(newErrors)));
};

/**
 * Generates Validated from Either.
 * @param { Either<Errs, T> } e - Either with Errs at Left value type
 * @return { Validated<T> } - Validated monad with e value.
 */
const fromEither = <T>(e: Either<Errs, T>): Validated<T> => {
    return Either.fold(e, ((e: Errs) => errors<T>(e)), ((d: T) => success<T>(d)) );
}

const Validated = {success, error, errors, addErrors, fromEither}

export default Validated
