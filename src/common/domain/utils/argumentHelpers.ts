// I think this is a weird thing to put in the domain. Here's my logic though:
// The domain can't import anything from any other layer. It's isolated and idempotent.
// It still needs to guard itself against invalid arguments though. In dotnet, this would be done through Ardalis Guard clauses.
// I didn't find a comparable node library at first glance, so I'm implementing these helpers here.
// By putting these in the common.domain layer, at the center of the onion, they can be accessed by any other part of the application.

import ArgumentError from '../errors/ArgumentError';

export const guardAgainstNull = <T>(argument: T, argumentName: string): T => {
    if (argument === null || argument === undefined) throw new ArgumentError(`${argumentName} cannot be null or undefined.`);
    return argument;
};

export const guardAgainstNullOrEmpty = <T extends { length: number }>(argument: T, argumentName: string): T => {
    const nullValidatedArg = guardAgainstNull(argument, argumentName);
    if (!nullValidatedArg.length || nullValidatedArg.length === 0) throw new ArgumentError(`${argumentName} cannot be empty.`);
    return argument;
};
