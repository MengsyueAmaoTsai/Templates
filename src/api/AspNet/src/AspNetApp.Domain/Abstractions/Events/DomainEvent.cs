using RichillCapital.SharedKernel;

namespace AspNetApp.Domain.Abstractions.Events;

public abstract record DomainEvent : IDomainEvent
{
    public DateTimeOffset OccurredTime => DateTimeOffset.UtcNow;
}
