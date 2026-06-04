import { Either, Left, Right, isLeft, isRight } from "../src";

describe("Either", () => {
    type ParseError = {
        code: "not-a-number" | "out-of-range";
        message: string;
    };

    const parsePort = (input: string): Either<ParseError, number> => {
        const port = Number(input);

        if (!Number.isInteger(port)) {
            return Left({
                code: "not-a-number",
                message: `"${input}" is not a whole number`,
            });
        }

        if (port < 1 || port > 65535) {
            return Left({
                code: "out-of-range",
                message: `${port} is not a valid port`,
            });
        }

        return Right(port);
    };

    it("models a small validation flow without throwing", () => {
        const validPort = parsePort("3000");
        const invalidNumber = parsePort("banana");
        const invalidRange = parsePort("70000");

        expect(validPort).toEqual({ tag: "right", value: 3000 });
        expect(isRight(validPort)).toBe(true);
        expect(isLeft(validPort)).toBe(false);

        if (!isRight(validPort)) {
            throw new Error("expected validPort to be Right");
        }

        expect(validPort.value + 1).toBe(3001);

        expect(invalidNumber).toEqual({
            tag: "left",
            value: {
                code: "not-a-number",
                message: "\"banana\" is not a whole number",
            },
        });
        expect(isLeft(invalidNumber)).toBe(true);
        expect(isRight(invalidNumber)).toBe(false);

        expect(invalidRange).toEqual({
            tag: "left",
            value: {
                code: "out-of-range",
                message: "70000 is not a valid port",
            },
        });
    });
});
