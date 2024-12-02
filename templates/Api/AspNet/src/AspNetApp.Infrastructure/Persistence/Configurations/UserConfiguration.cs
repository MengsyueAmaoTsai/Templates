using AspNetApp.Domain;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using RichillCapital.SharedKernel.Monads;

namespace AspNetApp.Infrastructure.Persistence.Configurations;

internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .HasKey(user => user.Id);

        builder
            .HasIndex(user => user.Email);

        builder
            .Property(user => user.Id)
            .HasMaxLength(UserId.MaxLength)
            .HasConversion(
                id => id.Value,
                value => UserId.From(value).ThrowIfFailure().Value)
            .IsRequired();

        builder
            .Property(user => user.Email)
            .HasMaxLength(Email.MaxLength)
            .HasConversion(
                email => email.Value,
                value => Email.From(value).ThrowIfFailure().Value)
            .IsRequired();

        builder
            .Property(user => user.Name)
            .HasMaxLength(UserName.MaxLenth)
            .HasConversion(
                name => name.Value,
                value => UserName.From(value).ThrowIfFailure().Value)
            .IsRequired();
    }
}
