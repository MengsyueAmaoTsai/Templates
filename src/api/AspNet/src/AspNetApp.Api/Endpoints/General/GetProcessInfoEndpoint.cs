using System.Diagnostics;

using AspNetApp.Api.Contracts.General;

namespace AspNetApp.Api.Endpoints.General;

internal static class GetProcessInfoEndpoint
{
    internal static void MapProcessInfoEndpoint(
        this IEndpointRouteBuilder builder,
        string path = "/api/v1/process-info")
    {
        builder
            .MapGet(path, () => Results.Ok(Process.GetCurrentProcess().ToResponse()))
            .WithTags(ApiTags.General)
            .AllowAnonymous();
    }
}