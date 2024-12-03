﻿using Asp.Versioning;

using AspNetApp.Api.Contracts;
using AspNetApp.Api.Contracts.Users;
using AspNetApp.Api.Endpoints.Abstractions;
using AspNetApp.UseCases.Users.Commands;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using RichillCapital.SharedKernel.Monads;

using Swashbuckle.AspNetCore.Annotations;

namespace AspNetApp.Api.Endpoints.Users;

[ApiVersion(EndpointVersion.V1)]
public class CreateUserEndpoint(
    IMediator _mediator) : AsyncEndpoint
    .WithRequest<CreateUserRequest>
    .WithActionResult<UserCreatedResponse>
{
    [HttpPost(ApiRoutes.Users.Create)]
    [SwaggerOperation(Tags = [ApiTags.Users])]
    [AllowAnonymous]
    public override async Task<ActionResult<UserCreatedResponse>> HandleAsync(
        [FromBody] CreateUserRequest request,
        CancellationToken cancellationToken = default) =>
        await ErrorOr<CreateUserRequest>
            .With(request)
            .Then(req => new CreateUserCommand
            {
                Email = req.Email,
                Name = req.Name,
                Password = req.Password,
            })
            .Then(command => _mediator.Send(command, cancellationToken))
            .Then(id => new UserCreatedResponse { Id = id.Value })
            .Match(HandleFailure, Ok);

}
