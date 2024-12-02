using MediatR;

namespace AspNetApp.UseCases.Abstractions;

internal interface IQuery<TResult> : IRequest<TResult>;