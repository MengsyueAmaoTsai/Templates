using MediatR;

namespace AspNetApp.UseCases.Abstractions;


internal interface ICommand<TResult> : IRequest<TResult>;