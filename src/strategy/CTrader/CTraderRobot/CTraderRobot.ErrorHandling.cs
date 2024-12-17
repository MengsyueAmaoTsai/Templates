using cAlgo.API;

namespace RichillCapital.Strategies.CTrader;

public sealed partial class CTraderRobot
{
    protected override void OnException(Exception exception) =>
        Print($"An exception occurred: {exception}");

    protected override void OnError(Error error) =>
        Print($"An error occurred: {error}");
}

