using AspNetApp.UseCases.Abstractions;

using RichillCapital.SharedKernel.Monads;

namespace AspNetApp.UseCases.Users.Commands;

public sealed record DeleteUserCommand : ICommand<Result>
{
    public required string UserId { get; init; }
}
