# @smidhonza/either

A tiny TypeScript `Either` helper for values that can go one of two ways:

- `Right(value)` means the computation worked.
- `Left(value)` means it did not.

Think of it as a civilized alternative to throwing errors across the room.

## Install

```sh
npm i @smidhonza/either
```

## Simple Example

```ts
import { Either, Left, Right, isLeft } from '@smidhonza/either';

type ParseError = {
  message: string;
};

const parsePort = (input: string): Either<ParseError, number> => {
  const port = Number(input);

  if (!Number.isInteger(port)) {
    return Left({ message: `"${input}" is not a whole number` });
  }

  if (port < 1 || port > 65535) {
    return Left({ message: `${port} is not a valid port` });
  }

  return Right(port);
};

const result = parsePort('3000');

if (isLeft(result)) {
  console.error(result.value.message);
} else {
  console.log(`Server ready on port ${result.value}`);
}
```

Output:

```txt
Server ready on port 3000
```

Try `parsePort('banana')` and it will politely hand you a `Left` instead of turning your call stack into a crime scene.

## API

### `Either<L, R>`

A union type representing either a left value or a right value.

```ts
type Result = Either<Error, string>;
```

### `Left(value)`

Creates a left value. Use it for errors, missing data, invalid input, or any branch where the answer is "not today".

```ts
const result = Left('User not found');
```

### `Right(value)`

Creates a right value. Use it for successful results.

```ts
const result = Right({ id: 1, name: 'Ada' });
```

### `isLeft(either)`

Checks whether an `Either` is a `Left`, while narrowing the TypeScript type.

```ts
if (isLeft(result)) {
  console.log(result.value);
}
```

### `isRight(either)`

Checks whether an `Either` is a `Right`, while narrowing the TypeScript type.

```ts
if (isRight(result)) {
  console.log(result.value);
}
```

## Development

Build the package:

```sh
npm run build
```

## License

ISC
