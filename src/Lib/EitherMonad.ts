type Left<L> = {
    left: true;
    right: false;
    value: L;
}

type Right<R> = {
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

const map = <L, R, LResult, RResult>(m: Either<L,R>, left: ((v: L) => Either<LResult, R>), right: ((v: R) => Either<L, RResult>) ): Either<LResult, R> | Either<L,RResult> => {
    return m.left ? left(m.value) : right(m.value);
}

const mapLeft = <L,R, Result>(m: Either<L,R>, left: ((v: L) => Either<Result, R>)): Either<Result, R> => {
    return m.left ? left(m.value) : m;
}

const mapRight = <L,R, Result>(m: Either<L,R>, right: ((v: R) => Either<L, Result>)): Either<L, Result> => {
    return m.right ? right(m.value) : m;
};

const flatMap = <L, R, LResult, RResult>(m: Either<L,R>, left: ((v: L) => LResult), right: ((v: R) => RResult) ): LResult | RResult => {
    return m.left ? left(m.value) : right(m.value);
}

const flatMapLeft = <L,R, Result>(m: Either<L,R>, left: ((v: L) => Result)): Result | Either<L, R> => {
    return m.left ? left(m.value) : m;
}

const flatMapRight = <L,R, Result>(m: Either<L,R>, right: ((v: R) => Result)): Result | Either<L, R> => {
    return m.right ? right(m.value) : m;
};

const Either = {left: leftConstructor, right: rightConstructor, map, mapLeft, mapRight, flatMap, flatMapLeft, flatMapRight}

export default Either;