using AspNetApp.Domain;
using AspNetApp.Domain.Abstractions.Repositories;
using AspNetApp.UseCases.Abstractions;

using RichillCapital.SharedKernel.Monads;

namespace AspNetApp.UseCases.Users.Queries;

internal sealed class GetUserQueryHandler(
    IReadOnlyRepository<User> _userRepository) : 
    IQueryHandler<GetUserQuery, ErrorOr<UserDto>>
{
    public async Task<ErrorOr<UserDto>> Handle(GetUserQuery query, CancellationToken cancellationToken)
    {
        var validationResult = UserId.From(query.UserId);

        if (validationResult.IsFailure)
        {
            return ErrorOr<UserDto>.WithError(validationResult.Error);
        }

        var id = validationResult.Value;

        var maybeUser = await _userRepository.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        if (maybeUser.IsNull)
        {
            return ErrorOr<UserDto>.WithError(UserErrors.NotFound(id));
        }

        var user = maybeUser.Value;

        return ErrorOr<UserDto>.With(user.ToDto());
    }
}