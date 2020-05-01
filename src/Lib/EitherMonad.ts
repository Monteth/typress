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

function leftConstructor<L, R>(data: L): Either<L, R> {
    return {
        left: true,
        right: false,
        value: data
    }
}

function rightConstructor<L, R>(data: R): Either<L, R> {
    return {
        left: false,
        right: true,
        value: data
    }
}

const Either = {left: leftConstructor, right: rightConstructor}

export default Either;