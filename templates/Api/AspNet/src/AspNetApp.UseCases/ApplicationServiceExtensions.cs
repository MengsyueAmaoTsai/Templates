using Microsoft.Extensions.DependencyInjection;

namespace AspNetApp.UseCases;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatR(configuration =>
            configuration.RegisterServicesFromAssembly(typeof(ApplicationServiceExtensions).Assembly));

        return services;
    }
}
