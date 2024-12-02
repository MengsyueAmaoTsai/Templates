using AspNetApp.Infrastructure.Clock;
using AspNetApp.Infrastructure.Events;
using AspNetApp.Infrastructure.Logging;
using AspNetApp.UseCases;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseCustomLogger();

builder.Services.AddApplicationServices();

builder.Services.AddDateTimeProvider();
builder.Services.AddDomainEventServices();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();

public partial class Program;
