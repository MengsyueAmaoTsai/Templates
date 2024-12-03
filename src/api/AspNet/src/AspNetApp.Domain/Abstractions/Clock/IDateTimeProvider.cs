namespace AspNetApp.Domain.Abstractions.Clock;

public interface IDateTimeProvider
{
    DateTimeOffset UtcNow { get; }
}
