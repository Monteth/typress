export type Left<L> = {
    left: true;
    right: false;
    value: L;
}

export type Right<R> = {
    left: false;
    right: true;
    value: R;
}

type Either<L, R> = Left<L> | Right<R>

const leftConstructor = <L, R>(data: L): Either<L, R> => ({
    left: true,
    right: false,
    value: data
});

const rightConstructor = <L, R>(data: R): Either<L, R> => ({
    left: false,
    right: true,
    value: data
});

/**
 *  Applies function on right monad value.
 *  Takes Either and function receiving right value.
 *  Returns result of function applied on given monad wrapped in Either.
 *  @param { Either<L, R> } m - Either monad
 *  @param { ( v: R ) => Result } rf - Function applied to monad value if either is right
 *  @return { Either<L, Result> } - Result of rf
 */
const map = <L,R, Result>(m: Either<L,R>, rf: ((v: R) => Result)): Either<L, Result> => {
    return m.left ? leftConstructor<L, Result>(m.value) : rightConstructor(rf(m.value));
};

/**
 *  Applies function on left monad value.
 *  Takes Either and function receiving left value.
 *  Returns result of function applied on given monad wrapped in Either.
 *  @param { Either<L, R> } m - Either monad
 *  @param { ( v: L ) => Result } lf - Function applied to monad value if either is left
 *  @return { Either<Result, R> } - Result of lf
 */
const mapLeft = <L,R, Result>(m: Either<L,R>, lf: ((v: L) => Result)): Either<Result, R> => {
    return m.left ? leftConstructor(lf(m.value)) : rightConstructor<Result, R>(m.value);
}

/**
 *  Binds function on right monad value.
 *  Takes Either and function receiving right value and returns Either.
 *  Returns result of function applied on given monad.
 *  @param { Either<L, R> } m - Either monad
 *  @param { ( v: R ) => Either<L, Result> } rf - Function binded to monad value if either is right
 *  @return { Either<L, Result> } - Result of rf
 */
const flatMap = <L,R, Result>(m: Either<L,R>, rf: ((v: R) => Either<L, Result>)): Either<L, Result> => {
    return m.left ? leftConstructor<L, Result>(m.value) : rf(m.value);
};

/**
 *  Binds function on left monad value.
 *  Takes Either and function receiving left value and returns Either.
 *  Returns result of function applied on given monad.
 *  @param { Either<L, R> } m - Either monad
 *  @param { ( v: L ) => Either<Result, R> } lf - Function binded to monad value if either is left
 *  @return { Either<Result, R> } - Result of lf
 */
const flatMapLeft = <L,R, Result>(m: Either<L,R>, left: ((v: L) => Either<Result, R>)): Either<Result, R> => {
    return m.left ? left(m.value) : rightConstructor<Result, R>(m.value);
}

/**
 *  Applies lf or rf function on monad value to produce bare value.
 *  Takes Either, function receiving left value and function receiving right value.
 *  Returns result of function applied on given monad.
 *  @param { Either<L, R> } m - Either monad
 *  @param { ( v: L ) => Result } lf - Function applied to monad value if either is left
 *  @param { ( v: R ) => Result } rf - Function applied to monad value if either is right
 *  @return { Either<Result, R> } - Result of lf or rf
 */
const fold = <L, R, Result>(m: Either<L,R>, lf: ((v: L) => Result), rf: ((v: R) => Result) ): Result => {
    return m.left ? lf(m.value) : rf(m.value);
}

/**
 *  Applies lf function on monad value to produce bare value.
 *  Takes Either, function receiving left value and default value.
 *  Returns result of function applied on given monad or default value.
 *  @param { Either<L, R> } m - Either monad
 *  @param { ( v: L ) => Result } lf - Function applied to monad value if either is left
 *  @param { Result } def - Default result value
 *  @return { Either<Result, R> } - Result of lf or default
 */
const foldLeft = <L,R, Result>(m: Either<L,R>, lf: ((v: L) => Result), def: Result): Result => {
    return m.left ? lf(m.value) : def;
}

/**
 *  Applies rf function on monad value to produce bare value.
 *  Takes Either, function receiving right value and default value.
 *  Returns result of function applied on given monad or default value.
 *  @param { Either<L, R> } m - Either monad
 *  @param { ( v: R ) => Result } rf - Function applied to monad value if either is right
 *  @param { Result } def - Default result value
 *  @return { Either<Result, R> } - Result of rf or default
 */
const foldRight = <L,R, Result>(m: Either<L,R>, rf: ((v: R) => Result), def: Result): Result => {
    return m.left ? def : rf(m.value);
}

const Either = {left: leftConstructor, right: rightConstructor, map, mapLeft, flatMap, flatMapLeft, fold, foldLeft, foldRight}

export default Either;