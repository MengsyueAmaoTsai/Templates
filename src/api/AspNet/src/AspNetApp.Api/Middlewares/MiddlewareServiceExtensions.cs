﻿namespace AspNetApp.Api.Middlewares;

internal static class MiddlewareServiceExtensions
{
    internal static IServiceCollection AddMiddlewares(this IServiceCollection services)
    {
        services.AddScoped<RequestDebuggingMiddleware>();

        return services;
    }

    internal static IApplicationBuilder UseRequestDebuggingMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<RequestDebuggingMiddleware>();

        return app;
    }
}
