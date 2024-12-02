using Asp.Versioning;

using AspNetApp.Api.Contracts;
using AspNetApp.Api.Endpoints.Abstractions;
using AspNetApp.UseCases.Users.Commands;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using RichillCapital.SharedKernel.Monads;

using Swashbuckle.AspNetCore.Annotations;

namespace AspNetApp.Api.Endpoints.Users;

[ApiVersion(EndpointVersion.V1)]
public sealed class DeleteUserEndpoint(
    IMediator _mediator) : AsyncEndpoint
    .WithRequest<string>
    .WithActionResult
{
    [HttpDelete(ApiRoutes.Users.Delete)]
    [SwaggerOperation(Tags = [ApiTags.Users])]
    [AllowAnonymous]
    public override async Task<ActionResult> HandleAsync(
        [FromRoute(Name = nameof(userId))] string userId,
        CancellationToken cancellationToken = default) =>
        await Result<string>
            .With(userId)
            .Then(id => new DeleteUserCommand { UserId = id })
            .Then(command => _mediator.Send(command, cancellationToken))
            .Match(_ => NoContent(), HandleFailure);
}
