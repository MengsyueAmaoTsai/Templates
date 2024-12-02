using AspNetApp.Domain.Abstractions.Events;

using Microsoft.Extensions.DependencyInjection;

namespace AspNetApp.Infrastructure.Events;

public static class EventServiceExtensions
{
    public static IServiceCollection AddDomainEventServices(this IServiceCollection services)
    {
        services.AddSingleton<InMemoryDomainEventQueue>();
        services.AddSingleton<IDomainEventBus, DomainEventBus>();
        services.AddHostedService<DomainEventProcessorJob>();
        services.AddDefaultDomainEventDispatcher();

        return services;
    }

    private static IServiceCollection AddDefaultDomainEventDispatcher(this IServiceCollection services) =>
        services.AddScoped<IDomainEventDispatcher, DefaultDomainEventDispatcher>();
}
