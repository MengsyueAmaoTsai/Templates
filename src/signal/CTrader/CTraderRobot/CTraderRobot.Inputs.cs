using cAlgo.API;

namespace CTraderRobot;

public sealed partial class CTraderRobot
{
    [Parameter("Order size", DefaultValue = 300_000, MinValue = 100)]
    public int OrderSize { get; init; }
}
