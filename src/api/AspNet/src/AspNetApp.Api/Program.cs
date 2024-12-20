using AspNetApp.Api.Endpoints;
using AspNetApp.Api.Middlewares;
using AspNetApp.Api.OpenApi;
using AspNetApp.Infrastructure.Clock;
using AspNetApp.Infrastructure.Events;
using AspNetApp.Infrastructure.Logging;
using AspNetApp.Infrastructure.Persistence;
using AspNetApp.UseCases;

var builder = WebApplication.CreateBuilder(args);

builder.AddDatabaseOptions();

builder.WebHost.UseCustomLogger();

builder.Services.AddApplicationServices();

builder.Services.AddDateTimeProvider();
builder.Services.AddDomainEventServices();
builder.Services.AddPersistence();

builder.Services.AddMiddlewares();
builder.Services.AddOpenApi();
builder.Services.AddEndpoints();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", builder => builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();

app.ResetDatabase();

app.UseForwardedHeaders();

app.UseRequestDebuggingMiddleware();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseExceptionHandler(options =>
{
});

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowAnyOrigin");

app.UseSwaggerDoc();

app.MapEndpoints();


await app.RunAsync();

public partial class Program;
