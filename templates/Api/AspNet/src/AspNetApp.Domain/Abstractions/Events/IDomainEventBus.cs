using RichillCapital.SharedKernel;

namespace AspNetApp.Domain.Abstractions.Events;

public interface IDomainEventBus
{
    Task PublishAsync<TDomainEvent>(TDomainEvent domainEvent, CancellationToken cancellationToken = default)
        where TDomainEvent : IDomainEvent;
}
