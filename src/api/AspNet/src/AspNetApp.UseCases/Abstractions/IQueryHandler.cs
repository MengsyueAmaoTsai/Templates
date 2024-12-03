﻿using MediatR;

namespace AspNetApp.UseCases.Abstractions;

internal interface IQueryHandler<TQuery, TResult> :
    IRequestHandler<TQuery, TResult>
    where TQuery : IQuery<TResult>
{
    new Task<TResult> Handle(
        TQuery query,
        CancellationToken cancellationToken);
}
