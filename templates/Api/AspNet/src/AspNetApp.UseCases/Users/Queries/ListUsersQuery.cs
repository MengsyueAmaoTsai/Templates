using AspNetApp.UseCases.Abstractions;

using RichillCapital.SharedKernel.Monads;

namespace AspNetApp.UseCases.Users.Queries;

public sealed record ListUsersQuery : IQuery<ErrorOr<IEnumerable<UserDto>>>
{
}
