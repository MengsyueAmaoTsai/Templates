using AspNetApp.UseCases.Abstractions;

using RichillCapital.SharedKernel.Monads;

namespace AspNetApp.UseCases.Users.Queries;

public sealed record GetUserQuery : IQuery<ErrorOr<UserDto>>
{
    public required string UserId { get; init; }
}
