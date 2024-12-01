﻿using RichillCapital.SharedKernel;
using RichillCapital.SharedKernel.Monads;

namespace AspNetApp.Domain;

public sealed class UserName : SingleValueObject<string>
{
    internal const int MaxLenth = 36;

    private UserName(string value) 
        : base(value)
    {
    }

    public static Result<UserName> From(string value) =>
        Result<string>
            .With(value)
            .Ensure(name => !string.IsNullOrEmpty(name), Error.Invalid($"'{nameof(value)}' cannot be null or empty."))
            .Ensure(name => name.Length <= MaxLenth, Error.Invalid($"'{nameof(value)}' cannot be longer than {MaxLenth} characters."))
            .Then(name => new UserName(name));
}