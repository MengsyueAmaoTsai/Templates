using AspNetApp.Domain.Abstractions.Clock;

namespace AspNetApp.Infrastructure.Clock;

internal sealed class DateTimeProvider : IDateTimeProvider
{
    public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
}
