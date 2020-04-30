import {Err} from "./Err";

type EitherMonad<T> = EMLeft<T> | EMRight<T>

type EMRight<T> = {
    valid: true;
    data: T;
}

type EMLeft<T> = {
    valid: false;
    error: Err[];
}

function rightConstructor<T>(data:T):EitherMonad<T> {return {valid: true, data}}

function leftConstructor<T>(error:Err[]):EitherMonad<T> {return {valid: false, error}}


const Either = {right: rightConstructor, left: leftConstructor}

export default Either;
