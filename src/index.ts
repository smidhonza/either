type Left<T> = {
    tag: 'left';
    value: T;
};

type Right<T> = {
    tag: 'right';
    value: T;
};

export type Either<L, R> = Left<L> | Right<R>;

export const Left = <T>(value: T): Left<T> => ({ tag: 'left', value });
export const Right = <T>(value: T): Right<T> => ({ tag: 'right', value });

export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> => either.tag === 'left';
export const isRight = <L, R>(either: Either<L, R>): either is Right<R> => either.tag === 'right';
